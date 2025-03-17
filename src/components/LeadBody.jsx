import React, { useEffect, useState } from "react";
import useLead from "../hooks/useLead";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../assets/CloseIcon";

function LeadBody({ columns }) {
  const navigate = useNavigate();

  const { leads, handleSetLeads, handleDeleteLead } = useLead();
  useEffect(() => {
    handleSetLeads();
  }, []);
  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto px-2">
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
                    <div
                      onClick={() => handleDeleteLead(row._id)}
                      className="w-fit"
                    >
                      <CloseIcon
                        className={
                          "w-6 h-6 p-1 bg-gray-200 rounded-lg cursor-pointer"
                        }
                      />
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

export default LeadBody;
