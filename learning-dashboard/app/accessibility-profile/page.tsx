import { AccessibilityProfileForm } from "@/components/dashboard/accessibility-profile-form";
import { PageShell } from "@/components/dashboard/page-shell";

export default function AccessibilityProfilePage() {
  return (
    <PageShell
      title="Accessibility Profile"
      description="Set up how this person performs best. The Task Agent reads this profile before breaking down every task."
      activePath="/accessibility-profile"
    >
      <section aria-label="Accessibility profile form">
        <AccessibilityProfileForm />
      </section>
    </PageShell>
  );
}
