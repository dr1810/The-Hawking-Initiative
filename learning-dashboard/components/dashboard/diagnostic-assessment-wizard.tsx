"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type SliderQuestion = {
  id: string;
  prompt: string;
  control: "slider";
  minLabel: string;
  maxLabel: string;
};

type RadioQuestion = {
  id: string;
  prompt: string;
  control: "radio";
  options: string[];
};

type SelectQuestion = {
  id: string;
  prompt: string;
  control: "select";
  options: string[];
};

type Question = SliderQuestion | RadioQuestion | SelectQuestion;

type Step = {
  id: string;
  title: string;
  questions: Question[];
};

type AnswerValue = string | number;

const steps: Step[] = [
  {
    id: "vision",
    title: "Step 1 - Vision",
    questions: [
      {
        id: "vision_confidence",
        prompt: "How confident are you reading on-screen text?",
        control: "slider",
        minLabel: "Not confident",
        maxLabel: "Very confident"
      },
      {
        id: "vision_read_difficulty",
        prompt: "How difficult is it to read text on a computer?",
        control: "slider",
        minLabel: "Not difficult",
        maxLabel: "Very difficult"
      },
      {
        id: "vision_zoom_frequency",
        prompt: "How often do you zoom in?",
        control: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        id: "vision_glare",
        prompt: "How sensitive are you to glare?",
        control: "slider",
        minLabel: "Not sensitive",
        maxLabel: "Very sensitive"
      },
      {
        id: "vision_learning_impact",
        prompt: "Do visual difficulties interfere with learning?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      }
    ]
  },
  {
    id: "hearing",
    title: "Step 2 - Hearing and Communication",
    questions: [
      {
        id: "hearing_quiet",
        prompt: "Difficulty hearing in quiet environments?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      },
      {
        id: "hearing_noisy",
        prompt: "Difficulty hearing in noisy environments?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      },
      {
        id: "hearing_instructions",
        prompt: "Difficulty understanding spoken instructions?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      },
      {
        id: "hearing_reading_preference",
        prompt: "Do you prefer reading instructions?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      },
      {
        id: "hearing_learning_impact",
        prompt: "Do communication difficulties affect learning?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      }
    ]
  },
  {
    id: "cognitive",
    title: "Step 3 - Cognitive and Executive Function",
    questions: [
      {
        id: "cognitive_focus_loss",
        prompt: "How often do you lose focus?",
        control: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        id: "cognitive_memory",
        prompt: "Difficulty remembering multi-step instructions?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      },
      {
        id: "cognitive_overwhelmed",
        prompt: "Easily overwhelmed?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      },
      {
        id: "cognitive_switching",
        prompt: "Difficulty switching tasks?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      },
      {
        id: "cognitive_reminders",
        prompt: "Need reminders?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      }
    ]
  },
  {
    id: "reading_learning",
    title: "Step 4 - Reading and Learning",
    questions: [
      {
        id: "reading_paragraphs",
        prompt: "Difficulty understanding long paragraphs?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      },
      {
        id: "reading_visual_preference",
        prompt: "Prefer visual explanations?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      },
      {
        id: "reading_reread",
        prompt: "Frequently reread?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      },
      {
        id: "reading_diagrams",
        prompt: "Are diagrams helpful?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      },
      {
        id: "reading_independent_confidence",
        prompt: "Confidence learning independently?",
        control: "slider",
        minLabel: "Not confident",
        maxLabel: "Very confident"
      }
    ]
  },
  {
    id: "motor",
    title: "Step 5 - Motor Accessibility",
    questions: [
      {
        id: "motor_mouse",
        prompt: "Difficulty using mouse?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      },
      {
        id: "motor_typing",
        prompt: "Difficulty typing?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      },
      {
        id: "motor_keyboard",
        prompt: "Prefer keyboard navigation?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      },
      {
        id: "motor_voice",
        prompt: "Use voice input?",
        control: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often"]
      },
      {
        id: "motor_learning_impact",
        prompt: "Motor difficulties affect online learning?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      }
    ]
  },
  {
    id: "fatigue",
    title: "Step 6 - Fatigue and Attention",
    questions: [
      {
        id: "fatigue_mental",
        prompt: "Mental fatigue while studying?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      },
      {
        id: "fatigue_duration",
        prompt: "Maximum comfortable study duration?",
        control: "select",
        options: ["10-15 minutes", "20-30 minutes", "30-45 minutes", "45-60 minutes", "60+ minutes"]
      },
      {
        id: "fatigue_breaks",
        prompt: "Prefer breaks?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      },
      {
        id: "fatigue_notifications",
        prompt: "Notifications distracting?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      },
      {
        id: "fatigue_one_concept",
        prompt: "Prefer learning one concept at a time?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      }
    ]
  },
  {
    id: "preferences",
    title: "Step 7 - Learning Preferences",
    questions: [
      {
        id: "preferences_style",
        prompt: "Preferred learning style",
        control: "select",
        options: ["Text", "Images", "Video", "Interactive"]
      },
      {
        id: "preferences_examples",
        prompt: "Examples helpful?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      },
      {
        id: "preferences_step_by_step",
        prompt: "Step-by-step explanations?",
        control: "radio",
        options: ["Not needed", "Helpful", "Essential"]
      },
      {
        id: "preferences_follow_up",
        prompt: "Ask follow-up questions?",
        control: "radio",
        options: ["Rarely", "Sometimes", "Often"]
      },
      {
        id: "preferences_quizzes",
        prompt: "Like quizzes?",
        control: "radio",
        options: ["No", "Sometimes", "Yes"]
      }
    ]
  }
];

export function DiagnosticAssessmentWizard() {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, AnswerValue>>({});
  const headingRef = React.useRef<HTMLHeadingElement>(null);

  const currentStep = steps[stepIndex];
  const stepCount = steps.length;
  const progressValue = ((stepIndex + 1) / stepCount) * 100;
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = steps.reduce((sum, step) => sum + step.questions.length, 0);
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === stepCount - 1;

  React.useEffect(() => {
    headingRef.current?.focus();
  }, [stepIndex]);

  function setAnswer(questionId: string, value: AnswerValue) {
    setAnswers((previous) => ({ ...previous, [questionId]: value }));
  }

  function nextStep() {
    setStepIndex((previous) => Math.min(previous + 1, stepCount - 1));
  }

  function previousStep() {
    setStepIndex((previous) => Math.max(previous - 1, 0));
  }

  function onWizardKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.altKey && event.key === "ArrowRight" && !isLastStep) {
      event.preventDefault();
      nextStep();
    }

    if (event.altKey && event.key === "ArrowLeft" && !isFirstStep) {
      event.preventDefault();
      previousStep();
    }

    if (event.key === "Home") {
      event.preventDefault();
      setStepIndex(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      setStepIndex(stepCount - 1);
    }
  }

  return (
    <Card
      className="overflow-hidden"
      onKeyDown={onWizardKeyDown}
      tabIndex={0}
      aria-label="Diagnostic assessment step-by-step form"
    >
      <CardHeader className="border-b border-border bg-muted/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="secondary">
            Step {stepIndex + 1} of {stepCount}
          </Badge>
          <p className="text-sm text-muted-foreground">
            {answeredCount} of {totalQuestions} questions answered
          </p>
        </div>
        <Progress value={progressValue} aria-label={`Assessment progress ${Math.round(progressValue)} percent`} />
        <CardTitle
          ref={headingRef}
          id="assessment-step-title"
          className="text-2xl"
          tabIndex={-1}
          aria-live="polite"
        >
          {currentStep.title}
        </CardTitle>
        <CardDescription>
          Use Tab to move between fields. Use Alt + Right Arrow for next step and Alt + Left Arrow for previous step.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        {currentStep.questions.map((question) => (
          <QuestionField
            key={question.id}
            question={question}
            value={answers[question.id]}
            onChange={(value) => setAnswer(question.id, value)}
          />
        ))}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <Button type="button" variant="outline" onClick={previousStep} disabled={isFirstStep}>
            Previous
          </Button>
          <Button type="button" onClick={nextStep} disabled={isLastStep}>
            {isLastStep ? "Completed" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

type QuestionFieldProps = {
  question: Question;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
};

function QuestionField({ question, value, onChange }: QuestionFieldProps) {
  if (question.control === "slider") {
    const currentValue = typeof value === "number" ? value : 3;

    return (
      <fieldset className="space-y-2 rounded-2xl border border-border p-4">
        <legend className="px-1 text-sm font-semibold">{question.prompt}</legend>
        <label htmlFor={question.id} className="sr-only">
          {question.prompt}
        </label>
        <input
          id={question.id}
          name={question.id}
          type="range"
          min={1}
          max={5}
          step={1}
          value={currentValue}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full accent-primary"
          aria-describedby={`${question.id}-desc`}
        />
        <div id={`${question.id}-desc`} className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{question.minLabel}</span>
          <span>Selected: {currentValue} / 5</span>
          <span>{question.maxLabel}</span>
        </div>
      </fieldset>
    );
  }

  if (question.control === "radio") {
    const selectedValue = typeof value === "string" ? value : "";

    return (
      <fieldset className="space-y-3 rounded-2xl border border-border p-4">
        <legend className="px-1 text-sm font-semibold">{question.prompt}</legend>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {question.options.map((option) => {
            const inputId = `${question.id}-${option.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

            return (
              <label
                key={option}
                htmlFor={inputId}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <input
                  id={inputId}
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={selectedValue === option}
                  onChange={(event) => onChange(event.target.value)}
                  className="size-4 accent-primary"
                />
                {option}
              </label>
            );
          })}
        </div>
      </fieldset>
    );
  }

  const selectedValue = typeof value === "string" ? value : "";

  return (
    <div className="space-y-2 rounded-2xl border border-border p-4">
      <label htmlFor={question.id} className="text-sm font-semibold">
        {question.prompt}
      </label>
      <select
        id={question.id}
        value={selectedValue}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <option value="">Select an option</option>
        {question.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
