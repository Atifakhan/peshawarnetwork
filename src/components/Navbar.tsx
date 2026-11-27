import { useState } from 'react';
import { PhoneCall, Menu, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/ispData';

interface NavbarProps {
  onOpenDialer: (context?: string) => void;
}

const NAV_LINKS = [
  { label: 'Packages', href: '#packages' },
  { label: 'QuadPlay', href: '#quadplay' },
  { label: 'Coverage', href: '#coverage' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenDialer }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#DCE5DF] dark:border-[#1F352B] bg-white/95 dark:bg-[#0A110E]/95 backdrop-blur-sm transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="font-display text-lg font-extrabold tracking-tight text-[#007B3E] dark:text-[#78BE20] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#007B3E]"
        >
          {BUSINESS_INFO.brandName}
        </a>

        {/* Zone 2: Concise Single-Line Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-1 rounded-2xl border border-[#DCE5DF] dark:border-[#294536] bg-[#F4F7F5] dark:bg-[#13201A] p-1.5 text-sm font-semibold text-[#3C4E45] dark:text-[#B4C5BC]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-2 transition-all duration-200 hover:bg-white dark:hover:bg-[#203629] hover:text-[#007B3E] dark:hover:text-[#A3E635] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007B3E]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Call Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenDialer('Header Call Line')}
            className="relative inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#007B3E] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-transform duration-150 hover:bg-[#006332] active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007B3E] cursor-pointer"
          >
            <span className="relative flex h-4 w-4 items-center justify-center">
              <span
                aria-hidden="true"
                className="animate-call-ripple absolute inset-0 rounded-full border border-[#78BE20]"
              />
              <PhoneCall className="h-3.5 w-3.5 text-[#D8F3B2]" aria-hidden="true" />
            </span>
            <span className="tabular-nums">Call {BUSINESS_INFO.phoneDisplay}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#DCE5DF] dark:border-[#1F352B] text-[#0F1F17] dark:text-[#F1F6F3] hover:bg-[#F4F7F5] dark:hover:bg-[#13201A] md:hidden cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#0A110E] px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-[#2A3A32] dark:text-[#D5E1DA] hover:bg-[#F4F7F5] dark:hover:bg-[#13201A] hover:text-[#007B3E] dark:hover:text-[#78BE20]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
