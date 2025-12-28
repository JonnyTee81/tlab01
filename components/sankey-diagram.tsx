"use client";

import React from "react";
import { ResponsiveContainer, Sankey, Tooltip } from "recharts";
import {
  mockTransactions,
  calculateCategoryTotals,
  calculateGroupTotals,
} from "@/lib/mock-data";

// Generate Sankey data from transactions
function generateSankeyData() {
  const incomeTransactions = mockTransactions.filter((t) => t.type === "income");
  const expenseTransactions = mockTransactions.filter((t) => t.type === "expense");

  const categoryTotals = calculateCategoryTotals(expenseTransactions);
  const groupTotals = calculateGroupTotals(expenseTransactions);

  // Build nodes array
  const nodes: { name: string }[] = [];
  const nodeIndexMap: Record<string, number> = {};

  // Add income sources
  const incomeSources = [...new Set(incomeTransactions.map((t) => t.category))];
  incomeSources.forEach((source) => {
    nodeIndexMap[source] = nodes.length;
    nodes.push({ name: source });
  });

  // Add expense groups
  const expenseGroups = [...new Set(expenseTransactions.map((t) => t.categoryGroup))];
  expenseGroups.forEach((group) => {
    nodeIndexMap[group] = nodes.length;
    nodes.push({ name: group });
  });

  // Add top expense categories (top 10 by amount)
  const topCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([cat]) => cat);

  topCategories.forEach((category) => {
    nodeIndexMap[category] = nodes.length;
    nodes.push({ name: category });
  });

  // Build links array
  const links: { source: number; target: number; value: number }[] = [];

  // Income -> Expense Groups (distribute proportionally)
  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);

  incomeSources.forEach((source) => {
    const sourceIncome = incomeTransactions
      .filter((t) => t.category === source)
      .reduce((sum, t) => sum + t.amount, 0);

    expenseGroups.forEach((group) => {
      const groupTotal = groupTotals[group] || 0;
      const proportionalAmount = (sourceIncome / totalIncome) * groupTotal;

      if (proportionalAmount > 0) {
        links.push({
          source: nodeIndexMap[source],
          target: nodeIndexMap[group],
          value: Math.round(proportionalAmount),
        });
      }
    });
  });

  // Expense Groups -> Top Categories
  topCategories.forEach((category) => {
    const transaction = expenseTransactions.find((t) => t.category === category);
    if (transaction) {
      const group = transaction.categoryGroup;
      const categoryTotal = categoryTotals[category];

      links.push({
        source: nodeIndexMap[group],
        target: nodeIndexMap[category],
        value: Math.round(categoryTotal),
      });
    }
  });

  return { nodes, links };
}

const sankeyData = generateSankeyData();

// Vibrant gradient colors for each link
const LINK_COLORS = [
  "#14b8a6", // Teal
  "#06b6d4", // Cyan
  "#3b82f6", // Blue
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#f59e0b", // Amber
  "#10b981", // Emerald
  "#6366f1", // Indigo
];

// Node colors with gradients
const NODE_COLORS = [
  "#0d9488", // Darker teal for income nodes
  "#0891b2", // Darker cyan
  "#2563eb", // Darker blue
  "#7c3aed", // Darker purple
  "#db2777", // Darker pink
];

export function SankeyDiagram() {
  return (
    <div className="w-full h-125">
      <ResponsiveContainer width="100%" height="100%">
        <Sankey
          data={sankeyData}
          node={(props: any) => {
            const { x, y, width, height, index, payload } = props;
            const colorIndex = index % NODE_COLORS.length;

            return (
              <g>
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={NODE_COLORS[colorIndex]}
                  rx={4}
                />
                <text
                  x={x + width + 6}
                  y={y + height / 2}
                  textAnchor="start"
                  fill="currentColor"
                  fontSize={14}
                  fontWeight={500}
                  dominantBaseline="middle"
                >
                  {payload.name}
                </text>
              </g>
            );
          }}
          link={(props: any) => {
            const { sourceX, sourceY, targetX, targetY, sourceControlX, targetControlX, linkWidth, index } = props;
            const colorIndex = index % LINK_COLORS.length;

            return (
              <g>
                <defs>
                  <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={LINK_COLORS[colorIndex]} stopOpacity={0.6} />
                    <stop offset="100%" stopColor={LINK_COLORS[(colorIndex + 1) % LINK_COLORS.length]} stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <path
                  d={`
                    M${sourceX},${sourceY}
                    C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}
                  `}
                  fill="none"
                  stroke={`url(#gradient-${index})`}
                  strokeWidth={linkWidth}
                  strokeOpacity={0.8}
                  style={{ transition: "all 0.3s ease" }}
                  className="hover:stroke-opacity-100"
                />
              </g>
            );
          }}
          nodePadding={30}
          margin={{ top: 20, right: 150, bottom: 20, left: 20 }}
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
                      {sankeyData.nodes[data.source].name} → {sankeyData.nodes[data.target].name}
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
