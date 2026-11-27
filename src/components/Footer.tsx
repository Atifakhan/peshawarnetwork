import {
  ExternalLink,
  Facebook,
  Globe,
  MapPin,
  MessageCircle,
  Moon,
  PhoneCall,
  Sun,
} from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppLink } from '../data/ispData';

interface FooterProps {
  theme: 'light' | 'dark';
  onToggleTheme: (next: 'light' | 'dark') => void;
  onOpenDialer: (context?: string) => void;
}

const COVERED_AREAS_TEXT = [
  'Hayatabad (Phases 1–7)',
  'Gulbahar',
  'GT Road',
  'City Peshawar',
  'Khyber Exchange',
  'University Town',
  'Saddar & Cantt',
  'Warsak Road',
  'Charsadda Road',
  'Dalazak Road',
  'Ring Road',
  'Tehkal & Board Bazaar',
];

export default function Footer({ theme, onToggleTheme, onOpenDialer }: FooterProps) {
  const footerWa = buildWhatsAppLink(
    'Assalam-o-Alaikum, contacting Peshawar Flash Fiber regarding a PTCL internet connection.'
  );

  return (
    <footer className="border-t border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#0A110E] text-[#3C4E45] dark:text-[#9EB3A7] transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Brand & Exchange Info */}
          <div className="md:col-span-5">
            <p className="font-display text-xl font-extrabold tracking-tight text-[#007B3E] dark:text-[#78BE20]">
              {BUSINESS_INFO.brandName}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#3C4E45] dark:text-[#B4C5BC]">
              {BUSINESS_INFO.tagline}. High-speed GPON optical fiber broadband, Smart TV, and landline voice solutions across Peshawar.
            </p>
            <p className="mt-4 flex items-start gap-2 text-xs text-[#4B5B53] dark:text-[#9EB3A7]">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-[#007B3E] dark:text-[#78BE20]"
                aria-hidden="true"
              />
              <span>{BUSINESS_INFO.exchangeAddress}</span>
            </p>
          </div>

          {/* Peshawar Coverage Areas */}
          <div className="md:col-span-4">
            <h3 className="font-display text-sm font-bold text-[#0F1F17] dark:text-white">
              Peshawar Service Coverage
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-[#4B5B53] dark:text-[#9EB3A7]">
              {COVERED_AREAS_TEXT.join(' · ')}
            </p>
          </div>

          {/* Direct Channels + Theme Switch */}
          <div className="md:col-span-3 space-y-2.5">
            <h3 className="font-display text-sm font-bold text-[#0F1F17] dark:text-white">
              Connect & Theme
            </h3>
            <div className="flex flex-col gap-2 text-xs">
              <button
                type="button"
                onClick={() => onOpenDialer('Footer Call Line')}
                className="inline-flex items-center gap-2 text-left font-semibold text-[#0F1F17] dark:text-white hover:text-[#007B3E] dark:hover:text-[#78BE20] cursor-pointer"
              >
                <PhoneCall
                  className="h-3.5 w-3.5 text-[#007B3E] dark:text-[#78BE20]"
                  aria-hidden="true"
                />
                <span className="font-mono tabular-nums">{BUSINESS_INFO.phoneDisplay}</span>
              </button>

              <a
                href={footerWa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium hover:text-[#007B3E] dark:hover:text-[#78BE20]"
              >
                <MessageCircle
                  className="h-3.5 w-3.5 text-[#007B3E] dark:text-[#78BE20]"
                  aria-hidden="true"
                />
                <span>WhatsApp ({BUSINESS_INFO.phoneRaw})</span>
              </a>

              <a
                href={BUSINESS_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium hover:text-[#007B3E] dark:hover:text-[#78BE20]"
              >
                <Facebook className="h-3.5 w-3.5 text-[#1877F2]" aria-hidden="true" />
                <span>Official Facebook Page</span>
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>

              <a
                href={BUSINESS_INFO.googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium hover:text-[#007B3E] dark:hover:text-[#78BE20]"
              >
                <Globe
                  className="h-3.5 w-3.5 text-[#007B3E] dark:text-[#78BE20]"
                  aria-hidden="true"
                />
                <span>Google Business Profile</span>
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onToggleTheme(theme === 'light' ? 'dark' : 'light')}
                  className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-[#DCE5DF] dark:border-[#1F352B] bg-[#F4F7F5] dark:bg-[#13201A] px-3 py-1.5 text-xs font-semibold text-[#0F1F17] dark:text-white hover:border-[#007B3E] cursor-pointer"
                >
                  {theme === 'light' ? (
                    <>
                      <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Switch to Dark Theme</span>
                    </>
                  ) : (
                    <>
                      <Sun className="h-3.5 w-3.5 text-[#A3E635]" aria-hidden="true" />
                      <span>Switch to Light Theme</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[#DCE5DF] dark:border-[#1F352B] pt-6 text-xs text-[#4B5B53] dark:text-[#798D82] sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {BUSINESS_INFO.brandName} · GT Road PTCL Exchange, Peshawar.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#packages" className="hover:text-[#007B3E] dark:hover:text-[#78BE20]">
              Packages
            </a>
            <a href="#quadplay" className="hover:text-[#007B3E] dark:hover:text-[#78BE20]">
              QuadPlay
            </a>
            <a href="#coverage" className="hover:text-[#007B3E] dark:hover:text-[#78BE20]">
              Coverage
            </a>
            <a href="#reviews" className="hover:text-[#007B3E] dark:hover:text-[#78BE20]">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-[#007B3E] dark:hover:text-[#78BE20]">
              Book Connection
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
