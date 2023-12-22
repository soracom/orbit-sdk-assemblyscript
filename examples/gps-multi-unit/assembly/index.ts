import {
  getInputBufferAsString,
  getSourceValue,
  getTagValue,
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

  // calculate distance between center and current position
  data.set("inside_area", 0);
  const centerLat = stringToF64(getTagValue("center_lat"), -999.0);
  const centerLon = stringToF64(getTagValue("center_lon"), -999.0);
  const radius = stringToF64(getTagValue("radius"), -1.0);
  const lat = jsonFloatToF64(data.getFloat("lat"), -999.0);
  const lon = jsonFloatToF64(data.getFloat("lon"), -999.0);
  if (centerLat >= -90 && centerLon >= -180 && lat >= -90 && lon >= -180 && radius > 0) {
    log(`center: ${centerLat}, ${centerLon} / pos: ${lat}, ${lon}`);
    const distance = calcDistanceInKm(centerLat, centerLon, lat, lon);
    data.set("distance_in_km", distance);
    if (distance <= radius) {
      data.set("inside_area", 1);
    }
  }

  // add metadata
  data.set("imsi", getSourceValue("resourceId"));
  data.set("name", getTagValue("name"));
  data.set("user_data", getUserdata());

  // set output JSON. Note that we have to wrap result with {}
  setOutputJSON(data.toString());

  // return user defined result code for success
  return 0;
}

function stringToF64(value: string | null, defaultValue: f64): f64 {
  if (value === null) {
    return defaultValue;
  }
  const floatValue = parseFloat(value);
  if (isNaN(floatValue)) {
    return defaultValue
  }
  return floatValue;
}

function jsonFloatToF64(value: JSON.Float | null, defaultValue: f64): f64 {
  if (value === null) {
    return defaultValue;
  }
  return value.valueOf();
}

function calcDistanceInKm(lat1: f64, lon1: f64, lat2: f64, lon2: f64): f64 {
  const r = 6371; // Radius of the earth in km
  const d_lat = deg2rad(lat2 - lat1);
  const d_lon = deg2rad(lon2 - lon1);
  const a =
    NativeMath.sin(d_lat / 2) * NativeMath.sin(d_lat / 2) +
    NativeMath.cos(deg2rad(lat1)) *
      NativeMath.cos(deg2rad(lat2)) *
      NativeMath.sin(d_lon / 2) *
      NativeMath.sin(d_lon / 2);

  const c = 2 * NativeMath.atan2(NativeMath.sqrt(a), NativeMath.sqrt(1 - a));
  return r * c;
}

function deg2rad(deg: f64): f64 {
  return deg * (NativeMath.PI / 180);
}
