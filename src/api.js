//
// This file is responsible for answering client requests
// Client request are passed to `executeApiRequest`
// The return value is always a json, if it contains `err` key, then there is an error.
//

import { verifyGoogleToken } from './google-client.js';
import crypto from 'crypto';

export function executeApiRequest(request) {
  const { func, data, loginKey } = request;

  let user;
  if (loginKey) {
    user = checkLogin(loginKey);
    if (!user) {
      return {err:'invalid login'};
    }
  } else {
    user = null;
  }

  if (typeof(func) !== 'string') {
    return {err:'missing func (string)'};
  }

  return POST_FUNCS[func](data, user);
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

const POST_FUNCS = {
  login: async (data) => {
    let {googleToken} = data;
    let verified = await verifyGoogleToken(googleToken);
    if (!verified) {
      return {err:'couldn\'t verify token'};
    }
    let googleUserId = verified.sub;
    let userId = getUserIdByGoogle(googleUserId);
    let loginKey = createLoginKey(userId);
    return {loginKey}
  },
  get_profile: (data) => {
    let {id} = data;
    if (typeof(data) !== 'string') {
      return {err:'missing data.id (string)'};
    }
    return getProfile(id);
  },
  get_settings: (_, user) => {
    if (typeof(user) !== 'string') {
      return {err:'missing login data'};
    }
    return getSettings(user);
  },
  get_lesson: (data) => {
    let {id} = data;
    if (typeof(data) !== 'string') {
      return {err:'missing data.id (string)'};
    }
    return getLesson(id);
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

function getLesson(lessonId) {
  return {

  };
}