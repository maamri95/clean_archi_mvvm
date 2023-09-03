import { setupDependencyInjection } from "#config/diConfig.ts";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

setupDependencyInjection();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
