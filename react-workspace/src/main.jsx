import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Navigator from "./components/navigator/NavigatorApp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navigator />
  </StrictMode>,
);
