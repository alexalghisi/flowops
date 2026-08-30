import { PGlite } from "@electric-sql/pglite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { SCHEMA_SQL } from "../lib/db/schema-sql";
import { hashPassword } from "../lib/auth/password";

const email = "demo@flowops.dev";
const orgId = "org_demo";
const userId = "user_demo";

async function main() {
  mkdirSync(path.join(process.cwd(), ".data"), { recursive: true });
  const db = new PGlite(path.join(process.cwd(), ".data", "pglite"));
  await db.waitReady;
  await db.exec(SCHEMA_SQL);
  const passwordHash = await hashPassword("DemoPass123!");
  await db.query("insert into users (id, email, password_hash) values ($1, $2, $3) on conflict (email) do nothing", [userId, email, passwordHash]);
  await db.query("insert into profiles (user_id, display_name) values ($1, $2) on conflict (user_id) do nothing", [userId, "Alex Demo"]);
  await db.query("insert into organizations (id, name, slug) values ($1, $2, $3) on conflict (id) do nothing", [orgId, "Harborline Operations", "flowops"]);
  await db.query("insert into organization_members (id, organization_id, user_id, role) values ($1, $2, $3, $4) on conflict do nothing", ["mem_1", orgId, userId, "owner"]);

  const projectId = "proj_ops";
  await db.query("insert into projects (id, organization_id, name) values ($1, $2, $3)", [projectId, orgId, "Incident response"]);
  const cards = [
    ["t1", "Page the on-call", "in_progress", 0],
    ["t2", "Write the timeline", "backlog", 1],
    ["t3", "Customer note", "review", 2],
    ["t4", "Close the ticket", "done", 3],
  ];
  for (const [id, title, column, position] of cards) {
    await db.query(
      "insert into tasks (id, project_id, title, column_key, position) values ($1, $2, $3, $4, $5)",
      [id, projectId, title, column, position],
    );
  }
  await db.query(
    "insert into activity (id, organization_id, actor_email, message) values ($1, $2, $3, $4)",
    ["a1", orgId, email, "Seeded the Harborline operations board"],
  );
  console.log("Seeded FlowOps");
}

main();
