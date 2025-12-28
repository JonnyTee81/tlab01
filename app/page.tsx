import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowRight, BarChart3, TrendingUp, Zap, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-primary via-accent to-chart-4 rounded-lg" />
            <span className="text-xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Finance Flow
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Sign In</Link>
            </Button>
            <Button asChild className="bg-linear-to-r from-primary to-accent hover:opacity-90">
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-block">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              Transform Your Financial Data
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Visualize Your{" "}
            <span className="bg-linear-to-r from-primary via-accent to-chart-4 bg-clip-text text-transparent">
              Cash Flow
            </span>
            {" "}Like Never Before
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Turn your Tiller Google Sheets into stunning, interactive financial dashboards.
            Track spending, analyze patterns, and understand your money flow at a glance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" asChild className="bg-linear-to-r from-primary to-accent hover:opacity-90 text-lg px-8 h-14">
              <Link href="/dashboard">
                Sign Up with Google
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 h-14">
              <Link href="#features">
                See How It Works
              </Link>
            </Button>
          </div>

          {/* Hero Visual Preview */}
          <div className="pt-12 relative">
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10" />
            <div className="rounded-2xl border border-border/40 overflow-hidden shadow-2xl bg-card/30 backdrop-blur-sm">
              <div className="aspect-video bg-linear-to-br from-primary/5 via-accent/5 to-chart-4/5 flex items-center justify-center">
                <div className="text-6xl font-bold text-muted-foreground/20">
                  Dashboard Preview
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features for{" "}
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Financial Clarity
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand and optimize your personal finances
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<BarChart3 className="h-8 w-8" />}
            title="Cash Flow Sankey"
            description="Multi-level visualization showing income sources flowing through expense categories"
            gradient="from-primary to-chart-2"
          />
          <FeatureCard
            icon={<TrendingUp className="h-8 w-8" />}
            title="Spending Insights"
            description="Track trends and patterns in your spending across all categories over time"
            gradient="from-accent to-chart-3"
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Instant Updates"
            description="Real-time sync with your Tiller Google Sheets for always-current data"
            gradient="from-chart-3 to-chart-4"
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Secure & Private"
            description="Read-only access to your sheets. Your financial data stays in your control"
            gradient="from-chart-4 to-chart-5"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="rounded-3xl bg-linear-to-br from-primary/10 via-accent/10 to-chart-4/10 border border-primary/20 p-12 md:p-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to See Your Finances Differently?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join Tiller users who are gaining clarity on their financial lives with beautiful visualizations
          </p>
          <Button size="lg" asChild className="bg-linear-to-r from-primary to-accent hover:opacity-90 text-lg px-8 h-14">
            <Link href="/dashboard">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-linear-to-br from-primary via-accent to-chart-4 rounded-lg" />
              <span className="font-semibold text-muted-foreground">Finance Flow</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Finance Flow. Built for Tiller users.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

function FeatureCard({ icon, title, description, gradient }: FeatureCardProps) {
  return (
    <div className="group relative rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm p-6 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5">
      <div className={`inline-flex p-3 rounded-xl bg-linear-to-br ${gradient} mb-4 text-primary-foreground`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
