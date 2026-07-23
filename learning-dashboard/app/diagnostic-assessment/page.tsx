import { DiagnosticAssessmentWizard } from "@/components/dashboard/diagnostic-assessment-wizard";
import { PageShell } from "@/components/dashboard/page-shell";

export default function DiagnosticAssessmentPage() {
  return (
    <PageShell
      title="Diagnostic Assessment"
      description="Complete a 7-step accessibility and learning diagnostic with keyboard-friendly controls and progressive disclosure."
      activePath="/diagnostic-assessment"
    >
      <section aria-label="Diagnostic assessment wizard">
        <DiagnosticAssessmentWizard />
      </section>
    </PageShell>
  );
}
