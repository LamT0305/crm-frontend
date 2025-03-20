import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filteredProducts: [],
  isLoading: false,
  product: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    addProduct: (state, action) => {
      state.products.unshift(action.payload);
      state.filteredProducts = [...state.products];
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p._id !== action.payload);
      state.filteredProducts = [...state.products];
    },
    getProductById: (state, action) => {
      state.product = action.payload;
    },
    updateProduct: (state, action) => {
      const product = action.payload;
      state.products = state.products.map((p) =>
        p._id === product._id ? { ...p, ...product } : p
      );
      state.filteredProducts = [...state.products];
    },
    sortProducts: (state, action) => {
      const { field, order } = action.payload;

      if (!field) return;

      const compareFunction = (a, b) => {
        if (typeof a[field] === "string" && typeof b[field] === "string") {
          return order === "asc"
            ? a[field].localeCompare(b[field])
            : b[field].localeCompare(a[field]);
        }
        if (typeof a[field] === "number" && typeof b[field] === "number") {
          return order === "asc" ? a[field] - b[field] : b[field] - a[field];
        }
        return 0;
      };

      state.filteredProducts = [...state.filteredProducts].sort(
        compareFunction
      );
    },
    filterProducts: (state, action) => {
      const { field, value } = action.payload;

      if (!field || value === undefined) return;

      if (!value || value.length === 0) {
        state.filteredProducts = state.products;
        return;
      }

      state.filteredProducts = state.products.filter((product) => {
        const fieldValue = product[field]?.toString().toLowerCase();
        return fieldValue && fieldValue.includes(value.toLowerCase());
      });
    },
    clearProduct: (state) => {
      state.product = {};
    },
  },
});

export const {
  setLoading,
  setProducts,
  addProduct,
  deleteProduct,
  getProductById,
  updateProduct,
  sortProducts,
  filterProducts,
  clearProduct
} = productSlice.actions;

export default productSlice.reducer;
