import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client();

export default async ({ data }) => {
  const ticket = await client.verifyIdToken({
    idToken: data,
    audience:
      "337900408578-7jupms466mm5oc3nvap5ldo1sd4qec2i.apps.googleusercontent.com",
  });
  let payload = ticket.getPayload();
  return payload.sub;
};
