import Link from "next/link";
import { BookOpenText, ChartSpline, ClipboardCheck, UserRoundCog } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/diagnostic-assessment", label: "Diagnostic Assessment", icon: ClipboardCheck },
  { href: "/accessibility-profile", label: "Accessibility Profile", icon: UserRoundCog },
  { href: "/learning-workspace", label: "Learning Workspace", icon: BookOpenText },
  { href: "/learning-analytics", label: "Learning Analytics", icon: ChartSpline }
] as const;

type PageShellProps = {
  title: string;
  description: string;
  activePath: (typeof navItems)[number]["href"];
  children: React.ReactNode;
};

export function PageShell({ title, description, activePath, children }: PageShellProps) {
  return (
    <div className="relative min-h-screen bg-background pb-10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,hsl(36_96%_63%/.2),transparent_45%),radial-gradient(circle_at_85%_8%,hsl(206_82%_44%/.16),transparent_38%)]" />
      <header className="border-b border-border/80 bg-background/90 backdrop-blur">
        <div className="container flex flex-col gap-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Adaptive Learning Platform
            </p>
            <h1 className="font-display text-3xl font-bold text-foreground">{title}</h1>
            <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </header>
      <div className="container mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[260px,1fr]">
        <aside aria-label="Primary" className="h-fit rounded-3xl border border-border bg-card p-3 shadow-card">
          <nav className="grid gap-2">
            {navItems.map(({ href, icon: Icon, label }) => {
              const isActive = href === activePath;

              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="size-5" aria-hidden="true" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main id="main-content" className="space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
