
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [demoScene, setDemoScene] = useState<"fd" | "doc" | "admin">("fd");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const nodes: any[] = [];
    for (let i = 0; i < 40; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 4 + 2,
        color: i % 3 === 0 ? "#00E5C3" : i % 3 === 1 ? "#4F7CFF" : "#FF9F43",
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 229, 195, ${1 - dist / 150})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] overflow-hidden">
      
      {/* --- Sticky Nav --- */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
          <div className="font-heading font-bold text-xl flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_rgba(0,229,195,0.3)]">
              +
            </span>
            HospitalOS
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
            <a href="#platform" className="hover:text-primary transition-colors">Product</a>
            <a href="#how" className="hover:text-primary transition-colors">How it works</a>
            <a href="#audience" className="hover:text-primary transition-colors">For Doctors</a>
            <a href="#india" className="hover:text-primary transition-colors">For India</a>
            <a href="#developers" className="hover:text-primary transition-colors">Developers</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="px-3 py-1 text-sm border border-border rounded-md hover:border-primary transition-colors"
            >
              {lang === "en" ? "HI" : "EN"}
            </button>
            <button className="px-5 py-2 bg-gradient-to-br from-primary to-secondary text-background font-bold rounded-lg shadow-[0_0_20px_rgba(0,229,195,0.2)] hover:scale-105 transition-transform">
              Book a Demo
            </button>
          </div>
        </div>
      </nav>

      {/* --- Hero --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background to-background z-10" />
        
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold tracking-widest uppercase mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Built for India
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 ${lang === "hi" ? "font-hindi" : "font-heading"}`}
          >
            {lang === "en" ? (
              <>Your hospital,<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-highlight">running on intelligence.</span></>
            ) : (
              <>Your hospital, running on intelligence.</>
            )}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10"
          >
            One AI platform that manages patients, doctors and medical machines, so your team can focus on care, not chaos.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-background font-bold rounded-xl shadow-[0_0_30px_rgba(0,229,195,0.3)] hover:scale-105 transition-transform flex items-center gap-2">
              Book a Live Demo
            </button>
            <button className="px-8 py-4 bg-white/5 border border-border text-foreground font-semibold rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 backdrop-blur-sm">
              Watch the 60-sec Story
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- Platform Bento Grid --- */}
      <section id="platform" className="py-32 px-6 max-w-7xl mx-auto z-20 relative">
        <div className="text-center mb-16">
          <div className="text-primary text-xs font-bold tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
            <div className="w-6 h-0.5 bg-primary rounded-full" /> The Platform
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">Four <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">superpowers</span> in one system</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-surface border border-border rounded-3xl p-8 relative overflow-hidden group hover:border-primary transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-6 shadow-[0_0_20px_rgba(0,229,195,0.15)]">P</div>
            <h3 className="text-xl font-bold font-heading mb-2">Patient Journey Manager</h3>
            <p className="text-muted text-sm mb-6">WhatsApp booking, smart queue, digital registration in Hindi and English.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary">QR Check-in</span>
              <span className="text-xs px-3 py-1 rounded-full border border-border bg-white/5">Smart Queue</span>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-3xl p-8 relative overflow-hidden group hover:border-secondary transition-colors">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-2xl mb-6 shadow-[0_0_20px_rgba(79,124,255,0.15)]">D</div>
            <h3 className="text-xl font-bold font-heading mb-2">Doctor AI Co-Pilot</h3>
            <p className="text-muted text-sm mb-6">Voice-to-notes, auto-summarised history, suggested investigations.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 text-secondary">Voice Notes</span>
              <span className="text-xs px-3 py-1 rounded-full border border-border bg-white/5">AI Summary</span>
            </div>
          </div>
          
          <div className="bg-surface border border-border rounded-3xl p-8 relative overflow-hidden group hover:border-highlight transition-colors">
            <div className="w-12 h-12 rounded-xl bg-highlight/10 flex items-center justify-center text-2xl mb-6 shadow-[0_0_20px_rgba(255,159,67,0.15)]">M</div>
            <h3 className="text-xl font-bold font-heading mb-2">Machine Integration Hub</h3>
            <p className="text-muted text-sm mb-6">Connects lab analyzers, monitors and imaging devices.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full border border-highlight/30 bg-highlight/10 text-highlight">Lab Analyzers</span>
              <span className="text-xs px-3 py-1 rounded-full border border-border bg-white/5">ECG Monitors</span>
            </div>
          </div>
          
          <div className="bg-surface border border-border rounded-3xl p-8 relative overflow-hidden group hover:border-primary transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-2xl mb-6 shadow-[0_0_20px_rgba(168,85,247,0.15)]">O</div>
            <h3 className="text-xl font-bold font-heading mb-2">AI Ops Command Center</h3>
            <p className="text-muted text-sm mb-6">Live view of beds, doctor load, wait times, no-show prediction.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400">Live Bed Map</span>
              <span className="text-xs px-3 py-1 rounded-full border border-border bg-white/5">Inventory Alerts</span>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}

