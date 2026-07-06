import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDataLayer } from '@/contexts/DataLayerContext';
import { BLOG_CATEGORIES } from '@/lib/blogService';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const { pushEvent } = useDataLayer();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname, location.search]);

  const handleMenuClick = (menuItem) => {
    pushEvent('menu_click', {
      menu_item: menuItem,
      menu_location: 'header',
      page_path: location.pathname
    });
  };

  const handleMobileMenuToggle = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    pushEvent('mobile_menu_toggle', {
      action: newState ? 'open' : 'close',
      page_path: location.pathname
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && !event.target.closest('nav')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const trackingLinks = [
    { name: 'Tracking Hub', path: '/tracking-hub' },
    { name: 'GTM Server-Side', path: '/gtm-server-side' },
    { name: 'GA4 Avancé', path: '/ga4-advanced' },
    { name: 'Shopify Tracking', path: '/shopify' },
  ];

  const performanceLinks = [
    { name: 'Audit Google Ads', path: '/audit-google-ads' },
    { name: 'Conversions Offline', path: '/conversions-offline' },
    { name: 'Landing Pages', path: '/landing-pages' },
    { name: 'Consent Mode', path: '/consent-mode' },
  ];

  const automatisationLinks = [
    { name: 'Automatisation Hub', path: '/automatisation-hub' },
    { name: 'Agent IA conversationnel', path: '/agent-ia-conversationnel' },
    { name: 'Réponse Leads', path: '/reponse-leads' },
    { name: 'Google My Business', path: '/google-my-business' },
    { name: 'Service pour conciergerie', path: '/conciergerie' },
    { name: 'Back office conciergerie', path: '/back-office-conciergerie' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
            onClick={() => handleMenuClick('logo')}
          >
            <img
              src="/images/logo.png"
              alt="Juh Ecomm Data Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              width="32"
              height="32"
              decoding="async"
            />
            <span className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-lime-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity whitespace-nowrap">
              Juh Ecomm Data
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {/* Tracking & Data Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-slate-300 hover:text-cyan-400 transition-colors py-2 font-medium"
                onMouseEnter={() => setOpenDropdown('tracking')}
                onClick={() => handleMenuClick('tracking-menu')}
              >
                <span>Tracking</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === 'tracking' ? 'rotate-180' : ''} group-hover:rotate-180`} />
              </button>
              <AnimatePresence>
                {openDropdown === 'tracking' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden"
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {trackingLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="block px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-cyan-400 transition-colors"
                        onClick={() => handleMenuClick(link.name)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Performance Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-slate-300 hover:text-amber-400 transition-colors py-2 font-medium"
                onMouseEnter={() => setOpenDropdown('performance')}
                onClick={() => handleMenuClick('performance-menu')}
              >
                <span>Performance</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === 'performance' ? 'rotate-180' : ''} group-hover:rotate-180`} />
              </button>
              <AnimatePresence>
                {openDropdown === 'performance' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden"
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {performanceLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="block px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-amber-400 transition-colors"
                        onClick={() => handleMenuClick(link.name)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Automatisation Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-slate-300 hover:text-violet-400 transition-colors py-2 font-medium"
                onMouseEnter={() => setOpenDropdown('automatisation')}
                onClick={() => handleMenuClick('automatisation-menu')}
              >
                <span>Automatisation</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === 'automatisation' ? 'rotate-180' : ''} group-hover:rotate-180`} />
              </button>
              <AnimatePresence>
                {openDropdown === 'automatisation' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden"
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {automatisationLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="block px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-violet-400 transition-colors"
                        onClick={() => handleMenuClick(link.name)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Blog Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-slate-300 hover:text-lime-400 transition-colors py-2 font-medium"
                onMouseEnter={() => setOpenDropdown('blog')}
                onClick={() => handleMenuClick('blog-menu')}
              >
                <span>Blog</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === 'blog' ? 'rotate-180' : ''} group-hover:rotate-180`} />
              </button>
              <AnimatePresence>
                {openDropdown === 'blog' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden max-h-[80vh] overflow-y-auto custom-scrollbar"
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      to="/blog"
                      className="block px-4 py-3 text-slate-200 font-medium hover:bg-slate-700 hover:text-lime-400 transition-colors border-b border-slate-700/50"
                      onClick={() => handleMenuClick('Tous les articles')}
                    >
                      Tous les articles
                    </Link>
                    {BLOG_CATEGORIES.map((category) => (
                      <Link
                        key={category.slug}
                        to={`/blog?category=${category.slug}`}
                        className="block px-4 py-2.5 text-slate-300 hover:bg-slate-700 hover:text-lime-400 transition-colors text-sm"
                        onClick={() => handleMenuClick(category.name)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <a
              href="https://simulateur.juh-ecomm.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-slate-300 hover:text-lime-400 transition-colors font-medium"
              onClick={() => handleMenuClick('simulateur')}
            >
              <span>Simulateur</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <Link
              to="/contact"
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              onClick={() => handleMenuClick('contact')}
            >
              Contact
            </Link>
          </div>

          <button
            className="lg:hidden text-slate-300 hover:text-cyan-400 transition-colors"
            onClick={handleMobileMenuToggle}
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-slate-800 overflow-hidden"
            >
              <div className="py-4 space-y-4 max-h-[80vh] overflow-y-auto">
                {/* Tracking Mobile */}
                <div>
                  <button
                    className="w-full flex items-center justify-between px-4 py-2 text-slate-300 hover:text-cyan-400 transition-colors"
                    onClick={() => setOpenDropdown(openDropdown === 'tracking' ? null : 'tracking')}
                  >
                    <span>Tracking</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'tracking' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === 'tracking' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 space-y-2 mt-2"
                      >
                        {trackingLinks.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className="block px-4 py-2 text-slate-400 hover:text-cyan-400 transition-colors"
                            onClick={() => handleMenuClick(link.name)}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Performance Mobile */}
                <div>
                  <button
                    className="w-full flex items-center justify-between px-4 py-2 text-slate-300 hover:text-amber-400 transition-colors"
                    onClick={() => setOpenDropdown(openDropdown === 'performance' ? null : 'performance')}
                  >
                    <span>Performance</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'performance' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === 'performance' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 space-y-2 mt-2"
                      >
                        {performanceLinks.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className="block px-4 py-2 text-slate-400 hover:text-amber-400 transition-colors"
                            onClick={() => handleMenuClick(link.name)}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Automatisation Mobile */}
                <div>
                  <button
                    className="w-full flex items-center justify-between px-4 py-2 text-slate-300 hover:text-violet-400 transition-colors"
                    onClick={() => setOpenDropdown(openDropdown === 'automatisation' ? null : 'automatisation')}
                  >
                    <span>Automatisation</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'automatisation' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === 'automatisation' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 space-y-2 mt-2"
                      >
                        {automatisationLinks.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className="block px-4 py-2 text-slate-400 hover:text-violet-400 transition-colors"
                            onClick={() => handleMenuClick(link.name)}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Blog Mobile */}
                <div>
                  <button
                    className="w-full flex items-center justify-between px-4 py-2 text-slate-300 hover:text-lime-400 transition-colors"
                    onClick={() => setOpenDropdown(openDropdown === 'blog' ? null : 'blog')}
                  >
                    <span>Blog</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'blog' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === 'blog' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 space-y-1 mt-2 border-l border-slate-800 ml-4"
                      >
                        <Link
                          to="/blog"
                          className="block px-4 py-2 text-slate-200 font-medium hover:text-lime-400 transition-colors"
                          onClick={() => handleMenuClick('Tous les articles')}
                        >
                          Tous les articles
                        </Link>
                        {BLOG_CATEGORIES.map((category) => (
                          <Link
                            key={category.slug}
                            to={`/blog?category=${category.slug}`}
                            className="block px-4 py-2 text-slate-400 hover:text-lime-400 transition-colors text-sm"
                            onClick={() => handleMenuClick(category.name)}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <a
                  href="https://simulateur.juh-ecomm.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-4 py-2 text-slate-300 hover:text-lime-400 transition-colors font-medium"
                  onClick={() => handleMenuClick('simulateur')}
                >
                  <span>Simulateur</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <Link
                  to="/contact"
                  className="block mx-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-semibold text-center hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                  onClick={() => handleMenuClick('contact')}
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;