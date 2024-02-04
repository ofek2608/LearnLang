import { setSettings } from "../api/settings.js";

export default async ({ modifications }, userId) => {
  if (typeof modifications !== 'object') {
    return ERR.unspecifiedClientError;
  }
  setSettings(userId, modifications);
  return {};
};