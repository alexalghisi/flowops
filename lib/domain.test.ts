import { describe, expect, it } from "vitest";
import { canMoveTask, exportTasksCsv } from "./domain";

describe("canMoveTask", () => {
  it("blocks viewers", () => {
    expect(canMoveTask("viewer")).toBe(false);
    expect(canMoveTask("owner")).toBe(true);
  });
});

describe("exportTasksCsv", () => {
  it("quotes commas", () => {
    expect(exportTasksCsv([{ title: "Fix, later", column_key: "done" }])).toContain('"Fix, later"');
  });
});
