import type { CRMLead } from "@/types/crm";

export function downloadJSON(data: CRMLead[]) {
  const json = JSON.stringify(data, null, 2);

  const blob = new Blob([json], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "lead-funnel-data.json";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

export function downloadCSV(data: CRMLead[]) {
  const headers = [
    "id",
    "date",
    "location",
    "team",
    "product",
    "source",
    "stage",
    "daysInStage",
    "value",
  ];

  const rows = data.map((lead) => [
    lead.id,
    lead.date,
    lead.location,
    lead.team,
    lead.product,
    lead.source,
    lead.stage,
    lead.daysInStage,
    lead.value,
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      row
        .map((value) =>
          `"${String(value).replace(/"/g, '""')}"`
        )
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "lead-funnel-data.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}