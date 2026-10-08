"use client";

import { useEffect, useRef } from "react";

interface NodeItem {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  type: "patient" | "doctor" | "machine" | "bed";
  color: string;
}

export default function NeuralMapCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const types: { type: NodeItem["type"]; label: string; color: string }[] = [
      { type: "patient", label: "Patient #204", color: "#00E5C3" },
      { type: "doctor", label: "Dr. Sharma (OPD)", color: "#4F7CFF" },
      { type: "machine", label: "Beckman Coulter Analyzer", color: "#A855F7" },
      { type: "bed", label: "ICU Bed #08", color: "#FF9F43" },
      { type: "patient", label: "Patient #319", color: "#00E5C3" },
      { type: "doctor", label: "Dr. Verma (Cardio)", color: "#4F7CFF" },
      { type: "machine", label: "Mindray Vitals Monitor", color: "#A855F7" },
      { type: "bed", label: "Ward Bed #14", color: "#FF9F43" },
    ];

    const nodes: NodeItem[] = [];
    const count = width < 768 ? 24 : 44;

    for (let i = 0; i < count; i++) {
      const template = types[i % types.length];
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.45,
        vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.45,
        radius: i < 8 ? 6 : Math.random() * 3 + 2,
        label: template.label,
        type: template.type,
        color: template.color,
      });
    }

    let pulseTime = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      pulseTime += 0.02;

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = width < 768 ? 110 : 160;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.4;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            // Gradient line
            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            grad.addColorStop(0, nodes[i].color);
            grad.addColorStop(1, nodes[j].color);
            ctx.strokeStyle = grad;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = dist < 70 ? 1.2 : 0.6;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Mouse attraction / interaction
      if (mouseRef.current.active && !prefersReducedMotion) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        nodes.forEach((node) => {
          const dx = mx - node.x;
          const dy = my - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 10) {
            const force = (180 - dist) / 180;
            node.x += (dx / dist) * force * 0.8;
            node.y += (dy / dist) * force * 0.8;

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = node.color;
            ctx.globalAlpha = 0.3 * (1 - dist / 180);
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      }

      // Draw nodes
      nodes.forEach((node, idx) => {
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 10 || node.x > width - 10) node.vx *= -1;
          if (node.y < 10 || node.y > height - 10) node.vy *= -1;
        }

        // Pulse glow for key nodes
        const pulse = Math.sin(pulseTime + idx) * 2;
        const currentRadius = Math.max(2, node.radius + (idx < 8 ? pulse * 0.5 : 0));

        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius + 6, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = 0.15;
        ctx.fill();

        // Inner node
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = 0.9;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw small label on top nodes
        if (idx < 6 && width >= 768) {
          ctx.font = "9px Inter, sans-serif";
          ctx.fillStyle = "rgba(234, 240, 255, 0.75)";
          ctx.fillText(node.label, node.x + currentRadius + 6, node.y + 3);
        }
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-auto overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-75"
        style={{ filter: "drop-shadow(0 0 16px rgba(0,229,195,0.2))" }}
      />
    </div>
  );
}
