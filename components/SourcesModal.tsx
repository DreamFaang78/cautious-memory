"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, BookOpen } from "lucide-react";
import { EVIDENCE_STUDIES } from "@/lib/evidence";

interface SourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SourcesModal({ isOpen, onClose }: SourcesModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden bg-[#0A101D] border border-primary/20 rounded-2xl shadow-[0_0_50px_rgba(0,229,195,0.15)] flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-[#070B14]/80 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground font-heading">Research Evidence & Source Index</h3>
                  <p className="text-xs text-muted">Peer-reviewed publications, trials, and official government data citations</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-white/5 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content list */}
            <div className="overflow-y-auto p-6 space-y-6 divide-y divide-border/60">
              <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/20 text-xs text-muted leading-relaxed">
                <strong className="text-primary font-medium">Research Scope Rule: </strong>
                All listed research demonstrates the empirical potential of clinical AI and device integration categories. They are published findings by independent academic institutions and government registries, not claims of HospitalOS outcomes.
              </div>

              {EVIDENCE_STUDIES.map((study, idx) => (
                <div key={study.id} className="pt-5 first:pt-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/30">
                      [{idx + 1}] {study.category}
                    </span>
                    <span className="text-xs text-muted font-mono">{study.source}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">{study.title}</h4>
                  <p className="text-xs text-muted mb-2 italic">“{study.finding}”</p>
                  <p className="text-xs text-muted/90 font-mono text-[11px] bg-black/30 p-2.5 rounded-lg border border-border/40">
                    {study.fullCitation}
                  </p>
                  {study.doiOrUrl && (
                    <a
                      href={study.doiOrUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-primary transition-colors mt-2"
                    >
                      <span>View published article</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-[#070B14] flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-semibold rounded-lg bg-surface hover:bg-surface-hover text-foreground border border-border transition-colors"
              >
                Close Sources
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
