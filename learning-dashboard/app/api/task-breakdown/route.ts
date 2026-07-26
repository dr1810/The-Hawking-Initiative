import { NextResponse } from "next/server";

import { generateStructured, Type } from "@/lib/gemini";
import { describeProfile } from "@/lib/prompt";
import type { TaskPlanRequest, TaskStep } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as TaskPlanRequest;
  const { task, purpose, acceptanceCriteria, profile } = body;

  if (!task?.trim()) {
    return NextResponse.json({ error: "task is required" }, { status: 400 });
  }

  try {
    const result = await generateStructured<{ steps: TaskStep[] }>({
      systemInstruction:
        "You are a task-breakdown assistant for an assistive-technology app that helps people with disabilities " +
        "complete tasks independently. Break the task into a short, ordered list of concrete, single-action steps " +
        "the person can perform one at a time, based on how they perform per their accessibility profile. Keep " +
        "each step title short (under 8 words) and put any extra explanation in the detail field. Use plain " +
        "language and avoid jargon.",
      prompt:
        `Task: ${task}\n` +
        `Purpose: ${purpose || "Not specified"}\n` +
        `Acceptance criteria: ${acceptanceCriteria || "Not specified"}\n\n` +
        `Accessibility profile:\n${describeProfile(profile)}\n\n` +
        "Produce 3 to 8 ordered steps to complete this task.",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                detail: { type: Type.STRING }
              },
              required: ["id", "title", "detail"]
            }
          }
        },
        required: ["steps"]
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("task-breakdown failed", error);
    return NextResponse.json({ error: "Failed to generate task breakdown" }, { status: 500 });
  }
}
