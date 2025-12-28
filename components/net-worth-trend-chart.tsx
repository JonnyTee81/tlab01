"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

// Generate mock net worth data for the past 12 months
function generateNetWorthData() {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  let baseValue = 150000;
  return months.map((month, index) => {
    // Add some realistic fluctuation
    const change = (Math.random() - 0.3) * 5000 + 3000; // Generally trending up
    baseValue += change;

    return {
      month,
      netWorth: Math.round(baseValue),
      assets: Math.round(baseValue * 1.2),
      liabilities: Math.round(baseValue * 0.2),
    };
  });
}

const data = generateNetWorthData();

export function NetWorthTrendChart() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
            </linearGradient>
          </defs>
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
                    <p className="text-xs">
                      <span className="text-muted-foreground">Net Worth: </span>
                      <span className="text-primary font-bold">
                        ${payload[0].payload.netWorth.toLocaleString()}
                      </span>
                    </p>
                    <p className="text-xs">
                      <span className="text-muted-foreground">Assets: </span>
                      <span className="font-semibold">
                        ${payload[0].payload.assets.toLocaleString()}
                      </span>
                    </p>
                    <p className="text-xs">
                      <span className="text-muted-foreground">Liabilities: </span>
                      <span className="font-semibold">
                        ${payload[0].payload.liabilities.toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
              );
            }}
          />
          <Area
            type="monotone"
            dataKey="netWorth"
            stroke="var(--chart-1)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorNetWorth)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
