import { createSessionToken } from "../api/session-token.js";
import {
  ERR_ACCOUNT_DONT_EXIST,
  ERR_INVALID_AUTH_DATA,
  ERR_INVALID_AUTH_METHOD,
  ERR_MISSING_AUTH_DATA,
  ERR_MISSING_AUTH_METHOD,
} from "../errors.js";
import { importFolder } from "../utils.js";

const AUTH_METHODS = await importFolder("auth-method");

export default async ({ method, data, create }) => {
  if (!method) return ERR_MISSING_AUTH_METHOD;
  if (!data) return ERR_MISSING_AUTH_DATA;
  let authMethod = AUTH_METHODS[method];
  if (!authMethod) return ERR_INVALID_AUTH_METHOD;
  let externalUserId;
  try {
    externalUserId = await authMethod(data);
  } catch (e) {
    return ERR_INVALID_AUTH_DATA;
  }
  let key = `${method}:${externalUserId}`;
  let userId = userIdByExternal[key];
  if (!userId) {
    if (!create) {
      return ERR_ACCOUNT_DONT_EXIST;
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
