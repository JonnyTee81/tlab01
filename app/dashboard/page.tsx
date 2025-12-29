import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  PieChart,
  Settings,
  Bell,
  Search,
} from "lucide-react";
import { SankeyDiagram } from "@/components/sankey-diagram";
import { MetricCard } from "@/components/metric-card";
import { mockTransactions, getIncomeExpenseSummary, mockAccounts } from "@/lib/mock-data";
import { NetWorthTrendChart } from "@/components/net-worth-trend-chart";
import { SpendingBreakdownChart } from "@/components/spending-breakdown-chart";
import { MonthlyComparisonChart } from "@/components/monthly-comparison-chart";

export default function DashboardPage() {
  const summary = getIncomeExpenseSummary(mockTransactions);
  const savingsRate = ((summary.netSavings / summary.totalIncome) * 100).toFixed(1);

  // Generate sparkline data for last 12 months (mock data)
  const incomeSparkline = [14800, 15200, 16800, 15900, 17200, 16500, 16200, 17500, 17800, 18000, 17900, 18185];
  const expenseSparkline = [8900, 9200, 9800, 9500, 10200, 9800, 9600, 10100, 10300, 10500, 10200, 10060];
  const savingsSparkline = [5900, 6000, 7000, 6400, 7000, 6700, 6600, 7400, 7500, 7500, 7700, 8125];
  const savingsRateSparkline = [39.9, 39.5, 41.7, 40.3, 40.7, 40.6, 40.7, 42.3, 42.1, 41.7, 43.0, 44.7];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#151F42' }}>
      {/* Top Navigation */}
      <nav className="border-b border-border/40 sticky top-0 z-50" style={{ backgroundColor: '#232A57' }}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg" style={{ background: 'linear-gradient(to bottom right, #14b8a6, #06b6d4, #8b5cf6)' }} />
              <span className="text-xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #14b8a6, #06b6d4)' }}>
                Finance Flow
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative hover:bg-white/10">
              <Search className="h-4 w-4 text-gray-300" />
            </Button>
            <Button variant="ghost" size="icon" className="relative hover:bg-white/10">
              <Bell className="h-4 w-4 text-gray-300" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-chart-5 rounded-full" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-accent" />
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 border-r border-border/40 min-h-[calc(100vh-57px)]" style={{ backgroundColor: '#232A57' }}>
          <div className="p-4 space-y-2">
            <NavItem icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" active />
            <NavItem icon={<TrendingUp className="h-5 w-5" />} label="Cash Flow" />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-400 mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your financial overview</p>
          </div>

          {/* Metric Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Total Income"
              value={`$${summary.totalIncome.toLocaleString()}`}
              change="+12.5%"
              trend="up"
              icon={<TrendingUp className="h-4 w-4" />}
              sparklineData={incomeSparkline}
            />
            <MetricCard
              title="Total Expenses"
              value={`$${summary.totalExpenses.toLocaleString()}`}
              change="+8.2%"
              trend="up"
              icon={<Wallet className="h-4 w-4" />}
              sparklineData={expenseSparkline}
            />
            <MetricCard
              title="Net Savings"
              value={`$${summary.netSavings.toLocaleString()}`}
              change="+24.3%"
              trend="up"
              icon={<TrendingUp className="h-4 w-4" />}
              sparklineData={savingsSparkline}
            />
            <MetricCard
              title="Savings Rate"
              value={`${savingsRate}%`}
              change="+5.2%"
              trend="up"
              icon={<TrendingUp className="h-4 w-4" />}
              sparklineData={savingsRateSparkline}
            />
          </div>

          {/* Cash Flow Sankey Section */}
          <Card className="p-6 mb-6 border-border/40" style={{ backgroundColor: '#323F76' }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-1 text-white">Cash Flow</h2>
                <p className="text-sm text-gray-400">
                  Income sources flowing through expense categories
                </p>
              </div>
              <Select defaultValue="current-month">
                <SelectTrigger className="w-50 bg-[#232A57] border-gray-600 text-white">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent className="bg-[#232A57] border-gray-600">
                  <SelectItem value="current-month" className="text-white hover:bg-[#323F76]">Current Month</SelectItem>
                  <SelectItem value="last-month" className="text-white hover:bg-[#323F76]">Last Month</SelectItem>
                  <SelectItem value="last-30-days" className="text-white hover:bg-[#323F76]">Last 30 Days</SelectItem>
                  <SelectItem value="custom" className="text-white hover:bg-[#323F76]">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <SankeyDiagram />
          </Card>

          {/* Additional Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="p-6 border-border/40" style={{ backgroundColor: '#323F76' }}>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-1 text-white">Net Worth Trend</h3>
                <p className="text-sm text-gray-400">Your net worth over the past year</p>
              </div>
              <NetWorthTrendChart />
            </Card>

            <Card className="p-6 border-border/40" style={{ backgroundColor: '#323F76' }}>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-1 text-white">Spending Breakdown</h3>
                <p className="text-sm text-gray-400">
                  Expenses by category this month
                </p>
              </div>
              <SpendingBreakdownChart />
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 border-border/40 lg:col-span-2" style={{ backgroundColor: '#323F76' }}>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-1 text-white">Monthly Comparison</h3>
                <p className="text-sm text-gray-400">
                  Income vs expenses over recent months
                </p>
              </div>
              <MonthlyComparisonChart />
            </Card>

            <Card className="p-6 border-border/40" style={{ backgroundColor: '#323F76' }}>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-1 text-white">Account Summary</h3>
                <p className="text-sm text-gray-400">All your accounts</p>
              </div>
              <div className="space-y-4">
                {mockAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-linear-to-br from-primary/5 to-accent/5 border border-border/20"
                  >
                    <div>
                      <p className="font-semibold text-sm">{account.name}</p>
                      <p className="text-xs text-muted-foreground">{account.institution}</p>
                    </div>
                    <p className={`font-bold text-sm ${account.balance >= 0 ? "text-primary" : "text-chart-5"}`}>
                      ${Math.abs(account.balance).toLocaleString()}
                    </p>
                  </div>
                ))}
                <div className="pt-4 border-t border-border/40">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Total Net Worth</p>
                    <p className="text-lg font-bold text-primary">
                      $
                      {mockAccounts
                        .reduce((sum, acc) => sum + acc.balance, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active }: NavItemProps) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
        active
          ? "bg-primary/10 text-primary border border-primary/20"
          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
      }`}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}
