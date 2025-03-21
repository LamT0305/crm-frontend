import React, { useEffect } from "react";
import useCustomer from "../hooks/useCustomer";
import { useNavigate } from "react-router-dom";

function CustomerBody({ columns }) {
  const navigate = useNavigate();
  const { customers, handleSetCustomers, handleDeleteCustomer } = useCustomer();

  useEffect(() => {
    handleSetCustomers();
  }, []);

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
            </tr>
          </thead>
          <tbody>
            {customers.map((row, index) => (
              <tr
                key={index}
                className="border-b cursor-pointer hover:bg-gray-200"
              >
                {columns.map((col) => (
                  <td
                    onClick={() => navigate(`/customerinfo/${row._id}`)}
                    key={col.key}
                    className="px-3 py-4 border-b border-gray-300 w-max whitespace-nowrap text-center"
                  >
                    {col.key.includes(".")
                      ? col.key
                          .split(".")
                          .reduce((acc, key) => acc?.[key], row) || "-"
                      : row[col.key] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerBody;
