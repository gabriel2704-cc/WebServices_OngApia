import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { Home } from './pages/Home.js';
import { Adopt } from './pages/Adopt.js';
import { HowToHelp } from './pages/HowToHelp.js';
import { About } from './pages/About.js';
import { Events } from './pages/Events.js';
import { Login } from './pages/Login.js';
import { AdminDashboard } from './pages/AdminDashboard.js';

// Auto scroll to top on page navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-apia-bg text-apia-text">
        <Header />
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/adotar" element={<Adopt />} />
            <Route path="/como-ajudar" element={<HowToHelp />} />
            <Route path="/eventos" element={<Events />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
