import type { AccessibilityProfile } from "@/lib/types";

export function describeProfile(profile: AccessibilityProfile) {
  const fields: Array<[string, string]> = [
    ["Reading level", profile.readingLevel],
    ["Preferred pacing", profile.pacingPreference],
    ["Distraction sensitivity", profile.distractionSensitivity],
    ["Sensory needs", profile.sensoryNeeds],
    ["Communication preference", profile.communicationPreference],
    ["Additional notes", profile.notes]
  ];

  const known = fields.filter(([, value]) => value && value.trim().length > 0);

  if (known.length === 0) {
    return "No accessibility profile has been provided yet, so use general plain-language, low-distraction defaults.";
  }

  return known.map(([label, value]) => `- ${label}: ${value}`).join("\n");
}
