import { useMemo, useState } from 'react';
import { ExternalLink, MapPin, Navigation, Search } from 'lucide-react';
import { BUSINESS_INFO, PESHAWAR_COVERAGE_ZONES, CoverageZone } from '../data/ispData';

interface CoverageCheckerProps {
  onBookZone: (zoneName: string) => void;
}

export default function CoverageChecker({ onBookZone }: CoverageCheckerProps) {
  const [query, setQuery] = useState('');
  const [activeZoneId, setActiveZoneId] = useState<string>(PESHAWAR_COVERAGE_ZONES[0].id);

  const matchingZones = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PESHAWAR_COVERAGE_ZONES;
    return PESHAWAR_COVERAGE_ZONES.filter(
      (zone) =>
        zone.name.toLowerCase().includes(q) ||
        zone.exchangeHub.toLowerCase().includes(q) ||
        zone.subAreas.some((sub) => sub.toLowerCase().includes(q))
    );
  }, [query]);

  const activeZone: CoverageZone = useMemo(() => {
    return (
      matchingZones.find((z) => z.id === activeZoneId) ||
      matchingZones[0] ||
      PESHAWAR_COVERAGE_ZONES[0]
    );
  }, [matchingZones, activeZoneId]);

  return (
    <section
      id="coverage"
      className="border-b border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#0F1914] py-16 sm:py-20 transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left: Search & Zone Directory */}
          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-wide text-[#007B3E] dark:text-[#78BE20]">
              Peshawar City GPON Coverage
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0F1F17] dark:text-white sm:text-4xl [text-wrap:balance]">
              Check Fiber Availability in Your Peshawar Area
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#3C4E45] dark:text-[#B4C5BC]">
              Connected directly through GT Road PTCL Exchange and Khyber Exchange across residential phases, commercial markets, and university roads.
            </p>

            {/* Instant Search Bar */}
            <div className="relative mt-6">
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#697B72]"
                aria-hidden="true"
              />
              <label htmlFor="peshawar-area-search" className="sr-only">
                Search Peshawar area or exchange
              </label>
              <input
                id="peshawar-area-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Hayatabad, Gulbahar, GT Road, City Peshawar, Khyber Exchange..."
                className="min-h-12 w-full rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-[#F4F7F5] dark:bg-[#13201A] pr-4 pl-10 text-sm text-[#0F1F17] dark:text-white placeholder:text-[#697B72] dark:placeholder:text-[#798D82] focus:border-[#007B3E] dark:focus:border-[#78BE20] focus:outline-none"
              />
            </div>

            {/* Interactive Zone Selector Grid */}
            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {matchingZones.length > 0 ? (
                matchingZones.map((zone) => {
                  const selected = activeZone.id === zone.id;
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => setActiveZoneId(zone.id)}
                      className={`flex min-h-14 flex-col items-start justify-center rounded-xl border px-4 py-3 text-left transition-colors cursor-pointer ${
                        selected
                          ? 'border-[#007B3E] bg-[#007B3E] text-white'
                          : 'border-[#DCE5DF] dark:border-[#1F352B] bg-[#F9FBFA] dark:bg-[#13201A] text-[#0F1F17] dark:text-[#F1F6F3] hover:border-[#007B3E] dark:hover:border-[#78BE20]'
                      }`}
                    >
                      <span className="font-display text-sm font-bold">{zone.name}</span>
                      <span
                        className={`mt-0.5 text-xs ${
                          selected ? 'text-[#D9F99D]' : 'text-[#4B5B53] dark:text-[#9EB3A7]'
                        }`}
                      >
                        {zone.subAreas.slice(0, 3).join(' · ')}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="col-span-full rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-[#F4F7F5] dark:bg-[#13201A] p-5 text-sm text-[#3C4E45] dark:text-[#B4C5BC]">
                  No direct match for &ldquo;{query}&rdquo;. We cover all of Peshawar—call{' '}
                  <span className="font-mono font-semibold text-[#007B3E] dark:text-[#78BE20]">
                    {BUSINESS_INFO.phoneDisplay}
                  </span>{' '}
                  or submit your street below for an instant optical port check.
                </div>
              )}
            </div>
          </div>

          {/* Right: Active Zone Feasibility Card + GT Road PTCL Exchange Card */}
          <div className="space-y-5 lg:col-span-5">
            <div className="rounded-2xl border border-[#DCE5DF] dark:border-[#1F352B] bg-[#F4F7F5] dark:bg-[#13201A] p-6">
              <div className="flex items-center justify-between gap-3 text-xs text-[#4B5B53] dark:text-[#9EB3A7]">
                <span>Exchange Feasibility</span>
                <span className="font-semibold text-[#007B3E] dark:text-[#78BE20]">
                  {activeZone.status}
                </span>
              </div>

              <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-[#0F1F17] dark:text-white">
                {activeZone.name}
              </h3>
              <p className="mt-1 text-sm text-[#3C4E45] dark:text-[#B4C5BC]">
                Served via{' '}
                <span className="font-semibold text-[#0F1F17] dark:text-white">
                  {activeZone.exchangeHub}
                </span>
              </p>

              <div className="mt-5 grid grid-cols-2 gap-4 border-y border-[#DCE5DF] dark:border-[#1F352B] py-4">
                <div>
                  <p className="text-xs text-[#4B5B53] dark:text-[#9EB3A7]">Max Available Speed</p>
                  <p className="mt-1 font-mono text-base font-bold text-[#0F1F17] dark:text-white tabular-nums">
                    {activeZone.maxSpeed}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#4B5B53] dark:text-[#9EB3A7]">Estimated Turnup</p>
                  <p className="mt-1 font-mono text-base font-bold text-[#007B3E] dark:text-[#78BE20] tabular-nums">
                    {activeZone.installEta}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold text-[#0F1F17] dark:text-white">
                  Covered Sectors & Localities:
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#3C4E45] dark:text-[#B4C5BC]">
                  {activeZone.subAreas.join(' · ')}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onBookZone(activeZone.name)}
                className="mt-6 min-h-11 w-full rounded-xl bg-[#007B3E] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#006332] cursor-pointer"
              >
                Book Flash Fiber in {activeZone.name}
              </button>
            </div>

            {/* GT Road PTCL Exchange & Google Business Profile */}
            <div className="rounded-2xl border border-[#007B3E]/30 bg-[#007B3E] p-6 text-white">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#A3E635]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-[#D9F99D]">Primary Peshawar Hub</p>
                  <h4 className="mt-1 font-display text-lg font-bold">
                    GT Road PTCL Exchange, Peshawar
                  </h4>
                  <p className="mt-1 text-sm text-white/90 leading-relaxed">
                    {BUSINESS_INFO.exchangeAddress}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={BUSINESS_INFO.googleProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-[#007B3E] transition-colors hover:bg-[#EAF2ED] whitespace-nowrap"
                >
                  <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Open Google Business Profile</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
