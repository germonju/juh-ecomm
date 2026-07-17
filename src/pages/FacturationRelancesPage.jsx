import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Send, ShieldCheck, RefreshCw, PlugZap, UserCheck, Clock } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import Breadcrumb from '@/components/Breadcrumb';

const ROUTE = '/automatisation-ia/facturation-relances';

const steps = [
  {
    icon: PlugZap,
    title: 'Connexion à vos outils',
    description:
      "On relie l'automatisation à ce que vous utilisez déjà : logiciel de comptabilité, CRM, Google Sheets ou Airtable. Pas besoin de changer d'outil.",
  },
  {
    icon: FileText,
    title: 'Génération du document',
    description:
      "Devis ou facture est généré automatiquement à partir des informations saisies (client, prestation, montant), selon un modèle repris de votre charte.",
  },
  {
    icon: UserCheck,
    title: 'Validation humaine',
    description:
      "Avant tout envoi, vous gardez la main : chaque document sensible peut être relu et validé par vous, ou envoyé automatiquement si vous choisissez de faire confiance au workflow.",
  },
  {
    icon: RefreshCw,
    title: 'Relances automatiques',
    description:
      "Si une facture reste impayée après échéance, une relance part automatiquement selon le calendrier que vous définissez (J+7, J+15, J+30…), avec un ton qui évolue.",
  },
];

const benefits = [
  "Moins de temps passé à ressaisir des informations d'un outil à l'autre",
  'Zéro oubli de relance sur les factures en retard',
  "Des documents envoyés plus vite, sans attendre un créneau disponible dans l'agenda",
  'Une trace claire de chaque devis, facture et relance envoyés',
  'Un fonctionnement qui reste sous contrôle humain sur les envois sensibles',
];

const faqs = [
  {
    question: "Est-ce que je perds la main sur mes documents ?",
    answer:
      "Non. Le point de validation avant envoi est configurable : vous pouvez choisir de tout valider vous-même, ou de ne réserver la validation manuelle qu'aux montants importants.",
  },
  {
    question: 'Faut-il changer de logiciel de facturation ?',
    answer:
      "En général non. L'automatisation se branche sur l'outil que vous utilisez déjà (comptabilité, CRM, tableur) plutôt que de le remplacer.",
  },
  {
    question: "Combien ça coûte ?",
    answer:
      "Le tarif dépend du nombre d'outils à connecter et du volume de documents traités. Un premier échange permet d'établir un devis adapté à votre activité.",
  },
];

const FacturationRelancesPage = () => (
  <>
    <SeoHead route={ROUTE} />
    <div className="pt-16 lg:pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <Breadcrumb route={ROUTE} />
        <div className="max-w-3xl">
          <span className="inline-block text-violet-400 text-sm font-semibold uppercase tracking-wide mb-3">Automatisation &amp; IA</span>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Automatisation de la facturation et des relances
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Devis, factures et rappels de paiement générés et envoyés automatiquement, à partir des outils que vous utilisez déjà.
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
              Dans une TPE ou une PME, la facturation et les relances de paiement passent souvent par plusieurs
              étapes manuelles : retrouver les informations du client, remplir un modèle, envoyer par e-mail, puis
              penser à relancer si rien n'arrive. Chaque étape est simple, mais leur accumulation prend du temps et
              laisse la porte ouverte à l'oubli, surtout en période chargée.
            </p>
            <p className="text-slate-300 leading-relaxed">
              L'automatisation ne remplace pas votre logiciel de comptabilité ni votre CRM : elle les relie entre eux
              et avec vos outils de suivi (Google Sheets, Airtable) pour que la génération des documents et les
              relances se déclenchent sans intervention manuelle répétée, tout en laissant un point de validation
              humaine sur les envois qui le nécessitent.
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
                  <ShieldCheck className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-16 rounded-2xl border border-slate-700 bg-slate-800/40 p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Send className="w-8 h-8 text-cyan-400 shrink-0" />
            <p className="text-slate-300">
              Chaque connexion (comptabilité, CRM, tableur) est étudiée au cas par cas : l'objectif est de s'adapter à
              vos outils existants, pas de vous imposer d'en changer. Le tarif est adapté à votre activité et discuté
              lors d'un premier échange, sur devis.
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
            <Clock className="w-6 h-6 text-violet-400" />
            <p className="text-slate-300">
              Envie de voir ce que l'automatisation peut faire pour votre facturation ?
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              Demander un devis <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          <nav aria-label="Dans le même univers" className="border-t border-slate-800 pt-8">
            <h2 className="text-white font-semibold mb-4">Dans le même univers</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              <li><Link to="/automatisation-ia/agent-ia-conversationnel" className="text-slate-300 hover:text-violet-400 transition-colors">→ Agent IA conversationnel</Link></li>
              <li><Link to="/automatisation-ia/prise-rdv-devis" className="text-slate-300 hover:text-violet-400 transition-colors">→ Prise de RDV &amp; devis</Link></li>
              <li><Link to="/automatisation-ia/reponse-leads" className="text-slate-300 hover:text-violet-400 transition-colors">→ Réponse Leads</Link></li>
              <li><Link to="/automatisation-ia/back-office" className="text-slate-300 hover:text-violet-400 transition-colors">→ Back office</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </>
);

export default FacturationRelancesPage;
