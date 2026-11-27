import { Phone, ShieldCheck, Tv, Wifi } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppLink } from '../data/ispData';

const QUADPLAY_PILLARS = [
  {
    icon: Wifi,
    title: 'Dual-Band Wi-Fi 6 ONT Hardware',
    detail: '2.4 GHz & 5 GHz concurrent wireless coverage engineered for multi-story homes in Hayatabad, Gulbahar, and University Town.',
  },
  {
    icon: Tv,
    title: 'Smart TV & Shoq TV Entertainment',
    detail: '150+ Live HD channels, live cricket & football streams, rewind TV, and on-demand cinema over dedicated fiber bandwidth.',
  },
  {
    icon: Phone,
    title: 'Crystal-Clear Landline Voice',
    detail: 'Unlimited PTCL-to-PTCL landline calls included plus Hello Bronze, Silver, and Gold mobile & international minute bundles.',
  },
  {
    icon: ShieldCheck,
    title: 'Direct Local Field Engineering',
    detail: 'Managed from GT Road PTCL Exchange with optical power meter testing on every installation and direct WhatsApp care.',
  },
];

export default function QuadPlayShowcase() {
  const waHardware = buildWhatsAppLink(
    'Assalam-o-Alaikum, please share details about PTCL Flash Fiber QuadPlay (Internet + Smart TV + Landline) and Wi-Fi 6 router availability in Peshawar.'
  );

  return (
    <section
      id="quadplay"
      className="border-b border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#0F1914] py-16 sm:py-20 transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
          {/* Commercial Living Room Hardware & Smart TV Visual */}
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-[#DCE5DF] dark:border-[#1F352B] bg-[#F4F7F5] dark:bg-[#13201A]">
              <img
                src="${import.meta.env.BASE_URL}src/assets/images/ptcl_quadplay_entertainment_1795764409537.jpg"
                alt="4K Smart TV, optical fiber router, and digital landline phone powered by PTCL Flash Fiber"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 text-white">
                <p className="text-xs font-semibold text-[#A3E635]">
                  One Fiber Line · Three Services
                </p>
                <p className="mt-1 font-display text-lg font-bold">
                  Flash Fiber Internet + Smart TV + Landline Voice
                </p>
              </div>
            </div>
          </div>

          {/* QuadPlay Capabilities */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="text-xs font-bold tracking-wide text-[#007B3E] dark:text-[#78BE20]">
              PTCL Flash Fiber QuadPlay Experience
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0F1F17] dark:text-white sm:text-4xl [text-wrap:balance]">
              Built for 4K Streaming, Remote Work & Family Connectivity
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#3C4E45] dark:text-[#B4C5BC]">
              Unlike traditional copper DSL, GPON optical fiber delivers dedicated light-speed bandwidth right into your living room without weather interference or evening congestion.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {QUADPLAY_PILLARS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-[#F4F7F5] dark:bg-[#13201A] p-4"
                  >
                    <Icon
                      className="h-5 w-5 text-[#007B3E] dark:text-[#78BE20]"
                      aria-hidden="true"
                    />
                    <h3 className="mt-2.5 font-display text-sm font-bold text-[#0F1F17] dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#4B5B53] dark:text-[#9EB3A7]">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#packages"
                className="inline-flex min-h-11 items-center rounded-xl bg-[#007B3E] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#006332] whitespace-nowrap"
              >
                Compare Fiber & QuadPlay Rates
              </a>
              <a
                href={waHardware}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#13201A] px-5 py-2.5 text-xs font-semibold text-[#0F1F17] dark:text-[#F1F6F3] transition-colors hover:border-[#007B3E] dark:hover:border-[#78BE20] whitespace-nowrap"
              >
                Ask About Wi-Fi 6 Upgrade ({BUSINESS_INFO.phoneDisplay})
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
