"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { mockTransactions, calculateGroupTotals } from "@/lib/mock-data";

const COLORS = [
  "var(--chart-1)", // Teal
  "var(--chart-2)", // Cyan
  "var(--chart-3)", // Blue
  "var(--chart-4)", // Purple
  "var(--chart-5)", // Pink
];

export function SpendingBreakdownChart() {
  const expenseTransactions = mockTransactions.filter((t) => t.type === "expense");
  const groupTotals = calculateGroupTotals(expenseTransactions);

  const chartData = Object.entries(groupTotals)
    .map(([name, value]) => ({
      name,
      value: Math.round(value),
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="var(--chart-1)"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            content={({ payload }) => {
              if (!payload || !payload.length) return null;
              const data = payload[0];
              return (
                <div className="bg-card/95 backdrop-blur-sm border border-border/40 rounded-lg p-3 shadow-lg">
                  <p className="font-semibold text-sm mb-1">{data.name}</p>
                  <p className="text-primary font-bold">${data.value?.toLocaleString()}</p>
                </div>
              );
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
