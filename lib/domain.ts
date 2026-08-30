export const COLUMNS = ["backlog", "in_progress", "review", "done"] as const;
export type ColumnKey = (typeof COLUMNS)[number];

export function canMoveTask(role: string): boolean {
  return role !== "viewer";
}

export function exportTasksCsv(
  tasks: { title: string; column_key: string }[],
): string {
  const header = "title,column";
  const lines = tasks.map((task) => `${csv(task.title)},${csv(task.column_key)}`);
  return [header, ...lines].join("\n");
}

function csv(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replaceAll('"', '""')}"`;
  return value;
}
