import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Keeps the main website usable if the optional Three.js/WebGL showcase
 * cannot initialize on a device or browser without working WebGL support.
 */
export default class SceneErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Fiber 3D preview failed; showing the static fallback instead.', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[320px] h-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#DCE5DF] dark:border-[#1F352B] bg-gradient-to-br from-[#EAF2ED] via-white to-[#D9F99D]/40 dark:from-[#102018] dark:via-[#0B1510] dark:to-[#163023] p-8 text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#78BE20]/40 bg-white/80 dark:bg-[#13201A]/80 shadow-sm">
            <svg viewBox="0 0 64 64" className="h-12 w-12" role="img" aria-label="Fiber network illustration">
              <g fill="none" stroke="#007B3E" strokeWidth="2.5" strokeLinecap="round">
                <path d="M32 32 12 14M32 32 52 14M32 32 12 50M32 32 52 50" />
                <circle cx="32" cy="32" r="8" fill="#78BE20" />
                <circle cx="12" cy="14" r="5" fill="#fff" />
                <circle cx="52" cy="14" r="5" fill="#fff" />
                <circle cx="12" cy="50" r="5" fill="#fff" />
                <circle cx="52" cy="50" r="5" fill="#fff" />
              </g>
            </svg>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#007B3E] dark:text-[#78BE20]">Peshawar Fiber Network</p>
          <h3 className="mt-2 font-display text-xl font-extrabold text-[#0F1F17] dark:text-white">Connected across Peshawar</h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#4B5B53] dark:text-[#B4C5BC]">Your browser cannot display the interactive 3D preview, but all packages, coverage details, and booking options are still available.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
