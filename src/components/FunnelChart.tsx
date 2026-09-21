"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

import type { CRMLead, LeadStage } from "@/types/crm";

type FunnelChartProps = {
  data: CRMLead[];
  onStageClick?: (stage: LeadStage) => void;
};

const funnelStages: LeadStage[] = [
  "Lead",
  "Qualified",
  "Opportunity",
  "Proposal",
  "Won",
];

export default function FunnelChart({
  data,
  onStageClick,
}: FunnelChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const funnelData = funnelStages.map((stage) => ({
      name: stage,
      value: data.filter((lead) => lead.stage === stage).length,
    }));

    const maxValue = Math.max(
      ...funnelData.map((item) => item.value),
      1
    );

    const option: echarts.EChartsOption = {
      backgroundColor: "transparent",

      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(7, 9, 18, 0.96)",
        borderColor: "rgba(255,255,255,0.1)",
        textStyle: {
          color: "#ffffff",
        },
        formatter: "{b}: {c} leads",
      },

      series: [
        {
          name: "Lead Funnel",
          type: "funnel",

          left: "10%",
          top: "5%",
          bottom: "5%",
          width: "80%",

          min: 0,
          max: maxValue,

          minSize: "20%",
          maxSize: "100%",

          sort: "none",
          gap: 6,

          label: {
            show: true,
            position: "inside",

            color: "#ffffff",
            fontSize: 15,
            fontWeight: 600,

            formatter: "{b}\n{c} leads",
          },

          labelLine: {
            show: false,
          },

          itemStyle: {
            borderColor: "rgba(255,255,255,0.12)",
            borderWidth: 1,
            opacity: 0.9,
          },

          emphasis: {
            label: {
              fontSize: 17,
              fontWeight: 700,
            },

            itemStyle: {
              opacity: 1,
              shadowBlur: 25,
              shadowColor: "rgba(124,140,255,0.25)",
            },
          },

          data: funnelData,
        },
      ],
    };

    chart.setOption(option);

    const handleChartClick = (params: {
      componentType?: string;
      seriesType?: string;
      name?: string;
    }) => {
      if (
        params.componentType === "series" &&
        params.seriesType === "funnel" &&
        params.name &&
        onStageClick
      ) {
        onStageClick(params.name as LeadStage);
      }
    };

    chart.on("click", handleChartClick);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      chart.off("click", handleChartClick);
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [data, onStageClick]);

  return (
    <div className="observatory-glow overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 shadow-2xl backdrop-blur-xl md:p-6">
      <div className="mb-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-indigo-300/50">
            Primary Signal
          </p>

          <h2 className="mt-2 text-xl font-semibold tracking-tight text-white md:text-2xl">
            Lead Funnel
          </h2>

          <p className="mt-1 max-w-xl text-sm text-white/40">
            Lead progression from initial contact to successful conversion
          </p>
        </div>

        <div className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5">
          <span className="text-[10px] uppercase tracking-wider text-white/35">
            {data.length} records
          </span>
        </div>
      </div>

      <div
        ref={chartRef}
        className="h-[440px] w-full cursor-pointer md:h-[500px]"
        aria-label="Lead funnel conversion chart"
      />

      <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
          Synthetic CRM Data · Funnel stages shown in pipeline order
        </p>

        <p className="hidden text-[10px] uppercase tracking-[0.15em] text-indigo-200/35 sm:block">
          Click a stage for intelligence
        </p>
      </div>
    </div>
  );
}