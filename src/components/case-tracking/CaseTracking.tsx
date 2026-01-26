import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CNRSearchBar } from './CNRSearchBar';
import { SearchingState } from './SearchingState';
import { CaseSummaryCard } from './CaseSummaryCard';
import { KeyDetailsGrid } from './KeyDetailsGrid';
import { CaseTimeline } from './CaseTimeline';
import { RemindersCard } from './RemindersCard';
import Navigation from '../Navigation';

import {
  mockCaseData,
  mockTimelineEvents,
  mockReminders,
} from '../../data/mockCaseData';

type Page = 'home' | 'kiosk' | 'features' | 'tracking' | 'impact' | 'chatbot';

export default function CaseTrackingPage({
  onNavigate,
}: {
  onNavigate: (p: Page) => void;
}) {
  const [viewState, setViewState] =
    useState<'search' | 'searching' | 'results'>('search');
  const [searchedCNR, setSearchedCNR] = useState('');

  const handleSearch = (cnr: string) => {
    setSearchedCNR(cnr);
    setViewState('searching');
    setTimeout(() => setViewState('results'), 2000);
  };

  return (
    <div className="min-h-screen bg-background bg-pattern text-foreground flex flex-col">
      {/* ✅ NAVIGATION FIXED */}
      <Navigation currentPage="tracking" onNavigate={onNavigate} />

      <main className="flex-1 pt-20">
        <AnimatePresence mode="wait">
          {viewState === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center min-h-[60vh] px-6"
            >
              <div className="text-center mb-10">
                <h1 className="text-6xl font-extrabold mb-4 tracking-tight italic">
                  TRACK YOUR <span className="text-gradient">CASE</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Access real-time legal records securely
                </p>
              </div>

              <div className="w-full max-w-2xl">
                <CNRSearchBar onSearch={handleSearch} isSearching={false} />
              </div>
            </motion.div>
          )}

          {viewState === 'searching' && <SearchingState key="searching" />}

          {viewState === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-7xl mx-auto px-6 py-12"
            >
              <CaseSummaryCard
                caseData={{ ...mockCaseData, cnr: searchedCNR }}
              />

              <section className="mt-12">
                <KeyDetailsGrid caseData={mockCaseData} />
              </section>

              <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <CaseTimeline events={mockTimelineEvents} />
                <RemindersCard reminders={mockReminders} />
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
