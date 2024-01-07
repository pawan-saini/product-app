// src/features/products/productsSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../api/services/Home";

const initialState = {
  products: [],
  loading: false,
  error: null,
  sortBy: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsRequest: (state) => {
      state.loading = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    sortProducts: (state, action) => {
      // Sort the products based on the provided criteria
      const sortType = action.payload;
      const [criteria, ascending] = sortType.split("-");
      const orderBy = ascending === "true" ? true : false;
      state.sortBy = sortType;

      state.products.sort((a, b) => {
        if (criteria != "title" && orderBy) {
          const comparison = a[criteria] - b[criteria];
          return orderBy ? comparison : -comparison;
        }

        if (criteria != "title" && !orderBy) {
          const comparison =
            a[criteria] < b[criteria] ? -1 : a[criteria] > b[criteria] ? 1 : 0;
          return orderBy ? comparison : -comparison;
        }
        if (criteria === "title") {
          const valueA = a[criteria].toUpperCase(); // Convert to uppercase for case-insensitive sorting
          const valueB = b[criteria].toUpperCase();
          if (valueA < valueB) {
            return orderBy ? -1 : 1;
          }
          if (valueA > valueB) {
            return orderBy ? 1 : -1;
          }
          return 0; // Values are equal
        }
      });
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  sortProducts,
} = productsSlice.actions;

export default productsSlice.reducer;

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(fetchProductsRequest());
    const data = await getProducts();
    dispatch(fetchProductsSuccess(data));
  } catch (err) {
    console.log("error--", err);
    dispatch(fetchProductsFailure(err.message));
  }
};
