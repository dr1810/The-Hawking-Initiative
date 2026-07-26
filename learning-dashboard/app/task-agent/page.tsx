import { PageShell } from "@/components/dashboard/page-shell";
import { TaskAgentWorkspace } from "@/components/dashboard/task-agent-workspace";

export default function TaskAgentPage() {
  return (
    <PageShell
      title="Task Agent"
      description="Break a task into ordered steps, work through them one at a time, and get mindfulness-based support when a step gets hard."
      activePath="/task-agent"
    >
      <section aria-label="Task Agent workspace">
        <TaskAgentWorkspace />
      </section>
    </PageShell>
  );
}
