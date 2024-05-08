import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App/App";
import { AppProvider } from "./ContextApi/GlobalContext";
import { store, persistor } from "./Reduxtoolkit/store";

import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

const LoadingComponent = () => (
  <div>Loading...</div> // Placeholder loading component
);

root.render(
  <React.StrictMode>
    <AppProvider>
      
      <Provider store={store}>
        <PersistGate loading={<LoadingComponent/>} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </AppProvider>
  </React.StrictMode>
);
