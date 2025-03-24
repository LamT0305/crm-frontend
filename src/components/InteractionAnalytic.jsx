import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

function InteractionAnalytic({ interactionAnalytics }) {
  const { typeDistribution, timeline } = interactionAnalytics;

  console.log(timeline);
  // Transform timeline data for stacked bar chart
  const transformedData = timeline?.map((item) => {
    const result = { date: item.date };
    item.interactions.forEach((interaction) => {
      result[interaction.type] = interaction.count;
    });
    return result;
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Interaction Type Distribution */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Interaction Type Distribution
        </h2>
        {typeDistribution?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeDistribution}
                dataKey="count"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {typeDistribution.map((entry, index) => (
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

      {/* Interaction Timeline */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Interaction Timeline</h2>
        {transformedData?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transformedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                label={{
                  value: "Number of Interactions",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="Meeting" stackId="a" fill="#0088FE" />
              <Bar dataKey="Call" stackId="a" fill="#00C49F" />
              <Bar dataKey="Follow-up-Sale" stackId="a" fill="#FFBB28" />
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

      {/* Summary Cards */}
      <div className="col-span-2">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Interactions</h3>
          <p className="text-3xl font-bold text-blue-600">
            {timeline?.[0]?.totalInteractions || 0}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InteractionAnalytic;
