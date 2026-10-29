import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// The two dashboards' stylesheets are reused as-is; app.css only adds the hub and small React-specific bits.
import "../../project-guides/assets/guide.css";
import "../../study-guide/assets/study.css";
import "./app.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
