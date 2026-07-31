'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { BRAND } from '@/lib/constants';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const isPast = window.scrollY > 600;
      setVisible((prev) => (prev !== isPast ? isPast : prev));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!mounted || !visible) return null;

  const url = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    'Hi Urban Spazio! I have a query about your interior design services.'
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-900/30 transition-transform duration-300 hover:scale-105 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
