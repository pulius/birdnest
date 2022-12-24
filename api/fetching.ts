import { parse } from "https://deno.land/x/xml/mod.ts";

type fullData = {
    xml: xml
    report: report
}

type xml = {
    "@version": number
    "@encoding": string
}

type report = {
    deviceInformation: deviceInformation
    capture: capture
}

type deviceInformation = {
    "@deviceId": string
      listenRange: number
      deviceStarted: string
      uptimeSeconds: number
      updateIntervalMs: number
}

type capture = {
    "@snapshotTimestamp": string
    drone: [droneObject]
}

type droneObject =   {
    serialNumber: string
    model: string
    manufacturer: string
    mac: string
    ipv4: string
    ipv6: string
    firmware: string
    positionY: number
    positionX: number
    altitude: number
  }

const getDrones = async (): Promise<string> => {
    const response = await fetch("http://assignments.reaktor.com/birdnest/drones", {
        method: "GET",
        headers: {
            "Content-Type": "application/xml",
        },
    });
       return parse(await response.text());
}

const getViolators = async (serialNumber: string): Promise<Object> => {
    const response = await fetch(`http://assignments.reaktor.com/birdnest/pilots/${serialNumber}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.status === 200) {
        return {status: response.status, violator: await response.json()}
    } else {
        return {status: response.status, violator: {}}
    }
}

// const drones: fullData = parse(await getDrones());

// console.log(drones.report.capture.drone.map(d => d.serialNumber));

// console.log(await getViolators('SN-DktakICcaa'))

export { getDrones, getViolators }