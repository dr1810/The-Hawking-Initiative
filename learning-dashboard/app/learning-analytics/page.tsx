import { TrendingUp } from "lucide-react";

import { PageShell } from "@/components/dashboard/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const weekly = [
  { day: "Mon", value: 46 },
  { day: "Tue", value: 59 },
  { day: "Wed", value: 68 },
  { day: "Thu", value: 72 },
  { day: "Fri", value: 80 },
  { day: "Sat", value: 64 },
  { day: "Sun", value: 76 }
];

const competencies = [
  { label: "Comprehension", value: 88 },
  { label: "Reasoning", value: 74 },
  { label: "Retention", value: 81 },
  { label: "Self Regulation", value: 67 }
];

export default function LearningAnalyticsPage() {
  return (
    <PageShell
      title="Learning Analytics"
      description="Track growth trends and intervention outcomes with transparent, explainable learner metrics."
      activePath="/learning-analytics"
    >
      <section aria-label="Analytics highlights" className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5" aria-hidden="true" />
              Weekly Momentum
            </CardTitle>
            <CardDescription>Accessible visual with explicit value labels for each day.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-7 items-end gap-3" aria-label="Weekly performance chart">
              {weekly.map((entry) => (
                <li key={entry.day} className="flex flex-col items-center gap-2">
                  <div className="relative flex h-36 w-full items-end rounded-2xl bg-muted p-1">
                    <div
                      className="w-full rounded-xl bg-secondary"
                      style={{ height: `${entry.value}%` }}
                      aria-hidden="true"
                    />
                    <span className="sr-only">
                      {entry.day}: {entry.value}%
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">{entry.day}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Intervention Signals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Badge variant="success">Focus improved 14%</Badge>
            <p className="text-sm text-muted-foreground">
              Chunked instruction correlated with longer completion streaks.
            </p>
            <Badge variant="outline">Audio support usage +22%</Badge>
            <p className="text-sm text-muted-foreground">
              Spoken prompts reduced question re-reads for this learner cluster.
            </p>
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="competency-heading">
        <Card>
          <CardHeader>
            <CardTitle id="competency-heading">Competency Breakdown</CardTitle>
            <CardDescription>
              Indicators combine assessment confidence and sustained performance signals.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {competencies.map((item) => (
              <div key={item.label} className="space-y-2 rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.value}%</p>
                </div>
                <Progress value={item.value} aria-label={`${item.label} score`} />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
