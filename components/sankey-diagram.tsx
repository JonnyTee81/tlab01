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

// Clean color scheme for better readability
// Each unique node gets its own distinct color
const NODE_COLORS: Record<string, string> = {};
const DISTINCT_COLORS = [
  "#14b8a6", // Teal
  "#3b82f6", // Blue
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#f59e0b", // Amber
  "#10b981", // Emerald
  "#06b6d4", // Cyan
  "#6366f1", // Indigo
];

function getNodeColor(nodeName: string, index: number): string {
  if (!NODE_COLORS[nodeName]) {
    NODE_COLORS[nodeName] = DISTINCT_COLORS[index % DISTINCT_COLORS.length];
  }
  return NODE_COLORS[nodeName];
}

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

  // Assign colors to all nodes first
  let nodeIndex = 0;
  incomeSources.forEach(source => getNodeColor(source, nodeIndex++));
  expenseGroups.forEach(group => getNodeColor(group, nodeIndex++));
  topCategories.forEach(category => getNodeColor(category, nodeIndex++));

  // Build data array for Chart.js Sankey
  const data: any[] = [];

  // Income -> Expense Groups
  incomeSources.forEach((source) => {
    const sourceIncome = incomeTransactions
      .filter((t) => t.category === source)
      .reduce((sum, t) => sum + t.amount, 0);

    expenseGroups.forEach((group) => {
      const groupTotal = groupTotals[group] || 0;
      const proportionalAmount = (sourceIncome / totalIncome) * groupTotal;

      if (proportionalAmount > 10) {
        // Use source node color for the flow
        const color = getNodeColor(source, 0);
        data.push({
          from: source,
          to: group,
          flow: Math.round(proportionalAmount),
          color: color,
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
      // Use group node color for the flow
      const color = getNodeColor(group, 0);

      data.push({
        from: group,
        to: category,
        flow: Math.round(categoryTotal),
        color: color,
      });
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
        colorFrom: (c: any) => c.raw.color,
        colorTo: (c: any) => c.raw.color,
        colorMode: "gradient" as const,
        size: "max" as const,
        borderWidth: 0,
        nodeWidth: 30,
        padding: 16,
        opacity: 0.6,
        labels: {
          font: {
            size: 14,
            family: "'Inter', sans-serif",
            weight: 'bold' as const,
          },
          color: '#ffffff',
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        padding: 14,
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
        },
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
    // Force white color for node labels
    color: '#ffffff',
  };

  return (
    <div className="w-full h-125">
      <Chart ref={chartRef} type="sankey" data={data} options={options} />
    </div>
  );
}
