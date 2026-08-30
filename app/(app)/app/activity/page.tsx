import { requireUser } from "@/lib/auth/session";
import { getDb } from "@/lib/db/client";

export default async function ActivityPage() {
  const user = await requireUser();
  const db = await getDb();
  const rows = await db.query<{ actor_email: string; message: string; created_at: Date }>(
    "select actor_email, message, created_at from activity where organization_id = $1 order by created_at desc limit 50",
    [user.organizationId],
  );
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Activity</h1>
      <ul className="space-y-2 text-sm">
        {rows.rows.map((row, index) => (
          <li key={index} className="rounded-xl border border-border bg-card p-3">
            <p>{row.message}</p>
            <p className="text-muted-foreground">{row.actor_email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
