export type AccessibilityProfile = {
  readingLevel: string;
  pacingPreference: string;
  distractionSensitivity: string;
  sensoryNeeds: string;
  communicationPreference: string;
  notes: string;
};

export const emptyAccessibilityProfile: AccessibilityProfile = {
  readingLevel: "",
  pacingPreference: "",
  distractionSensitivity: "",
  sensoryNeeds: "",
  communicationPreference: "",
  notes: ""
};

export type TaskPlanRequest = {
  task: string;
  purpose: string;
  acceptanceCriteria: string;
  profile: AccessibilityProfile;
};

export type TaskStep = {
  id: string;
  title: string;
  detail: string;
};

export type TaskPlan = {
  task: string;
  purpose: string;
  acceptanceCriteria: string;
  steps: TaskStep[];
};

export type StepAssistRequest = {
  task: string;
  step: TaskStep;
  difficultyDescription: string;
  profile: AccessibilityProfile;
};

export type StepAssistResponse = {
  acknowledgement: string;
  technique: string;
  guidance: string;
};

export type Flashcard = {
  front: string;
  back: string;
};

export type CompletedTaskRecord = {
  task: string;
  purpose: string;
  completedAt: string;
  steps: TaskStep[];
  flashcards: Flashcard[];
};
