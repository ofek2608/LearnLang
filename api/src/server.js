//
// This file open a server
// It redirect GET request to `api.executeApiRequest`
//

import express from "express";
import cors from "cors";
import { serverPort } from "./arguments.js";
import { executeApiRequest } from "./api-caller.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  console.log("wow");
  res.set({
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  });
  res.json(await executeApiRequest(req.body));
});

let server = app.listen(serverPort, () => {
  console.log(`Server listening on ${serverPort}`);
});

export function stopServer() {
  server.close(console.error);
}

//TODO allow access to images
