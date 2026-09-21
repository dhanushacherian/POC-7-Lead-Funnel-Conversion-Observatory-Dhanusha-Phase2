"use client";

import { useMemo, useState } from "react";

import { downloadCSV, downloadJSON } from "@/lib/download";

import CohortHeatmap from "@/components/CohortHeatmap";
import FilterBar from "@/components/FilterBar";
import FunnelChart from "@/components/FunnelChart";
import IntelligencePanel from "@/components/IntelligencePanel";
import KPISection from "@/components/KPISection";
import MetadataModal from "@/components/MetadataModal";
import SankeyChart from "@/components/SankeyChart";
import StageAging from "@/components/StageAging";

import {
  crmData,
  locations,
  products,
  teams,
} from "@/data/crmData";

export default function Home() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("All");
  const [team, setTeam] = useState("All");
  const [product, setProduct] = useState("All");

  const [isIntelligenceOpen, setIsIntelligenceOpen] =
    useState(false);

  const [selectedStage, setSelectedStage] =
    useState<string>("Pipeline");

  const [isMetadataOpen, setIsMetadataOpen] =
    useState(false);

  const filteredData = useMemo(() => {
    return crmData.filter((lead) => {
      const matchesStartDate =
        !startDate || lead.date >= startDate;

      const matchesEndDate =
        !endDate || lead.date <= endDate;

      const matchesLocation =
        location === "All" ||
        lead.location === location;

      const matchesTeam =
        team === "All" ||
        lead.team === team;

      const matchesProduct =
        product === "All" ||
        lead.product === product;

      return (
        matchesStartDate &&
        matchesEndDate &&
        matchesLocation &&
        matchesTeam &&
        matchesProduct
      );
    });
  }, [
    startDate,
    endDate,
    location,
    team,
    product,
  ]);

  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
    setLocation("All");
    setTeam("All");
    setProduct("All");
  };

  return (
    <div className="min-h-screen bg-[#070912] text-white">

      {/* Atmospheric Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute left-1/2 top-[-300px] h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-500/[0.07] blur-[140px]" />

        <div className="absolute bottom-[-300px] right-[-200px] h-[600px] w-[600px] rounded-full bg-violet-500/[0.05] blur-[140px]" />

        <div className="absolute left-[-200px] top-[40%] h-[500px] w-[500px] rounded-full bg-slate-500/[0.04] blur-[130px]" />

      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#070912]/80 backdrop-blur-2xl">

        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          <div className="min-w-0">

            <div className="flex items-center gap-3">

              <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.7)]" />

              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/35">
                Infocreon Internship
              </p>

            </div>

            <h1 className="mt-2 truncate text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Lead Funnel Conversion Observatory
            </h1>

            <p className="mt-1 hidden text-xs text-white/35 sm:block">
              Conversion intelligence · stage leakage · pipeline aging
            </p>

          </div>

          <button
            type="button"
            onClick={() => setIsMetadataOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-sm font-medium text-white/60 transition hover:border-white/[0.15] hover:bg-white/[0.07] hover:text-white"
            aria-label="Open developer information"
          >
            ⓘ
          </button>

        </div>

      </header>

      {/* Main */}
      <main className="relative mx-auto min-h-screen max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

        {/* Observatory Source */}
        <section className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-xl md:flex-row md:items-center">

          <div>

            <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
              Observatory Source
            </p>

            <p className="mt-1 text-sm font-medium text-white/70">
              Synthetic CRM Dataset
            </p>

            <p className="mt-1 text-xs text-white/35">
              Demonstration data for Lead → Opportunity → Win analysis
            </p>

          </div>

          <div className="flex items-center gap-2 self-start rounded-full border border-emerald-300/[0.12] bg-emerald-300/[0.04] px-3 py-1.5 md:self-auto">

            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            <span className="text-[10px] uppercase tracking-wider text-emerald-200/60">
              Data Ready
            </span>

          </div>

        </section>

        {/* Filters */}
        <FilterBar
          startDate={startDate}
          endDate={endDate}
          location={location}
          team={team}
          product={product}
          locations={locations}
          teams={teams}
          products={products}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onLocationChange={setLocation}
          onTeamChange={setTeam}
          onProductChange={setProduct}
          onReset={resetFilters}
        />

        {/* Active Scope */}
        <div className="mt-4 flex flex-wrap items-center gap-2">

          <span className="text-[10px] uppercase tracking-[0.25em] text-white/25">
            Active Scope
          </span>

          <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1 text-[10px] text-white/40">
            {filteredData.length} records
          </span>

          {location !== "All" && (
            <span className="rounded-full border border-indigo-300/[0.12] bg-indigo-300/[0.04] px-3 py-1 text-[10px] text-indigo-200/60">
              Location: {location}
            </span>
          )}

          {team !== "All" && (
            <span className="rounded-full border border-indigo-300/[0.12] bg-indigo-300/[0.04] px-3 py-1 text-[10px] text-indigo-200/60">
              Team: {team}
            </span>
          )}

          {product !== "All" && (
            <span className="rounded-full border border-indigo-300/[0.12] bg-indigo-300/[0.04] px-3 py-1 text-[10px] text-indigo-200/60">
              Product: {product}
            </span>
          )}

          {(startDate || endDate) && (
            <span className="rounded-full border border-indigo-300/[0.12] bg-indigo-300/[0.04] px-3 py-1 text-[10px] text-indigo-200/60">
              Date range active
            </span>
          )}

        </div>

        {/* Data Export */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 backdrop-blur-xl">

          <div>

            <p className="text-[10px] uppercase tracking-[0.25em] text-white/25">
              Data Export
            </p>

            <p className="mt-1 text-xs text-white/35">
              Download the currently filtered CRM records
            </p>

          </div>

          <div className="flex gap-2">

            <button
              type="button"
              onClick={() => downloadCSV(filteredData)}
              className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/60 transition hover:border-white/[0.15] hover:bg-white/[0.08] hover:text-white"
            >
              Download CSV
            </button>

            <button
              type="button"
              onClick={() => downloadJSON(filteredData)}
              className="rounded-xl border border-indigo-300/[0.12] bg-indigo-300/[0.05] px-4 py-2 text-xs font-medium text-indigo-100/70 transition hover:border-indigo-300/[0.25] hover:bg-indigo-300/[0.10] hover:text-white"
            >
              Download JSON
            </button>

          </div>

        </div>

        {/* KPI Section */}
        <section className="mt-6">
          <KPISection data={filteredData} />
        </section>

        {/* Primary Funnel */}
        <section className="relative mt-8 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-2 shadow-2xl">

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(99,102,241,0.10),transparent_45%)]" />

          <div className="relative">

            <FunnelChart
              data={filteredData}
              onStageClick={(stage) => {
                setSelectedStage(stage);
                setIsIntelligenceOpen(true);
              }}
            />

          </div>

        </section>

        {/* Secondary Visualizations */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">

          <SankeyChart
            data={filteredData}
          />

          <CohortHeatmap
            data={filteredData}
          />

        </section>

        {/* Stage Aging */}
        <section className="mt-6">

          <StageAging
            data={filteredData}
          />

        </section>

        {/* Decision Layer */}
        <section className="relative mt-8 overflow-hidden rounded-3xl border border-indigo-300/[0.10] bg-indigo-300/[0.025] p-6 md:p-8">

          <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-indigo-500/[0.08] blur-[100px]" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <p className="text-[10px] uppercase tracking-[0.3em] text-indigo-200/40">
                Decision Layer
              </p>

              <h2 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                What should management investigate next?
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/40">
                Open the intelligence layer to review funnel leakage,
                stage-aging signals, conversion opportunities, and
                data-quality context.
              </p>

            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedStage("Pipeline");
                setIsIntelligenceOpen(true);
              }}
              className="group shrink-0 rounded-xl border border-indigo-300/[0.15] bg-indigo-300/[0.07] px-5 py-3 text-sm font-medium text-indigo-100 transition hover:border-indigo-300/[0.3] hover:bg-indigo-300/[0.12]"
            >
              <span className="mr-2 transition group-hover:mr-3">
                Open Management Intelligence
              </span>

              <span className="text-indigo-200/50">
                →
              </span>

            </button>

          </div>

        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-white/[0.06] py-6">

          <div className="flex flex-col justify-between gap-2 text-[10px] uppercase tracking-[0.2em] text-white/20 sm:flex-row">

            <span>
              Lead Funnel Conversion Observatory · PoC-7
            </span>

            <span>
              Synthetic Data · Decision Support Interface
            </span>

          </div>

        </footer>

      </main>

      {/* Management Intelligence */}
      <IntelligencePanel
        isOpen={isIntelligenceOpen}
        onClose={() =>
          setIsIntelligenceOpen(false)
        }
        stage={selectedStage}
      />

      {/* Developer Metadata */}
      <MetadataModal
        isOpen={isMetadataOpen}
        onClose={() =>
          setIsMetadataOpen(false)
        }
      />

    </div>
  );
}