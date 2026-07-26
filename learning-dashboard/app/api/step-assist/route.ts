import { NextResponse } from "next/server";

import { generateStructured, Type } from "@/lib/gemini";
import { describeProfile } from "@/lib/prompt";
import type { StepAssistRequest, StepAssistResponse } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as StepAssistRequest;
  const { task, step, difficultyDescription, profile } = body;

  if (!step?.title) {
    return NextResponse.json({ error: "step is required" }, { status: 400 });
  }

  try {
    const result = await generateStructured<StepAssistResponse>({
      systemInstruction:
        "You are a calm, supportive mindfulness coach embedded in an assistive-technology app. The person is " +
        "stuck on a step of a task and reported a difficulty (often a distraction or a moment of overwhelm). " +
        "Respond with: a short, warm one-sentence acknowledgement; a named coping technique drawn from " +
        "mindfulness practice or Perception Load Theory (e.g. letting the distraction pass without engaging it, " +
        "narrowing attention by filtering out low-priority perceptual load, box breathing, grounding); and one " +
        "concrete, brief piece of guidance for returning to the step. Keep everything short and plain-language.",
      prompt:
        `Task: ${task}\n` +
        `Current step: ${step.title} - ${step.detail}\n` +
        `Reported difficulty: ${difficultyDescription || "General difficulty performing this step"}\n\n` +
        `Accessibility profile:\n${describeProfile(profile)}`,
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          acknowledgement: { type: Type.STRING },
          technique: { type: Type.STRING },
          guidance: { type: Type.STRING }
        },
        required: ["acknowledgement", "technique", "guidance"]
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("step-assist failed", error);
    return NextResponse.json({ error: "Failed to generate step assistance" }, { status: 500 });
  }
}
