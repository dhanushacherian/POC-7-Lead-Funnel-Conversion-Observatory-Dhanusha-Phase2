"use client";

type MetadataModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MetadataModal({
  isOpen,
  onClose,
}: MetadataModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-6">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close developer information"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-black/70 backdrop-blur-md"
      />

      {/* Modal */}
      <div className="cinematic-enter relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-white/[0.10] bg-[#090b16]/95 shadow-2xl backdrop-blur-2xl">
        {/* Glow */}
        <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-indigo-500/[0.10] blur-[100px]" />

        {/* Header */}
        <div className="relative flex items-start justify-between border-b border-white/[0.07] px-6 py-5">
          <div className="min-w-0 pr-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-indigo-300/50">
              Developer Signature
            </p>

            <h2 className="mt-2 text-xl font-semibold leading-tight text-white">
              Lead Funnel Conversion Observatory
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/50 transition hover:bg-white/[0.08] hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Metadata */}
        <div className="relative space-y-3 p-6">
          {/* Architect */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Architect
            </p>

            <p className="mt-2 text-sm font-medium text-white/80">
              Dhanusha Cherian
            </p>
          </div>

          {/* PoC + GitHub */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                PoC ID
              </p>

              <p className="mt-2 text-sm font-medium text-white/80">
                PoC-7
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                GitHub
              </p>

              <p className="mt-2 whitespace-nowrap text-[13px] font-medium text-white/80">
                @dhanushacherian
              </p>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Technology Stack
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "ECharts",
              ].map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-indigo-300/[0.12] bg-indigo-300/[0.04] px-3 py-1.5 text-[10px] text-indigo-100/60"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          {/* Internship */}
          <div className="rounded-2xl border border-indigo-300/[0.10] bg-indigo-300/[0.035] p-4">
            <p className="text-[9px] uppercase tracking-[0.25em] text-indigo-200/40">
              Internship
            </p>

            <p className="mt-2 text-sm font-medium text-white/70">
              Infocreon Internship
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.07] px-6 py-4">
          <p className="text-center text-[9px] uppercase tracking-[0.25em] text-white/20">
            Lead Funnel Conversion Observatory · PoC-7
          </p>
        </div>
      </div>
    </div>
  );
}