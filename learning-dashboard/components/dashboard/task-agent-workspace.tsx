"use client";

import * as React from "react";
import Link from "next/link";
import { AlertCircle, Brain, CheckCircle2, Circle, RotateCcw, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { appendCompletedTask, loadAccessibilityProfile } from "@/lib/storage";
import { cn } from "@/lib/utils";
import type {
  AccessibilityProfile,
  Flashcard,
  StepAssistResponse,
  TaskPlan,
  TaskStep
} from "@/lib/types";

type Phase = "define" | "steps" | "complete";

export function TaskAgentWorkspace() {
  const [profile, setProfile] = React.useState<AccessibilityProfile | null>(null);
  const [phase, setPhase] = React.useState<Phase>("define");

  const [task, setTask] = React.useState("");
  const [purpose, setPurpose] = React.useState("");
  const [acceptanceCriteria, setAcceptanceCriteria] = React.useState("");
  const [planError, setPlanError] = React.useState<string | null>(null);
  const [generatingPlan, setGeneratingPlan] = React.useState(false);

  const [plan, setPlan] = React.useState<TaskPlan | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [completedStepIds, setCompletedStepIds] = React.useState<Set<string>>(new Set());

  const [difficultyOpen, setDifficultyOpen] = React.useState(false);
  const [difficultyDescription, setDifficultyDescription] = React.useState("");
  const [assist, setAssist] = React.useState<StepAssistResponse | null>(null);
  const [assistError, setAssistError] = React.useState<string | null>(null);
  const [generatingAssist, setGeneratingAssist] = React.useState(false);

  const [flashcards, setFlashcards] = React.useState<Flashcard[] | null>(null);
  const [flashcardError, setFlashcardError] = React.useState<string | null>(null);
  const [generatingFlashcards, setGeneratingFlashcards] = React.useState(false);

  React.useEffect(() => {
    setProfile(loadAccessibilityProfile());
  }, []);

  const currentStep: TaskStep | undefined = plan?.steps[currentStepIndex];
  const allStepsComplete = plan ? plan.steps.every((step) => completedStepIds.has(step.id)) : false;

  async function onGeneratePlan(event: React.FormEvent) {
    event.preventDefault();
    if (!task.trim() || !profile) return;

    setGeneratingPlan(true);
    setPlanError(null);

    try {
      const response = await fetch("/api/task-breakdown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, purpose, acceptanceCriteria, profile })
      });

      if (!response.ok) throw new Error("Task Agent could not generate a plan. Try again.");

      const data = (await response.json()) as { steps: TaskStep[] };
      setPlan({ task, purpose, acceptanceCriteria, steps: data.steps });
      setCurrentStepIndex(0);
      setCompletedStepIds(new Set());
      setFlashcards(null);
      setPhase("steps");
    } catch (error) {
      setPlanError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setGeneratingPlan(false);
    }
  }

  function goToNextIncompleteStep(completed: Set<string>) {
    if (!plan) return;
    const nextIndex = plan.steps.findIndex((step) => !completed.has(step.id));
    if (nextIndex === -1) {
      setPhase("complete");
    } else {
      setCurrentStepIndex(nextIndex);
    }
  }

  function onMarkStepComplete() {
    if (!plan || !currentStep) return;
    const updated = new Set(completedStepIds);
    updated.add(currentStep.id);
    setCompletedStepIds(updated);
    goToNextIncompleteStep(updated);
  }

  function openDifficultyDialog() {
    setAssist(null);
    setAssistError(null);
    setDifficultyDescription("");
    setDifficultyOpen(true);
  }

  async function onSubmitDifficulty(event: React.FormEvent) {
    event.preventDefault();
    if (!plan || !currentStep || !profile) return;

    setGeneratingAssist(true);
    setAssistError(null);

    try {
      const response = await fetch("/api/step-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: plan.task, step: currentStep, difficultyDescription, profile })
      });

      if (!response.ok) throw new Error("Could not reach the Task Agent for help. Try again.");

      const data = (await response.json()) as StepAssistResponse;
      setAssist(data);
    } catch (error) {
      setAssistError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setGeneratingAssist(false);
    }
  }

  async function onGenerateFlashcards() {
    if (!plan || !profile) return;

    setGeneratingFlashcards(true);
    setFlashcardError(null);

    try {
      const response = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: plan.task, purpose: plan.purpose, steps: plan.steps, profile })
      });

      if (!response.ok) throw new Error("Could not generate flashcards. Try again.");

      const data = (await response.json()) as { flashcards: Flashcard[] };
      setFlashcards(data.flashcards);
      appendCompletedTask({
        task: plan.task,
        purpose: plan.purpose,
        completedAt: new Date().toISOString(),
        steps: plan.steps,
        flashcards: data.flashcards
      });
    } catch (error) {
      setFlashcardError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setGeneratingFlashcards(false);
    }
  }

  function startNewTask() {
    setPhase("define");
    setTask("");
    setPurpose("");
    setAcceptanceCriteria("");
    setPlan(null);
    setFlashcards(null);
    setFlashcardError(null);
  }

  if (!profile) return null;

  const profileIsEmpty = Object.values(profile).every((value) => !value.trim());

  return (
    <div className="space-y-6">
      {profileIsEmpty && (
        <Card className="border-accent bg-accent/10">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
            <p className="text-sm">
              No accessibility profile is set yet. The Task Agent will use general defaults until you set one up.
            </p>
            <Link href="/accessibility-profile" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
              Set up profile
            </Link>
          </CardContent>
        </Card>
      )}

      {phase === "define" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-5" aria-hidden="true" />
              Define the task
            </CardTitle>
            <CardDescription>
              Describe the task, its purpose, and how you&apos;ll know it&apos;s done. The Task Agent will lay out
              ordered steps tailored to the saved accessibility profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={onGeneratePlan}>
              <div className="space-y-2">
                <label htmlFor="task" className="text-sm font-semibold">
                  Task
                </label>
                <Textarea
                  id="task"
                  required
                  value={task}
                  onChange={(event) => setTask(event.target.value)}
                  placeholder="e.g. Pay the electricity bill online"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="purpose" className="text-sm font-semibold">
                  Purpose
                </label>
                <Textarea
                  id="purpose"
                  value={purpose}
                  onChange={(event) => setPurpose(event.target.value)}
                  placeholder="e.g. Avoid a late fee and keep the power on"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="acceptanceCriteria" className="text-sm font-semibold">
                  Acceptance criteria
                </label>
                <Textarea
                  id="acceptanceCriteria"
                  value={acceptanceCriteria}
                  onChange={(event) => setAcceptanceCriteria(event.target.value)}
                  placeholder="e.g. Payment confirmation email received"
                  rows={2}
                />
              </div>

              {planError && (
                <p role="alert" className="flex items-center gap-2 text-sm text-danger">
                  <AlertCircle className="size-4" aria-hidden="true" />
                  {planError}
                </p>
              )}

              <Button type="submit" disabled={generatingPlan || !task.trim()}>
                {generatingPlan ? "Generating plan..." : "Generate Plan"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {phase === "steps" && plan && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Badge variant="secondary">
                  {completedStepIds.size} of {plan.steps.length} steps completed
                </Badge>
                <Button variant="ghost" size="sm" onClick={startNewTask}>
                  Start over
                </Button>
              </div>
              <Progress value={(completedStepIds.size / plan.steps.length) * 100} aria-label="Task progress" />
              <CardTitle>{plan.task}</CardTitle>
              {plan.purpose && <CardDescription>{plan.purpose}</CardDescription>}
            </CardHeader>
          </Card>

          <div className="grid gap-3 lg:grid-cols-[1fr,320px]">
            {currentStep && (
              <Card>
                <CardHeader>
                  <Badge variant="outline">
                    Step {currentStepIndex + 1} of {plan.steps.length}
                  </Badge>
                  <CardTitle>{currentStep.title}</CardTitle>
                  <CardDescription>{currentStep.detail}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  <Button onClick={onMarkStepComplete}>Mark step complete</Button>
                  <Button variant="outline" onClick={openDifficultyDialog}>
                    <Brain className="mr-2 size-4" aria-hidden="true" />
                    I&apos;m having difficulty
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-base">All steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {plan.steps.map((step, index) => {
                    const isDone = completedStepIds.has(step.id);
                    const isCurrent = index === currentStepIndex && !isDone;

                    return (
                      <li
                        key={step.id}
                        className={cn(
                          "flex items-start gap-2 rounded-xl border border-border p-2 text-sm",
                          isCurrent && "border-primary bg-primary/5 font-semibold"
                        )}
                      >
                        {isDone ? (
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                        ) : (
                          <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                        )}
                        <span className={isDone ? "text-muted-foreground line-through" : ""}>{step.title}</span>
                      </li>
                    );
                  })}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {phase === "complete" && plan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-success" aria-hidden="true" />
              All steps completed
            </CardTitle>
            <CardDescription>
              &quot;{plan.task}&quot; is done. Store this in long-term memory as a set of flashcards for next time.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!flashcards && (
              <Button onClick={onGenerateFlashcards} disabled={generatingFlashcards}>
                {generatingFlashcards ? "Generating flashcards..." : "Store in Long Term Memory"}
              </Button>
            )}
            {flashcardError && (
              <p role="alert" className="flex items-center gap-2 text-sm text-danger">
                <AlertCircle className="size-4" aria-hidden="true" />
                {flashcardError}
              </p>
            )}
            {flashcards && (
              <div className="space-y-3">
                <div className="grid gap-3 md:grid-cols-2">
                  {flashcards.map((card, index) => (
                    <Card key={index} className="bg-muted/40">
                      <CardHeader>
                        <CardTitle className="text-sm">{card.front}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">{card.back}</CardContent>
                    </Card>
                  ))}
                </div>
                <Button variant="outline" onClick={startNewTask}>
                  <RotateCcw className="mr-2 size-4" aria-hidden="true" />
                  Start a new task
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Dialog open={difficultyOpen} onClose={() => setDifficultyOpen(false)} titleId="difficulty-dialog-title">
        <form onSubmit={onSubmitDifficulty} className="space-y-4">
          <div>
            <h2 id="difficulty-dialog-title" className="font-display text-xl font-bold">
              What&apos;s making this step hard?
            </h2>
            <p className="text-sm text-muted-foreground">
              Describe the distraction or difficulty. The Task Agent will suggest a way to let it pass and refocus.
            </p>
          </div>

          {!assist && (
            <>
              <Textarea
                autoFocus
                value={difficultyDescription}
                onChange={(event) => setDifficultyDescription(event.target.value)}
                placeholder="e.g. I keep getting distracted by notifications on my phone"
                rows={3}
              />
              {assistError && (
                <p role="alert" className="flex items-center gap-2 text-sm text-danger">
                  <AlertCircle className="size-4" aria-hidden="true" />
                  {assistError}
                </p>
              )}
              <div className="flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setDifficultyOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={generatingAssist}>
                  {generatingAssist ? "Thinking..." : "Get guidance"}
                </Button>
              </div>
            </>
          )}

          {assist && (
            <div className="space-y-3">
              <p className="text-sm">{assist.acknowledgement}</p>
              <div className="rounded-2xl border border-border bg-muted/40 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{assist.technique}</p>
                <p className="mt-1 text-sm">{assist.guidance}</p>
              </div>
              <div className="flex justify-end">
                <Button type="button" onClick={() => setDifficultyOpen(false)}>
                  Try the step again
                </Button>
              </div>
            </div>
          )}
        </form>
      </Dialog>
    </div>
  );
}
