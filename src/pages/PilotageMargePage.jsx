import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, Scale, Calculator, Send, Target, LineChart, CheckCircle2, TrendingUp } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import Breadcrumb from '@/components/Breadcrumb';

const ROUTE = '/tracking-data/pilotage-a-la-marge';

// Étapes de la méthode (marge → conversion principale → l'algo optimise sur le profit)
const steps = [
  {
    icon: Calculator,
    title: 'On calcule votre marge, produit par produit',
    description:
      "Récupération de vos coûts réels (achat, frais) depuis votre catalogue, votre back-office ou Shopify, pour connaître la marge de chaque produit et de chaque commande — pas une estimation globale.",
  },
  {
    icon: Send,
    title: 'On envoie la marge dans le tracking',
    description:
      "Via GTM (Web & Server-Side), la marge est transmise à GA4 et Google Ads en plus du chiffre d'affaires. Vos plateformes voient enfin le profit réel derrière chaque vente.",
  },
  {
    icon: Scale,
    title: 'On mesure marge ET CA en parallèle',
    description:
      "Phase d'observation : on garde le CA comme repère et on suit la marge à côté, pour valider les écarts et prouver, chiffres à l'appui, où part vraiment votre rentabilité.",
  },
  {
    icon: Target,
    title: 'On bascule la conversion principale sur la marge',
    description:
      "Une fois la donnée fiable, la valeur optimisée par l'algorithme devient la marge. Le Smart Bidding (tROAS) optimise alors sur le profit, pas sur le chiffre d'affaires : il pousse le budget vers ce qui rapporte réellement.",
  },
];

const benefits = [
  "Un budget publicitaire alloué aux produits (et clients) vraiment rentables",
  'La fin des « bons ROAS » qui cachent une perte en back-office',
  "Un pilotage sur le KPI qui compte pour votre entreprise : le profit",
  'Des décisions basées sur vos vrais chiffres, plus à vue',
  'Compatible Shopify, GA4, Google Ads et tracking Server-Side',
];

const PilotageMargePage = () => (
  <>
    <SeoHead route={ROUTE} />
    <div className="pt-16 lg:pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <Breadcrumb route={ROUTE} />
        <div className="max-w-3xl">
          <span className="inline-block text-cyan-400 text-sm font-semibold uppercase tracking-wide mb-3">Tracking &amp; Data</span>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Pilotez vos campagnes à la marge, pas au ROAS
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Donnez à l'algorithme ce qui compte vraiment : votre <strong className="text-white">profit</strong>.
            Optimiser Google Ads sur la marge (POAS) plutôt que sur le chiffre d'affaires, c'est un game changer —
            et très peu d'annonceurs le font.
          </p>

          <div className="flex flex-wrap gap-4 mb-4">
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              Piloter à la marge <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/tracking-data" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors">
              Voir le hub Tracking &amp; Data
            </Link>
          </div>
        </div>

        <div className="max-w-4xl">
          {/* Le problème */}
          <section className="mt-16 mb-16">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-7 h-7 text-amber-400 shrink-0 mt-1" />
              <h2 className="text-2xl lg:text-3xl font-bold text-white">Le piège du ROAS</h2>
            </div>
            <p className="text-slate-300 leading-relaxed mb-4">
              Beaucoup d'annonceurs pilotent « à vue » : ils optimisent sur le ROAS (retour sur dépense publicitaire),
              se réjouissent d'un chiffre élevé… et ne comprennent pas pourquoi leur back-office affiche une
              sous-performance, voire une <strong className="text-white">perte</strong>.
            </p>
            <p className="text-slate-300 leading-relaxed">
              La raison est simple : le ROAS mesure le <em>chiffre d'affaires</em> généré, pas le <em>profit</em>.
              Or un produit peut avoir un ROAS spectaculaire tout en rapportant très peu, parce que sa marge est faible.
              Tant que l'algorithme optimise sur le CA, il pousse votre budget vers les mauvais produits.
            </p>
          </section>

          {/* Exemple chiffré */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">L'exemple qui change tout</h2>
            <p className="text-slate-400 text-sm mb-8">Exemple illustratif, à budget publicitaire égal (1 000 € chacun).</p>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Produit A */}
              <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Produit A — faible marge</h3>
                  <span className="text-2xl font-bold text-cyan-400">ROAS ×8</span>
                </div>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-slate-400">Marge produit</dt><dd className="text-slate-200">15 %</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-400">Budget pub</dt><dd className="text-slate-200">1 000 €</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-400">CA généré</dt><dd className="text-slate-200">8 000 €</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-400">Marge brute</dt><dd className="text-slate-200">1 200 €</dd></div>
                  <div className="flex justify-between border-t border-slate-700 pt-2 mt-2"><dt className="text-white font-semibold">Profit net (marge − pub)</dt><dd className="text-amber-400 font-bold">+200 €</dd></div>
                </dl>
              </div>

              {/* Produit B */}
              <div className="rounded-2xl border border-cyan-500/40 bg-cyan-500/5 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Produit B — forte marge</h3>
                  <span className="text-2xl font-bold text-slate-400">ROAS ×3</span>
                </div>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-slate-400">Marge produit</dt><dd className="text-slate-200">60 %</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-400">Budget pub</dt><dd className="text-slate-200">1 000 €</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-400">CA généré</dt><dd className="text-slate-200">3 000 €</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-400">Marge brute</dt><dd className="text-slate-200">1 800 €</dd></div>
                  <div className="flex justify-between border-t border-slate-700 pt-2 mt-2"><dt className="text-white font-semibold">Profit net (marge − pub)</dt><dd className="text-lime-400 font-bold">+800 €</dd></div>
                </dl>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-lime-500/30 bg-lime-900/10 p-6 flex items-start gap-4">
              <TrendingUp className="w-8 h-8 text-lime-400 shrink-0" />
              <p className="text-slate-200">
                Le produit au <strong className="text-white">ROAS ×3 rapporte 4 fois plus de profit</strong> que celui au ROAS ×8.
                Piloté au ROAS, l'algorithme aurait pourtant privilégié le Produit A — le moins rentable.
                Piloté à la marge, il met le budget là où se trouve le vrai bénéfice.
              </p>
            </div>
          </section>

          {/* Méthode */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">Notre méthode : optimiser sur la marge</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {steps.map((step, i) => (
                <div key={step.title} className="rounded-2xl border border-slate-700 bg-slate-800/40 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon className="w-7 h-7 text-cyan-400" />
                    <span className="text-cyan-400 font-bold text-sm">Étape {i + 1}</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
            <p className="text-slate-400 text-sm mt-6 flex items-start gap-2">
              <LineChart className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              L'idée clé : on mesure d'abord la marge <em>en plus</em> du chiffre d'affaires, puis on l'utilise comme
              valeur de la conversion principale — pour que l'algorithme s'optimise sur la marge, le KPI le plus
              important pour votre entreprise.
            </p>
          </section>

          {/* Bénéfices */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">Ce que ça change pour vous</h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 rounded-2xl border border-slate-700 bg-slate-800/40 p-4">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA + maillage intra-silo */}
          <section className="mb-4 flex flex-wrap gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              Discuter de mon projet <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          <nav aria-label="Dans le même univers" className="border-t border-slate-800 pt-8 mt-8">
            <h2 className="text-white font-semibold mb-4">Dans le même univers</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              <li><Link to="/tracking-data/gtm-server-side" className="text-slate-300 hover:text-cyan-400 transition-colors">→ GTM Server-Side</Link></li>
              <li><Link to="/tracking-data/conversions-offline" className="text-slate-300 hover:text-cyan-400 transition-colors">→ Conversions Offline</Link></li>
              <li><Link to="/tracking-data/ga4" className="text-slate-300 hover:text-cyan-400 transition-colors">→ GA4 Avancé</Link></li>
              <li><Link to="/tracking-data/tracking-ecommerce-shopify" className="text-slate-300 hover:text-cyan-400 transition-colors">→ Tracking Shopify</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </>
);

export default PilotageMargePage;
