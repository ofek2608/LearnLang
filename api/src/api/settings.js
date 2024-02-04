
import { importFolder } from "../utils.js";
import { readResource, writeResource } from "./data.js";

const SETTINGS = await importFolder("settings");

function getPath(userId) {
  //TODO validate userId
  return `settings/${userId}.json`;
}

export async function getSettings(userId) {
  let path = getPath(userId);
  let settings = await readResource(path);
  let hasChanges = false;
  for (let name in SETTINGS) {
    if (settings[name]) {
      continue;
    }
    settings[name] = SETTINGS[name].getDefault({userId, settings});
    hasChanges = true;
  }
  if (hasChanges) {
    await writeResource(path, settings)
  }
  return settings;
  
}

export async function setSettings(userId, modifications) {
  let path = getPath(userId);
  let settings = await readResource(path);
  let hasChanges = false;
  for (let name in modifications) {
    let value = modifications[name];
    let valid = SETTINGS[name].verifyValue({userId, settings, value});
    if (valid) {
      settings[name] = value;
      hasChanges = true;
    }
  }
  if (hasChanges) {
    await writeResource(path, settings)
  }
}