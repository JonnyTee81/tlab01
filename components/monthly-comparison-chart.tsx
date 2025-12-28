"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Generate mock monthly comparison data
function generateMonthlyData() {
  const months = ["Sep", "Oct", "Nov", "Dec"];

  return months.map((month) => ({
    month,
    income: Math.round(16000 + Math.random() * 4000),
    expenses: Math.round(12000 + Math.random() * 3000),
  }));
}

const data = generateMonthlyData();

export function MonthlyComparisonChart() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
          <XAxis
            dataKey="month"
            stroke="var(--muted-foreground)"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            stroke="var(--muted-foreground)"
            fontSize={12}
            tickLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload || !payload.length) return null;
              return (
                <div className="bg-card/95 backdrop-blur-sm border border-border/40 rounded-lg p-3 shadow-lg">
                  <p className="font-semibold text-sm mb-2">{payload[0].payload.month}</p>
                  <div className="space-y-1">
                    <p className="text-xs flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: "var(--chart-1)" }}
                      />
                      <span className="text-muted-foreground">Income: </span>
                      <span className="font-bold">${payload[0].value?.toLocaleString()}</span>
                    </p>
                    <p className="text-xs flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: "var(--chart-5)" }}
                      />
                      <span className="text-muted-foreground">Expenses: </span>
                      <span className="font-bold">${payload[1].value?.toLocaleString()}</span>
                    </p>
                    <p className="text-xs flex items-center gap-2 pt-1 border-t border-border/40">
                      <span className="text-muted-foreground">Net: </span>
                      <span className="font-bold text-primary">
                        $
                        {(
                          (payload[0].value || 0) - (payload[1].value || 0)
                        ).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
              );
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "12px" }}
            iconType="rect"
            formatter={(value) => (
              <span className="text-muted-foreground">{value}</span>
            )}
          />
          <Bar dataKey="income" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" fill="var(--chart-5)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
