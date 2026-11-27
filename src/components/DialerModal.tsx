import { useEffect, useState } from 'react';
import { Check, Copy, MessageCircle, PhoneCall, Volume2, VolumeX, X } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppLink } from '../data/ispData';

interface DialerModalProps {
  isOpen: boolean;
  contextLabel?: string;
  onClose: () => void;
}

const KEYPAD_KEYS = [
  { digit: '1', letters: '' },
  { digit: '2', letters: 'ABC' },
  { digit: '3', letters: 'DEF' },
  { digit: '4', letters: 'GHI' },
  { digit: '5', letters: 'JKL' },
  { digit: '6', letters: 'MNO' },
  { digit: '7', letters: 'PQRS' },
  { digit: '8', letters: 'TUV' },
  { digit: '9', letters: 'WXYZ' },
  { digit: '*', letters: '' },
  { digit: '0', letters: '+' },
  { digit: '#', letters: '' },
];

const DTMF_FREQS: Record<string, [number, number]> = {
  '1': [697, 1209],
  '2': [697, 1336],
  '3': [697, 1477],
  '4': [770, 1209],
  '5': [770, 1336],
  '6': [770, 1477],
  '7': [852, 1209],
  '8': [852, 1336],
  '9': [852, 1477],
  '*': [941, 1209],
  '0': [941, 1336],
  '#': [941, 1477],
};

function playDtmfTone(digit: string) {
  const freqs = DTMF_FREQS[digit];
  if (!freqs || typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    osc1.frequency.value = freqs[0];
    osc2.frequency.value = freqs[1];
    gain.gain.value = 0.04;
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.11);
    osc2.stop(ctx.currentTime + 0.11);
    window.setTimeout(() => {
      ctx.close().catch(() => {});
    }, 180);
  } catch {
    // Audio playback optional
  }
}

export default function DialerModal({ isOpen, contextLabel, onClose }: DialerModalProps) {
  const [dialedDigits, setDialedDigits] = useState(BUSINESS_INFO.phoneDisplay);
  const [copied, setCopied] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSent, setCallbackSent] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setDialedDigits(BUSINESS_INFO.phoneDisplay);
    setCallbackSent(false);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(BUSINESS_INFO.phoneRaw);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleKeypadPress = (digit: string) => {
    if (soundEnabled) {
      playDtmfTone(digit);
    }
    setDialedDigits((prev) =>
      (prev === BUSINESS_INFO.phoneDisplay ? `${BUSINESS_INFO.phoneDisplay} · ${digit}` : `${prev}${digit}`).slice(0, 22)
    );
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (callbackPhone.trim().length < 7) return;
    setCallbackSent(true);
  };

  const whatsappDirect = buildWhatsAppLink(
    `Assalam-o-Alaikum, I would like to connect regarding PTCL Flash Fiber in Peshawar (${contextLabel || 'Direct Call Desk'}).`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialer-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#13201A] shadow-2xl">
        {/* Top PTCL Desk Header */}
        <div className="flex items-center justify-between bg-[#007B3E] px-5 py-4 text-white">
          <div>
            <p className="text-xs font-semibold text-[#D9F99D]">
              GT Road PTCL Exchange Desk
            </p>
            <h2 id="dialer-modal-title" className="font-display text-lg font-bold tracking-tight">
              Direct Peshawar Fiber Line
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSoundEnabled((s) => !s)}
              aria-label={soundEnabled ? 'Mute dialer tones' : 'Enable dialer tones'}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/85 hover:bg-black/20 hover:text-white cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialing interface"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/85 hover:bg-black/20 hover:text-white cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Number Readout Screen */}
          <div className="rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-[#F4F7F5] dark:bg-[#0F1914] p-4 text-center">
            <p className="text-xs font-medium text-[#4B5B53] dark:text-[#9EB3A7]">
              {contextLabel || 'New Connection & Support Helpline'}
            </p>
            <p className="mt-1 font-mono text-2xl font-bold tracking-tight text-[#0F1F17] dark:text-white tabular-nums">
              {dialedDigits}
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#13201A] px-3 py-1.5 text-xs font-medium text-[#0F1F17] dark:text-[#F1F6F3] hover:bg-[#EAF2ED] dark:hover:bg-[#172820] cursor-pointer"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-[#007B3E] dark:text-[#78BE20]" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span>{copied ? 'Copied 03149881406' : 'Copy Number'}</span>
              </button>
              {dialedDigits !== BUSINESS_INFO.phoneDisplay && (
                <button
                  type="button"
                  onClick={() => setDialedDigits(BUSINESS_INFO.phoneDisplay)}
                  className="inline-flex min-h-9 items-center rounded-lg border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#13201A] px-3 py-1.5 text-xs font-medium text-[#4B5B53] dark:text-[#9EB3A7] hover:bg-[#EAF2ED] dark:hover:bg-[#172820] cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Interactive Dial Pad */}
          <div className="grid grid-cols-3 gap-2">
            {KEYPAD_KEYS.map((item) => (
              <button
                key={item.digit}
                type="button"
                onClick={() => handleKeypadPress(item.digit)}
                className="flex min-h-12 flex-col items-center justify-center rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#0F1914] py-1.5 transition-transform duration-100 hover:border-[#007B3E] dark:hover:border-[#78BE20] active:scale-95 cursor-pointer"
              >
                <span className="font-mono text-base font-semibold text-[#0F1F17] dark:text-white leading-none">
                  {item.digit}
                </span>
                {item.letters && (
                  <span className="mt-0.5 text-[10px] font-medium tracking-widest text-[#697B72] dark:text-[#798D82]">
                    {item.letters}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Primary Dial & WhatsApp Triggers */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <a
              href={`tel:${BUSINESS_INFO.phoneIntl}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#007B3E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#006332] whitespace-nowrap"
            >
              <PhoneCall className="h-4 w-4" aria-hidden="true" />
              <span>Dial {BUSINESS_INFO.phoneDisplay}</span>
            </a>

            <a
              href={whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#007B3E] dark:border-[#78BE20] bg-[#EAF5EE] dark:bg-[#163023] px-4 py-2.5 text-sm font-semibold text-[#007B3E] dark:text-[#A3E635] transition-colors hover:bg-[#DCEFE3] dark:hover:bg-[#1F4230] whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>WhatsApp Call/Chat</span>
            </a>
          </div>

          {/* Instant Callback Request */}
          <div className="border-t border-[#DCE5DF] dark:border-[#1F352B] pt-4">
            {callbackSent ? (
              <div className="rounded-xl border border-[#007B3E]/30 bg-[#EAF5EE] dark:bg-[#163023] p-3 text-center text-xs font-medium text-[#007B3E] dark:text-[#A3E635]">
                Callback queued for <span className="font-mono font-semibold">{callbackPhone}</span>. Our GT Road Exchange representative will call shortly.
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="flex flex-col gap-2 sm:flex-row">
                <label htmlFor="callback-phone-input" className="sr-only">
                  Your mobile number for callback
                </label>
                <input
                  id="callback-phone-input"
                  type="tel"
                  required
                  value={callbackPhone}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  placeholder="Enter your number for callback (03XX-...)"
                  className="min-h-10 flex-1 rounded-lg border border-[#DCE5DF] dark:border-[#1F352B] bg-white dark:bg-[#0F1914] px-3 py-2 text-xs text-[#0F1F17] dark:text-white placeholder:text-[#798D82] focus:border-[#007B3E] dark:focus:border-[#78BE20] focus:outline-none"
                />
                <button
                  type="submit"
                  className="min-h-10 rounded-lg bg-[#0F1F17] dark:bg-[#78BE20] px-4 py-2 text-xs font-semibold text-white dark:text-[#0A110E] hover:bg-[#1E3529] dark:hover:bg-[#8CC63F] whitespace-nowrap cursor-pointer"
                >
                  Call Me Back
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
