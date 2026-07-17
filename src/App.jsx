
import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { DataLayerProvider } from '@/contexts/DataLayerContext';
import { SupabaseAuthProvider } from '@/contexts/SupabaseAuthContext';
import ScrollToTop from '@/components/ScrollToTop';
import ConsentManager from '@/components/ConsentManager';
import AdParamsCapture from '@/components/AdParamsCapture';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// HomePage chargée immédiatement (critique pour le LCP)
import HomePage from '@/pages/HomePage';

// Toutes les autres pages en lazy loading — chargées uniquement quand visitées
const ContactPage             = lazy(() => import('@/pages/ContactPage'));
const AuditGoogleAdsPage      = lazy(() => import('@/pages/AuditGoogleAdsPage'));
const GtmServerSidePage       = lazy(() => import('@/pages/GtmServerSidePage'));
const Ga4AdvancedPage         = lazy(() => import('@/pages/Ga4AdvancedPage'));
const ShopifyPage             = lazy(() => import('@/pages/ShopifyPage'));
const GoogleMyBusinessPage    = lazy(() => import('@/pages/GoogleMyBusinessPage'));
const ConversionsOfflinePage  = lazy(() => import('@/pages/ConversionsOfflinePage'));
const ConciergeriePage        = lazy(() => import('@/pages/ConciergeriePage'));
const BackOfficeConciergeriePage = lazy(() => import('@/pages/BackOfficeConciergeriePage'));
const AgentIaPage             = lazy(() => import('@/pages/AgentIaPage'));
const ReponseLeadsPage        = lazy(() => import('@/pages/ReponseLeadsPage'));
const AutomatisationHubPage   = lazy(() => import('@/pages/AutomatisationHubPage'));
const TrackingHubPage         = lazy(() => import('@/pages/TrackingHubPage'));
const ConsentModePage         = lazy(() => import('@/pages/ConsentModePage'));
const LandingPagesPage        = lazy(() => import('@/pages/LandingPagesPage'));
const BlogPage                = lazy(() => import('@/pages/BlogPage'));
const BlogPostPage            = lazy(() => import('@/pages/BlogPostPage'));
const ApiDocsPage             = lazy(() => import('@/pages/ApiDocsPage'));
const MentionsLegalesPage     = lazy(() => import('@/pages/MentionsLegalesPage'));
const PolitiqueConfidentialitePage = lazy(() => import('@/pages/PolitiqueConfidentialitePage'));
const SeoAuditPage            = lazy(() => import('@/pages/SeoAuditPage'));
const NotFoundPage            = lazy(() => import('@/pages/NotFoundPage'));

// Pages ombrelle (pont inter-silos) + nouvelles pages silo (placeholders)
const AProposPage             = lazy(() => import('@/pages/AProposPage'));
const FacturationRelancesPage = lazy(() => import('@/pages/FacturationRelancesPage'));
const PriseRdvDevisPage       = lazy(() => import('@/pages/PriseRdvDevisPage'));
const AngoulemePage           = lazy(() => import('@/pages/AngoulemePage'));

function App() {
  // Domain redirect logic: automatically redirect non-www "juh-ecomm.fr" to "www.juh-ecomm.fr"
  // This performs a client-side 301-style redirect to ensure consistent URL structure
  // and avoid duplicate content issues for SEO.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'juh-ecomm.fr') {
        const newUrl = window.location.protocol + '//www.' + hostname + window.location.pathname + window.location.search;
        window.location.replace(newUrl);
      }
    }
  }, []);

  // Set document language to French on mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = 'fr';
    }
  }, []);

  return (
    <Router>
      <AdParamsCapture />
      <SupabaseAuthProvider>
        <DataLayerProvider>
          <ScrollToTop />
          <ConsentManager />
          <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />
            <main className="flex-grow">
              <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/a-propos" element={<AProposPage />} />

                {/* Silo 1 — Tracking & Data */}
                <Route path="/tracking-data" element={<TrackingHubPage />} />
                <Route path="/tracking-data/gtm-server-side" element={<GtmServerSidePage />} />
                <Route path="/tracking-data/ga4" element={<Ga4AdvancedPage />} />
                <Route path="/tracking-data/tracking-ecommerce-shopify" element={<ShopifyPage />} />
                <Route path="/tracking-data/audit-google-ads" element={<AuditGoogleAdsPage />} />
                <Route path="/tracking-data/conversions-offline" element={<ConversionsOfflinePage />} />
                <Route path="/tracking-data/consent-mode" element={<ConsentModePage />} />
                <Route path="/tracking-data/landing-pages" element={<LandingPagesPage />} />

                {/* Silo 2 — Automatisation & IA */}
                <Route path="/automatisation-ia" element={<AutomatisationHubPage />} />
                <Route path="/automatisation-ia/agent-ia-conversationnel" element={<AgentIaPage />} />
                <Route path="/automatisation-ia/reponse-leads" element={<ReponseLeadsPage />} />
                <Route path="/automatisation-ia/google-my-business" element={<GoogleMyBusinessPage />} />
                <Route path="/automatisation-ia/conciergerie" element={<ConciergeriePage />} />
                <Route path="/automatisation-ia/back-office" element={<BackOfficeConciergeriePage />} />
                <Route path="/automatisation-ia/facturation-relances" element={<FacturationRelancesPage />} />
                <Route path="/automatisation-ia/prise-rdv-devis" element={<PriseRdvDevisPage />} />
                <Route path="/automatisation-ia/angouleme" element={<AngoulemePage />} />

                {/* Blog (intouché) */}
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />

                {/* Pages noindex */}
                <Route path="/api-docs" element={<ApiDocsPage />} />
                <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
                <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
                <Route path="/seo-audit" element={<SeoAuditPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
          <Toaster />
        </DataLayerProvider>
      </SupabaseAuthProvider>
    </Router>
  );
}

export default App;
