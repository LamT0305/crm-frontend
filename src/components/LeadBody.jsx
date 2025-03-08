import React, { useEffect, useState } from "react";
import useLead from "../hooks/useLead";
import close from "../assets/closeBtn.png";
import { useNavigate } from "react-router-dom";

function LeadBody({ columns }) {
  const navigate = useNavigate();

  const { leads, handleSetLeads, handleDeleteLead } = useLead();
  console.log(leads);
  useEffect(() => {
    handleSetLeads();
  }, []);
  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto px-5">
        <table className="table-auto border-collapse w-full  ">
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
            {leads.map((row, index) => (
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
                    {/* Check if key contains a dot (nested property) */}
                    {col.key.includes(".")
                      ? col.key
                          .split(".")
                          .reduce((acc, key) => acc?.[key], row) || "-"
                      : row[col.key] || "-"}
                  </td>
                ))}
                <td className="px-3 py-4 border-b border-gray-300 w-max whitespace-nowrap text-center mx-auto">
                  <div className="flex justify-center">
                    <img
                      onClick={() => handleDeleteLead(row._id)}
                      src={close}
                      alt=""
                      style={{ width: 25, height: 25 }}
                      className="bg-gray-300 p-1 rounded-md"
                    />
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

export default LeadBody;
