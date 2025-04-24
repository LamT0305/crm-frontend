import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts";

function SaleAnalytic({ salesAnalytics }) {
  const { quotationAnalysis, discountAnalysis } = salesAnalytics;

  console.log(discountAnalysis);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Quotation Analysis */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Quotation Analysis</h2>
        {quotationAnalysis?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={quotationAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                yAxisId="left"
                orientation="left"
                label={{
                  value: "Number of Quotations",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{
                  value: "Discount Rate (%)",
                  angle: 90,
                  position: "insideRight",
                }}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "Total Quotations") return [value, "Total"];
                  if (name === "With Discount") return [value, "Discounted"];
                  return [`${value.toFixed(2)}%`, name];
                }}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="totalQuotations"
                fill="#8884d8"
                name="Total Quotations"
              />
              <Bar
                yAxisId="left"
                dataKey="quotationsWithDiscount"
                fill="#82ca9d"
                name="With Discount"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="discountRate"
                stroke="#ff7675"
                name="Discount Rate"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px]">
            <p className="text-xl font-semibold">No data available</p>
          </div>
        )}
      </div>

      {/* Value Analysis */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Value Analysis</h2>
        {quotationAnalysis?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={quotationAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                yAxisId="left"
                orientation="left"
                label={{
                  value: "Value ($)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{
                  value: "Value Reduction (%)",
                  angle: 90,
                  position: "insideRight",
                }}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name.includes("Value")) return [`$${value}`, name];
                  return [`${value}%`, name];
                }}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="totalOriginalValue"
                fill="#8884d8"
                name="Original Value"
              />
              <Bar
                yAxisId="left"
                dataKey="totalFinalValue"
                fill="#82ca9d"
                name="Final Value"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="valueReduction"
                stroke="#ff7675"
                name="Value Reduction"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px]">
            <p className="text-xl font-semibold">No data available</p>
          </div>
        )}
      </div>

      {/* Discount Impact Analysis */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Discount Impact Analysis</h2>
        {discountAnalysis?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="discountPercentage"
                name="Discount"
                unit="%"
                domain={[0, 20]}
                label={{
                  value: "Discount Percentage",
                  position: "bottom",
                  offset: 25,
                  dx: -25,
                }}
              />
              <YAxis
                type="number"
                dataKey="value"
                name="Deal Value"
                unit="$"
                label={{
                  value: "Deal Value",
                  angle: -90,
                  position: "insideLeft",
                  offset: -10,
                }}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "Deal Value")
                    return [`$${value.toFixed(2)}`, name];
                  return [`${value}%`, "Discount"];
                }}
              />
              <Legend />
              <Scatter
                name="Deals"
                data={discountAnalysis[0]?.deals || []}
                fill="#8884d8"
              />
            </ScatterChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px]">
            <p className="text-xl font-semibold">No data available</p>
          </div>
        )}
      </div>

      {/* Discount Statistics */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Discount Statistics</h2>
        {discountAnalysis?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[discountAnalysis[0]?.statistics]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                label={{
                  value: "Percentage (%)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip formatter={(value) => [`${value}%`, "Value"]} />
              <Legend />
              <Bar dataKey="minDiscount" fill="#82ca9d" name="Min Discount" />
              <Bar dataKey="avgDiscount" fill="#8884d8" name="Avg Discount" />
              <Bar dataKey="maxDiscount" fill="#ff7675" name="Max Discount" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px]">
            <p className="text-xl font-semibold">No data available</p>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="col-span-2 grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Deals</h3>
          <p className="text-3xl font-bold text-blue-600">
            {discountAnalysis?.[0]?.deals?.length || 0}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Average Discount</h3>
          <p className="text-3xl font-bold text-green-600">
            {discountAnalysis?.[0]?.statistics?.avgDiscount?.toFixed(1) || 0}%
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Max Discount</h3>
          <p className="text-3xl font-bold text-red-600">
            {discountAnalysis?.[0]?.statistics?.maxDiscount?.toFixed(1) || 0}%
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Discount Amount</h3>
          <p className="text-3xl font-bold text-purple-600">
            $
            {discountAnalysis?.[0]?.statistics?.totalDiscountAmount?.toFixed(
              2
            ) || 0}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SaleAnalytic;
