"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappNumber = "+919876543210"; // Placeholder link for founder
  const message = encodeURIComponent("Hi Agam, I saw HospitalOS and would like to learn more about the early-stage pilot.");

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#25D366] text-white shadow-[0_4px_25px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
      aria-label="Chat with founder on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-white" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out px-0 group-hover:px-2 text-xs font-semibold">
        Chat on WhatsApp
      </span>
    </a>
  );
}
