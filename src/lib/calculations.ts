import type { CRMLead } from "@/types/crm";

export function getStageCounts(data: CRMLead[]) {
  return data.reduce<Record<string, number>>((counts, lead) => {
    counts[lead.stage] = (counts[lead.stage] || 0) + 1;
    return counts;
  }, {});
}

export function getTotalLeads(data: CRMLead[]) {
  return data.length;
}

export function getWonLeads(data: CRMLead[]) {
  return data.filter((lead) => lead.stage === "Won").length;
}

export function getOpportunityCount(data: CRMLead[]) {
  return data.filter(
    (lead) => lead.stage === "Opportunity"
  ).length;
}

export function getOverallConversion(data: CRMLead[]) {
  if (data.length === 0) return 0;

  const won = getWonLeads(data);

  return (won / data.length) * 100;
}

export function getAverageStageAge(data: CRMLead[]) {
  if (data.length === 0) return 0;

  const total = data.reduce(
    (sum, lead) => sum + Number(lead.daysInStage),
    0
  );

  return total / data.length;
}

export function getAverageAgeByStage(
  data: CRMLead[]
): Record<string, number> {
  const stages = [
    "Lead",
    "Qualified",
    "Opportunity",
    "Proposal",
    "Won",
  ];

  const result: Record<string, number> = {};

  stages.forEach((stage) => {
    const records = data.filter(
      (lead) => lead.stage === stage
    );

    if (records.length === 0) {
      result[stage] = 0;
      return;
    }

    const totalDays = records.reduce(
      (sum, lead) => sum + Number(lead.daysInStage),
      0
    );

    result[stage] = totalDays / records.length;
  });

  return result;
}

export function getTotalPipelineValue(data: CRMLead[]) {
  return data.reduce(
    (sum, lead) => sum + Number(lead.value || 0),
    0
  );
}

export function getWonValue(data: CRMLead[]) {
  return data
    .filter((lead) => lead.stage === "Won")
    .reduce(
      (sum, lead) => sum + Number(lead.value || 0),
      0
    );
}