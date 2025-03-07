import { configureStore } from "@reduxjs/toolkit";
import { catalogueApi } from "../../features/catalogue/catalogueApi";
import { uiSlice } from "../layout/uiSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { errorApi } from "../../features/about/ErrorApi";

export const store = configureStore({
  reducer: {
    [catalogueApi.reducerPath]: catalogueApi.reducer,
    [errorApi.reducerPath]: errorApi.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catalogueApi.middleware, errorApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
