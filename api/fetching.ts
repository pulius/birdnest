import { parse } from "https://deno.land/x/xml/mod.ts";

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

export { getDrones, getViolators }