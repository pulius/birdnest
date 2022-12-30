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
    serialnumber: string,
    distance: string,
    lastseen: string
}

  export type {fullData, xml, report, deviceInformation, capture, droneObject}
