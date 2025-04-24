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
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

function CustomerStatistic({ customerAnalytics }) {
  const {
    statusDistribution,
    industryDistribution,
    sourceDistribution,
    incomeDistribution,
  } = customerAnalytics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Customer Status Distribution */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Customer Status Distribution
        </h2>
        {statusDistribution.length !== 0 ? (
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
                {statusDistribution?.map((entry, index) => (
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

      {/* Industry Distribution */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Industry Distribution</h2>
        {industryDistribution.length !== 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={industryDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="industry" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
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

      {/* Source Distribution */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Customer Source Distribution
        </h2>
        {sourceDistribution.length !== 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sourceDistribution}
                dataKey="count"
                nameKey="source"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {sourceDistribution?.map((entry, index) => (
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

      {/* Income Distribution */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Monthly Income Distribution
        </h2>
        {incomeDistribution.length !== 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={incomeDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
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

export default CustomerStatistic;
