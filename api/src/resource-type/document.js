//
// This file is a temporary example for a resource type
//

import ERR from "../errors.js";

function get({ resourceId, args }) {
  return ERR.unknownInternal;
}

function create({ resourceId, data, userId }) {
  return ERR.unknownInternal;
}

function edit({ resourceId, data, userId }) {
  return ERR.unknownInternal;
}

function del({ resouceId, userId }) {
  return ERR.unknownInternal;
}

export default { get, create, edit, del };
