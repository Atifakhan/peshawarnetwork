import { ArrowRight, MapPin, MessageCircle, Moon, PhoneCall, Sun } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { BUSINESS_INFO, buildWhatsAppLink } from '../data/ispData';
import FiberOpticScene from './FiberOpticScene';

interface HeroSectionProps {
  theme: 'light' | 'dark';
  onToggleTheme: (next: 'light' | 'dark') => void;
  onOpenDialer: (context?: string) => void;
}

const HERO_METRICS = [
  { label: 'Flash Fiber Speeds', value: '20 – 300 Mbps', detail: 'Symmetric GPON FTTH' },
  { label: 'Main Exchange Hub', value: 'GT Road Exchange', detail: 'Near Haji Camp, Peshawar' },
  { label: 'Connection Turnup', value: '24 – 48 Hours', detail: 'Across all Peshawar sectors' },
  { label: 'Direct Sales & Support', value: '0314-9881406', detail: 'Instant Call & WhatsApp' },
];

export default function HeroSection({
  theme,
  onToggleTheme,
  onOpenDialer,
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const heroWhatsApp = buildWhatsAppLink(
    'Assalam-o-Alaikum, I want to check PTCL Flash Fiber availability and packages in Peshawar.'
  );

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[#DCE5DF] dark:border-[#1F352B] bg-[#F4F7F5] dark:bg-[#0A110E] transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6 lg:px-8 lg:pt-8 lg:pb-16">
        {/* Top Utility Strip: Location Marker + Light/Dark Theme Switcher */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE5DF] dark:border-[#1F352B] pb-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#3C4E45] dark:text-[#9EB3A7]">
            <MapPin className="h-4 w-4 shrink-0 text-[#007B3E] dark:text-[#78BE20]" aria-hidden="true" />
            <span className="font-semibold text-[#0F1F17] dark:text-white">
              GT Road PTCL Exchange
            </span>
            <span aria-hidden="true">·</span>
            <span>Authorized PTCL Flash Fiber Services in Peshawar</span>
          </div>

          <div
            role="group"
            aria-label="Color theme switcher"
            className="inline-flex items-center gap-1 rounded-lg border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#13201A] p-1"
          >
            <button
              type="button"
              onClick={() => onToggleTheme('light')}
              aria-pressed={theme === 'light'}
              className={`inline-flex min-h-8 items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                theme === 'light'
                  ? 'bg-[#007B3E] text-white'
                  : 'text-[#4B5B53] dark:text-[#9EB3A7] hover:text-[#0F1F17] dark:hover:text-white'
              }`}
            >
              <Sun className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Light</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleTheme('dark')}
              aria-pressed={theme === 'dark'}
              className={`inline-flex min-h-8 items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-[#007B3E] text-white'
                  : 'text-[#4B5B53] dark:text-[#9EB3A7] hover:text-[#0F1F17] dark:hover:text-white'
              }`}
            >
              <Moon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Dark</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Telecom Value Proposition & CTAs */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center lg:col-span-6"
          >
            <p className="text-xs font-bold tracking-wide text-[#007B3E] dark:text-[#78BE20]">
              PTCL Flash Fiber · Whole Peshawar City
            </p>

            <h1 className="mt-3 max-w-xl font-display text-[clamp(2.25rem,4vw,3.55rem)] font-extrabold leading-[1.08] tracking-tight text-[#0F1F17] dark:text-white [text-wrap:balance]">
              Unleash True Fiber Speed Across Peshawar.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#3C4E45] dark:text-[#B4C5BC] sm:text-lg">
              Get direct Fiber-to-the-Home (FTTH) broadband with unlimited downloads, Smart TV / Shoq TV, and crystal-clear landline voice across Hayatabad, Gulbahar, GT Road, City Peshawar, and Khyber Exchange.
            </p>

            {/* Primary & Direct Calling / WhatsApp Actions */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#packages"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#007B3E] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#006332] whitespace-nowrap"
              >
                <span>View Fiber Packages</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => onOpenDialer('Hero Call Desk')}
                className="relative inline-flex min-h-12 items-center gap-2.5 rounded-xl border border-[#007B3E] dark:border-[#78BE20] bg-white dark:bg-[#13201A] px-5 py-3 text-sm font-semibold text-[#007B3E] dark:text-[#78BE20] transition-colors hover:bg-[#EAF2ED] dark:hover:bg-[#192B22] whitespace-nowrap cursor-pointer"
              >
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="animate-call-ripple absolute inset-0 rounded-full border border-[#78BE20]"
                  />
                  <PhoneCall className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="tabular-nums">Get Calling · {BUSINESS_INFO.phoneDisplay}</span>
              </button>

              <a
                href={heroWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#13201A] px-5 py-3 text-sm font-semibold text-[#0F1F17] dark:text-[#F1F6F3] transition-colors hover:border-[#007B3E] dark:hover:border-[#78BE20] whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4 text-[#007B3E] dark:text-[#78BE20]" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Real Peshawar Workspace Setup Strip */}
            <div className="mt-8 flex items-center gap-4 rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#13201A] p-3.5 shadow-xs">
              <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-[#EAF2ED] dark:bg-[#0B1510]">
                <img
                  src="/src/assets/images/hero_fiber_peshawar_1795764060584.jpg"
                  alt="Peshawar workspace running on PTCL Flash Fiber Wi-Fi 6 router"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#0F1F17] dark:text-white truncate">
                  Direct GT Road PTCL Exchange Booking & Support
                </p>
                <p className="mt-0.5 text-xs text-[#4B5B53] dark:text-[#9EB3A7] leading-relaxed">
                  Clean GPON fiber splicing, Dual-Band Wi-Fi 6 ONT installation, and rapid troubleshooting on{' '}
                  <span className="font-mono font-semibold text-[#007B3E] dark:text-[#78BE20] tabular-nums">
                    {BUSINESS_INFO.phoneDisplay}
                  </span>.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Interactive 3D PTCL GPON & Fiber Mesh Showcase */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <FiberOpticScene theme={theme} />
          </motion.div>
        </div>

        {/* Full-Width 4-Column Service Guarantee Strip */}
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#DCE5DF] dark:border-[#1F352B] bg-[#DCE5DF] dark:bg-[#1F352B] sm:grid-cols-2 lg:grid-cols-4">
          {HERO_METRICS.map((item) => (
            <div key={item.label} className="bg-white dark:bg-[#13201A] px-5 py-4">
              <p className="text-xs font-medium text-[#4B5B53] dark:text-[#9EB3A7]">{item.label}</p>
              <p className="mt-1 font-display text-lg font-bold tracking-tight text-[#007B3E] dark:text-[#78BE20] tabular-nums">
                {item.value}
              </p>
              <p className="mt-0.5 text-xs text-[#4B5B53] dark:text-[#9EB3A7]">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
