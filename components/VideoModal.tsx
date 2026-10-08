"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Sparkles } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-4xl bg-[#090F1C] border border-primary/30 rounded-2xl shadow-[0_0_60px_rgba(0,229,195,0.2)] overflow-hidden z-10"
          >
            <div className="flex items-center justify-between p-4 border-b border-border bg-[#070B14]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-semibold text-foreground font-heading">
                  The 60-Second Story: Operating India's Hospitals on Intelligence
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-white/5 transition-colors"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video preview / simulated story container */}
            <div className="relative aspect-video bg-[#05080E] flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/40 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,229,195,0.25)]">
                <Play className="w-8 h-8 text-primary ml-1" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Pitch Reel Preview (Simulated Story Deck)
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground max-w-lg mb-2">
                One AI brain for every patient, every doctor, every machine.
              </h3>
              <p className="text-sm text-muted max-w-md mb-6">
                From chaotic paper slips and WhatsApp threads to a single live intelligent operating system designed for Indian hospital realities.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#demo"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-[#070B14] font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(0,229,195,0.3)] hover:scale-105 transition-transform"
                >
                  Explore Interactive Demo Instead
                </a>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 bg-white/5 border border-border text-xs font-medium text-foreground rounded-xl hover:bg-white/10 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
