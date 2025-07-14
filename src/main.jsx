import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import MobileLayout from "./MobileLayout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MobileLayout>
      <App />
    </MobileLayout>
  </React.StrictMode>
);
