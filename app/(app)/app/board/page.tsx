import { requireUser } from "@/lib/auth/session";
import { getDb } from "@/lib/db/client";
import { COLUMNS, canMoveTask } from "@/lib/domain";
import { moveTaskAction } from "@/features/work/actions";
import { Button } from "@/components/ui/button";
import { ExportButton } from "@/components/export-button";

export default async function BoardPage() {
  const user = await requireUser();
  const db = await getDb();
  const tasks = await db.query<{ id: string; title: string; column_key: string }>(
    `select t.id, t.title, t.column_key from tasks t
      join projects p on p.id = t.project_id
     where p.organization_id = $1
     order by t.position`,
    [user.organizationId],
  );
  const movable = canMoveTask(user.role);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Board</h1>
        <ExportButton />
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {COLUMNS.map((column) => (
          <section key={column} className="rounded-xl border border-border bg-card p-3">
            <h2 className="text-sm font-semibold capitalize">{column.replace("_", " ")}</h2>
            <ul className="mt-3 space-y-2">
              {tasks.rows.filter((task) => task.column_key === column).map((task) => (
                <li key={task.id} className="rounded-md border border-border p-2 text-sm">
                  <p>{task.title}</p>
                  {movable ? (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {COLUMNS.filter((key) => key !== column).map((key) => (
                        <form key={key} action={moveTaskAction.bind(null, task.id, key)}>
                          <Button type="submit" size="sm" variant="outline">{key}</Button>
                        </form>
                      ))}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
