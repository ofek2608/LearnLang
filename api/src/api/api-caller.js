//
// This file collect api requests.
// It redirects them to the correct module of `../api-function`
//

import { sessionTokenToUserId } from "./session-token.js";
import ERR from "../errors.js";
import { importFolder } from "../utils.js";

const API_FUNCTIONS = await importFolder("api-function");

export default async function executeApiRequest(request) {
  if (!request) {
    return ERR.missingBody;
  }
  let { func, data, sessionToken } = request;

  // func
  if (typeof func !== "string") {
    return ERR.missingFunc;
  }
  let executableFunc = API_FUNCTIONS[func];
  if (!executableFunc) {
    return ERR.invalidFunc;
  }

  // data
  if (typeof data !== "object") {
    return ERR.missingData;
  }

  // sessionToken
  let userId;
  if (executableFunc.length >= 2) {
    // If the function has 2 paramerters: data,user (shouldn't be > 2)
    if (!sessionToken) {
      return ERR.missingSessionToken;
    }
    userId = sessionTokenToUserId(sessionToken);
    if (typeof userId !== "string") {
      return ERR.loginExpired;
    }
  }

  // executing
  try {
    return await executableFunc(data, userId);
  } catch (e) {
    console.error(e);
    return ERR.unknownInternal;
  }
}
