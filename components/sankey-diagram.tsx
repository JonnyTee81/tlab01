"use client";

import React from "react";
import { ResponsiveContainer, Sankey, Tooltip } from "recharts";

// Mock data for Sankey diagram
// Format: { source: number, target: number, value: number }
// Nodes: 0-2: Income sources, 3-6: Expense groups, 7-12: Categories
const mockData = {
  nodes: [
    // Income sources (0-2)
    { name: "Salary" },
    { name: "Freelance" },
    { name: "Investments" },

    // Expense groups (3-7)
    { name: "Housing" },
    { name: "Transportation" },
    { name: "Food & Dining" },
    { name: "Entertainment" },
    { name: "Savings" },

    // Specific categories (8-15)
    { name: "Rent" },
    { name: "Utilities" },
    { name: "Gas & Auto" },
    { name: "Groceries" },
    { name: "Restaurants" },
    { name: "Streaming" },
    { name: "Emergency Fund" },
    { name: "Retirement" },
  ],
  links: [
    // Salary flows
    { source: 0, target: 3, value: 2800 }, // Salary -> Housing
    { source: 0, target: 4, value: 800 },  // Salary -> Transportation
    { source: 0, target: 5, value: 1200 }, // Salary -> Food
    { source: 0, target: 6, value: 400 },  // Salary -> Entertainment
    { source: 0, target: 7, value: 1250 }, // Salary -> Savings

    // Freelance flows
    { source: 1, target: 3, value: 500 },  // Freelance -> Housing
    { source: 1, target: 5, value: 300 },  // Freelance -> Food
    { source: 1, target: 7, value: 700 },  // Freelance -> Savings

    // Investment flows
    { source: 2, target: 7, value: 800 },  // Investments -> Savings
    { source: 2, target: 6, value: 150 },  // Investments -> Entertainment

    // Housing breakdown
    { source: 3, target: 8, value: 2500 },  // Housing -> Rent
    { source: 3, target: 9, value: 800 },   // Housing -> Utilities

    // Transportation breakdown
    { source: 4, target: 10, value: 800 },  // Transportation -> Gas & Auto

    // Food breakdown
    { source: 5, target: 11, value: 900 },  // Food -> Groceries
    { source: 5, target: 12, value: 600 },  // Food -> Restaurants

    // Entertainment breakdown
    { source: 6, target: 13, value: 550 },  // Entertainment -> Streaming

    // Savings breakdown
    { source: 7, target: 14, value: 1250 }, // Savings -> Emergency Fund
    { source: 7, target: 15, value: 1500 }, // Savings -> Retirement
  ],
};

const COLORS = [
  "var(--chart-1)", // Teal
  "var(--chart-2)", // Cyan
  "var(--chart-3)", // Blue
  "var(--chart-4)", // Purple
  "var(--chart-5)", // Pink
];

export function SankeyDiagram() {
  return (
    <div className="w-full h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <Sankey
          data={mockData}
          node={{
            fill: COLORS[0],
            stroke: "none",
          }}
          link={{
            stroke: COLORS[2],
            strokeOpacity: 0.2,
          }}
          nodePadding={50}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <Tooltip
            content={({ payload }) => {
              if (!payload || !payload.length) return null;

              const data = payload[0].payload;

              if (data.source !== undefined) {
                // This is a link
                return (
                  <div className="bg-card/95 backdrop-blur-sm border border-border/40 rounded-lg p-3 shadow-lg">
                    <p className="font-semibold text-sm mb-1">
                      {mockData.nodes[data.source].name} → {mockData.nodes[data.target].name}
                    </p>
                    <p className="text-primary font-bold">${data.value.toLocaleString()}</p>
                  </div>
                );
              } else if (data.name) {
                // This is a node
                const totalValue = data.value || 0;
                return (
                  <div className="bg-card/95 backdrop-blur-sm border border-border/40 rounded-lg p-3 shadow-lg">
                    <p className="font-semibold text-sm mb-1">{data.name}</p>
                    <p className="text-primary font-bold">${totalValue.toLocaleString()}</p>
                  </div>
                );
              }

              return null;
            }}
          />
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
}
