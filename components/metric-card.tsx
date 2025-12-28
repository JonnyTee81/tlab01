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
      ? "text-chart-2"
      : trend === "down"
      ? "text-chart-5"
      : "text-muted-foreground";

  return (
    <Card className="p-5 bg-card/30 backdrop-blur-sm border-border/40 hover:border-primary/20 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>
        <div className={`flex items-center gap-1 text-sm font-medium ${trendColor}`}>
          <TrendIcon className="h-3 w-3" />
          <span>{change}</span>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </Card>
  );
}
