import { MessageCircle, PhoneCall } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppLink } from '../data/ispData';

interface FloatingActionsProps {
  onOpenDialer: (context?: string) => void;
}

export default function FloatingActions({ onOpenDialer }: FloatingActionsProps) {
  const whatsappUrl = buildWhatsAppLink(
    'Assalam-o-Alaikum, I need PTCL Flash Fiber internet connection details in Peshawar.'
  );

  return (
    <div
      aria-label="Quick contact actions"
      className="fixed right-4 bottom-4 z-30 flex items-center gap-2.5 sm:right-6 sm:bottom-6"
    >
      <button
        type="button"
        onClick={() => onOpenDialer('Floating Quick Call')}
        aria-label={`Open dialing interface for ${BUSINESS_INFO.phoneDisplay}`}
        className="relative inline-flex h-12 items-center gap-2 rounded-full border border-[#DCE5DF] dark:border-[#1F352B] bg-[#0F1F17] dark:bg-[#13201A] px-4 text-xs font-semibold text-white shadow-lg transition-transform duration-150 hover:scale-[1.03] active:scale-95 cursor-pointer"
      >
        <span className="relative flex h-4 w-4 items-center justify-center">
          <span
            aria-hidden="true"
            className="animate-call-ripple absolute inset-0 rounded-full border border-[#78BE20]"
          />
          <PhoneCall className="h-4 w-4 text-[#A3E635]" aria-hidden="true" />
        </span>
        <span className="hidden sm:inline tabular-nums">Call {BUSINESS_INFO.phoneDisplay}</span>
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp ${BUSINESS_INFO.phoneDisplay}`}
        className="inline-flex h-12 items-center gap-2 rounded-full bg-[#007B3E] px-4 text-xs font-semibold text-white shadow-lg transition-transform duration-150 hover:scale-[1.03] hover:bg-[#006332] active:scale-95"
      >
        <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="tabular-nums">WhatsApp</span>
      </a>
    </div>
  );
}
