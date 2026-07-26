import { NextResponse } from "next/server";

import { generateStructured, Type } from "@/lib/gemini";
import { describeProfile } from "@/lib/prompt";
import type { AccessibilityProfile, Flashcard, TaskStep } from "@/lib/types";

type FlashcardRequest = {
  task: string;
  purpose: string;
  steps: TaskStep[];
  profile: AccessibilityProfile;
};

export async function POST(request: Request) {
  const body = (await request.json()) as FlashcardRequest;
  const { task, purpose, steps, profile } = body;

  if (!task?.trim() || !steps?.length) {
    return NextResponse.json({ error: "task and steps are required" }, { status: 400 });
  }

  try {
    const result = await generateStructured<{ flashcards: Flashcard[] }>({
      systemInstruction:
        "You are creating long-term-memory flashcards for someone who just finished completing a task with an " +
        "assistive-technology app. Summarize what they did into short recall flashcards (a front prompt and a " +
        "back answer) so they can more easily repeat this task independently next time. Keep language plain and " +
        "short, matching the person's accessibility profile.",
      prompt:
        `Task just completed: ${task}\n` +
        `Purpose: ${purpose || "Not specified"}\n` +
        `Steps performed, in order:\n${steps.map((step, index) => `${index + 1}. ${step.title} - ${step.detail}`).join("\n")}\n\n` +
        `Accessibility profile:\n${describeProfile(profile)}\n\n` +
        "Produce 3 to 6 flashcards.",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          flashcards: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                front: { type: Type.STRING },
                back: { type: Type.STRING }
              },
              required: ["front", "back"]
            }
          }
        },
        required: ["flashcards"]
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("flashcards failed", error);
    return NextResponse.json({ error: "Failed to generate flashcards" }, { status: 500 });
  }
}
