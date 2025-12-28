"use client";

import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { SankeyController, Flow } from "chartjs-chart-sankey";
import {
  mockTransactions,
  calculateCategoryTotals,
  calculateGroupTotals,
} from "@/lib/mock-data";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, SankeyController, Flow);

// Vibrant colors for flows
const FLOW_COLORS = [
  { from: "#14b8a6", to: "#06b6d4" }, // Teal to Cyan
  { from: "#06b6d4", to: "#3b82f6" }, // Cyan to Blue
  { from: "#3b82f6", to: "#8b5cf6" }, // Blue to Purple
  { from: "#8b5cf6", to: "#ec4899" }, // Purple to Pink
  { from: "#ec4899", to: "#f59e0b" }, // Pink to Amber
  { from: "#f59e0b", to: "#10b981" }, // Amber to Emerald
  { from: "#10b981", to: "#6366f1" }, // Emerald to Indigo
  { from: "#6366f1", to: "#14b8a6" }, // Indigo to Teal
];

// Generate Sankey data from transactions
function generateChartJsSankeyData() {
  const incomeTransactions = mockTransactions.filter((t) => t.type === "income");
  const expenseTransactions = mockTransactions.filter((t) => t.type === "expense");

  const categoryTotals = calculateCategoryTotals(expenseTransactions);
  const groupTotals = calculateGroupTotals(expenseTransactions);

  const incomeSources = [...new Set(incomeTransactions.map((t) => t.category))];
  const expenseGroups = [...new Set(expenseTransactions.map((t) => t.categoryGroup))];
  const topCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([cat]) => cat);

  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);

  // Build data array for Chart.js Sankey
  const data: any[] = [];
  let colorIndex = 0;

  // Income -> Expense Groups
  incomeSources.forEach((source) => {
    const sourceIncome = incomeTransactions
      .filter((t) => t.category === source)
      .reduce((sum, t) => sum + t.amount, 0);

    expenseGroups.forEach((group) => {
      const groupTotal = groupTotals[group] || 0;
      const proportionalAmount = (sourceIncome / totalIncome) * groupTotal;

      if (proportionalAmount > 10) {
        // Only show flows > $10
        const colors = FLOW_COLORS[colorIndex % FLOW_COLORS.length];
        data.push({
          from: source,
          to: group,
          flow: Math.round(proportionalAmount),
          color: colors,
        });
        colorIndex++;
      }
    });
  });

  // Expense Groups -> Top Categories
  topCategories.forEach((category) => {
    const transaction = expenseTransactions.find((t) => t.category === category);
    if (transaction) {
      const group = transaction.categoryGroup;
      const categoryTotal = categoryTotals[category];
      const colors = FLOW_COLORS[colorIndex % FLOW_COLORS.length];

      data.push({
        from: group,
        to: category,
        flow: Math.round(categoryTotal),
        color: colors,
      });
      colorIndex++;
    }
  });

  return data;
}

export function SankeyDiagram() {
  const chartRef = useRef<ChartJS>(null);
  const sankeyData = generateChartJsSankeyData();

  const data = {
    datasets: [
      {
        label: "Cash Flow",
        data: sankeyData,
        colorFrom: (c: any) => c.raw.color.from,
        colorTo: (c: any) => c.raw.color.to,
        colorMode: "gradient" as const,
        size: "max" as const,
        borderWidth: 0,
        nodeWidth: 20,
        padding: 16,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        callbacks: {
          title: (context: any) => {
            const dataPoint = context[0].raw;
            return `${dataPoint.from} → ${dataPoint.to}`;
          },
          label: (context: any) => {
            const value = context.raw.flow;
            return `Amount: $${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-125">
      <Chart ref={chartRef} type="sankey" data={data} options={options} />
    </div>
  );
}
