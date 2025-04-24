import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

function DealAnalytic({ dealAnalytics }) {
  const { statusDistribution, valueAnalysis, productPerformance } =
    dealAnalytics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Deal Status Distribution */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Deal Status Distribution</h2>
        {statusDistribution?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusDistribution}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {statusDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px]">
            <p className="text-xl font-semibold">
              No data available for this time
            </p>
          </div>
        )}
      </div>

      {/* Deal Value Analysis */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Deal Value Analysis</h2>
        {valueAnalysis?.length > 0 ? (
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={valueAnalysis}>
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
                    value: "Number of Deals",
                    angle: 90,
                    position: "insideRight",
                  }}
                />
                <Tooltip
                  formatter={(value, name) => [
                    `${value.toLocaleString()}`,
                    name === "Number of Deals" ? "Deals" : "$Value",
                  ]}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="totalValue"
                  fill="#8884d8"
                  name="Total Value"
                />
                <Bar
                  yAxisId="left"
                  dataKey="averageValue"
                  fill="#82ca9d"
                  name="Average Value"
                />
                <Bar
                  yAxisId="right"
                  dataKey="count"
                  fill="#0088FE"
                  name="Number of Deals"
                />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-xl font-semibold">
                  ${valueAnalysis[0].totalValue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Average Value</p>
                <p className="text-xl font-semibold">
                  ${valueAnalysis[0].averageValue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Total Deals</p>
                <p className="text-xl font-semibold">
                  {valueAnalysis[0].count}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px]">
            <p className="text-xl font-semibold">
              No data available for this time
            </p>
          </div>
        )}
      </div>

      {/* Product Performance */}
      <div className="bg-white p-4 rounded-lg shadow col-span-2">
        <h2 className="text-xl font-semibold mb-4">Product Performance</h2>
        {productPerformance?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="productName" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="totalQuantity"
                fill="#8884d8"
                name="Quantity Sold"
              />
              <Bar
                yAxisId="right"
                dataKey="totalValue"
                fill="#82ca9d"
                name="Total Value"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px]">
            <p className="text-xl font-semibold">
              No data available for this time
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DealAnalytic;
