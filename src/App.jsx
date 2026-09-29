import React, { useState } from 'react';
import { WorkshopProvider } from './context/WorkshopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { AdminBanner } from './components/AdminBanner';
import { Home } from './pages/Home';
import { StlQuote } from './pages/StlQuote';
import { CorporateMerch } from './pages/CorporateMerch';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  // 'home' | 'quote' | 'corporate'

  return (
    <WorkshopProvider>
      <div className="min-h-screen bg-[#0d0d16] text-white flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
        <AdminBanner />

        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <main className="flex-1">
          {currentPage === 'home' && (
            <Home onNavigate={setCurrentPage} />
          )}

          {currentPage === 'quote' && <StlQuote />}

          {currentPage === 'corporate' && <CorporateMerch />}
        </main>

        <Footer />

        <AdminModal />
      </div>
    </WorkshopProvider>
  );
}