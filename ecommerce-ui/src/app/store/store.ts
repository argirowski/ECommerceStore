import { configureStore } from "@reduxjs/toolkit";
import { catalogueApi } from "../../features/catalogue/catalogueApi";
import { uiSlice } from "../layout/uiSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { errorApi } from "../../features/about/ErrorApi";
import { basketApi } from "../../features/basket/basketApi";
import { catalogueSlice } from "../../features/catalogue/catalogueSlice";
import { accountApi } from "../../features/account/accountApi";

export const store = configureStore({
  reducer: {
    [catalogueApi.reducerPath]: catalogueApi.reducer,
    [errorApi.reducerPath]: errorApi.reducer,
    [basketApi.reducerPath]: basketApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    ui: uiSlice.reducer,
    catalogue: catalogueSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      catalogueApi.middleware,
      errorApi.middleware,
      basketApi.middleware,
      accountApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
