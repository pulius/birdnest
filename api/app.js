import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { getDrones, getViolators } from "./fetching.ts";

const app = new Application()
const router = new Router()

const configData = await config({
  export: true,
  allowEmptyValues: true,
});

const user = configData.USER
const password = configData.PASSWORD
const database = configData.DATABASE
const port = configData.PORT
const hostname = configData.HOSTNAME

const CONCURRENT_CONNECTIONS = 10;
const connectionPool = new Pool({
  user,
  database,
  port,
  hostname,
  password
}, CONCURRENT_CONNECTIONS);

const calculateDistance = (drone) => {
  const xDistance = Math.ceil(Math.abs(250000 - drone.positionX) / 1000)
  const yDistance = Math.ceil(Math.abs(250000 - drone.positionY) / 1000)
  if (xDistance < yDistance) {
      return xDistance
  } else {
      return yDistance
  }
}

const fetchDrones = async () => {
  const fullData = await getDrones()
  const timestamp = fullData.report.capture["@snapshotTimestamp"]
  const drones = fullData.report.capture.drone

  const client = await connectionPool.connect();

  drones.forEach(async drone => {
    const serialNumber = drone.serialNumber
    const distance = calculateDistance(drone)

    const checkExistingQuery = `SELECT * FROM drones WHERE "serialnumber" = '${serialNumber}'`
    let existingEntry = await client.queryObject(checkExistingQuery)
    if (existingEntry.rows[0]) { // If we already have an entry for the drone, we update it
      const oldDistance = existingEntry.rows[0].distance

      if (oldDistance < distance) { // Don't update the distance if a closer (or equal) entry exists
        const updateWithoutDistanceQuery = `UPDATE drones SET "lastseen" = '${timestamp}' WHERE "serialnumber" = '${serialNumber}';`
        await client.queryObject(updateWithoutDistanceQuery)

      } else { // Update the distance if it's the closest one we have encountered 
        const updateWithDistanceQuery = `UPDATE drones SET "lastseen" = '${timestamp}', "distance" = '${distance}' WHERE "serialnumber" = '${serialNumber}';`
        await client.queryObject(updateWithDistanceQuery)
      }

      await client.release(); // pois tämä, käytä yhtä?

    } else { // If there is no previous entry for the drone, create a new one
      const insertQuery = `INSERT INTO drones ("serialnumber", "distance", "lastseen" ) VALUES ('${serialNumber}', '${distance}', '${timestamp}');`
      await client.queryObject(insertQuery)
      await client.release();
    }
  });

}

router.get("/drones", async (ctx) => {
  try {
  const client = await connectionPool.connect();
  let allViolators = await client.queryObject(`SELECT * FROM drones`)
  const currentTime = new Date().getTime()
  const validViolators = allViolators.rows.filter(drone => (
    (currentTime - new Date(drone.lastseen).getTime() <= 600000) && (parseInt(drone.distance) <= 100)
  ))
    if (validViolators) {
      ctx.response.body = JSON.stringify(validViolators);
    }
  } catch (error) {
    console.warn(error)
  }
})

router.get("/violators/:id", async (ctx) => {
  try {
  const id = ctx.params.id
  const violator = await getViolators(id)
    if (violator.status === 200) {
      ctx.response.body = JSON.stringify({status: 200, violator: JSON.stringify(violator)})
    } else {
      ctx.response.body = JSON.stringify({status: 404, violator: JSON.stringify({})})
    }
  } catch (error) {
    console.warn(error)
  }
})

app.use(oakCors());
app.use(router.routes())
app.use(router.allowedMethods())

app.listen({port: 7777})

console.log('listening on port 7777')

setInterval(function() {
  fetchDrones();
}, 10000);