import crypto from "crypto";

let u2s = {};
let s2u = {};

export function createSessionToken(userId) {
  let sessionToken = u2s[userId];
  if (sessionToken) {
    return sessionToken;
  }
  sessionToken = crypto.randomBytes(32).toString("base64");
  u2s[userId] = sessionToken;
  s2u[sessionToken] = userId;
  return sessionToken;
}

export function sessionTokenToUserId(sessionToken) {
  return s2u[sessionToken];
}

export function invalidateSessionToken(userId) {
  let sessionToken = u2s[userId];
  if (!sessionToken) {
    return false;
  }
  delete u2s[userId];
  delete s2u[sessionToken];
  return true;
}
