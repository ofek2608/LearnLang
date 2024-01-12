//
// This file is responsible for answering client requests
// Client request are passed to `executeApiRequest`
// The return value is always a json, if it contains `errCode` key, then there is an error.
//

import { verifyGoogleToken } from './google-client.js';
import crypto from 'crypto';
import * as ERR from './errors.js';

export async function executeApiRequest(request) {
  if (!request) {
    return ERR.MISSING_BODY;
  }
  const { func, data, loginKey } = request;

  // func
  if (typeof(func) !== 'string') {
    return ERR.MISSING_FUNC;
  }
  let executableFunc = API_FUNCTIONS[func.toLocaleLowerCase()];
  if (!executableFunc) {
    return ERR.INVALID_FUNC;
  }

  // user
  let user;
  if (executableFunc.length >= 2) {
    // If the function has 2 paramerters: data,user (shouldn't be > 2)
    if (!loginKey) {
      return ERR.MISSING_LOGIN_KEY;
    }
    user = checkLogin(loginKey);
    if (typeof(user) !== 'string') {
      return ERR.LOGIN_EXPIRED;
    }
  }

  return await executableFunc(data, user);
}

let loginByUser = {};
let userByLogin = {};

function checkLogin(login) {
  return userByLogin[login];
}

function getUserIdByGoogle(googleUserId) {
  return googleUserId;
}

function createLoginKey(userId) {
  let loginKey = loginByUser[userId];
  if (loginKey) {
    return loginKey;
  }
  loginKey = crypto.randomBytes(32).toString('base64');
  loginByUser[userId] = loginKey;
  userByLogin[loginKey] = userId;
  return loginKey;
}

const API_FUNCTIONS = {
  login: async (data) => {
    let {googleToken} = data;
    let verified = await verifyGoogleToken(googleToken);
    if (!verified) {
      return ERR.INVALID_TOKEN;
    }
    let googleUserId = verified.sub;
    let userId = getUserIdByGoogle(googleUserId);
    let loginKey = createLoginKey(userId);
    return {loginKey}
  },
  get_profile: async (data) => {
    let {id} = data;
    if (typeof(data) !== 'string') {
      return ERR.MISSING_PROFILE_ID;
    }
    return getProfile(id);
  },
  get_settings: async (_, user) => {
    return getSettings(user);
  },
  get_resource: async (data) => {
    let {id} = data;
    if (typeof(data) !== 'string') {
      return ERR.MISSING_RESOURCE_ID;
    }
    return getResource(id);
  }
};

function getProfile(userId) {
  return {
    id: userId,
    username: 'Hello',
  };
}

function getSettings(userId) {
  return {
    'email': 'example@email.com'
  };
}

function getResource(resourceId) {
  return {

  };
}