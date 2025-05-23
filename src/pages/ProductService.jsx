import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import CreateProductForm from "../components/form/CreateProductForm";
import useProduct from "../hooks/useProduct";
import useWorkspace from "../hooks/useWorkspace";
import { useNavigate } from "react-router-dom";
import ProductBody from "../components/product/ProductBody";

function ProductService() {
  const { currentWorkspace, isLoading: workspaceLoading } = useWorkspace();
  const navigate = useNavigate();

  const {
    handleFilterProducts,
    handleSortProducts,
    handleSetProducts,
    isLoading,
  } = useProduct();
  const [productId, setProductId] = useState(null);
  const [hasCheckedWorkspace, setHasCheckedWorkspace] = useState(true);

  useEffect(() => {
    if (workspaceLoading && hasCheckedWorkspace) {
      if (!currentWorkspace) {
        navigate("/welcome");
      }
      setHasCheckedWorkspace(false);
    }
  }, [currentWorkspace, workspaceLoading]);

  const STORAGE_KEY = "selectedColumnsProductService";
  const defaultColumns = [
    { key: "name", value: "Product Name" },
    { key: "price", value: "Price" },
    { key: "category.name", value: "Category" },
    { key: "unit", value: "Unit" },
    { key: "stock", value: "Stock" },
    { key: "status", value: "Status" },
  ];

  const getStoredColumns = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultColumns;
  };

  const [columns, setColumns] = useState(getStoredColumns);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const addColumn = (key, value) => {
    if (!columns.some((col) => col.key === key)) {
      const newColumns = [...columns, { key, value }];
      newColumns.sort(
        (a, b) =>
          defaultColumns.findIndex((col) => col.key === a.key) -
          defaultColumns.findIndex((col) => col.key === b.key)
      );
      setColumns(newColumns);
    }
  };

  const removeColumn = (key) => {
    setColumns(columns.filter((col) => col.key !== key));
  };

  // open form
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  useEffect(() => {
    const initializeData = async () => {
      await handleSetProducts();
      setIsInitialLoad(false);
    };
    initializeData();
  }, []);
  if (isLoading && isInitialLoad) {
    return (
      <div className="flex items-center justify-center h-screen w-[80%]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="w-[80%] bg-white flex flex-col h-full">
      {/* form */}
      {isOpenForm && (
        <CreateProductForm
          setIsOpen={setIsOpenForm}
          productId={productId}
          setProductId={setProductId}
        />
      )}

      {/* // header */}
      <div className="flex items-center justify-between border-b border-gray-300 shadow-sm bg-white px-5 py-3">
        <p className="text-lg font-bold">Product Service</p>
        <p
          onClick={() => setIsOpenForm(true)}
          className="py-1 px-2 bg-black text-white w-fit rounded-lg cursor-pointer hover:bg-gray-100 hover:text-black"
        >
          Create product
        </p>
      </div>
      {/* // filter */}
      <Filter
        addColumn={addColumn}
        removeColumn={removeColumn}
        columns={columns}
        defaultColumns={defaultColumns}
        handleFilter={handleFilterProducts}
        handleSort={handleSortProducts}
        handleSetDefaultData={handleSetProducts}
      />
      {/* // body */}
      <ProductBody
        columns={columns}
        setOpenForm={setIsOpenForm}
        setProductId={setProductId}
      />
    </div>
  );
}

export default ProductService;
