//
// This file is a temporary example for a resource type
//

import ERR from "../errors.js";

function getResource({ resourceId, resource, args }) {
  return ERR.unknownInternal;
}

function createResource({ resourceId, resource, data, userId }) {
  return ERR.unknownInternal;
}

function editResource({ resourceId, resource, data, userId }) {
  return ERR.unknownInternal;
}

function deleteResource({ resourceId, resource, userId }) {
  return ERR.unknownInternal;
}

export default { getResource, createResource, editResource, deleteResource };
