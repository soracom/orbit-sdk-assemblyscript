import {
  getInputBufferAsString,
  getLocation,
  getSourceValue,
  getTagValue,
  getTimestamp,
  getUserdata,
  log,
  setOutputJSON,
} from "orbit-sdk-assemblyscript";

import { JSON } from "assemblyscript-json";

/**
 * process uplink (device -> SORACOM) message
 */
export function uplink(): i32 {
  // decode input string as JSON string
  const data: JSON.Obj = <JSON.Obj>JSON.parse(getInputBufferAsString());

  // generate output JSON string
  data.set("imsi", getSourceValue("resourceId"))
  data.set("name", getTagValue("name"))
  const location = getLocation();
  if (location.lat.toString() !== "NaN" && location.lon.toString() !== "NaN") {
    const locationObj = new JSON.Obj();
    locationObj.set("lat", location.lat);
    locationObj.set("lon", location.lon);
    data.set("location", locationObj);
  }
  data.set("timestamp", getTimestamp());
  data.set("userdata", getUserdata());

  log("Hello Orbit!");

  // set output JSON. Note that we have to wrap result with {}
  setOutputJSON(data.toString());

  // return user defined result code for success
  return 0;
}
