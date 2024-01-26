//
// This file is responsible for answering client requests
// Client request are passed to `executeApiRequest`
// The return value is always a json, if it contains `errCode` key, then there is an error.
//

import { sessionTokenToUserId } from "./api/session-token.js";
import {
  ERR_INVALID_FUNC,
  ERR_LOGIN_EXPIRED,
  ERR_MISSING_BODY,
  ERR_MISSING_FUNC,
  ERR_MISSING_SESSION_TOKEN,
  ERR_UNKNOWN_INTERNAL,
} from "./errors.js";
import { importFolder } from "./utils.js";

const API_FUNCTIONS = await importFolder("api-function");

export async function executeApiRequest(request) {
  console.log("request", request);
  let result = await executeApiRequestUnsafe(request);
  console.log("result", result);
  return result;
}

async function executeApiRequestUnsafe(request) {
  if (!request) {
    return ERR_MISSING_BODY;
  }
  let { func, data, sessionToken } = request;

  // func
  if (typeof func !== "string") {
    return ERR_MISSING_FUNC;
  }
  let executableFunc = API_FUNCTIONS[func];
  if (!executableFunc) {
    return ERR_INVALID_FUNC;
  }

  // userId
  let userId;
  if (executableFunc.length >= 2) {
    // If the function has 2 paramerters: data,user (shouldn't be > 2)
    if (!sessionToken) {
      return ERR_MISSING_SESSION_TOKEN;
    }
    userId = sessionTokenToUserId(sessionToken);
    if (typeof userId !== "string") {
      return ERR_LOGIN_EXPIRED;
    }
  }

  try {
    return await executableFunc(data, userId);
  } catch (e) {
    console.error(e);
    return ERR_UNKNOWN_INTERNAL;
  }
}

//TODO clean

// let loginByUser = {};
// let userByLogin = {};

// function checkLogin(login) {
//   return userByLogin[login];
// }

// function getUserIdByGoogle(googleUserId) {
//   return googleUserId;
// }

// function createLoginKey(userId) {
//   let loginKey = loginByUser[userId];
//   if (loginKey) {
//     return loginKey;
//   }
//   loginKey = crypto.randomBytes(32).toString('base64');
//   loginByUser[userId] = loginKey;
//   userByLogin[loginKey] = userId;
//   return loginKey;
// }

// const API_FUNCTIONS = {
//   login: async (data) => {
//     let {googleToken} = data;
//     let verified = await verifyGoogleToken(googleToken);
//     if (!verified) {
//       return ERR_INVALID_TOKEN;
//     }
//     let googleUserId = verified.sub;
//     let userId = getUserIdByGoogle(googleUserId);
//     let loginKey = createLoginKey(userId);
//     return {loginKey}
//   },
//   get_profile: async (data) => {
//     let {id} = data;
//     if (typeof(data) !== 'string') {
//       return ERR_MISSING_PROFILE_ID;
//     }
//     return getProfile(id);
//   },
//   get_settings: async (_, user) => {
//     return getSettings(user);
//   },
//   get_resource: async (data) => {
//     let {id} = data;
//     if (typeof(data) !== 'string') {
//       return ERR_MISSING_RESOURCE_ID;
//     }
//     return getResource(id);
//   }
// };

// function getProfile(userId) {
//   return {
//     id: userId,
//     username: 'Hello',
//   };
// }

// function getSettings(userId) {
//   return {
//     'email': 'example@email.com'
//   };
// }

// function getResource(resourceId) {
//   return {

//   };
// }
