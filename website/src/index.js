import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./theme";
import App from "./components/app";
import { BrowserRouter } from "react-router-dom";
import * as ApiConnection from "./api-connection";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";

const googleClientId =
  "337900408578-7jupms466mm5oc3nvap5ldo1sd4qec2i.apps.googleusercontent.com";
const GoogleWrapper = ({ children }) => (
  <GoogleOAuthProvider clientId={googleClientId}>
    {children}
  </GoogleOAuthProvider>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
const layers = [App, BrowserRouter, GoogleWrapper, StrictMode];

let rendered = null;
for (let Layer of layers) {
  rendered = <Layer>{rendered}</Layer>;
}
root.render(rendered);

window.ApiConnection = ApiConnection;
