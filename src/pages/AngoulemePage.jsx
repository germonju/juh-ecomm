import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, MessageSquare, Star, FileText, CalendarClock, HeartHandshake, Building2 } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import Breadcrumb from '@/components/Breadcrumb';

const ROUTE = '/automatisation-ia/angouleme';

const useCases = [
  {
    icon: MessageSquare,
    title: 'Un agent IA qui répond à vos clients',
    description:
      "Répondez aux questions fréquentes de vos clients ou prospects à toute heure, sans monopoliser quelqu'un au comptoir ou au téléphone.",
    link: '/automatisation-ia/agent-ia-conversationnel',
    linkLabel: 'Découvrir l\'agent IA conversationnel',
  },
  {
    icon: FileText,
    title: 'Facturation et relances automatisées',
    description:
      "Devis, factures et rappels de paiement générés et envoyés automatiquement, connectés à vos outils de comptabilité existants.",
    link: '/automatisation-ia/facturation-relances',
    linkLabel: 'Découvrir la facturation automatisée',
  },
  {
    icon: CalendarClock,
    title: 'Prise de rendez-vous et devis',
    description:
      "Vos clients réservent un créneau ou demandent un devis en ligne, 24h/24, sans attendre un rappel.",
    link: '/automatisation-ia/prise-rdv-devis',
    linkLabel: 'Découvrir la prise de RDV & devis',
  },
  {
    icon: Star,
    title: 'Avis Google et fiche établissement',
    description:
      "Gérez et répondez plus facilement aux avis laissés sur votre fiche Google, un levier important pour la visibilité locale en Charente.",
    link: '/automatisation-ia/google-my-business',
    linkLabel: 'Découvrir Google My Business',
  },
  {
    icon: MessageSquare,
    title: 'Réponse aux leads entrants',
    description:
      "Qualifiez et répondez rapidement aux demandes reçues par formulaire ou par e-mail, pour ne pas laisser un prospect sans réponse.",
    link: '/automatisation-ia/reponse-leads',
    linkLabel: 'Découvrir la réponse aux leads',
  },
];

const AngoulemePage = () => (
  <>
    <SeoHead route={ROUTE} />
    <div className="pt-16 lg:pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <Breadcrumb route={ROUTE} />
        <div className="max-w-3xl">
          <span className="inline-block text-violet-400 text-sm font-semibold uppercase tracking-wide mb-3">Automatisation &amp; IA — Local</span>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Automatisation &amp; IA pour les TPE à Angoulême
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Agents IA et automatisation pour les TPE, artisans et commerces d'Angoulême et de Charente (16), avec un
            accompagnement de proximité.
          </p>

          <div className="flex flex-wrap gap-4 mb-14">
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              Prendre contact <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/automatisation-ia" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700 text-slate-300 hover:text-violet-400 hover:border-violet-500/50 transition-colors">
              Voir le hub Automatisation &amp; IA
            </Link>
          </div>
        </div>

        <div className="max-w-4xl">
          <section className="mb-16">
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="w-6 h-6 text-violet-400 shrink-0 mt-1" />
              <h2 className="text-2xl lg:text-3xl font-bold text-white">Un accompagnement local, à Angoulême et en Charente</h2>
            </div>
            <p className="text-slate-300 leading-relaxed mb-4">
              Les TPE, artisans et commerces d'Angoulême et du reste de la Charente font face au même défi que
              partout ailleurs : des tâches répétitives (réponses aux clients, relances de paiement, prise de
              rendez-vous, gestion des avis) qui prennent du temps sur une journée déjà bien remplie, souvent sans
              personne dédiée pour s'en occuper.
            </p>
            <p className="text-slate-300 leading-relaxed">
              L'automatisation et les agents IA permettent de déléguer une partie de ces tâches sans recruter, tout
              en gardant le contrôle sur ce qui est envoyé en votre nom. L'accompagnement se fait avec la possibilité
              d'échanger sur place, ce qui facilite la compréhension de votre activité et l'ajustement des
              automatisations dans la durée.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">Cas d'usage concrets pour les TPE de Charente</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {useCases.map((useCase) => (
                <div key={useCase.title} className="rounded-2xl border border-slate-700 bg-slate-800/40 p-6 flex flex-col">
                  <useCase.icon className="w-8 h-8 text-violet-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-grow">{useCase.description}</p>
                  <Link to={useCase.link} className="text-violet-400 hover:text-violet-300 text-sm font-medium inline-flex items-center gap-1">
                    {useCase.linkLabel} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 rounded-2xl border border-slate-700 bg-slate-800/40 p-6 lg:p-8">
            <div className="flex items-start gap-4">
              <HeartHandshake className="w-8 h-8 text-cyan-400 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Pourquoi passer par un expert local</h2>
                <p className="text-slate-300 leading-relaxed">
                  Travailler avec un interlocuteur basé en Charente facilite les échanges : comprendre votre activité,
                  définir ensemble les tâches à automatiser en priorité, et ajuster les workflows au fil du temps.
                  Chaque projet est étudié selon vos besoins réels et proposé sur devis, adapté à la taille de votre
                  structure.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16 flex items-start gap-4">
            <Building2 className="w-6 h-6 text-violet-400 shrink-0 mt-1" />
            <p className="text-slate-300">
              Que vous soyez artisan, commerçant ou indépendant à Angoulême, Soyaux, L'Isle-d'Espagnac, Ruelle-sur-Touvre
              ou ailleurs en Charente, un premier échange permet d'identifier les automatisations les plus utiles pour
              votre activité.
            </p>
          </section>

          <section className="mb-16 rounded-2xl border border-violet-500/30 bg-violet-900/10 p-6 lg:p-8 text-center">
            <p className="text-lg text-violet-100 mb-6">
              Discutons de vos besoins d'automatisation, avec un interlocuteur qui connaît le tissu économique local.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              Prendre contact <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          <nav aria-label="Dans le même univers" className="border-t border-slate-800 pt-8">
            <h2 className="text-white font-semibold mb-4">Services d'automatisation</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              <li><Link to="/automatisation-ia/agent-ia-conversationnel" className="text-slate-300 hover:text-violet-400 transition-colors">→ Agent IA conversationnel</Link></li>
              <li><Link to="/automatisation-ia/prise-rdv-devis" className="text-slate-300 hover:text-violet-400 transition-colors">→ Prise de RDV &amp; devis</Link></li>
              <li><Link to="/automatisation-ia/facturation-relances" className="text-slate-300 hover:text-violet-400 transition-colors">→ Facturation &amp; relances</Link></li>
              <li><Link to="/automatisation-ia/google-my-business" className="text-slate-300 hover:text-violet-400 transition-colors">→ Google My Business</Link></li>
              <li><Link to="/automatisation-ia/reponse-leads" className="text-slate-300 hover:text-violet-400 transition-colors">→ Réponse Leads</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </>
);

export default AngoulemePage;
