//
// This file is responsible for validating google token
// which are sent from the client when they signup or signin.
//

import { OAuth2Client } from 'google-auth-library';

// let clientSecretJson;
// function getClientSecretJson() {
//   if (!clientSecretJson) {
//     try {
//       clientSecretJson = JSON.parse(fs.readFileSync(`${root}/google-client-secret.json`))
//     } catch (e) {
//       console.error(e);
//       throw e;
//     }
//   }
//   return clientSecretJson;
// }

const client = new OAuth2Client();
export async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '337900408578-7jupms466mm5oc3nvap5ldo1sd4qec2i.apps.googleusercontent.com',
    });
    return ticket.getPayload();
  } catch (e) {
    return null;
  }
}

