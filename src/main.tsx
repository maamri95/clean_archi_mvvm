import {setup} from "#config/setup.ts";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

setup();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
