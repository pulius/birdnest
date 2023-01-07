type FullData = {
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

type droneObject = { // drone from the api
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

type dbDrone = { // drone from the db
  serialnumber: string
  distance: string
  lastseen: string
}

type dbRows = {
  rows: dbDrone[]
}

type Violator = {
  pilotId: string
  firstName: string
  lastName: string
  phoneNumber: string
  createdDt: string
  email: string
}

type ViolatorResponse = {
  status: number
  violator: Violator | Record<string | number | symbol, never> // latter equals empty object
}

export type { FullData, xml, report, deviceInformation, capture, droneObject, dbDrone, dbRows, Violator, ViolatorResponse };
