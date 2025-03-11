import { ProductParams } from "../../app/models/productParams";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ProductParams = {
  pageNumber: 1,
  pageSize: 5,
  types: [],
  brands: [],
  searchTerm: "",
  orderBy: "name",
};

export const catalogueSlice = createSlice({
  name: "catalogue",
  initialState,
  reducers: {
    setPageNumber(state, action) {
      state.pageNumber = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    setOrderBy(state, action) {
      state.orderBy = action.payload;
      state.pageNumber = 1;
    },
    setTypes(state, action) {
      state.types = action.payload;
      state.pageNumber = 1;
    },
    setBrands(state, action) {
      state.brands = action.payload;
      state.pageNumber = 1;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
      state.pageNumber = 1;
    },
    resetParams() {
      return initialState;
    },
  },
});

export const {
  setPageNumber,
  setPageSize,
  setOrderBy,
  setTypes,
  setBrands,
  setSearchTerm,
  resetParams,
} = catalogueSlice.actions;
