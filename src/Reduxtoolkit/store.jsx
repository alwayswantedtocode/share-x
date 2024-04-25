import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import postReducer from "./postSlice";
import usersReducers from "./appUsersSlice"
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";


const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  Users: usersReducers,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);