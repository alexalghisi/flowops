"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/session";
import { getDb } from "@/lib/db/client";
import { canMoveTask, exportTasksCsv } from "@/lib/domain";
import { newId } from "@/lib/utils";

export async function moveTaskAction(taskId: string, columnKey: string) {
  const user = await requireUser();
  if (!canMoveTask(user.role)) return;
  const db = await getDb();
  await db.query("update tasks set column_key = $1 where id = $2", [columnKey, taskId]);
  await db.query(
    "insert into activity (id, organization_id, actor_email, message) values ($1, $2, $3, $4)",
    [newId(), user.organizationId, user.email, `Moved task to ${columnKey}`],
  );
  revalidatePath("/app/board");
  revalidatePath("/app/activity");
}

export async function exportCsvAction() {
  const user = await requireUser();
  const db = await getDb();
  const tasks = await db.query<{ title: string; column_key: string }>(
    `select t.title, t.column_key from tasks t
      join projects p on p.id = t.project_id
     where p.organization_id = $1
     order by t.position`,
    [user.organizationId],
  );
  return exportTasksCsv(tasks.rows);
}
