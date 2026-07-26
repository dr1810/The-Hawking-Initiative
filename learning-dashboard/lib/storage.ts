import { emptyAccessibilityProfile, type AccessibilityProfile, type CompletedTaskRecord } from "@/lib/types";

const PROFILE_KEY = "hawking:accessibility-profile";
const HISTORY_KEY = "hawking:completed-tasks";

export function loadAccessibilityProfile(): AccessibilityProfile {
  if (typeof window === "undefined") return emptyAccessibilityProfile;

  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (!raw) return emptyAccessibilityProfile;
    return { ...emptyAccessibilityProfile, ...JSON.parse(raw) };
  } catch {
    return emptyAccessibilityProfile;
  }
}

export function saveAccessibilityProfile(profile: AccessibilityProfile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function loadCompletedTasks(): CompletedTaskRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CompletedTaskRecord[];
  } catch {
    return [];
  }
}

export function appendCompletedTask(record: CompletedTaskRecord) {
  if (typeof window === "undefined") return;
  const history = loadCompletedTasks();
  history.unshift(record);
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
}
