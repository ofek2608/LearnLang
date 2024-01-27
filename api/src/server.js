//
// This file open a server
// It redirect POST request to `./api-caller`
//

import express from "express";
import cors from "cors";
import { serverPort } from "./arguments.js";
import executeApiRequest from "./api/api-caller.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  res.set({
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  });
  res.json(await executeApiRequest(req.body));
});
app.get("/img/:id", async (req, res) => {
  res.set({
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  });
  res.sendFile(`../data/img/${req.id}`);
});

let server = app.listen(serverPort, () => {
  console.log(`Server listening on ${serverPort}`);
});

export function stopServer() {
  server.close(console.error);
}

//TODO allow access to images
