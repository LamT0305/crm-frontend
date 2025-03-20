import React, { useEffect } from "react";
import CloseIcon from "../assets/CloseIcon";
import useDeal from "../hooks/useDeal";
import useActivity from "../hooks/useActivity";

function DealBody({ columns, setOpenDealForm, setDealId }) {
  const { deals, handleSetDeals, handleDeleteDeal } = useDeal();
  const { handleAddActivity } = useActivity();

  useEffect(() => {
    handleSetDeals();
  }, []);

  const onOpenForm = (id) => {
    setDealId(id);
    setOpenDealForm(true);
  };

  const getNestedValue = (obj, path) => {
    const keys = path.split(".");
    let value = obj;
    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) return "-";
    }
    return value;
  };

  const formatValue = (value, key) => {
    if (!value) return "-";

    if (key.includes("Price")) {
      return `$${Number(value).toFixed(2)}`;
    }
    if (key === "createdAt" || key === "updatedAt") {
      return new Date(value).toLocaleDateString();
    }
    return value;
  };

  const renderCellContent = (deal, key) => {
    const value = getNestedValue(deal, key);
    return formatValue(value, key);
  };

  const onDeleteDeal = (id, customerId) => {
    handleDeleteDeal(id);
    //activity
    const activity = {
      customerId: customerId,
      type: "deal",
      subject: "delete a deal",
    };
    handleAddActivity(activity);
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
            {deals?.map((deal) => (
              <tr
                key={deal._id}
                className="border-b cursor-pointer hover:bg-gray-200"
              >
                {columns.map((col) => (
                  <td
                    onClick={() => onOpenForm(deal._id)}
                    key={col.key}
                    className="px-3 py-4 border-b border-gray-300 w-max whitespace-nowrap text-center"
                  >
                    {renderCellContent(deal, col.key)}
                  </td>
                ))}
                <td className="px-3 py-4 border-b border-gray-300 w-max whitespace-nowrap text-center mx-auto">
                  <div className="flex justify-center">
                    <div
                      onClick={() =>
                        onDeleteDeal(deal._id, deal.customerId._id)
                      }
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

export default DealBody;
