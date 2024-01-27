//
// This file contain utilities which may be used in multiple files.
//

import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const filePath = fileURLToPath(import.meta.url);
export const srcDir = dirname(filePath);
const rootDir = dirname(srcDir);
export const dataDir = join(rootDir, "data");

export async function sha1(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);

  // Convert the ArrayBuffer to a hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

export async function importFolder(folder) {
  let files = await fs.promises.readdir(join(srcDir, folder));
  let result = {};
  let promises = files.map(async (file) => {
    if (!file.endsWith(".js")) {
      return;
    }
    let importName = file.substring(0, file.length - 3);
    let importedModule = await import(`./${folder}/${file}`);
    if (!importedModule.default) {
      console.warn(
        `Warning: ${importName} in ${folder} does not have a default export.`
      );
      return;
    }
    result[importName] = importedModule.default;
  });
  await Promise.all(promises);
  console.log(
    `Imported from folder ${folder} the modules`,
    Object.keys(result)
  );
  return result;
}

export function parseCSV(lines) {
  lines = lines.replaceAll("\r", "");
  lines = lines.split(/\s*\n\s*/g);
  lines = lines.map((line) => line.split(/\s*,\s*/g));
  let names = lines.shift();
  lines = lines.filter((line) => line.length >= names.length);

  function parseLine(line) {
    let result = {};
    for (let i = 0; i < names.length; i++) {
      result[names[i]] = line[i];
    }
    return result;
  }

  lines = lines.map(parseLine);
  lines = lines.filter((a) => a);
  return lines;
}
