import { Card } from "@/components/ui/card";

interface PlaceholderCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function PlaceholderCard({ title, description, icon }: PlaceholderCardProps) {
  return (
    <Card className="p-6 bg-card/30 backdrop-blur-sm border-border/40 hover:border-primary/20 transition-all">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-xl bg-linear-to-br from-primary/20 to-accent/20 text-primary">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="aspect-video rounded-lg bg-linear-to-br from-primary/5 via-accent/5 to-chart-3/5 flex items-center justify-center border border-border/20">
        <span className="text-muted-foreground/40 text-sm">Coming Soon</span>
      </div>
    </Card>
  );
}
