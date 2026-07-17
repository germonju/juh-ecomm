import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import Breadcrumb from '@/components/Breadcrumb';

const ROUTE = '/automatisation-ia/prise-rdv-devis';

// PLACEHOLDER — Silo 2 (Automatisation & IA).
// noindex tant que le contenu n'est pas rédigé (cf. meta.config.js).
const PriseRdvDevisPage = () => (
  <>
    <SeoHead route={ROUTE} />
    <div className="pt-16 lg:pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <Breadcrumb route={ROUTE} />
        <div className="max-w-3xl">
          <span className="inline-block text-violet-400 text-sm font-semibold uppercase tracking-wide mb-3">Automatisation &amp; IA</span>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Automatisation de la prise de RDV et des devis
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Prise de rendez-vous et génération de devis automatisées, disponibles 24h/24.
          </p>

          <div className="rounded-xl border border-dashed border-amber-500/40 bg-amber-500/5 p-6 mb-10">
            <p className="font-mono text-sm text-amber-200/90">
              [À RÉDIGER — intention de recherche : automatiser la prise de rendez-vous
              et l'envoi de devis pour prospects et clients, sans intervention manuelle]
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-14">
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              Discuter de mon projet <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/automatisation-ia" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700 text-slate-300 hover:text-violet-400 hover:border-violet-500/50 transition-colors">
              Voir le hub Automatisation &amp; IA
            </Link>
          </div>

          <nav aria-label="Dans le même univers" className="border-t border-slate-800 pt-8">
            <h2 className="text-white font-semibold mb-4">Dans le même univers</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              <li><Link to="/automatisation-ia/agent-ia-conversationnel" className="text-slate-300 hover:text-violet-400 transition-colors">→ Agent IA conversationnel</Link></li>
              <li><Link to="/automatisation-ia/reponse-leads" className="text-slate-300 hover:text-violet-400 transition-colors">→ Réponse Leads</Link></li>
              <li><Link to="/automatisation-ia/facturation-relances" className="text-slate-300 hover:text-violet-400 transition-colors">→ Facturation &amp; relances</Link></li>
              <li><Link to="/automatisation-ia/back-office" className="text-slate-300 hover:text-violet-400 transition-colors">→ Back office</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </>
);

export default PriseRdvDevisPage;
