import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../assets/CloseIcon";
import useProduct from "../hooks/useProduct";

function ProductBody({ columns, setOpenForm, setProductId }) {
  const navigate = useNavigate();
  const { products, handleSetProducts, handleDeleteProduct } = useProduct();

  useEffect(() => {
    handleSetProducts();
  }, []);

  const onOpenForm = (id) => {
    setProductId(id);
    setOpenForm(true);
  };
  return (
    <div>
      <div className="overflow-x-auto px-2">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-500 text-md font-thin">
              {columns.map((col) => (
                <th key={col.key} className="p-2 relative">
                  {col.value}
                </th>
              ))}
              <th className="p-2 relative">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className="border-b cursor-pointer hover:bg-gray-200"
              >
                {columns.map((col) => (
                  <td
                    onClick={() => onOpenForm(product._id)}
                    key={col.key}
                    className="px-3 py-4 border-b border-gray-300 w-max whitespace-nowrap text-center"
                  >
                    {col.key === "price"
                      ? `$${product[col.key]}`
                      : col.key === "createdAt" || col.key === "updatedAt"
                      ? new Date(product[col.key]).toLocaleDateString()
                      : product[col.key] || "-"}
                  </td>
                ))}
                <td className="px-3 py-4 border-b border-gray-300 w-max whitespace-nowrap text-center mx-auto">
                  <div className="flex justify-center">
                    <div
                      onClick={() => handleDeleteProduct(product._id)}
                      className="w-fit"
                    >
                      <CloseIcon className="w-6 h-6 p-1 bg-gray-200 rounded-lg cursor-pointer hover:bg-red-400 hover:text-white" />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductBody;
