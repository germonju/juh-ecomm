import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SeoHead from '@/components/SeoHead';

const ROUTE = '/a-propos';

// PLACEHOLDER — page ombrelle E-E-A-T (pont entre les 2 silos).
// noindex tant que le contenu n'est pas rédigé (cf. meta.config.js).
const AProposPage = () => (
  <>
    <SeoHead route={ROUTE} />
    <div className="pt-16 lg:pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-violet-400 to-lime-400 bg-clip-text text-transparent">
            À propos
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Julien Germon — expert tracking, data et automatisation pour e-commerçants et TPE.
          </p>

          <div className="rounded-xl border border-dashed border-amber-500/40 bg-amber-500/5 p-6 mb-10">
            <p className="font-mono text-sm text-amber-200/90">
              [À RÉDIGER — intention de recherche : qui est Julien Germon, parcours,
              expertise, preuves de confiance (E-E-A-T), pourquoi le choisir]
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-14">
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              Discuter de votre projet <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <nav aria-label="Explorer les expertises" className="border-t border-slate-800 pt-8">
            <h2 className="text-white font-semibold mb-4">Explorer mes expertises</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              <li><Link to="/tracking-data" className="text-slate-300 hover:text-cyan-400 transition-colors">→ Tracking &amp; Data</Link></li>
              <li><Link to="/automatisation-ia" className="text-slate-300 hover:text-violet-400 transition-colors">→ Automatisation &amp; IA</Link></li>
              <li><Link to="/realisations" className="text-slate-300 hover:text-lime-400 transition-colors">→ Réalisations</Link></li>
              <li><Link to="/blog" className="text-slate-300 hover:text-lime-400 transition-colors">→ Blog</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </>
);

export default AProposPage;
