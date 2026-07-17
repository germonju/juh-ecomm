import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarClock, FileSpreadsheet, BellRing, CheckCircle2, Users, RefreshCw, Clock, CalendarCheck } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import Breadcrumb from '@/components/Breadcrumb';

const ROUTE = '/automatisation-ia/prise-rdv-devis';

const steps = [
  {
    icon: CalendarClock,
    title: 'Prise de RDV en ligne',
    description:
      "Le prospect réserve un créneau directement sur votre calendrier, 24h/24, sans échange d'e-mails pour trouver une date qui convient.",
  },
  {
    icon: FileSpreadsheet,
    title: 'Formulaire de demande',
    description:
      "Un formulaire recueille les informations nécessaires (besoin, contraintes, coordonnées) pour préparer le devis en amont du rendez-vous ou à la place.",
  },
  {
    icon: CheckCircle2,
    title: 'Génération du devis',
    description:
      "À partir des réponses du formulaire, un devis est généré automatiquement selon vos modèles et tarifs, prêt à être envoyé ou validé par vous avant envoi.",
  },
  {
    icon: BellRing,
    title: 'Confirmations et rappels',
    description:
      "Confirmation immédiate du rendez-vous, puis rappel automatique avant la date pour limiter les absences, sans action manuelle de votre part.",
  },
];

const benefits = [
  "Des rendez-vous qui se prennent même en dehors des horaires d'ouverture",
  'Un agenda toujours synchronisé, sans double réservation',
  'Des devis envoyés plus rapidement après la demande initiale',
  'Moins de rendez-vous manqués grâce aux rappels automatiques',
  "Du temps récupéré sur les tâches de coordination répétitives",
];

const faqs = [
  {
    question: 'Est-ce adapté à mon activité ?',
    answer:
      "Ce type d'automatisation convient particulièrement aux prestataires de services, artisans et indépendants qui reçoivent des demandes de devis ou de rendez-vous de façon régulière.",
  },
  {
    question: 'Le devis part-il automatiquement au client ?',
    answer:
      "C'est configurable selon vos préférences : envoi automatique pour les demandes standards, ou validation manuelle avant envoi pour les devis plus complexes.",
  },
  {
    question: 'Quel calendrier est utilisé ?',
    answer:
      "L'automatisation se connecte à l'agenda que vous utilisez déjà, pour éviter les conflits de créneaux et garder une vue unique sur vos disponibilités.",
  },
];

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
            Prise de rendez-vous et génération de devis automatisées, disponibles 24h/24, sans intervention manuelle.
          </p>

          <div className="flex flex-wrap gap-4 mb-14">
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              Discuter de mon projet <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/automatisation-ia" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700 text-slate-300 hover:text-violet-400 hover:border-violet-500/50 transition-colors">
              Voir le hub Automatisation &amp; IA
            </Link>
          </div>
        </div>

        <div className="max-w-4xl">
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Le problème, la solution</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Pour un prestataire de services, un artisan ou un indépendant, chaque demande de rendez-vous ou de
              devis qui passe par un appel manqué ou un e-mail resté sans réponse est une opportunité qui peut
              s'échapper. Le prospect, lui, contacte souvent plusieurs professionnels en même temps : le premier à
              répondre a un avantage.
            </p>
            <p className="text-slate-300 leading-relaxed">
              L'automatisation permet de proposer une prise de rendez-vous en ligne accessible à tout moment, et de
              transformer une demande de devis en document chiffré sans attendre un créneau disponible dans votre
              emploi du temps pour vous en occuper. Votre agenda reste synchronisé et vous gardez la possibilité de
              valider ou d'ajuster chaque devis avant envoi.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">Comment ça marche</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {steps.map((step) => (
                <div key={step.title} className="rounded-2xl border border-slate-700 bg-slate-800/40 p-6">
                  <step.icon className="w-8 h-8 text-violet-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">Bénéfices</h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 rounded-2xl border border-slate-700 bg-slate-800/40 p-4">
                  <RefreshCw className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-16 rounded-2xl border border-slate-700 bg-slate-800/40 p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Users className="w-8 h-8 text-cyan-400 shrink-0" />
            <p className="text-slate-300">
              Pensé pour les prestataires de services, artisans et indépendants qui gèrent seuls leur prise de
              contact. Chaque mise en place est adaptée à votre activité et proposée sur devis.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">Questions fréquentes</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-slate-700 bg-slate-800/40 p-6">
                  <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 flex flex-wrap items-center gap-4">
            <CalendarCheck className="w-6 h-6 text-violet-400" />
            <Clock className="w-6 h-6 text-violet-400 -ml-2" />
            <p className="text-slate-300">
              Envie de ne plus manquer une demande de rendez-vous ou de devis ?
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              Demander un devis <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

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
