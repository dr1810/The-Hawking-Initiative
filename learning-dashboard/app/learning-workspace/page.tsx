import { Flame, Headphones, NotebookPen } from "lucide-react";

import { ModuleCard } from "@/components/dashboard/module-card";
import { PageShell } from "@/components/dashboard/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const modules = [
  { title: "Inference and Context Clues", minutes: 20, progress: 72, focus: "Reading" },
  { title: "Multi-Step Equation Sense", minutes: 16, progress: 51, focus: "Math" },
  { title: "Cause and Effect Mapping", minutes: 14, progress: 38, focus: "Critical Thinking" }
];

export default function LearningWorkspacePage() {
  return (
    <PageShell
      title="Learning Workspace"
      description="A focused, distraction-limited environment with multimodal supports and adaptive lesson flow."
      activePath="/learning-workspace"
    >
      <section aria-label="Workspace mode">
        <Tabs defaultValue="guided" aria-label="Learning mode selector">
          <TabsList>
            <TabsTrigger value="guided">Guided Path</TabsTrigger>
            <TabsTrigger value="independent">Independent Practice</TabsTrigger>
            <TabsTrigger value="review">Review Mode</TabsTrigger>
          </TabsList>
          <TabsContent value="guided">
            <Card>
              <CardHeader>
                <CardTitle>Guided Path Session</CardTitle>
                <CardDescription>
                  Step-by-step progression with embedded hints and formative checks.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="gap-2">
                  <Flame className="size-3.5" aria-hidden="true" />
                  11 day learning streak
                </Badge>
                <Badge variant="outline" className="gap-2">
                  <Headphones className="size-3.5" aria-hidden="true" />
                  Audio prompts enabled
                </Badge>
                <Badge variant="outline" className="gap-2">
                  <NotebookPen className="size-3.5" aria-hidden="true" />
                  Notes auto-saved
                </Badge>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="independent">
            <Card>
              <CardHeader>
                <CardTitle>Independent Practice</CardTitle>
                <CardDescription>
                  Learners choose challenge level while assistive support remains one click away.
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
          <TabsContent value="review">
            <Card>
              <CardHeader>
                <CardTitle>Review Mode</CardTitle>
                <CardDescription>
                  Revisits past misconceptions with low-pressure targeted prompts.
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <section aria-labelledby="active-modules-heading">
        <h2 id="active-modules-heading" className="mb-3 font-display text-2xl font-bold">
          Active Modules
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => (
            <ModuleCard key={module.title} {...module} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
