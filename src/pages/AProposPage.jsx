import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Bot, Linkedin, MapPin, ShieldCheck, Target, HeartHandshake as Handshake } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import Breadcrumb from '@/components/Breadcrumb';

const ROUTE = '/a-propos';
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

const AProposPage = () => (
  <>
    <SeoHead route={ROUTE} />
    <div className="pt-16 lg:pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <Breadcrumb route={ROUTE} />

        {/* Hero */}
        <div className="max-w-3xl">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-violet-400 to-lime-400 bg-clip-text text-transparent">
            À propos
          </h1>
          <p className="text-xl text-slate-300 mb-4">
            Julien Germon — expert tracking, data et automatisation pour e-commerçants et TPE.
          </p>
          <p className="inline-flex items-center gap-2 text-slate-400 mb-8">
            <MapPin className="w-4 h-4 text-cyan-400" /> Basé à Angoulême (Charente) — j'accompagne mes clients partout en France.
          </p>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              Depuis plus de 15 ans, j'aide les entreprises à transformer leurs données en décisions.
              Mon métier : mettre en place un tracking fiable et conforme, exploiter la donnée dans GA4
              et Google Ads, et automatiser les tâches qui font perdre du temps — pour que vous pilotiez
              votre croissance sur des bases solides.
            </p>
            <p>
              Concrètement, j'interviens sur deux univers complémentaires : la <strong className="text-white">donnée & le tracking</strong>
              {' '}(GTM Server-Side, GA4, Google Ads, conversions offline, conformité RGPD) et
              l'<strong className="text-white">automatisation & l'IA</strong> (agents conversationnels, workflows,
              relances, prise de rendez-vous) pour les TPE et les commerces locaux.
            </p>
          </div>
        </div>

        {/* Les 2 pôles — pont inter-silos */}
        <div className="grid md:grid-cols-2 gap-6 mt-14 max-w-4xl">
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
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-lime-400 transition-colors">
            Lire le blog →
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default AProposPage;
