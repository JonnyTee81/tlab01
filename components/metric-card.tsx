import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
}

export function MetricCard({ title, value, change, trend, icon }: MetricCardProps) {
  const TrendIcon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus;
  const trendColor =
    trend === "up"
      ? "text-green-400"
      : trend === "down"
      ? "text-red-400"
      : "text-gray-400";

  // Neon color schemes for each card type
  const getCardStyle = () => {
    if (title.includes("Income")) {
      return {
        gradient: "from-green-400/20 via-emerald-400/20 to-teal-400/20",
        borderColor: "#10b981",
        glowColor: "0 0 20px rgba(16, 185, 129, 0.3)",
        iconBg: "bg-green-500/30",
        iconColor: "text-green-400",
        accentColor: "#10b981",
      };
    }
    if (title.includes("Expenses")) {
      return {
        gradient: "from-red-400/20 via-rose-400/20 to-pink-400/20",
        borderColor: "#ef4444",
        glowColor: "0 0 20px rgba(239, 68, 68, 0.3)",
        iconBg: "bg-red-500/30",
        iconColor: "text-red-400",
        accentColor: "#ef4444",
      };
    }
    if (title.includes("Net Savings")) {
      return {
        gradient: "from-purple-400/20 via-violet-400/20 to-fuchsia-400/20",
        borderColor: "#a855f7",
        glowColor: "0 0 20px rgba(168, 85, 247, 0.3)",
        iconBg: "bg-purple-500/30",
        iconColor: "text-purple-400",
        accentColor: "#a855f7",
      };
    }
    if (title.includes("Savings Rate")) {
      return {
        gradient: "from-amber-400/20 via-orange-400/20 to-yellow-400/20",
        borderColor: "#f59e0b",
        glowColor: "0 0 20px rgba(245, 158, 11, 0.3)",
        iconBg: "bg-amber-500/30",
        iconColor: "text-amber-400",
        accentColor: "#f59e0b",
      };
    }
    return {
      gradient: "from-cyan-400/20 via-blue-400/20 to-indigo-400/20",
      borderColor: "#06b6d4",
      glowColor: "0 0 20px rgba(6, 182, 212, 0.3)",
      iconBg: "bg-cyan-500/30",
      iconColor: "text-cyan-400",
      accentColor: "#06b6d4",
    };
  };

  const cardStyle = getCardStyle();

  return (
    <Card
      className={`p-5 border transition-all bg-linear-to-br ${cardStyle.gradient} hover:scale-105`}
      style={{
        backgroundColor: '#232A57',
        borderColor: cardStyle.borderColor,
        boxShadow: cardStyle.glowColor,
      }}>
      <div className="flex items-start justify-between mb-3">
        <div
          className={`p-2.5 rounded-xl ${cardStyle.iconBg} ${cardStyle.iconColor}`}
          style={{ boxShadow: `0 0 15px ${cardStyle.accentColor}40` }}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-semibold ${trendColor}`}>
          <TrendIcon className="h-3.5 w-3.5" />
          <span>{change}</span>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-300 mb-1 font-medium">{title}</p>
        <p className="text-2xl font-bold text-white" style={{ textShadow: `0 0 10px ${cardStyle.accentColor}60` }}>
          {value}
        </p>
      </div>
    </Card>
  );
}
