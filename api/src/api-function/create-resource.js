import { readResource } from "../api/data.js";
import ERR from "../errors.js";
import { importFolder } from "../utils.js";

let RESOURCE_TYPES = importFolder("resource-type");
export default async ({ resourceId, data }, userId) => {
  if (!resourceId) return ERR.missingResourceId;
  let resource = readResource(resourceId);
  let resourceType = RESOURCE_TYPES[resource.type];
  if (!resourceType) return ERR.invalidResourceId;
  return resourceType.createResource({ resourceId, resource, data, userId });
};
