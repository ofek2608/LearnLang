//
// This file reads the commandline arguments
// 

// Setup
const args = { "": [] };
let currentKey = "";
for (let arg of process.argv) {
  if (arg.startsWith("-")) {
    currentKey = arg.substring(1);
    if (!args[currentKey]) {
      args[currentKey] = [];
    }
  } else {
    args[currentKey].push(arg);
  }
}

//Exports
export default args; // for dynamic arguments
export const isTestMode = !!args.test;
export const serverPort = parseInt((args.port ?? [])[0] ?? "3001");