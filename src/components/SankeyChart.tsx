"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

import type { CRMLead } from "@/types/crm";

type SankeyChartProps = {
  data: CRMLead[];
};

export default function SankeyChart({ data }: SankeyChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chartRef.current;

    if (!container) return;

    const chart = echarts.init(container);
    let disposed = false;

    const countAtOrAfter = (stages: string[]) =>
      data.filter((lead) => stages.includes(lead.stage)).length;

    const nodes = [
      { name: "Lead" },
      { name: "Qualified" },
      { name: "Opportunity" },
      { name: "Proposal" },
      { name: "Won" },
    ];

    const links = [
      {
        source: "Lead",
        target: "Qualified",
        value: countAtOrAfter([
          "Qualified",
          "Opportunity",
          "Proposal",
          "Won",
        ]),
      },
      {
        source: "Qualified",
        target: "Opportunity",
        value: countAtOrAfter([
          "Opportunity",
          "Proposal",
          "Won",
        ]),
      },
      {
        source: "Opportunity",
        target: "Proposal",
        value: countAtOrAfter([
          "Proposal",
          "Won",
        ]),
      },
      {
        source: "Proposal",
        target: "Won",
        value: countAtOrAfter(["Won"]),
      },
    ].filter((link) => link.value > 0);

    const option: echarts.EChartsOption = {
      backgroundColor: "transparent",

      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(7, 9, 18, 0.96)",
        borderColor: "rgba(255,255,255,0.1)",
        textStyle: {
          color: "#ffffff",
        },
      },

      series: [
        {
          type: "sankey",

          left: "2%",
          right: "4%",
          top: "8%",
          bottom: "8%",

          nodeWidth: 18,
          nodeGap: 18,

          draggable: true,

          emphasis: {
            focus: "adjacency",
          },

          label: {
            color: "#ffffff",
            fontSize: 12,
            fontWeight: 600,
          },

          lineStyle: {
            color: "gradient",
            opacity: 0.35,
            curveness: 0.5,
          },

          itemStyle: {
            borderColor: "rgba(255,255,255,0.15)",
            borderWidth: 1,
          },

          data: nodes,
          links,
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => {
      if (disposed || chart.isDisposed()) {
        return;
      }

      try {
        chart.resize();
      } catch {
        // Ignore resize calls that occur during component teardown.
      }
    };

    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    resizeObserver.observe(container);

    return () => {
      disposed = true;

      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();

      if (!chart.isDisposed()) {
        chart.dispose();
      }
    };
  }, [data]);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 shadow-2xl backdrop-blur-xl md:p-6">
      <div className="mb-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-indigo-300/50">
            Flow Intelligence
          </p>

          <h2 className="mt-2 text-xl font-semibold tracking-tight text-white md:text-2xl">
            Stage Flow
          </h2>

          <p className="mt-1 max-w-xl text-sm text-white/40">
            Visualizes the movement of records through the conversion pipeline
          </p>
        </div>

        <div className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5">
          <span className="text-[10px] uppercase tracking-wider text-white/35">
            Interactive
          </span>
        </div>
      </div>

      <div
        ref={chartRef}
        className="h-[400px] w-full md:h-[450px]"
        aria-label="Lead stage flow Sankey chart"
      />

      <div className="border-t border-white/[0.06] pt-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
          Synthetic stage-flow model · Based on current CRM stage distribution
        </p>
      </div>
    </div>
  );
}