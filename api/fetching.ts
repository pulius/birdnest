import { parse } from "https://deno.land/x/xml/mod.ts";
import { FullData, ViolatorResponse } from "./types.ts";

const getDrones = async (): Promise<FullData> => {
  const response = await fetch('http://assignments.reaktor.com/birdnest/drones', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/xml',
    },
  });
  return JSON.parse(JSON.stringify(parse(await response.text())));
};

const getViolators = async (serialNumber: string): Promise<ViolatorResponse> => {
  try {
    const response = await fetch(`http://assignments.reaktor.com/birdnest/pilots/${serialNumber}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return { status: response.status, violator: await response.json() }
    } else {
      return { status: response.status, violator: {} }
    }
  } catch {
    console.log(serialNumber + ': failed');
    return { status: 404, violator: {} }
  }
};

export { getDrones, getViolators };
