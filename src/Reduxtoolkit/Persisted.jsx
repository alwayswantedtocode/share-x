import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import postReducer from "./postSlice";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedPostReducer = persistReducer(persistConfig, postReducer);

export { persistedAuthReducer, persistedPostReducer };
