import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import QuadPlayShowcase from './components/QuadPlayShowcase';
import PackageExplorer from './components/PackageExplorer';
import CoverageChecker from './components/CoverageChecker';
import TestimonialsSection from './components/TestimonialsSection';
import SocialCommunitySection from './components/SocialCommunitySection';
import ContactBookingSection from './components/ContactBookingSection';
import FloatingActions from './components/FloatingActions';
import DialerModal from './components/DialerModal';
import Footer from './components/Footer';
import { FiberPackage } from './data/ispData';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = window.localStorage.getItem('ptcl-peshawar-theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  const [selectedPackageId, setSelectedPackageId] = useState<string>('flash-50');
  const [selectedQuadplay, setSelectedQuadplay] = useState<boolean>(false);
  const [selectedArea, setSelectedArea] = useState<string>('Hayatabad');
  const [dialerState, setDialerState] = useState<{ open: boolean; context?: string }>({
    open: false,
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('ptcl-peshawar-theme', theme);
  }, [theme]);

  const scrollToContactForm = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectPackage = (pkg: FiberPackage, withQuadplay: boolean) => {
    setSelectedPackageId(pkg.id);
    setSelectedQuadplay(withQuadplay);
    scrollToContactForm();
  };

  const handleBookZone = (zoneName: string) => {
    setSelectedArea(zoneName);
    scrollToContactForm();
  };

  const handleOpenDialer = (context?: string) => {
    setDialerState({ open: true, context });
  };

  return (
    <div className="min-h-screen bg-white text-[#0F1F17] dark:bg-[#0A110E] dark:text-[#F1F6F3] transition-colors">
      <Navbar onOpenDialer={handleOpenDialer} />

      <main>
        <HeroSection
          theme={theme}
          onToggleTheme={setTheme}
          onOpenDialer={handleOpenDialer}
        />

        <PackageExplorer
          selectedPackageId={selectedPackageId}
          onSelectPackage={handleSelectPackage}
        />

        <QuadPlayShowcase />

        <CoverageChecker onBookZone={handleBookZone} />

        <TestimonialsSection />

        <SocialCommunitySection />

        <ContactBookingSection
          preselectedPackageId={selectedPackageId}
          preselectedQuadplay={selectedQuadplay}
          preselectedArea={selectedArea}
          onOpenDialer={handleOpenDialer}
        />
      </main>

      <Footer
        theme={theme}
        onToggleTheme={setTheme}
        onOpenDialer={handleOpenDialer}
      />

      <FloatingActions onOpenDialer={handleOpenDialer} />

      <DialerModal
        isOpen={dialerState.open}
        contextLabel={dialerState.context}
        onClose={() => setDialerState({ open: false })}
      />
    </div>
  );
}
