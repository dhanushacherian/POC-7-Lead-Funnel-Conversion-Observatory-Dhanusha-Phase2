"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

import type { CRMLead } from "@/types/crm";

type CohortHeatmapProps = {
  data: CRMLead[];
};

const months = ["Jan", "Feb", "Mar"];
const stages = ["Lead", "Qualified", "Opportunity", "Proposal", "Won"];

export default function CohortHeatmap({ data }: CohortHeatmapProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const heatmapData: [number, number, number][] = [];

    months.forEach((month, monthIndex) => {
      const monthRecords = data.filter(
        (lead) => lead.date.slice(5, 7) === String(monthIndex + 1).padStart(2, "0")
      );

      stages.forEach((stage, stageIndex) => {
        const count = monthRecords.filter(
          (lead) => lead.stage === stage
        ).length;

        const percentage =
          monthRecords.length > 0
            ? Number(((count / monthRecords.length) * 100).toFixed(1))
            : 0;

        heatmapData.push([monthIndex, stageIndex, percentage]);
      });
    });

    const option: echarts.EChartsOption = {
      backgroundColor: "transparent",

      tooltip: {
        position: "top",
        backgroundColor: "rgba(7, 9, 18, 0.96)",
        borderColor: "rgba(255,255,255,0.1)",
        textStyle: {
          color: "#ffffff",
        },
        formatter: (params: unknown) => {
          const item = params as {
            value: [number, number, number];
          };

          const [monthIndex, stageIndex, value] = item.value;

          return `
            <div style="font-weight:600">
              ${months[monthIndex]} · ${stages[stageIndex]}
            </div>
            <div style="margin-top:4px;opacity:.7">
              ${value}% of cohort
            </div>
          `;
        },
      },

      grid: {
        left: "12%",
        right: "5%",
        top: "10%",
        bottom: "14%",
      },

      xAxis: {
        type: "category",
        data: months,
        splitArea: {
          show: true,
        },
        axisLabel: {
          color: "rgba(255,255,255,0.5)",
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,0.08)",
          },
        },
      },

      yAxis: {
        type: "category",
        data: stages,
        splitArea: {
          show: true,
        },
        axisLabel: {
          color: "rgba(255,255,255,0.5)",
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,0.08)",
          },
        },
      },

      visualMap: {
        min: 0,
        max: 100,
        calculable: false,
        orient: "horizontal",
        left: "center",
        bottom: "0%",
        textStyle: {
          color: "rgba(255,255,255,0.35)",
        },
      },

      series: [
        {
          name: "Cohort Distribution",
          type: "heatmap",
          data: heatmapData,

          label: {
            show: true,
            color: "#ffffff",
            fontSize: 11,
            formatter: (params: unknown) => {
              const item = params as {
                value: [number, number, number];
              };

              return `${item.value[2]}%`;
            },
          },

          itemStyle: {
            borderColor: "rgba(7,9,18,0.8)",
            borderWidth: 2,
            borderRadius: 4,
          },

          emphasis: {
            itemStyle: {
              shadowBlur: 18,
              shadowColor: "rgba(124,140,255,0.3)",
            },
          },
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [data]);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 shadow-2xl backdrop-blur-xl md:p-6">
      <div className="mb-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-indigo-300/50">
          Cohort Signal
        </p>

        <h2 className="mt-2 text-xl font-semibold tracking-tight text-white md:text-2xl">
          Cohort Conversion Heatmap
        </h2>

        <p className="mt-1 text-sm text-white/40">
          Stage distribution across monthly lead cohorts
        </p>
      </div>

      <div
        ref={chartRef}
        className="h-[390px] w-full md:h-[430px]"
        aria-label="Cohort conversion heatmap"
      />

      <div className="border-t border-white/[0.06] pt-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
          Synthetic CRM Data · Percentages represent records within each monthly cohort
        </p>
      </div>
    </div>
  );
}