import fs from 'fs';
import { root } from './utils.js';
import { OAuth2Client } from 'google-auth-library';

let clientSecretJson;

function getClientSecretJson() {
  if (!clientSecretJson) {
    try {
      clientSecretJson = JSON.parse(fs.readFileSync(`${root}/google-client-secret.json`))
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  return clientSecretJson;
}

const client = new OAuth2Client();
export async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: getClientSecretJson().web.client_id,
    });
    return ticket.getPayload();
  } catch (e) {
    return null;
  }
}

