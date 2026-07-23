import { Ear, Eye, Sparkles, Type } from "lucide-react";

import { PageShell } from "@/components/dashboard/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const profilePillars = [
  {
    icon: Type,
    title: "Readable Typography",
    description: "Large text preference enabled with increased line-height and relaxed spacing.",
    tag: "Active"
  },
  {
    icon: Ear,
    title: "Audio Support",
    description: "Narrated prompts and spoken feedback in English and Spanish.",
    tag: "Recommended"
  },
  {
    icon: Eye,
    title: "Visual Contrast",
    description: "High contrast palette with reduced glare and stronger edge definition.",
    tag: "Enabled"
  }
];

export default function AccessibilityProfilePage() {
  return (
    <PageShell
      title="Accessibility Profile"
      description="Personalize accommodations and content delivery modes to ensure every learner can access and engage confidently."
      activePath="/accessibility-profile"
    >
      <section aria-label="Profile status" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Profile Completion</CardTitle>
            <CardDescription>
              9 of 11 accommodations configured with auto-sync across all learning modules.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-display text-5xl font-bold">82%</p>
            <Badge variant="success">WCAG Priority Settings Met</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Screen Reader Ready</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-success">Yes</p>
            <p className="text-sm text-muted-foreground">Landmarks and semantic labels validated.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Keyboard Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-success">Pass</p>
            <p className="text-sm text-muted-foreground">Focus-visible styles applied globally.</p>
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="accommodations-heading" className="grid gap-4 lg:grid-cols-3">
        {profilePillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <Card key={pillar.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Icon className="size-4" aria-hidden="true" />
                  {pillar.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{pillar.description}</p>
                <Badge variant="outline">{pillar.tag}</Badge>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section aria-label="Profile actions">
        <Card>
          <CardHeader>
            <CardTitle id="accommodations-heading" className="flex items-center gap-2">
              <Sparkles className="size-5" aria-hidden="true" />
              Adaptive Recommendation Engine
            </CardTitle>
            <CardDescription>
              Based on assessment trends, this learner may benefit from chunked instructions and visual timers.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button>Apply Recommended Settings</Button>
            <Button variant="outline">Preview Student View</Button>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
