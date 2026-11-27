import { useState } from 'react';
import { Check, MessageCircle, Tv, Wifi } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  FIBER_PACKAGES,
  FiberPackage,
  PackageCategory,
  buildWhatsAppLink,
} from '../data/ispData';

interface PackageExplorerProps {
  selectedPackageId: string;
  onSelectPackage: (pkg: FiberPackage, withQuadplay: boolean) => void;
}

const FILTER_TABS: Array<{ id: PackageCategory; label: string }> = [
  { id: 'all', label: 'All Plans' },
  { id: 'home', label: 'Home Fiber' },
  { id: 'quadplay', label: 'QuadPlay + TV' },
  { id: 'business', label: 'Business Fiber' },
];

export default function PackageExplorer({
  selectedPackageId,
  onSelectPackage,
}: PackageExplorerProps) {
  const [category, setCategory] = useState<PackageCategory>('all');
  const [includeQuadplay, setIncludeQuadplay] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const filteredPackages =
    category === 'all'
      ? FIBER_PACKAGES
      : FIBER_PACKAGES.filter((pkg) => pkg.category === category);

  return (
    <section
      id="packages"
      className="border-b border-[#DCE5DF] dark:border-[#1F352B] bg-[#F4F7F5] dark:bg-[#0A110E] py-16 sm:py-20 transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Interactive Controls */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-wide text-[#007B3E] dark:text-[#78BE20]">
              PTCL Flash Fiber Monthly Tariff
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0F1F17] dark:text-white sm:text-4xl [text-wrap:balance]">
              Choose Your Flash Fiber Speed Package
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#3C4E45] dark:text-[#B4C5BC]">
              Transparent monthly rates with unlimited downloads, free on-net landline minutes, and optional Smart TV / Shoq TV bundles across Peshawar.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div
              role="tablist"
              aria-label="Filter fiber packages"
              className="grid w-full grid-cols-2 gap-1 rounded-2xl border border-[#DCE5DF] dark:border-[#294536] bg-white dark:bg-[#13201A] p-1.5 shadow-sm sm:inline-flex sm:w-auto sm:flex-nowrap"
            >
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={category === tab.id}
                  onClick={() => setCategory(tab.id)}
                  className={`relative min-h-11 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007B3E] ${
                    category === tab.id
                      ? 'bg-[#007B3E] text-white shadow-md shadow-[#007B3E]/20 ring-1 ring-[#007B3E] dark:ring-[#78BE20]'
                      : 'text-[#3C4E45] dark:text-[#B4C5BC] hover:text-[#0F1F17] dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIncludeQuadplay((prev) => !prev)}
              aria-pressed={includeQuadplay}
              className={`inline-flex min-h-11 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                includeQuadplay
                  ? 'border-[#007B3E] dark:border-[#78BE20] bg-[#EAF5EE] dark:bg-[#163023] text-[#007B3E] dark:text-[#A3E635]'
                  : 'border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#13201A] text-[#0F1F17] dark:text-[#F1F6F3] hover:border-[#007B3E]'
              }`}
            >
              <Tv className="h-4 w-4 text-[#007B3E] dark:text-[#78BE20]" aria-hidden="true" />
              <span>{includeQuadplay ? 'QuadPlay + Smart TV Active' : 'Include Smart TV Bundle'}</span>
            </button>
          </div>
        </div>

        {/* Commercial PTCL Tariff Grid */}
        <div className="perspective-stage mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((pkg) => {
            const activePrice = includeQuadplay ? pkg.quadplayPricePkr : pkg.monthlyPricePkr;
            const isSelected = selectedPackageId === pkg.id;
            const whatsappUrl = buildWhatsAppLink(
              `Assalam-o-Alaikum, I want to order ${pkg.name} (${pkg.speedMbps} Mbps${
                includeQuadplay ? ' + QuadPlay Smart TV' : ''
              }) at PKR ${activePrice.toLocaleString()}/month in Peshawar.`
            );

            return (
              <motion.article
                key={pkg.id}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { y: -5, rotateX: 1.2, rotateY: -1.2 }
                }
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className={`preserve-3d flex flex-col justify-between overflow-hidden rounded-2xl border transition-colors ${
                  pkg.popular || isSelected
                    ? 'border-[#007B3E] dark:border-[#78BE20] bg-white dark:bg-[#13201A] shadow-sm'
                    : 'border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#13201A] hover:border-[#007B3E]/60 dark:hover:border-[#78BE20]/60'
                }`}
              >
                {/* Top PTCL Header Strip */}
                <div>
                  <div
                    className={`flex items-center justify-between px-6 py-3.5 ${
                      pkg.popular
                        ? 'bg-[#007B3E] text-white'
                        : 'border-b border-[#DCE5DF] dark:border-[#1F352B] bg-[#EAF2ED] dark:bg-[#172820] text-[#0F1F17] dark:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Wifi
                        className={`h-4 w-4 ${
                          pkg.popular ? 'text-[#A3E635]' : 'text-[#007B3E] dark:text-[#78BE20]'
                        }`}
                        aria-hidden="true"
                      />
                      <span className="font-mono text-lg font-extrabold tabular-nums">
                        {pkg.speedMbps} Mbps
                      </span>
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        pkg.popular ? 'text-[#D9F99D]' : 'text-[#4B5B53] dark:text-[#9EB3A7]'
                      }`}
                    >
                      {pkg.popular ? 'Most Popular' : pkg.devicesSupported}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-baseline justify-between gap-3 border-b border-[#DCE5DF] dark:border-[#1F352B] pb-4">
                      <div>
                        <h3 className="font-display text-lg font-bold tracking-tight text-[#0F1F17] dark:text-white">
                          {pkg.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-[#4B5B53] dark:text-[#9EB3A7]">
                          {pkg.audience}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="font-mono text-2xl font-extrabold text-[#007B3E] dark:text-[#78BE20] tabular-nums">
                          Rs. {activePrice.toLocaleString()}
                        </p>
                        <p className="text-[11px] text-[#4B5B53] dark:text-[#9EB3A7]">
                          per month
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-1 text-xs text-[#3C4E45] dark:text-[#B4C5BC]">
                      <p>
                        <span className="font-semibold text-[#0F1F17] dark:text-white">Voice:</span>{' '}
                        {pkg.voiceBundle}
                      </p>
                      <p>
                        <span className="font-semibold text-[#0F1F17] dark:text-white">TV:</span>{' '}
                        {pkg.tvIncluded}
                      </p>
                    </div>

                    <ul className="mt-4 space-y-2">
                      {pkg.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2.5 text-sm text-[#2A3A32] dark:text-[#D5E1DA]"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#007B3E] dark:text-[#78BE20]"
                            aria-hidden="true"
                          />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Package Order Buttons */}
                <div className="border-t border-[#DCE5DF] dark:border-[#1F352B] bg-[#F9FBFA] dark:bg-[#0F1914] p-5 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectPackage(pkg, includeQuadplay)}
                    className={`min-h-11 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      pkg.popular || isSelected
                        ? 'bg-[#007B3E] text-white hover:bg-[#006332]'
                        : 'bg-[#0F1F17] dark:bg-[#78BE20] text-white dark:text-[#0A110E] hover:bg-[#1E3529] dark:hover:bg-[#8CC63F]'
                    }`}
                  >
                    {isSelected ? 'Selected — Complete Booking Below' : `Order ${pkg.speedMbps} Mbps`}
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#13201A] px-4 py-2 text-xs font-semibold text-[#0F1F17] dark:text-[#F1F6F3] transition-colors hover:border-[#007B3E] dark:hover:border-[#78BE20] whitespace-nowrap"
                  >
                    <MessageCircle
                      className="h-4 w-4 text-[#007B3E] dark:text-[#78BE20]"
                      aria-hidden="true"
                    />
                    <span>Order on WhatsApp</span>
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-[#4B5B53] dark:text-[#9EB3A7]">
          Standard GPON installation & optical terminal charges apply. Call 0314-9881406 for 3-month advance billing discounts and ONT Wi-Fi 6 offers in Peshawar.
        </p>
      </div>
    </section>
  );
}
