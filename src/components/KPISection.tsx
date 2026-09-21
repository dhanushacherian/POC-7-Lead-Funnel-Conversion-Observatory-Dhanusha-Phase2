"use client";

import {
  getAverageStageAge,
  getOverallConversion,
  getOpportunityCount,
  getTotalLeads,
  getWonLeads,
  getWonValue,
} from "@/lib/calculations";

import type { CRMLead } from "@/types/crm";

type KPISectionProps = {
  data: CRMLead[];
};

export default function KPISection({ data }: KPISectionProps) {
  const totalLeads = getTotalLeads(data);
  const opportunities = getOpportunityCount(data);
  const wonLeads = getWonLeads(data);
  const conversion = getOverallConversion(data);
  const averageAge = getAverageStageAge(data);
  const wonValue = getWonValue(data);

  const kpis = [
    {
      label: "Total Leads",
      value: totalLeads.toLocaleString(),
      description: "Synthetic CRM records",
    },
    {
      label: "Opportunities",
      value: opportunities.toLocaleString(),
      description: "Active opportunity stage",
    },
    {
      label: "Won Deals",
      value: wonLeads.toLocaleString(),
      description: "Successfully converted",
    },
    {
      label: "Conversion Rate",
      value: `${conversion}%`,
      description: "Lead to Won",
    },
    {
      label: "Average Stage Age",
      value: `${averageAge} days`,
      description: "Across all stages",
    },
    {
      label: "Won Pipeline Value",
      value: `₹${wonValue.toLocaleString("en-IN")}`,
      description: "Value of won deals",
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
      {kpis.map((kpi, index) => (
        <div
          key={kpi.label}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-indigo-300/20 hover:bg-white/[0.055]"
        >
          <div className="absolute right-0 top-0 h-16 w-16 rounded-full bg-indigo-400/[0.04] blur-2xl transition duration-300 group-hover:bg-indigo-400/[0.10]" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
                {kpi.label}
              </p>

              <span className="text-[10px] text-white/20">
                0{index + 1}
              </span>
            </div>

            <p className="mt-4 truncate text-2xl font-semibold tracking-tight text-white">
              {kpi.value}
            </p>

            <p className="mt-2 text-[11px] text-white/35">
              {kpi.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}