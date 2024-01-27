//
// This file is responsible of sending api requests to the server
//

const URL = "http://localhost:3001";
let loginData = null;
let sessionToken = null;

async function rawApiCall(func, data) {
  if (typeof data !== "object") {
    data = {};
  }
  let request = { func, data, sessionToken };
  let response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  let json = await response.json();
  if (json.errCode) {
    json.request = request;
    console.error("api error", json);
  }
  return json;
}

async function login() {
  if (!loginData) {
    sessionToken = null;
    return false;
  }
  let result = await rawApiCall("login", loginData);
  if (result.errCode) {
    sessionToken = null;
    return false;
  }
  sessionToken = result.sessionToken;
  console.log("sessionToken", sessionToken); // TODO remove printing of sensitive information
  return true;
}

export async function logOut() {
  loginData = null;
  sessionToken = null;
}

export async function setLogin(method, data, create) {
  loginData = { method, data, create };
  if (await login()) {
    loginData.create = false;
    return true;
  }
  loginData = null;
  return false;
}

export async function apiCall(func, data) {
  while (true) {
    let result = await rawApiCall(func, data);
    if (result.errCode === 200) {
      // sessionToken expired
      if (await login()) {
        // if could log in, try again
        continue;
      }
    }
    return;
  }
}
