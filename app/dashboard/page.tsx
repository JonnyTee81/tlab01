import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
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
import { PlaceholderCard } from "@/components/placeholder-card";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/95">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-linear-to-br from-primary via-accent to-chart-4 rounded-lg" />
              <span className="text-xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                Finance Flow
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-chart-5 rounded-full" />
            </Button>
            <ThemeToggle />
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-accent" />
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 border-r border-border/40 min-h-[calc(100vh-57px)] bg-card/20">
          <div className="p-4 space-y-2">
            <NavItem icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" active />
            <NavItem icon={<TrendingUp className="h-5 w-5" />} label="Analytics" />
            <NavItem icon={<Wallet className="h-5 w-5" />} label="Accounts" />
            <NavItem icon={<PieChart className="h-5 w-5" />} label="Budget" />
            <NavItem icon={<Settings className="h-5 w-5" />} label="Settings" />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your financial overview</p>
          </div>

          {/* Metric Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Total Income"
              value="$8,450"
              change="+12.5%"
              trend="up"
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <MetricCard
              title="Total Expenses"
              value="$6,230"
              change="+8.2%"
              trend="up"
              icon={<Wallet className="h-4 w-4" />}
            />
            <MetricCard
              title="Net Savings"
              value="$2,220"
              change="+24.3%"
              trend="up"
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <MetricCard
              title="Monthly Budget"
              value="$7,500"
              change="83% used"
              trend="neutral"
              icon={<PieChart className="h-4 w-4" />}
            />
          </div>

          {/* Cash Flow Sankey Section */}
          <Card className="p-6 mb-6 bg-card/30 backdrop-blur-sm border-border/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Cash Flow</h2>
                <p className="text-sm text-muted-foreground">
                  Income sources flowing through expense categories
                </p>
              </div>
              <Select defaultValue="current-month">
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-month">Current Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <SankeyDiagram />
          </Card>

          {/* Additional Feature Placeholders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <PlaceholderCard
              title="Net Worth Trend"
              description="Track your net worth over time"
              icon={<TrendingUp className="h-6 w-6" />}
            />
            <PlaceholderCard
              title="Spending Breakdown"
              description="See how you spend across categories"
              icon={<PieChart className="h-6 w-6" />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <PlaceholderCard
              title="Monthly Comparison"
              description="Compare spending month over month"
              icon={<TrendingUp className="h-6 w-6" />}
            />
            <PlaceholderCard
              title="Account Summary"
              description="All your accounts at a glance"
              icon={<Wallet className="h-6 w-6" />}
            />
            <PlaceholderCard
              title="Budget Progress"
              description="How you're tracking against budgets"
              icon={<PieChart className="h-6 w-6" />}
            />
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
