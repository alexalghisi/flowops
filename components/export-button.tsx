"use client";

import { exportCsvAction } from "@/features/work/actions";
import { Button } from "@/components/ui/button";

export function ExportButton() {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={async () => {
        const csv = await exportCsvAction();
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "tasks.csv";
        a.click();
        URL.revokeObjectURL(url);
      }}
    >
      Export CSV
    </Button>
  );
}
