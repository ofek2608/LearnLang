//
// This function is used to get a session token
// The body needs to be of the form {method, data, create}
// It will use the requested [method] from ../auth-method with [data] as argument
// If the account doesn't exist, [create] defines whether should create an account or return an error.
//

import { createSessionToken } from "../api/session-token.js";
import ERR from "../errors.js";
import { importFolder } from "../utils.js";

const AUTH_METHODS = await importFolder("auth-method");

export default async ({ method, data, create }) => {
  if (!method) return ERR.missingAuthMethod;
  if (!data) return ERR.missingAuthData;
  let authMethod = AUTH_METHODS[method];
  if (!authMethod) return ERR.invalidAuthMethod;
  let externalUserId;
  try {
    externalUserId = await authMethod({ data });
  } catch (e) {
    return ERR.invalidAuthData;
  }
  let key = `${method}:${externalUserId}`;
  let userId = userIdByExternal[key];
  if (!userId) {
    if (!create) {
      return ERR.accountDontExist;
    }
    userId = createAccount({ method, externalUserId });
    userIdByExternal[key] = userId;
  }
  let sessionToken = createSessionToken(userId);
  return { sessionToken };
};

//TODO load userIdByExternal
let userIdByExternal = {};

//TODO move somewhere else
function createAccount({ method, externalUserId }) {
  return externalUserId;
}
