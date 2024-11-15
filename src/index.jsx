import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App/App";
import { AppProvider } from "./ContextApi/GlobalContext";
import { store, persistor } from "./Reduxtoolkit/store";
import "./Components/HomePage Components/home.scss"
import "./Pages/Profile Page/profile.scss"
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));



root.render(
  <React.StrictMode>
    <AppProvider>
      
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </AppProvider>
  </React.StrictMode>
);
