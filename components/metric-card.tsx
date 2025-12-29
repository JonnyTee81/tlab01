import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
  sparklineData?: number[];
}

export function MetricCard({ title, value, change, trend, icon, sparklineData = [] }: MetricCardProps) {
  const TrendIcon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus;
  const trendColor =
    trend === "up"
      ? "text-green-400"
      : trend === "down"
      ? "text-red-400"
      : "text-gray-400";

  // Generate sparkline path for full card width
  const generateSparkline = (data: number[], width: number, height: number) => {
    if (data.length === 0) return { line: "", area: "" };

    const padding = 4;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - padding - ((value - min) / range) * (height - padding * 2);
      return { x, y };
    });

    // Line path
    const linePath = `M ${points.map(p => `${p.x},${p.y}`).join(" L ")}`;

    // Area path (filled)
    const areaPath = `M 0,${height} L ${points.map(p => `${p.x},${p.y}`).join(" L ")} L ${width},${height} Z`;

    return { line: linePath, area: areaPath };
  };

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
  const sparklinePaths = sparklineData.length > 0 ? generateSparkline(sparklineData, 280, 120) : { line: "", area: "" };

  return (
    <Card
      className={`p-5 border transition-all bg-linear-to-br ${cardStyle.gradient} hover:scale-105 overflow-hidden relative group`}
      style={{
        backgroundColor: '#232A57',
        borderColor: cardStyle.borderColor,
        boxShadow: cardStyle.glowColor,
      }}>
      {/* Full-width sparkline background */}
      {sparklineData.length > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 280 120"
          preserveAspectRatio="none"
          style={{ opacity: 0.15 }}>
          <defs>
            <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={cardStyle.accentColor} stopOpacity="0.6" />
              <stop offset="100%" stopColor={cardStyle.accentColor} stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <path
            d={sparklinePaths.area}
            fill={`url(#gradient-${title})`}
          />
          <path
            d={sparklinePaths.line}
            fill="none"
            stroke={cardStyle.accentColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
          />
        </svg>
      )}

      {/* Content - positioned above sparkline */}
      <div className="relative z-10">
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
      </div>

      {/* Tooltip on hover - shows on entire card hover */}
      {sparklineData.length > 0 && (
        <div className="absolute top-full left-0 mt-2 hidden group-hover:block z-20">
          <div className="bg-black/90 text-white text-xs rounded px-3 py-2 whitespace-nowrap shadow-lg">
            <div className="font-semibold mb-1">Last 12 periods</div>
            <div className="text-gray-300">{sparklineData.map(v => v.toLocaleString()).join(' → ')}</div>
          </div>
        </div>
      )}
    </Card>
  );
}
