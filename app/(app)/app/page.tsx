import Link from "next/link";
import { requireUser } from "@/lib/auth/session";
import { getDb } from "@/lib/db/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const user = await requireUser();
  const db = await getDb();
  const projects = await db.query<{ name: string; n: number }>(
    `select p.name, count(t.id)::int as n
       from projects p
       left join tasks t on t.project_id = p.id
      where p.organization_id = $1
      group by p.id, p.name`,
    [user.organizationId],
  );
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.rows.map((project) => (
          <Card key={project.name}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{project.n} tasks</p>
              <Link href="/app/board" className="mt-3 inline-block text-sm underline">Open board</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
