import { useDispatch, useSelector } from "react-redux";
import { GET_API, POST_API, DELETE_API, PUT_API } from "../services/APIs";
import { getToken } from "../utils/auth";
import axiosInstance from "../services/Axios";
import {
  setLoading,
  setProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  filterProducts,
  sortProducts,
  clearProduct,
  setTotalPages,
  setCurrentPage,
  resetFilter,
} from "../redux/slice/productSlice";
import { notify } from "../utils/Toastify";

const useProduct = () => {
  const { displayedProducts, isLoading, product, totalPages, allProducts } =
    useSelector((state) => state.product);
  const dispatch = useDispatch();
  const token = getToken();

  const handleSetProducts = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API(0).products, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setProducts(res.data.data.products));
        const totalPages = Math.ceil(res.data.data.products.length / 15);
        dispatch(setTotalPages(totalPages));
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to fetch products");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleFilterProducts = (field, value) => {
    try {
      if (!field || !value) {
        dispatch(resetFilter());
        return;
      }
      dispatch(filterProducts({ field, value }));
    } catch (error) {
      console.error("Error in handleFilterProducts:", error);
      notify.error("Error filtering products");
    }
  };

  const handleSortProducts = (field, order) => {
    try {
      if (!field || !order) {
        return;
      }
      dispatch(sortProducts({ field, order }));
    } catch (error) {
      console.log(error);
      notify.error("Error sorting products");
    }
  };

  const handleAddNewProduct = async (product) => {
    try {
      if (!product) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.post(POST_API().product, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(addProduct(res.data.data));
        notify.success("Product added successfully");
        return true;
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 409) {
        notify.error("Product already exists");
      } else {
        notify.error("Failed to add product");
      }
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      if (!id) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.delete(DELETE_API(id).product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(deleteProduct(id));
        notify.success("Product deleted successfully");
        return true;
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to delete product");
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetProductById = async (id) => {
    try {
      if (!id) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_API(id).productById, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(getProductById(res.data.data));
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to fetch product details");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      if (!id || !productData) return;
      dispatch(setLoading(true));
      const res = await axiosInstance.put(PUT_API(id).product, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(updateProduct(res.data.data));
        notify.success("Product updated successfully");
        return true;
      }
    } catch (error) {
      console.log(error);
      notify.error("Failed to update product");
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleClearProduct = () => {
    dispatch(clearProduct());
  };

  return {
    isLoading,
    products: displayedProducts,
    allProducts,
    product,
    totalPages,
    handleSetProducts,
    handleFilterProducts,
    handleSortProducts,
    handleAddNewProduct,
    handleDeleteProduct,
    handleGetProductById,
    handleUpdateProduct,
    handleClearProduct,
    handleChangePage,
  };
};

export default useProduct;
