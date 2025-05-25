import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getInitialDarkMode = () => {
  const isDarkMode = localStorage.getItem("darkMode");
  return isDarkMode ? JSON.parse(isDarkMode) : true;
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLoading: false,
    darkMode: getInitialDarkMode(),
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    },
  },
});

export const { startLoading, stopLoading, toggleDarkMode, setDarkMode } =
  uiSlice.actions;
