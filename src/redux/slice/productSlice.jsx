import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [], // Store all products
  products: [], // Current products
  filteredProducts: [], // Filtered products
  displayedProducts: [], // Currently displayed products
  isLoading: false,
  product: {},
  totalPages: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProducts: (state, action) => {
      state.allProducts = action.payload;
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.displayedProducts = action.payload.slice(0, 15);
      state.totalPages = Math.ceil(action.payload.length / 15);
    },
    setCurrentPage: (state, action) => {
      const page = action.payload;
      const start = (page - 1) * 15;
      const end = start + 15;
      state.displayedProducts = state.filteredProducts.slice(start, end);
    },
    addProduct: (state, action) => {
      state.allProducts.unshift(action.payload);
      state.products.unshift(action.payload);
      state.filteredProducts = [...state.products];
      state.displayedProducts = state.filteredProducts.slice(0, 15);
      state.totalPages = Math.ceil(state.filteredProducts.length / 15);
    },
    deleteProduct: (state, action) => {
      const deleteId = action.payload;
      state.allProducts = state.allProducts.filter((p) => p._id !== deleteId);
      state.products = state.products.filter((p) => p._id !== deleteId);
      state.filteredProducts = state.filteredProducts.filter(
        (p) => p._id !== deleteId
      );
      state.displayedProducts = state.filteredProducts.slice(0, 15);
      state.totalPages = Math.ceil(state.filteredProducts.length / 15);
    },
    getProductById: (state, action) => {
      state.product = action.payload;
    },
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      const updateInArray = (array) => {
        return array.map((p) =>
          p._id === updatedProduct._id ? { ...p, ...updatedProduct } : p
        );
      };

      state.allProducts = updateInArray(state.allProducts);
      state.products = updateInArray(state.products);
      state.filteredProducts = updateInArray(state.filteredProducts);
      state.displayedProducts = state.filteredProducts.slice(0, 15);
    },
    sortProducts: (state, action) => {
      const { field, order } = action.payload;
      if (!field) return;

      const getNestedValue = (obj, path) => {
        const keys = path.split(".");
        let value = obj;
        for (const key of keys) {
          value = value?.[key];
          if (value === undefined) return "";
        }
        return value;
      };

      const compareFunction = (a, b) => {
        const aValue = getNestedValue(a, field);
        const bValue = getNestedValue(b, field);

        if (typeof aValue === "string" && typeof bValue === "string") {
          return order === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        if (typeof aValue === "number" && typeof bValue === "number") {
          return order === "asc" ? aValue - bValue : bValue - aValue;
        }
        return 0;
      };

      state.filteredProducts = [...state.filteredProducts].sort(
        compareFunction
      );
      state.displayedProducts = state.filteredProducts.slice(0, 15);
      state.totalPages = Math.ceil(state.filteredProducts.length / 15);
    },
    filterProducts: (state, action) => {
      const { field, value } = action.payload;

      if (!field || value === undefined) {
        state.filteredProducts = state.allProducts;
        state.displayedProducts = state.allProducts.slice(0, 15);
        state.totalPages = Math.ceil(state.allProducts.length / 15);
        return;
      }

      const getNestedValue = (obj, path) => {
        const keys = path.split(".");
        let value = obj;
        for (const key of keys) {
          value = value?.[key];
          if (value === undefined) return "";
        }
        return value;
      };

      state.filteredProducts = state.allProducts.filter((product) => {
        const fieldValue = getNestedValue(product, field);
        return fieldValue
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      });

      state.displayedProducts = state.filteredProducts.slice(0, 15);
      state.totalPages = Math.ceil(state.filteredProducts.length / 15);
    },
    clearProduct: (state) => {
      state.product = {};
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    resetFilter: (state) => {
      state.filteredProducts = state.allProducts;
      state.displayedProducts = state.allProducts.slice(0, 15);
      state.totalPages = Math.ceil(state.allProducts.length / 15);
    },
  },
});

export const {
  setLoading,
  setProducts,
  setCurrentPage,
  addProduct,
  deleteProduct,
  getProductById,
  updateProduct,
  sortProducts,
  filterProducts,
  clearProduct,
  setTotalPages,
  resetFilter,
} = productSlice.actions;

export default productSlice.reducer;
