import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Bot, Linkedin, MapPin, ShieldCheck, Target, HeartHandshake as Handshake, Sparkles, Briefcase } from 'lucide-react';
import { Helmet } from 'react-helmet';
import AboutHeroAnimation from '@/components/AboutHeroAnimation';
import SeoHead from '@/components/SeoHead';
import Breadcrumb from '@/components/Breadcrumb';

const ROUTE = '/a-propos';
const BASE_URL = 'https://www.juh-ecomm.fr';
const LINKEDIN_URL = 'https://www.linkedin.com/in/julien-germon-27630b141/';

const approche = [
  {
    icon: ShieldCheck,
    title: 'Des données fiables avant tout',
    text: "Une décision ne vaut que si la donnée qui la fonde est juste. Je fiabilise votre tracking (server-side, RGPD) pour que vos chiffres reflètent la réalité, pas des approximations.",
  },
  {
    icon: Target,
    title: 'Pragmatique et orienté résultat',
    text: "Pas de complexité inutile : on part de vos objectifs business, on met en place ce qui a un impact mesurable, puis on itère. La technique est un moyen, jamais une fin.",
  },
  {
    icon: Handshake,
    title: 'Transparent et pédagogue',
    text: "Vous gardez la main sur votre écosystème. Je documente ce qui est mis en place et je forme vos équipes pour que vous restiez autonomes.",
  },
];

// PARCOURS — expériences réelles (fournies par Julien, issues de son LinkedIn).
// La section « Parcours » s'affiche automatiquement dès qu'il y a une entrée.
const experiences = [
  {
    period: 'Depuis 2022',
    role: 'Consultant Data Engineer — Expert Tracking & Performance',
    org: 'Digitalkeys',
    desc: "Tracking full-stack Web & Server-Side (GTM / sGTM), GA4, APIs publicitaires (Meta CAPI, Google Ads API, TikTok) et conversions offline. Réconciliation de la donnée régies ↔ back-office et pilotage sur les vraies métriques business (POAS, MER, LTV/CAC). Landing pages React sur-mesure et automatisation (n8n, Make). Comptes accompagnés : Café Coton, Ice-Watch, Deejo, Akinod, Le Moulin Rouge, Pinault Collection, emlyon business school, Wesco.",
  },
  {
    period: '2016 — 2025',
    role: 'Co-fondateur',
    org: 'GAIAR',
    desc: "Plateforme Web3 de certification et de protection de la propriété intellectuelle (blockchain). Product design & UI/UX du prototype à la V1, architecture des smart contracts (Ethereum, Polygon) et automatisation de la répartition des revenus. Lauréat du concours d'innovation BPI i-Nov 2022.",
  },
  {
    period: '2014 — 2022',
    role: 'Account Manager SEA / Analyst',
    org: 'SoLocal Marketing Services',
    desc: "Acquisition de trafic Google Ads & Microsoft Ads sur un parc d'environ 12 000 comptes : suivi, analyse et optimisation des performances, structuration des comptes, création de templates, rédaction de process et montée en compétence de l'équipe.",
  },
];

// Schéma Person (E-E-A-T) : la page À propos est l'ancrage idéal de l'entité « Julien Germon ».
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Julien Germon',
  jobTitle: 'Expert Tracking, Data & Automatisation',
  description: "Consultant en tracking e-commerce (GTM Server-Side, GA4, Google Ads, conversions offline) et en automatisation marketing (agents IA, workflows). Plus de 15 ans d'expérience.",
  url: `${BASE_URL}/a-propos/`,
  image: `${BASE_URL}/images/julien-germon.webp`,
  sameAs: [LINKEDIN_URL],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Angoulême',
    addressRegion: 'Charente',
    addressCountry: 'FR',
  },
  knowsAbout: [
    'GTM Server-Side', 'Google Analytics 4', 'Google Ads', 'Consent Mode V2',
    'Tracking e-commerce', 'Automatisation marketing', 'Agents IA', 'Shopify', 'RGPD',
  ],
  worksFor: { '@type': 'Organization', name: 'Digitalkeys', url: 'https://www.digitalkeys.fr' },
};

const AProposPage = () => (
  <>
    <SeoHead route={ROUTE} />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
    </Helmet>

    <div className="min-h-screen bg-slate-900">
      {/* ===== HERO FUTURISTE ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 lg:pt-32 pb-16 lg:pb-24">
        <AboutHeroAnimation />
        {/* Halos lumineux */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        {/* Grille subtile */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <Breadcrumb route={ROUTE} />

          <div className="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-center">
            {/* Photo avec halo dégradé */}
            <div className="relative mx-auto lg:mx-0">
              <div className="absolute -inset-5 bg-gradient-to-br from-cyan-400 via-violet-500 to-lime-400 rounded-full blur-2xl opacity-40 animate-pulse" />
              <div className="relative p-1.5 rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-lime-400 shadow-2xl shadow-violet-500/30">
                <img
                  src="/images/julien-germon.webp"
                  alt="Julien Germon, expert tracking, data et automatisation"
                  width="200"
                  height="200"
                  decoding="async"
                  className="w-44 h-44 lg:w-52 lg:h-52 rounded-full object-cover ring-4 ring-slate-900"
                />
              </div>
            </div>

            {/* Intro */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-medium mb-5">
                <Sparkles className="w-4 h-4" /> Expert Tracking, Data &amp; Automatisation
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-violet-400 to-lime-400 bg-clip-text text-transparent">
                Julien Germon
              </h1>
              <p className="text-xl text-slate-300 mb-3 max-w-2xl">
                J'aide e-commerçants et TPE à transformer leurs données en décisions — et à automatiser ce qui leur fait perdre du temps.
              </p>
              <p className="inline-flex items-center gap-2 text-slate-400 mb-8">
                <MapPin className="w-4 h-4 text-cyan-400" /> Angoulême (Charente) — missions partout en France.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                  Discuter de votre projet <ArrowRight className="w-4 h-4" />
                </Link>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CORPS ===== */}
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="max-w-3xl space-y-4 text-slate-300 leading-relaxed">
          <p>
            Depuis plus de 15 ans, mon métier consiste à mettre en place un tracking fiable et conforme,
            à exploiter la donnée dans GA4 et Google Ads, et à automatiser les tâches répétitives — pour
            que vous pilotiez votre croissance sur des bases solides.
          </p>
          <p>
            J'interviens sur deux univers complémentaires : la <strong className="text-white">donnée &amp; le tracking</strong>{' '}
            (GTM Server-Side, GA4, Google Ads, conversions offline, conformité RGPD) et
            l'<strong className="text-white">automatisation &amp; l'IA</strong> (agents conversationnels, workflows,
            relances, prise de rendez-vous) pour les TPE et les commerces locaux.
          </p>
        </div>

        {/* Parcours (s'affiche dès qu'il y a des expériences) */}
        {experiences.length > 0 && (
          <div className="mt-16 max-w-3xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Briefcase className="w-7 h-7 text-cyan-400" /> Mon parcours
            </h2>
            <ol className="relative border-l border-slate-700 space-y-8 pl-6">
              {experiences.map((exp, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 ring-4 ring-slate-900" />
                  <span className="text-sm text-cyan-400 font-medium">{exp.period}</span>
                  <h3 className="text-white font-semibold mt-1">
                    {exp.role}{exp.org ? <span className="text-slate-400 font-normal"> — {exp.org}</span> : null}
                  </h3>
                  {exp.desc && <p className="text-slate-400 text-sm mt-1 leading-relaxed">{exp.desc}</p>}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Les 2 pôles — pont inter-silos */}
        <div className="grid md:grid-cols-2 gap-6 mt-16 max-w-4xl">
          <Link to="/tracking-data" className="group block rounded-2xl border border-slate-700 bg-slate-800/40 p-6 hover:border-cyan-500/50 transition-colors">
            <TrendingUp className="w-8 h-8 text-cyan-400 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Tracking &amp; Data</h2>
            <p className="text-slate-400 text-sm mb-4">
              Tracking server-side, GA4 avancé, Google Ads, conversions offline et conformité RGPD.
            </p>
            <span className="inline-flex items-center gap-1 text-cyan-400 text-sm font-medium">
              Découvrir le pôle <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link to="/automatisation-ia" className="group block rounded-2xl border border-slate-700 bg-slate-800/40 p-6 hover:border-violet-500/50 transition-colors">
            <Bot className="w-8 h-8 text-violet-400 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Automatisation &amp; IA</h2>
            <p className="text-slate-400 text-sm mb-4">
              Agents IA conversationnels, workflows, facturation, relances et prise de rendez-vous automatisées.
            </p>
            <span className="inline-flex items-center gap-1 text-violet-400 text-sm font-medium">
              Découvrir le pôle <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Approche */}
        <div className="mt-16 max-w-4xl">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">Mon approche</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {approche.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-700 bg-slate-800/40 p-6">
                <item.icon className="w-7 h-7 text-lime-400 mb-4" />
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-wrap items-center gap-4">
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
            Discuter de votre projet <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-lime-400 transition-colors">
            Lire le blog →
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default AProposPage;
