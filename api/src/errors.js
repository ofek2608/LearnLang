//
// This file loads errors.csv
// and exports it as a json object.
//

import { readFileSync } from "fs";
import { join } from "path";
import { parseCSV, srcDir } from "./utils.js";

let errorPath = join(srcDir, "errors.csv");
let errorSrc = readFileSync(errorPath).toString();
let errorTable = parseCSV(errorSrc);
const ERR = {};
for (let { name, code, message } of errorTable) {
  ERR[name] = {
    errCode: parseInt(code),
    err: message,
  };
}

export default ERR;
