export const BUSINESS_INFO = {
  brandName: 'Peshawar Flash Fiber',
  tagline: 'Authorized PTCL Flash Fiber & Broadband Partner',
  phoneDisplay: '0314-9881406',
  phoneRaw: '03149881406',
  phoneIntl: '+923149881406',
  whatsappBaseUrl: 'https://wa.me/923149881406',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61597206110656',
  googleProfileUrl: 'https://share.google/i38cPicrVguVvs5iT',
  exchangeAddress: 'GT Road PTCL Exchange, Near Haji Camp, Peshawar, Khyber Pakhtunkhwa',
  workingHours: 'Monday – Saturday · 9:00 AM – 9:00 PM (24/7 WhatsApp Booking)',
};

export function buildWhatsAppLink(message: string): string {
  return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export type PackageCategory = 'all' | 'home' | 'quadplay' | 'business';

export interface FiberPackage {
  id: string;
  name: string;
  speedMbps: number;
  uploadMbps: number;
  monthlyPricePkr: number;
  quadplayPricePkr: number;
  category: Exclude<PackageCategory, 'all'>;
  popular?: boolean;
  audience: string;
  devicesSupported: string;
  voiceBundle: string;
  tvIncluded: string;
  features: string[];
}

export const FIBER_PACKAGES: FiberPackage[] = [
  {
    id: 'flash-20',
    name: 'Flash Starter 20',
    speedMbps: 20,
    uploadMbps: 20,
    monthlyPricePkr: 2899,
    quadplayPricePkr: 3499,
    category: 'home',
    audience: 'Apartments & small households',
    devicesSupported: 'Up to 6 devices',
    voiceBundle: 'Unlimited PTCL to PTCL calls',
    tvIncluded: 'Shoq TV Mobile App access',
    features: [
      'True FTTH optical fiber to the home',
      'Unlimited monthly downloads (FUP applies)',
      'Free landline voice line activation',
      '24–48 hour installation across GT Road & City',
    ],
  },
  {
    id: 'flash-30',
    name: 'Flash Family 30',
    speedMbps: 30,
    uploadMbps: 30,
    monthlyPricePkr: 3499,
    quadplayPricePkr: 4199,
    category: 'home',
    audience: 'Families, HD streaming & online classes',
    devicesSupported: 'Up to 10 devices',
    voiceBundle: 'Hello Bronze · 1,000 off-net & unlimited on-net',
    tvIncluded: 'Smart TV / Shoq TV ready',
    features: [
      'Symmetric 30 Mbps download & upload speeds',
      'Zero buffering for dual HD streams & Zoom',
      'Dual-Band ONT Wi-Fi router option',
      'Priority local support from GT Road Exchange',
    ],
  },
  {
    id: 'flash-40',
    name: 'Flash Stream 40',
    speedMbps: 40,
    uploadMbps: 40,
    monthlyPricePkr: 4999,
    quadplayPricePkr: 5699,
    category: 'quadplay',
    audience: 'Multi-screen homes & remote professionals',
    devicesSupported: 'Up to 14 devices',
    voiceBundle: 'Hello Silver · Unlimited PTCL + mobile minutes',
    tvIncluded: 'Smart TV + 150+ Live Channels',
    features: [
      'Full QuadPlay entertainment & voice bundle',
      'Low-latency routing for video conferencing',
      'High-gain Dual-Band GPON ONT included',
      'Same-week splicing across Hayatabad & Gulbahar',
    ],
  },
  {
    id: 'flash-50',
    name: 'Flash Pro 50',
    speedMbps: 50,
    uploadMbps: 50,
    monthlyPricePkr: 5999,
    quadplayPricePkr: 6699,
    category: 'home',
    popular: true,
    audience: 'Remote engineers, creators & multi-floor homes',
    devicesSupported: 'Up to 20 devices',
    voiceBundle: 'Hello Silver · Free nationwide landline & mobile mins',
    tvIncluded: 'Shoq TV + Smart TV 4K Box option',
    features: [
      'Peshawar bestseller for work-from-home stability',
      'Sub-8ms local ping & clean international routing',
      'Wi-Fi 6 Dual-Band ONT upgrade compatible',
      'Dedicated escalation desk via 0314-9881406',
    ],
  },
  {
    id: 'flash-100',
    name: 'Flash Ultra 100',
    speedMbps: 100,
    uploadMbps: 100,
    monthlyPricePkr: 9449,
    quadplayPricePkr: 10199,
    category: 'quadplay',
    audience: '4K households, streamers & esports gamers',
    devicesSupported: 'Up to 35 devices',
    voiceBundle: 'Hello Gold · Unlimited on-net + 2,500 mobile mins',
    tvIncluded: 'Full Smart TV 4K + Shoq TV Premium',
    features: [
      '100 Mbps dedicated optical throughput',
      'Simultaneous 4K streaming & cloud backups',
      'Wi-Fi 6 AX1800 / AX3000 GPON terminal support',
      'Direct optical inspection from Khyber & GT Road hubs',
    ],
  },
  {
    id: 'flash-300',
    name: 'Flash Giga 300',
    speedMbps: 300,
    uploadMbps: 300,
    monthlyPricePkr: 25999,
    quadplayPricePkr: 26999,
    category: 'business',
    audience: 'Software houses, clinics, studios & offices',
    devicesSupported: '60+ concurrent users',
    voiceBundle: 'Business Multi-Line + Unlimited PTCL Voice',
    tvIncluded: 'Optional Executive Lounge Smart TV',
    features: [
      '300 Mbps high-capacity commercial optical link',
      'Static IP add-on & multi-AP mesh ready',
      'Priority field engineer dispatch across Peshawar',
      'Direct account management at GT Road Exchange',
    ],
  },
];

export interface CoverageZone {
  id: string;
  name: string;
  exchangeHub: string;
  status: 'Active GPON' | 'Expanding Fiber';
  maxSpeed: string;
  installEta: string;
  subAreas: string[];
}

export const PESHAWAR_COVERAGE_ZONES: CoverageZone[] = [
  {
    id: 'hayatabad',
    name: 'Hayatabad',
    exchangeHub: 'Hayatabad & Karkhano GPON Node',
    status: 'Active GPON',
    maxSpeed: 'Up to 300 Mbps',
    installEta: '24 – 36 Hours',
    subAreas: ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5', 'Phase 6', 'Phase 7', 'Bagh-e-Naran'],
  },
  {
    id: 'gulbahar',
    name: 'Gulbahar',
    exchangeHub: 'GT Road PTCL Exchange',
    status: 'Active GPON',
    maxSpeed: 'Up to 300 Mbps',
    installEta: '24 Hours',
    subAreas: ['Gulbahar No. 1', 'Gulbahar No. 2', 'Gulbahar No. 3', 'Gulbahar No. 4', 'Nishtarabad', 'Sikandar Town'],
  },
  {
    id: 'gt-road',
    name: 'GT Road',
    exchangeHub: 'GT Road PTCL Exchange (Main Office)',
    status: 'Active GPON',
    maxSpeed: 'Up to 1 Gbps Ready',
    installEta: 'Same Day – 24 Hours',
    subAreas: ['Haji Camp', 'Firdous', 'Hashtnagri Gate', 'Sardar Garhi', 'Chamkani', 'Motorway Chowk'],
  },
  {
    id: 'city-peshawar',
    name: 'City Peshawar',
    exchangeHub: 'GT Road & City Optical Ring',
    status: 'Active GPON',
    maxSpeed: 'Up to 300 Mbps',
    installEta: '24 – 48 Hours',
    subAreas: ['Qissa Khwani', 'Hashtnagri', 'Dabgari Gardens', 'Karimpura', 'Ramdas', 'Yakatoot'],
  },
  {
    id: 'khyber-exchange',
    name: 'Khyber Exchange',
    exchangeHub: 'Khyber Exchange & Cantt Core',
    status: 'Active GPON',
    maxSpeed: 'Up to 300 Mbps',
    installEta: '24 Hours',
    subAreas: ['Khyber Bazaar', 'Saddar', 'Peshawar Cantt', 'Shami Road', 'Mall Road', 'Khyber Teaching Hospital'],
  },
  {
    id: 'university-town',
    name: 'University Town & Tehkal',
    exchangeHub: 'University Road Fiber Trunk',
    status: 'Active GPON',
    maxSpeed: 'Up to 300 Mbps',
    installEta: '24 – 36 Hours',
    subAreas: ['University Town', 'Tehkal Bala', 'Tehkal Payan', 'Board Bazaar', 'Abdara Road', 'Arbab Road'],
  },
  {
    id: 'warsak-charsadda',
    name: 'Warsak & Charsadda Road',
    exchangeHub: 'Northern Ring Optical Hub',
    status: 'Active GPON',
    maxSpeed: 'Up to 100 Mbps',
    installEta: '36 – 48 Hours',
    subAreas: ['Warsak Road', 'Charsadda Road', 'Pajjagi Road', 'Darmangi', 'Mathra', 'Khazana'],
  },
  {
    id: 'ring-kohat-dalazak',
    name: 'Ring Road, Dalazak & Kohat Road',
    exchangeHub: 'GT Road & Southern Ring Distribution',
    status: 'Active GPON',
    maxSpeed: 'Up to 100 Mbps',
    installEta: '36 – 48 Hours',
    subAreas: ['Dalazak Road', 'Ring Road', 'Kohat Road', 'Bahadur Kalay', 'Phandu Road', 'Landi Arbab'],
  },
];

export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  area: string;
  packageUsed: string;
  rating: number;
  highlight: string;
  quote: string;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'subhan',
    name: 'Subhan',
    role: 'Full-Stack Software Engineer',
    area: 'Hayatabad Phase 4',
    packageUsed: 'Flash Pro 50 Mbps',
    rating: 5,
    highlight: 'Transformed daily remote workflow',
    quote:
      'Switching to PTCL Flash Fiber completely changed my daily workflow. Pushing Docker builds, joining overseas client standups, and syncing large repositories now happen without a single hiccup—and the installation team got my line active within 24 hours.',
  },
  {
    id: 'arsalan',
    name: 'Arsalan',
    role: 'Digital Marketing Lead',
    area: 'Gulbahar No. 2',
    packageUsed: 'Flash Ultra 100 Mbps',
    rating: 5,
    highlight: 'Zero-drop uploads & steady latency',
    quote:
      'We upload multi-gigabyte 4K ad creatives every afternoon from Gulbahar. The symmetric fiber connection stays rock solid even during peak evening hours, and whenever we need router guidance, one call to 0314-9881406 sorts it out immediately.',
  },
  {
    id: 'zubair',
    name: 'Zubair',
    role: 'E-Commerce Store Owner',
    area: 'GT Road · Near Haji Camp',
    packageUsed: 'Flash Pro 50 Mbps',
    rating: 5,
    highlight: 'Seamless GT Road network stability',
    quote:
      'Running order fulfillment and live customer support near GT Road requires internet that never blinks. Since getting connected through the GT Road PTCL Exchange team, our warehouse POS and cloud dashboards have had seamless network stability.',
  },
  {
    id: 'kashif',
    name: 'Kashif',
    role: 'University Lecturer & Researcher',
    area: 'University Town / Khyber Exchange',
    packageUsed: 'Flash Stream 40 Mbps',
    rating: 5,
    highlight: 'Uninterrupted live lectures & HD classes',
    quote:
      'I conduct live online seminars and supervise thesis defenses from home. Even with four family members streaming in HD at the same time, my video and audio remain crystal clear with zero packet loss.',
  },
  {
    id: 'aliyan',
    name: 'Aliyan',
    role: 'Competitive Gamer & Freelancer',
    area: 'Saddar · Khyber Exchange',
    packageUsed: 'Flash Ultra 100 Mbps',
    rating: 5,
    highlight: 'Low ping & consistent fiber stability',
    quote:
      'Before Flash Fiber, evening ping spikes ruined ranked matches and freelance screen-sharing sessions. With this GPON line from Khyber Exchange, latency stays flat and predictable day and night—best ISP experience in Peshawar.',
  },
];

export interface SocialPost {
  id: string;
  platform: 'Facebook Update' | 'Google Business Highlight';
  areaTag: string;
  dateLabel: string;
  title: string;
  summary: string;
  imagePath: string;
  imageAlt: string;
  externalUrl: string;
  ctaLabel: string;
}

export const COMMUNITY_POSTS: SocialPost[] = [
  {
    id: 'post-gt-road',
    platform: 'Facebook Update',
    areaTag: 'GT Road PTCL Exchange',
    dateLabel: 'Recent Deployment',
    title: 'Fresh GPON Splitter Capacity Added at GT Road PTCL Exchange',
    summary:
      'New optical distribution ports are now live for GT Road, Gulbahar, Hashtnagri, and Firdous residents—enabling 24-hour new connection turnups.',
    imagePath: '/src/assets/images/community_gt_road_exchange_1795764061342.jpg',
    imageAlt: 'Optical fiber distribution box and patch cables at GT Road PTCL Exchange',
    externalUrl: BUSINESS_INFO.facebookUrl,
    ctaLabel: 'View on Facebook',
  },
  {
    id: 'post-hayatabad',
    platform: 'Google Business Highlight',
    areaTag: 'Hayatabad & University Town',
    dateLabel: 'Hardware Spotlight',
    title: 'Dual-Band Wi-Fi 6 ONT Routers Ready for 50–300 Mbps Homes',
    summary:
      'Every new Hayatabad and University Town setup includes clean wall-routing, optical dBm power verification, and dual-band 5 GHz Wi-Fi tuning.',
    imagePath: '/src/assets/images/community_hayatabad_wifi6_1795764061448.jpg',
    imageAlt: 'Dual-band Wi-Fi 6 GPON fiber router on a clean wooden desk',
    externalUrl: BUSINESS_INFO.googleProfileUrl,
    ctaLabel: 'View Google Profile',
  },
  {
    id: 'post-khyber',
    platform: 'Facebook Update',
    areaTag: 'Khyber Exchange & City Peshawar',
    dateLabel: 'Field Engineering',
    title: 'On-Site Fusion Splicing & Signal Calibration Across City Peshawar',
    summary:
      'Our Peshawar field technicians test every drop cable with an optical power meter before handing over your connection so speeds stay full rate.',
    imagePath: '/src/assets/images/community_peshawar_team_1795764061992.jpg',
    imageAlt: 'Field engineer inspecting fiber optic fusion splicer and optical power meter',
    externalUrl: BUSINESS_INFO.facebookUrl,
    ctaLabel: 'Follow Facebook Page',
  },
];
