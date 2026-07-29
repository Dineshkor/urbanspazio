'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
}

export default function WhatsAppButton({
  message = "Hi Urban Spazio! I am interested in discussing a signature modular kitchen, wardrobe, or living suite project.",
  className = ""
}: WhatsAppButtonProps) {
  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/919876543210?text=${encodedText}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-emerald-950/80 border border-emerald-400/40 flex items-center gap-3 group hover:scale-105 transition-all duration-300 ${className}`}
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        <MessageSquare className="w-6 h-6 fill-white" />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-300 animate-ping"></span>
      </div>
      <span className="hidden sm:inline text-xs uppercase tracking-wider font-bold">
        Chat on WhatsApp
      </span>
    </a>
  );
}
