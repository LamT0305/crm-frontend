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
} from "../redux/slice/productSlice";

const useProduct = () => {
  const { filteredProducts, isLoading, product } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  const token = getToken();

  const handleSetProducts = async () => {
    try {
      const res = await axiosInstance.get(GET_API().getAllproducts, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setProducts(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterProducts = async (field, value) => {
    try {
      if (!field || value === undefined) {
        return;
      }
      dispatch(filterProducts({ field, value }));
    } catch (error) {
      console.error("Error in handleFilterProducts:", error);
    }
  };

  const handleSortProducts = async (field, order) => {
    try {
      if (!field || order === undefined) {
        return;
      }
      dispatch(sortProducts({ field, order }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNewProduct = async (product) => {
    try {
      if (!product) return;

      const res = await axiosInstance.post(POST_API().createProduct, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(addProduct(res.data.data));
      }
    } catch (error) {
      console.log(error);
      if (error.status === 409) {
        alert("Product has already existed!");
      }
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      if (!id) return;

      const res = await axiosInstance.delete(DELETE_API(id).deleteProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(deleteProduct(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetProductById = async (id) => {
    try {
      if (!id) return;

      const res = await axiosInstance.get(GET_API(id).getProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(getProductById(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      if (!id || !productData) return;

      const res = await axiosInstance.put(
        PUT_API(id).updateProduct,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        dispatch(updateProduct(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearProduct = () => {
    dispatch(clearProduct());
  };

  return {
    isLoading,
    products: filteredProducts,
    product,
    handleSetProducts,
    handleFilterProducts,
    handleSortProducts,
    handleAddNewProduct,
    handleDeleteProduct,
    handleGetProductById,
    handleUpdateProduct,
    handleClearProduct,
  };
};

export default useProduct;
