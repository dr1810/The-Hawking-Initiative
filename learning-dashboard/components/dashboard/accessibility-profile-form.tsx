"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { loadAccessibilityProfile, saveAccessibilityProfile } from "@/lib/storage";
import { emptyAccessibilityProfile, type AccessibilityProfile } from "@/lib/types";

const fields: Array<{
  id: keyof AccessibilityProfile;
  label: string;
  placeholder: string;
  options: string[];
}> = [
  {
    id: "readingLevel",
    label: "Reading level & preference",
    placeholder: "e.g. Prefers short sentences and simple words",
    options: ["Simple, plain language", "Standard reading level", "Prefers audio over text"]
  },
  {
    id: "pacingPreference",
    label: "Preferred pacing",
    placeholder: "e.g. One step at a time, with confirmation before moving on",
    options: ["One step at a time", "A few steps at once is fine", "Needs frequent breaks"]
  },
  {
    id: "distractionSensitivity",
    label: "Distraction sensitivity",
    placeholder: "e.g. Easily distracted by notifications and background noise",
    options: ["Very sensitive to distraction", "Somewhat sensitive", "Not very sensitive"]
  },
  {
    id: "sensoryNeeds",
    label: "Sensory needs",
    placeholder: "e.g. Needs high contrast text, sensitive to bright screens",
    options: ["High contrast / low glare", "Larger text", "No specific sensory needs"]
  },
  {
    id: "communicationPreference",
    label: "Communication preference",
    placeholder: "e.g. Prefers written instructions over spoken ones",
    options: ["Written instructions", "Spoken/audio instructions", "Visual diagrams"]
  }
];

export function AccessibilityProfileForm() {
  const [profile, setProfile] = React.useState<AccessibilityProfile>(emptyAccessibilityProfile);
  const [savedAt, setSavedAt] = React.useState<number | null>(null);

  React.useEffect(() => {
    setProfile(loadAccessibilityProfile());
  }, []);

  function updateField(id: keyof AccessibilityProfile, value: string) {
    setProfile((previous) => ({ ...previous, [id]: value }));
    setSavedAt(null);
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    saveAccessibilityProfile(profile);
    setSavedAt(Date.now());
  }

  const completedCount = fields.filter((field) => profile[field.id]?.trim()).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accessibility Profile</CardTitle>
        <CardDescription>
          This profile is created here (standing in for a clinician&apos;s diagnosis) and is sent to the Task Agent
          so every generated plan and flashcard set matches how this person performs best.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={onSubmit} aria-label="Accessibility profile form">
          <Badge variant="outline">{completedCount} of {fields.length} fields set</Badge>

          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label htmlFor={field.id} className="text-sm font-semibold">
                {field.label}
              </label>
              <div className="flex flex-wrap gap-2">
                {field.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateField(field.id, option)}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-pressed={profile[field.id] === option}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <Textarea
                id={field.id}
                value={profile[field.id]}
                onChange={(event) => updateField(field.id, event.target.value)}
                placeholder={field.placeholder}
                rows={2}
              />
            </div>
          ))}

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-semibold">
              Additional notes for the Task Agent
            </label>
            <Textarea
              id="notes"
              value={profile.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              placeholder="Anything else the Task Agent should know before generating plans and flashcards"
              rows={3}
            />
          </div>

          <div className="flex items-center gap-3 border-t border-border pt-4">
            <Button type="submit">Save Profile</Button>
            {savedAt && (
              <span className="inline-flex items-center gap-2 text-sm text-success">
                <CheckCircle2 className="size-4" aria-hidden="true" />
                Saved. The Task Agent will use this profile.
              </span>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
