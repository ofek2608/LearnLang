import fs from "fs/promises";
import { join } from "path";
import { dataDir } from "../utils.js";

const resouceRegex = /[0-9a-zA-Z+/]*/g;
export const validateResouceId = resouceRegex.test;

export async function readResource(resourceId) {
  if (!validateResouceId(resourceId)) {
    return {};
  }
  let path = join(dataDir, "resources", resourceId);
  try {
    let file = await fs.readFile(path);
    let json = JSON.parse(file);
    if (typeof json !== 'object') {
      return {};
    }
    return json;
  } catch (e) {
    return {};
  }
}

export async function writeResource(resourceId, json) {
  if (!validateResouceId(resourceId)) {
    return;
  }
  let str = JSON.stringify(json);
  let path = join(dataDir, "resources", resourceId);
  try {
    await fs.writeFile(path, str);
  } catch (e) {
    return;
  }
}
