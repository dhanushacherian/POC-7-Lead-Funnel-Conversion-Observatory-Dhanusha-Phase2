"use client";

type IntelligencePanelProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  stage?: string;
};

const stageInsights: Record<
  string,
  {
    insight: string;
    investigation: string;
    nextStep: string;
  }
> = {
  Lead: {
    insight:
      "Review lead volume and identify whether incoming leads are progressing into qualification efficiently.",
    investigation:
      "Compare lead sources, locations, teams, and products to identify where new leads are being delayed or lost.",
    nextStep:
      "Review lead sources and qualification performance, then investigate the records with the longest stage age.",
  },

  Qualified: {
    insight:
      "Qualified leads represent the transition from initial interest into sales-ready opportunities.",
    investigation:
      "Check whether qualified leads are progressing into Opportunity or remaining in the stage for too long.",
    nextStep:
      "Investigate qualification criteria, team performance, and aging records to reduce leakage before Opportunity.",
  },

  Opportunity: {
    insight:
      "Opportunity is a key conversion checkpoint where pipeline value can be lost through slow progression.",
    investigation:
      "Compare Opportunity aging and conversion across location, team, product, and date filters to identify bottlenecks.",
    nextStep:
      "Prioritize aging opportunities and investigate why they are not progressing toward Proposal.",
  },

  Proposal: {
    insight:
      "Proposal is close to the final conversion stage, so delays here can directly affect win performance.",
    investigation:
      "Review proposal aging, win rates, and differences across teams, locations, and products.",
    nextStep:
      "Investigate long-aging proposals and identify the main reasons they are not converting to Won.",
  },

  Won: {
    insight:
      "Won deals represent successful conversion and the realized portion of the pipeline.",
    investigation:
      "Compare winning patterns across location, team, product, and acquisition source to understand what drives successful conversion.",
    nextStep:
      "Identify the highest-performing segments and investigate whether those patterns can be replicated across the pipeline.",
  },

  Pipeline: {
    insight:
      "Select a funnel stage or visualization to investigate conversion performance.",
    investigation:
      "Investigate where leads are slowing down or dropping out of the pipeline and compare the affected stage across location, team, product, and date filters.",
    nextStep:
      "Review the selected stage, identify the largest leakage or aging signal, and drill into the underlying lead records.",
  },
};

export default function IntelligencePanel({
  isOpen,
  onClose,
  title = "Management Intelligence",
  stage = "Pipeline",
}: IntelligencePanelProps) {
  const intelligence =
    stageInsights[stage] ?? stageInsights.Pipeline;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close intelligence panel"
          onClick={onClose}
          className="fixed inset-0 z-40 cursor-default bg-black/40 backdrop-blur-[2px]"
        />
      )}

      {/* Intelligence Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md transform flex-col border-l border-white/10 bg-slate-950/95 shadow-2xl backdrop-blur-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between p-6">
          <div className="min-w-0 pr-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              Intelligence Interface
            </p>

            <h2 className="mt-2 text-xl font-semibold text-white">
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 text-lg text-white/60 transition hover:bg-white/10 hover:text-white"
            aria-label="Close intelligence panel"
          >
            ×
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6 pr-4">
          <div className="space-y-5">
            {/* Selected Area */}
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs uppercase tracking-wider text-white/40">
                Selected Area
              </p>

              <p className="mt-2 text-lg font-medium text-white">
                {stage}
              </p>
            </div>

            {/* Key Insight */}
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs uppercase tracking-wider text-white/40">
                Key Insight
              </p>

              <p className="mt-2 text-sm leading-6 text-white/70">
                {intelligence.insight}
              </p>
            </div>

            {/* Management Investigation */}
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs uppercase tracking-wider text-white/40">
                Management Investigation
              </p>

              <p className="mt-2 text-sm leading-6 text-white/70">
                {intelligence.investigation}
              </p>
            </div>

            {/* Recommended Next Step */}
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs uppercase tracking-wider text-white/40">
                Recommended Next Step
              </p>

              <p className="mt-2 text-sm leading-6 text-white/70">
                {intelligence.nextStep}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}