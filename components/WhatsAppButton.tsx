'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { BRAND } from '@/lib/constants';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const isPast = window.scrollY > 600;
      setVisible((prev) => (prev !== isPast ? isPast : prev));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const frame = window.requestAnimationFrame(onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!visible) return null;

  const url = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    'Hi Urban Spazio! I have a query about your interior design services.'
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex size-12 items-center justify-center border border-[var(--color-brass)] bg-[var(--color-dark)] text-[var(--color-cream)] shadow-xl transition-colors hover:bg-[var(--color-brass-dark)]"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
