import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App/App";
import { AppProvider } from "./ContextApi/GlobalContext";
import { AuthenticationProvider } from "./ContextApi/AuthenticationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <AuthenticationProvider>
        <App />
      </AuthenticationProvider>
    </AppProvider>
  </React.StrictMode>
);
