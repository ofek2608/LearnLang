import { getSettings, setSettings } from "../api/settings.js";

export default async (_, userId) => {
  return await getSettings(userId);
};