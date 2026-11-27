import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Facebook,
  Globe,
  MapPin,
  MessageCircle,
  PhoneCall,
  Send,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  FIBER_PACKAGES,
  PESHAWAR_COVERAGE_ZONES,
  buildWhatsAppLink,
} from '../data/ispData';

interface ContactBookingSectionProps {
  preselectedPackageId: string;
  preselectedQuadplay: boolean;
  preselectedArea: string;
  onOpenDialer: (context?: string) => void;
}

interface SubmittedInquiry {
  referenceId: string;
  fullName: string;
  phone: string;
  area: string;
  packageLabel: string;
  address: string;
}

export default function ContactBookingSection({
  preselectedPackageId,
  preselectedQuadplay,
  preselectedArea,
  onOpenDialer,
}: ContactBookingSectionProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState(preselectedArea || 'Hayatabad');
  const [packageId, setPackageId] = useState(preselectedPackageId || 'flash-50');
  const [bundleType, setBundleType] = useState<'standard' | 'quadplay'>(
    preselectedQuadplay ? 'quadplay' : 'standard'
  );
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState<SubmittedInquiry | null>(null);

  useEffect(() => {
    if (preselectedPackageId) {
      setPackageId(preselectedPackageId);
    }
  }, [preselectedPackageId]);

  useEffect(() => {
    setBundleType(preselectedQuadplay ? 'quadplay' : 'standard');
  }, [preselectedQuadplay]);

  useEffect(() => {
    if (preselectedArea) {
      setArea(preselectedArea);
    }
  }, [preselectedArea]);

  const activePackage =
    FIBER_PACKAGES.find((p) => p.id === packageId) || FIBER_PACKAGES[3];
  const activePrice =
    bundleType === 'quadplay'
      ? activePackage.quadplayPricePkr
      : activePackage.monthlyPricePkr;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedName = fullName.trim();
    const cleanedPhone = phone.replace(/[\s-]/g, '');

    if (trimmedName.length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!/^(\+92|0)?3\d{9}$/.test(cleanedPhone) && cleanedPhone.length < 10) {
      setErrorMsg('Please enter a valid Pakistani mobile or landline number (e.g. 0314-9881406).');
      return;
    }

    if (address.trim().length < 5) {
      setErrorMsg('Please enter your house/street or plaza address in Peshawar.');
      return;
    }

    const ref = `PSH-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmitted({
      referenceId: ref,
      fullName: trimmedName,
      phone: phone.trim(),
      area,
      packageLabel: `${activePackage.name} (${activePackage.speedMbps} Mbps · ${
        bundleType === 'quadplay' ? 'QuadPlay + TV' : 'Fiber + Voice'
      } · Rs. ${activePrice.toLocaleString()}/mo)`,
      address: address.trim(),
    });
  };

  const whatsappInquiryUrl = buildWhatsAppLink(
    submitted
      ? `Assalam-o-Alaikum, New PTCL Flash Fiber Booking (${submitted.referenceId}):\nName: ${submitted.fullName}\nPhone: ${submitted.phone}\nArea: ${submitted.area}\nPackage: ${submitted.packageLabel}\nAddress: ${submitted.address}`
      : `Assalam-o-Alaikum, I want to inquire about ${activePackage.name} (${activePackage.speedMbps} Mbps) in ${area}, Peshawar.`
  );

  return (
    <section
      id="contact"
      className="bg-[#F4F7F5] dark:bg-[#0A110E] py-16 sm:py-20 transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left: Direct Business Desk & Exchange Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-bold tracking-wide text-[#007B3E] dark:text-[#78BE20]">
                New Connection & Contact Desk
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0F1F17] dark:text-white sm:text-4xl [text-wrap:balance]">
                Book Your Flash Fiber Connection in Peshawar
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#3C4E45] dark:text-[#B4C5BC]">
                Submit your neighborhood and preferred speed below, or reach our GT Road PTCL Exchange team instantly via WhatsApp or direct call.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#13201A] p-5">
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#007B3E] dark:text-[#78BE20]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-bold text-[#0F1F17] dark:text-white">
                    GT Road PTCL Exchange Office
                  </p>
                  <p className="mt-0.5 text-sm text-[#3C4E45] dark:text-[#B4C5BC]">
                    {BUSINESS_INFO.exchangeAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-[#DCE5DF] dark:border-[#1F352B] pt-3">
                <Clock
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#007B3E] dark:text-[#78BE20]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-bold text-[#0F1F17] dark:text-white">
                    Support & Dispatch Hours
                  </p>
                  <p className="mt-0.5 text-sm text-[#3C4E45] dark:text-[#B4C5BC]">
                    {BUSINESS_INFO.workingHours}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => onOpenDialer('Contact Section Call')}
                  className="relative inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0F1F17] dark:bg-[#78BE20] px-4 py-2.5 text-xs font-semibold text-white dark:text-[#0A110E] transition-colors hover:bg-[#1E3529] dark:hover:bg-[#8CC63F] whitespace-nowrap cursor-pointer"
                >
                  <PhoneCall className="h-4 w-4" aria-hidden="true" />
                  <span className="tabular-nums">Call {BUSINESS_INFO.phoneDisplay}</span>
                </button>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#007B3E] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#006332] whitespace-nowrap"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>WhatsApp 0314-9881406</span>
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
              <a
                href={BUSINESS_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#13201A] px-4 py-2 text-[#0F1F17] dark:text-[#F1F6F3] transition-colors hover:border-[#1877F2] hover:text-[#1877F2]"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
                <span>Facebook Community</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>

              <a
                href={BUSINESS_INFO.googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#13201A] px-4 py-2 text-[#0F1F17] dark:text-[#F1F6F3] transition-colors hover:border-[#007B3E] dark:hover:border-[#78BE20]"
              >
                <Globe className="h-4 w-4 text-[#007B3E] dark:text-[#78BE20]" aria-hidden="true" />
                <span>Google Business Profile</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right: Streamlined Connection & Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#13201A] p-6 shadow-xs sm:p-8">
              {submitted ? (
                <div className="space-y-5 py-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-6 w-6 shrink-0 text-[#007B3E] dark:text-[#78BE20]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-mono text-xs font-semibold text-[#007B3E] dark:text-[#78BE20]">
                        Reference #{submitted.referenceId}
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-bold text-[#0F1F17] dark:text-white">
                        Booking Request Recorded
                      </h3>
                      <p className="mt-1 text-sm text-[#3C4E45] dark:text-[#B4C5BC]">
                        Thank you, {submitted.fullName}. Our Peshawar field desk will verify GPON port availability for {submitted.area} and contact {submitted.phone}.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-[#F4F7F5] dark:bg-[#0F1914] p-4 text-sm text-[#2A3A32] dark:text-[#D5E1DA] space-y-1.5">
                    <p>
                      <span className="font-semibold text-[#0F1F17] dark:text-white">Selected Plan:</span>{' '}
                      {submitted.packageLabel}
                    </p>
                    <p>
                      <span className="font-semibold text-[#0F1F17] dark:text-white">Peshawar Area:</span>{' '}
                      {submitted.area}
                    </p>
                    <p>
                      <span className="font-semibold text-[#0F1F17] dark:text-white">Street Address:</span>{' '}
                      {submitted.address}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#007B3E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#006332] whitespace-nowrap"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      <span>Send Summary to WhatsApp ({BUSINESS_INFO.phoneDisplay})</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(null);
                        setFullName('');
                        setPhone('');
                        setAddress('');
                        setNotes('');
                      }}
                      className="inline-flex min-h-11 items-center rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#0F1914] px-4 py-2.5 text-sm font-semibold text-[#0F1F17] dark:text-white hover:bg-[#F4F7F5] dark:hover:bg-[#172820] cursor-pointer"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE5DF] dark:border-[#1F352B] pb-4">
                    <h3 className="font-display text-xl font-bold text-[#0F1F17] dark:text-white">
                      Order Flash Fiber / Request Survey
                    </h3>
                    <span className="font-mono text-sm font-bold text-[#007B3E] dark:text-[#78BE20] tabular-nums">
                      Rs. {activePrice.toLocaleString()}/mo
                    </span>
                  </div>

                  {errorMsg && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/60 px-4 py-3 text-xs font-medium text-red-800 dark:text-red-200"
                    >
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="booking-name"
                        className="block text-xs font-semibold text-[#2A3A32] dark:text-[#D5E1DA]"
                      >
                        Full Name
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Muhammad Subhan"
                        className="mt-1.5 min-h-11 w-full rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#0F1914] px-3.5 py-2 text-sm text-[#0F1F17] dark:text-white placeholder:text-[#798D82] focus:border-[#007B3E] dark:focus:border-[#78BE20] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="block text-xs font-semibold text-[#2A3A32] dark:text-[#D5E1DA]"
                      >
                        Mobile / WhatsApp Number
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="03XX-XXXXXXX"
                        className="mt-1.5 min-h-11 w-full rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#0F1914] px-3.5 py-2 font-mono text-sm text-[#0F1F17] dark:text-white placeholder:text-[#798D82] focus:border-[#007B3E] dark:focus:border-[#78BE20] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="booking-area"
                        className="block text-xs font-semibold text-[#2A3A32] dark:text-[#D5E1DA]"
                      >
                        Peshawar Area / Exchange
                      </label>
                      <select
                        id="booking-area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="mt-1.5 min-h-11 w-full rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#0F1914] px-3.5 py-2 text-sm text-[#0F1F17] dark:text-white focus:border-[#007B3E] dark:focus:border-[#78BE20] focus:outline-none"
                      >
                        {PESHAWAR_COVERAGE_ZONES.map((z) => (
                          <option key={z.id} value={z.name}>
                            {z.name}
                          </option>
                        ))}
                        <option value="Other Peshawar Sector">Other Peshawar Sector</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="booking-package"
                        className="block text-xs font-semibold text-[#2A3A32] dark:text-[#D5E1DA]"
                      >
                        Fiber Speed Package
                      </label>
                      <select
                        id="booking-package"
                        value={packageId}
                        onChange={(e) => setPackageId(e.target.value)}
                        className="mt-1.5 min-h-11 w-full rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#0F1914] px-3.5 py-2 text-sm text-[#0F1F17] dark:text-white focus:border-[#007B3E] dark:focus:border-[#78BE20] focus:outline-none"
                      >
                        {FIBER_PACKAGES.map((pkg) => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.name} ({pkg.speedMbps} Mbps — Rs.{' '}
                            {(bundleType === 'quadplay'
                              ? pkg.quadplayPricePkr
                              : pkg.monthlyPricePkr
                            ).toLocaleString()}
                            )
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-semibold text-[#2A3A32] dark:text-[#D5E1DA]">
                      Bundle Preference
                    </span>
                    <div className="mt-1.5 grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setBundleType('standard')}
                        className={`min-h-11 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                          bundleType === 'standard'
                            ? 'border-[#007B3E] dark:border-[#78BE20] bg-[#EAF5EE] dark:bg-[#163023] text-[#007B3E] dark:text-[#A3E635]'
                            : 'border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#0F1914] text-[#4B5B53] dark:text-[#9EB3A7]'
                        }`}
                      >
                        Fiber Internet + Voice
                      </button>
                      <button
                        type="button"
                        onClick={() => setBundleType('quadplay')}
                        className={`min-h-11 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                          bundleType === 'quadplay'
                            ? 'border-[#007B3E] dark:border-[#78BE20] bg-[#EAF5EE] dark:bg-[#163023] text-[#007B3E] dark:text-[#A3E635]'
                            : 'border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#0F1914] text-[#4B5B53] dark:text-[#9EB3A7]'
                        }`}
                      >
                        QuadPlay (Fiber + Smart TV + Voice)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="booking-address"
                      className="block text-xs font-semibold text-[#2A3A32] dark:text-[#D5E1DA]"
                    >
                      Complete Street / House / Plaza Address in Peshawar
                    </label>
                    <input
                      id="booking-address"
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House #, Street #, Sector / Phase or Plaza Name"
                      className="mt-1.5 min-h-11 w-full rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#0F1914] px-3.5 py-2 text-sm text-[#0F1F17] dark:text-white placeholder:text-[#798D82] focus:border-[#007B3E] dark:focus:border-[#78BE20] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="booking-notes"
                      className="block text-xs font-semibold text-[#2A3A32] dark:text-[#D5E1DA]"
                    >
                      Additional Inquiry or Existing PTCL Number (Optional)
                    </label>
                    <textarea
                      id="booking-notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Need fiber migration from copper, Wi-Fi 6 router, or urgent business setup..."
                      className="mt-1.5 w-full rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#0F1914] px-3.5 py-2 text-sm text-[#0F1F17] dark:text-white placeholder:text-[#798D82] focus:border-[#007B3E] dark:focus:border-[#78BE20] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                    <button
                      type="submit"
                      className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#007B3E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#006332] cursor-pointer"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>Submit Connection Inquiry</span>
                    </button>

                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#007B3E] dark:border-[#78BE20] bg-[#EAF5EE] dark:bg-[#163023] px-5 py-3 text-sm font-semibold text-[#007B3E] dark:text-[#A3E635] transition-colors hover:bg-[#DCEFE3] dark:hover:bg-[#1F4230] whitespace-nowrap"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      <span>Direct WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
