import React, { useEffect } from 'react';
import SeoHead from '@/components/SeoHead';
import Breadcrumb from '@/components/Breadcrumb';
import { Link } from 'react-router-dom';
import {
  Smartphone, BarChart3, Send, Receipt, Upload, TrendingUp,
  Sparkles, Camera, Clock, Zap, ArrowRight, Check, LayoutDashboard, Trophy,
  SearchCheck, ImagePlus, Wand2, Download, Users, Euro, CalendarCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BackOfficeFlowIllustration } from '@/components/HeroIllustrations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useDataLayer } from '@/contexts/DataLayerContext';

// ---------------------------------------------------------------------------
// Illustrations SVG sur mesure
// ---------------------------------------------------------------------------

// Mockup fidèle du back office (thème clair, données fictives) : onglets,
// KPI et graphique CA/commissions comme dans le produit réel.
const DashboardIllustration = () => (
  <svg viewBox="0 0 480 360" className="w-full h-auto drop-shadow-2xl" role="img" aria-label="Aperçu du back office : onglets Stats, Facturation, Import, Biens et Retouche, indicateurs clés et graphique CA et commissions par mois">
    {/* Fenêtre claire */}
    <rect x="4" y="4" width="472" height="352" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
    {/* Barre de navigation */}
    <rect x="4" y="4" width="472" height="40" rx="14" fill="#ffffff" />
    <rect x="4" y="30" width="472" height="14" fill="#ffffff" />
    <line x1="4" y1="44" x2="476" y2="44" stroke="#e2e8f0" strokeWidth="1" />
    <g fontFamily="sans-serif">
      <text x="20" y="29" fill="#0f172a" fontSize="12" fontWeight="bold">Back-office — Ma Conciergerie</text>
      {/* Onglets */}
      <rect x="216" y="12" width="46" height="22" rx="11" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
      <text x="239" y="27" textAnchor="middle" fill="#1d4ed8" fontSize="10" fontWeight="bold">Stats</text>
      <text x="298" y="27" textAnchor="middle" fill="#475569" fontSize="10">Facturation</text>
      <text x="357" y="27" textAnchor="middle" fill="#475569" fontSize="10">Import</text>
      <text x="402" y="27" textAnchor="middle" fill="#475569" fontSize="10">Biens</text>
      <text x="450" y="27" textAnchor="middle" fill="#475569" fontSize="10">Retouche</text>
    </g>
    {/* Cartes KPI */}
    <g fontFamily="sans-serif">
      {[
        { x: 16,  accent: '#1e293b', label: 'CA HÉBERGEMENT', value: '24 830 €', sub: '42 réservations' },
        { x: 132, accent: '#14b8a6', label: "TAUX D'OCCUP.",   value: '64 %',    sub: '26 logements' },
        { x: 248, accent: '#f59e0b', label: 'NUITS LOUÉES',    value: '312',     sub: '/ 780 disponibles' },
        { x: 364, accent: '#ef4444', label: 'COMMISSION',      value: '4 966 €', sub: 'net après charges' },
      ].map((kpi, i) => (
        <g key={i}>
          <rect x={kpi.x} y="56" width="100" height="64" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <rect x={kpi.x + 6} y="55" width="88" height="3" rx="1.5" fill={kpi.accent} />
          <text x={kpi.x + 10} y="74" fill="#64748b" fontSize="7" letterSpacing="0.5">{kpi.label}</text>
          <text x={kpi.x + 10} y="96" fill="#0f172a" fontSize="16" fontWeight="bold">{kpi.value}</text>
          <text x={kpi.x + 10} y="110" fill="#94a3b8" fontSize="7.5">{kpi.sub}</text>
        </g>
      ))}
    </g>
    {/* Graphique CA & Commissions */}
    <rect x="16" y="132" width="448" height="212" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
    <g fontFamily="sans-serif">
      <text x="32" y="156" fill="#0f172a" fontSize="11" fontWeight="bold">CA &amp; Commissions par mois</text>
      <circle cx="330" cy="152" r="4" fill="#1e293b" />
      <text x="339" y="156" fill="#475569" fontSize="9">CA</text>
      <circle cx="368" cy="152" r="4" fill="#f59e0b" />
      <text x="377" y="156" fill="#475569" fontSize="9">Commission</text>
    </g>
    {/* Grille pointillée */}
    {[180, 220, 260, 300].map((y, i) => (
      <line key={i} x1="32" y1={y} x2="448" y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 5" />
    ))}
    {/* Barres : CA (navy) + commission (ambre) */}
    {[
      { m: 'jan.', ca: 42,  com: 8 },
      { m: 'fév.', ca: 55,  com: 11 },
      { m: 'mars', ca: 48,  com: 9 },
      { m: 'avr.', ca: 76,  com: 15 },
      { m: 'mai',  ca: 92,  com: 18 },
      { m: 'juin', ca: 70,  com: 14 },
      { m: 'juil.', ca: 118, com: 23 },
      { m: 'août', ca: 132, com: 26 },
    ].map((bar, i) => {
      const x = 44 + i * 52;
      return (
        <g key={i} fontFamily="sans-serif">
          <rect x={x} y={318 - bar.ca} width="14" height={bar.ca} rx="4" fill="#1e293b" />
          <rect x={x + 18} y={318 - bar.com} width="10" height={bar.com} rx="3" fill="#f59e0b" />
          <text x={x + 14} y="332" textAnchor="middle" fill="#94a3b8" fontSize="8">{bar.m}</text>
        </g>
      );
    })}
  </svg>
);

// Fiche contact créée automatiquement sur le téléphone
const PhoneContactIllustration = () => (
  <svg viewBox="0 0 260 420" className="w-full h-auto max-w-[260px] mx-auto" role="img" aria-label="Fiche contact du voyageur créée automatiquement sur votre téléphone">
    <defs>
      <linearGradient id="phoneAvatar" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    {/* Téléphone */}
    <rect x="10" y="10" width="240" height="400" rx="32" fill="#0f172a" stroke="#334155" strokeWidth="2" />
    <rect x="95" y="24" width="70" height="16" rx="8" fill="#1e293b" />
    {/* Avatar */}
    <circle cx="130" cy="110" r="36" fill="url(#phoneAvatar)" />
    <text x="130" y="120" textAnchor="middle" fill="#0f172a" fontSize="26" fontWeight="bold" fontFamily="sans-serif">ML</text>
    <text x="130" y="172" textAnchor="middle" fill="#f8fafc" fontSize="17" fontWeight="bold" fontFamily="sans-serif">Marie Lefèvre</text>
    <text x="130" y="192" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontFamily="sans-serif">Voyageur · Airbnb</text>
    {/* Badge nouveau */}
    <rect x="76" y="204" width="108" height="20" rx="10" fill="#34d399" fillOpacity="0.15" stroke="#34d399" strokeOpacity="0.4" />
    <text x="130" y="218" textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="sans-serif">✓ Créé automatiquement</text>
    {/* Infos réservation */}
    <g fontFamily="sans-serif">
      <rect x="28" y="240" width="204" height="44" rx="10" fill="#1e293b" />
      <text x="40" y="258" fill="#94a3b8" fontSize="9">SÉJOUR</text>
      <text x="40" y="274" fill="#f8fafc" fontSize="12">12 → 16 août · 4 nuits</text>

      <rect x="28" y="292" width="204" height="44" rx="10" fill="#1e293b" />
      <text x="40" y="310" fill="#94a3b8" fontSize="9">LOGEMENT</text>
      <text x="40" y="326" fill="#f8fafc" fontSize="12">Villa Les Pins · 4 voyageurs</text>

      <rect x="28" y="344" width="204" height="44" rx="10" fill="#1e293b" />
      <text x="40" y="362" fill="#94a3b8" fontSize="9">RÉSERVATION</text>
      <text x="40" y="378" fill="#f8fafc" fontSize="12">HM8XK2 · 720 € · Payée</text>
    </g>
  </svg>
);

// Schéma de flux : réservation → back office → actions automatiques
const FlowSchemaIllustration = () => (
  <svg viewBox="0 0 760 300" className="w-full h-auto min-w-[600px] md:min-w-0" role="img" aria-label="Schéma du flux automatisé : une réservation alimente la fiche contact, les statistiques, le rapport propriétaire et la facturation">
    <defs>
      <marker id="flowArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="#8b5cf6" />
      </marker>
    </defs>
    <g fontFamily="sans-serif">
      {/* Source : réservation */}
      <rect x="20" y="110" width="150" height="80" rx="12" fill="#1e293b" stroke="#22d3ee" strokeWidth="1.5" />
      <text x="95" y="142" textAnchor="middle" fill="#22d3ee" fontSize="12" fontWeight="bold">Nouvelle réservation</text>
      <text x="95" y="162" textAnchor="middle" fill="#94a3b8" fontSize="10">Airbnb · Booking · Direct</text>

      {/* Hub : back office */}
      <rect x="280" y="100" width="170" height="100" rx="14" fill="#2e1065" stroke="#8b5cf6" strokeWidth="2" />
      <text x="365" y="140" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="bold">Votre back office</text>
      <text x="365" y="160" textAnchor="middle" fill="#c4b5fd" fontSize="10">Traitement automatique</text>
      <text x="365" y="178" textAnchor="middle" fill="#c4b5fd" fontSize="10">0 saisie manuelle</text>

      {/* Flèche source → hub */}
      <line x1="170" y1="150" x2="272" y2="150" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#flowArrow)" />

      {/* Sorties */}
      <rect x="560" y="16" width="180" height="52" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      <text x="650" y="38" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Fiche contact créée</text>
      <text x="650" y="54" textAnchor="middle" fill="#94a3b8" fontSize="9">dans votre téléphone</text>

      <rect x="560" y="88" width="180" height="52" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      <text x="650" y="110" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Statistiques à jour</text>
      <text x="650" y="126" textAnchor="middle" fill="#94a3b8" fontSize="9">par propriétaire et logement</text>

      <rect x="560" y="160" width="180" height="52" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      <text x="650" y="182" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Rapport propriétaire</text>
      <text x="650" y="198" textAnchor="middle" fill="#94a3b8" fontSize="9">envoyé automatiquement</text>

      <rect x="560" y="232" width="180" height="52" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      <text x="650" y="254" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Facture générée</text>
      <text x="650" y="270" textAnchor="middle" fill="#94a3b8" fontSize="9">commissions, linge, services</text>

      {/* Flèches hub → sorties */}
      <line x1="450" y1="120" x2="552" y2="46" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#flowArrow)" />
      <line x1="450" y1="140" x2="552" y2="114" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#flowArrow)" />
      <line x1="450" y1="165" x2="552" y2="186" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#flowArrow)" />
      <line x1="450" y1="185" x2="552" y2="256" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#flowArrow)" />
    </g>
  </svg>
);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const BackOfficeConciergeriePage = () => {
  const { pushEvent } = useDataLayer();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCtaClick = (ctaLocation) => {
    pushEvent('cta_click', {
      cta_location: ctaLocation,
      cta_text: 'Demander un devis',
      service: 'Back Office Conciergerie'
    });
  };

  const backOfficeFeatures = [
    {
      icon: Smartphone,
      title: "Fiches contact automatiques",
      description: "Chaque réservation crée instantanément une fiche dans votre téléphone : nom du voyageur, dates, logement, montant. Vous savez toujours qui vous appelle."
    },
    {
      icon: BarChart3,
      title: "Statistiques en temps réel",
      description: "Par propriétaire, par logement, avec les KPI qui comptent pour vous : commissions, location de linge, ménage et tous vos services annexes."
    },
    {
      icon: CalendarCheck,
      title: "Relevé de toutes vos réservations",
      description: "Airbnb, Booking, réservations directes : tout est centralisé au même endroit, sans double saisie."
    },
    {
      icon: Send,
      title: "Rapports automatiques aux propriétaires",
      description: "Vos clients reçoivent leurs statistiques détaillées sans que vous leviez le petit doigt. Une transparence qui fidélise."
    },
    {
      icon: Receipt,
      title: "Facturation entièrement automatisée",
      description: "Commissions, linge, services divers : les factures se génèrent toutes seules à partir des données réelles. Zéro erreur, zéro oubli."
    },
    {
      icon: Upload,
      title: "Import de votre historique",
      description: "Importez vos statistiques passées pour démarrer avec une vision complète, pas une page blanche."
    },
    {
      icon: TrendingUp,
      title: "Graphiques d'évolution",
      description: "CA, commissions, nombre de réservations, nuitées, frais de ménage… Suivez tout ce qui vous semble essentiel et pertinent, en un coup d'œil."
    },
    {
      icon: Trophy,
      title: "Classement de vos logements",
      description: "Taux d'occupation, nuits louées, répartition du CA par plateforme (Airbnb, Booking, direct) : identifiez ce qui performe et ce qui décroche."
    }
  ];

  const timeWasters = [
    { task: "Création de contact dans votre téléphone à chaque réservation", freq: "À chaque réservation" },
    { task: "Compiler les statistiques par propriétaire", freq: "Chaque fin de mois" },
    { task: "Rédiger et envoyer les rapports aux propriétaires", freq: "Chaque fin de mois" },
    { task: "Calculer les commissions et éditer les factures", freq: "Chaque fin de mois" },
    { task: "Retoucher les photos des annonces une par une", freq: "À chaque nouveau logement" }
  ];

  const photoSteps = [
    {
      icon: ImagePlus,
      step: "1. Importez",
      description: "Déposez vos photos par lot : un logement complet ou tout votre parc d'un coup."
    },
    {
      icon: Wand2,
      step: "2. Choisissez",
      description: "Sélectionnez les correctifs (luminosité, ciel, netteté…) et ajoutez vos consignes libres."
    },
    {
      icon: Download,
      step: "3. Recevez",
      description: "Récupérez vos photos retouchées, prêtes à publier sur Airbnb et Booking."
    }
  ];

  const faqs = [
    {
      q: "Qu'est-ce qu'un back office sur mesure pour conciergerie ?",
      a: "C'est un outil de gestion construit autour de VOS processus, pas l'inverse. Contrairement aux logiciels génériques (channel managers, PMS standards), un back office sur mesure automatise exactement les tâches qui vous font perdre du temps : création des fiches contact voyageurs dans votre téléphone, consolidation des statistiques par propriétaire et par logement, envoi automatique des rapports à vos clients, facturation des commissions et services annexes (linge, ménage, etc.). Vous choisissez les KPI suivis, la forme des rapports et le rythme des envois."
    },
    {
      q: "Comment fonctionnent les fiches contact automatiques dans mon téléphone ?",
      a: "Dès qu'une réservation est confirmée sur Airbnb ou Booking, le système crée automatiquement une fiche contact dans votre téléphone avec le nom du voyageur et ses informations de réservation : dates de séjour, logement concerné, nombre de voyageurs, montant. Quand le voyageur vous appelle ou vous écrit, vous savez immédiatement qui il est et où il séjourne — sans chercher dans vos mails ni dans l'extranet des plateformes. Les fiches sont mises à jour en temps réel en cas de modification ou d'annulation."
    },
    {
      q: "Quelles statistiques puis-je suivre et partager avec mes propriétaires ?",
      a: "Tout ce qui est pertinent pour votre activité : chiffre d'affaires, commissions, nombre de réservations, nuitées, taux d'occupation, frais de ménage, location de linge et services divers. Les statistiques sont disponibles en temps réel, par propriétaire et par logement, avec des graphiques d'évolution. Vous pouvez aussi importer votre historique pour comparer les saisons d'une année sur l'autre. Chaque propriétaire reçoit automatiquement son rapport détaillé, au rythme que vous définissez (mensuel, trimestriel…)."
    },
    {
      q: "La facturation est-elle vraiment automatisée de bout en bout ?",
      a: "Oui. Les factures sont générées à partir des données réelles de réservation : commissions calculées selon vos taux, services annexes (linge, ménage, accueil…) ajoutés automatiquement. Plus de calculs manuels en fin de mois, plus d'oublis de facturation, plus d'erreurs de commission. Vous validez, c'est envoyé."
    },
    {
      q: "En quoi consiste l'analyse de mes annonces Airbnb et Booking ?",
      a: "En quelques clics, le système analyse vos titres, descriptions et listes de services, puis vous livre des recommandations concrètes pour optimiser chaque annonce : mots-clés manquants, structure du titre, éléments différenciants à mettre en avant, services à ajouter. L'objectif : améliorer votre visibilité dans les résultats de recherche des plateformes et votre taux de conversion, sans passer des heures à réécrire chaque annonce."
    },
    {
      q: "Comment fonctionne la retouche photo par lot ?",
      a: "Vous importez vos images (un logement ou tout votre parc), vous choisissez les correctifs souhaités (luminosité, contraste, ciel bleu, netteté…) et/ou ajoutez des consignes libres, puis vous recevez vos photos retouchées prêtes à publier. Sur les plateformes, la photo principale détermine en grande partie le taux de clic sur votre annonce : des photos lumineuses et professionnelles augmentent directement votre visibilité et vos réservations."
    },
    {
      q: "Pourquoi le tarif est-il sur devis ?",
      a: "Parce que chaque conciergerie est différente : nombre de logements, plateformes utilisées, services facturés, forme des rapports, besoins spécifiques en KPI. Un back office sur mesure se chiffre en fonction de VOS processus. Après un échange pour comprendre votre fonctionnement, vous recevez un devis détaillé et transparent, sans engagement. Le retour sur investissement se mesure vite : les heures de saisie, de compilation Excel et de facturation manuelle disparaissent dès le premier mois."
    },
    {
      q: "Est-ce compatible avec l'automatisation de la messagerie voyageurs ?",
      a: "Absolument, les deux services sont complémentaires. L'automatisation de la messagerie répond à vos voyageurs 24h/24 (codes Wi-Fi, check-in, recommandations locales), tandis que le back office automatise votre gestion interne (fiches contact, statistiques, rapports, facturation). Ensemble, ils couvrent l'intégralité des tâches répétitives d'une conciergerie moderne."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <SeoHead route="/automatisation-ia/back-office" />

      {/* Hero */}
      <section className="relative py-20 lg:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-900/30 via-slate-900 to-slate-900" />
        <BackOfficeFlowIllustration />
        <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto relative z-10 max-w-6xl">
          <Breadcrumb route="/automatisation-ia/back-office" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                Nouveau Service
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                Back office sur mesure<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400">
                  pour conciergeries
                </span>
              </h1>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                Fiches contact automatiques, statistiques en temps réel, rapports propriétaires et facturation automatisée.
                Éliminez les tâches à faible valeur ajoutée et récupérez des heures chaque semaine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-slate-200 rounded-full px-8 py-6 h-auto text-lg font-semibold"
                  onClick={() => handleCtaClick('hero')}
                >
                  <Link to="/contact">Demander un devis</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-slate-700 hover:bg-slate-800 text-slate-300 rounded-full px-8 py-6 h-auto text-lg"
                >
                  <a href="#fonctionnalites">Découvrir les fonctionnalités</a>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <DashboardIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Le problème : tâches à faible valeur ajoutée */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4">Combien d'heures partent en tâches répétitives ?</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Gérer une conciergerie, c'est trop souvent recopier, compiler, calculer, envoyer.
            Des actions à faible valeur ajoutée qui s'accumulent, réservation après réservation.
          </p>
          <div className="bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden">
            {timeWasters.map((item, index) => (
              <div key={index} className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 px-6 py-4 ${index !== timeWasters.length - 1 ? 'border-b border-slate-800' : ''}`}>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-slate-300">{item.task}</span>
                </div>
                <span className="text-sm text-slate-500 whitespace-nowrap pl-8 sm:pl-0">{item.freq}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-gradient-to-r from-cyan-900/20 to-violet-900/20 border border-cyan-500/20 rounded-xl p-6 text-center">
            <p className="text-lg text-cyan-200">
              <Zap className="inline-block w-5 h-5 mr-2 -mt-1" />
              <strong>Toutes ces tâches disparaissent.</strong> Le back office les exécute automatiquement, en temps réel, sans intervention de votre part.
            </p>
          </div>
        </div>
      </section>

      {/* Schéma de flux */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4">Une réservation entre, tout le reste suit</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Chaque réservation alimente automatiquement votre téléphone, vos statistiques, vos rapports et votre facturation.
          </p>
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 lg:p-10 overflow-x-auto">
            <FlowSchemaIllustration />
          </div>
        </div>
      </section>

      {/* Fonctionnalités du back office */}
      <section id="fonctionnalites" className="py-20 px-4 bg-slate-800/30 scroll-mt-20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <LayoutDashboard className="w-7 h-7 text-violet-400" />
            <h2 className="text-3xl font-bold text-center">Votre back office, vos règles</h2>
          </div>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Un outil construit autour de vos processus, avec les KPI précis dont vous avez besoin — pas un logiciel générique de plus.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {backOfficeFeatures.map((feature, index) => (
              <Card key={index} className="bg-slate-900 border-slate-700/50 hover:border-violet-500/30 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Focus fiche contact */}
      <section className="py-24 px-4 bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <PhoneContactIllustration />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">
                Fini les numéros inconnus
              </div>
              <h2 className="text-3xl font-bold mb-6 text-white">Le voyageur appelle, vous savez déjà tout</h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                À chaque nouvelle réservation, une fiche contact se crée automatiquement dans votre téléphone :
                nom du voyageur, dates de séjour, logement, montant. Mise à jour en temps réel en cas de
                modification ou d'annulation.
              </p>
              <ul className="space-y-4">
                {[
                  "Plus besoin de chercher dans l'extranet Airbnb ou Booking",
                  "Réponse personnalisée dès la première seconde d'appel",
                  "Toute votre équipe identifie les voyageurs instantanément",
                  "Suppression automatique après le séjour si vous le souhaitez"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Analyse d'annonces */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                Visibilité maximale
              </div>
              <h2 className="text-3xl font-bold mb-6 text-white">Analyse de vos annonces Airbnb & Booking</h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Titres, descriptions, services : en quelques clics, obtenez une analyse complète de chaque annonce
                et des conseils concrets pour mieux performer sur les plateformes.
              </p>
              <ul className="space-y-4">
                {[
                  "Analyse des titres : mots-clés, structure, éléments différenciants",
                  "Optimisation des descriptions pour le référencement interne des plateformes",
                  "Services manquants qui pénalisent votre classement",
                  "Recommandations actionnables, annonce par annonce"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <SearchCheck className="w-6 h-6 text-cyan-400" />
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Exemple d'analyse</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Titre de l'annonce</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">À optimiser</span>
                  </div>
                  <p className="text-xs text-slate-400">« Appartement T2 centre-ville » → ajoutez vos atouts : vue, terrasse, parking, proximité plage…</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Description</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">Incomplète</span>
                  </div>
                  <p className="text-xs text-slate-400">Aucune mention du quartier ni des commodités. Les 500 premiers caractères sont décisifs.</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Services déclarés</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">3 oublis détectés</span>
                  </div>
                  <p className="text-xs text-slate-400">Lave-vaisselle, espace de travail et arrivée autonome non déclarés : des filtres de recherche perdus.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Retouche photo */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="w-7 h-7 text-violet-400" />
            <h2 className="text-3xl font-bold text-center">Retouche photo par lot</h2>
          </div>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            La photo principale décide du clic. Améliorez le rendu de toutes vos photos en une seule opération,
            au lieu de les retoucher une par une.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-cyan-500/40 via-violet-500/40 to-cyan-500/40 -z-0" />
            {photoSteps.map((item, index) => (
              <div key={index} className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto bg-slate-800 border-2 border-violet-500/40 rounded-2xl flex items-center justify-center mb-6">
                  <item.icon className="w-9 h-9 text-violet-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.step}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          {/* Aperçu de l'outil : retouches rapides en un clic */}
          <div className="mt-14 bg-white rounded-2xl p-6 lg:p-8 max-w-3xl mx-auto shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Retouches rapides — aperçu de l'outil</h3>
              <span className="text-xs text-slate-400">4 sélectionnées</span>
            </div>
            <div className="flex flex-wrap gap-2.5" role="list" aria-label="Exemples de retouches rapides disponibles">
              {[
                { label: "Améliore la luminosité", selected: true },
                { label: "Rendu professionnel", selected: false },
                { label: "Lisse les draps", selected: false },
                { label: "Supprime le désordre", selected: false },
                { label: "Ciel bleu", selected: true },
                { label: "Supprime les reflets", selected: false },
                { label: "Ambiance chaleureuse", selected: true },
                { label: "Supprime les câbles", selected: true },
                { label: "Verdure éclatante", selected: false },
              ].map((chip, i) => (
                <span
                  key={i}
                  role="listitem"
                  className={`px-4 py-2 rounded-full text-sm font-medium border ${
                    chip.selected
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  {chip.label}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-4">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold">
                <Wand2 className="w-4 h-4" />
                Lancer la retouche
              </span>
              <span className="text-sm text-slate-400">Vos consignes libres sont aussi acceptées</span>
            </div>
          </div>

          <div className="mt-10 bg-gradient-to-r from-violet-900/20 to-cyan-900/20 border border-violet-500/20 rounded-xl p-6 text-center max-w-3xl mx-auto">
            <p className="text-lg text-violet-200">
              <Sparkles className="inline-block w-5 h-5 mr-2 -mt-1" />
              <strong>Gain de temps énorme :</strong> retoucher 40 photos manuellement prend une journée. Ici, quelques minutes de préparation suffisent.
            </p>
          </div>
        </div>
      </section>

      {/* Cross-sell messagerie */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 lg:p-12 border border-slate-700 relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-4">Complétez avec la messagerie automatisée</h3>
                <p className="text-slate-300 mb-6">
                  Le back office automatise votre gestion interne. Notre service d'automatisation Airbnb & Booking
                  répond à vos voyageurs 24h/24 : codes Wi-Fi, check-in, recommandations locales. Ensemble, ils couvrent
                  toutes les tâches répétitives de votre conciergerie.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center text-slate-400 text-sm">
                    <Check className="w-4 h-4 text-violet-400 mr-2" /> Réponses voyageurs instantanées, 24h/24 et 7j/7
                  </li>
                  <li className="flex items-center text-slate-400 text-sm">
                    <Check className="w-4 h-4 text-violet-400 mr-2" /> Taux de réponse de 100 % sur Airbnb et Booking
                  </li>
                </ul>
                <Button asChild variant="outline" className="border-violet-500 text-violet-400 hover:bg-violet-950">
                  <Link to="/automatisation-ia/conciergerie">
                    Découvrir l'automatisation de messagerie
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="hidden lg:block">
                <Users className="w-40 h-40 text-slate-700/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarif sur devis */}
      <section id="tarifs" className="py-20 px-4 bg-slate-900 scroll-mt-20">
        <div className="container mx-auto max-w-3xl">
          <Card className="bg-slate-900 border-2 border-cyan-500 overflow-hidden relative shadow-2xl shadow-cyan-900/20">
            <CardHeader className="text-center pt-10 pb-2">
              <div className="w-14 h-14 mx-auto bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-4">
                <Euro className="w-7 h-7 text-cyan-400" />
              </div>
              <CardTitle className="text-2xl text-white">Tarif sur devis</CardTitle>
              <p className="text-slate-400 mt-4 max-w-xl mx-auto">
                Chaque conciergerie a ses propres processus, ses services et ses besoins en KPI.
                Votre back office est construit sur mesure — votre devis aussi.
              </p>
            </CardHeader>
            <CardContent className="px-8 py-8">
              <ul className="space-y-4 mb-8 max-w-md mx-auto">
                {[
                  "Échange gratuit pour comprendre vos processus",
                  "Devis détaillé et transparent sous 48h",
                  "Périmètre modulable : back office, analyse d'annonces, retouche photo",
                  "Sans engagement"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center text-slate-300">
                    <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <Button
                  asChild
                  size="lg"
                  className="w-full md:w-auto bg-white text-slate-900 hover:bg-slate-200 text-lg px-12 py-6 h-auto font-bold rounded-full"
                >
                  <Link to="/contact" onClick={() => handleCtaClick('pricing')}>
                    Demander mon devis gratuit
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Questions Fréquentes</h2>
            <p className="text-slate-400">Tout ce que vous devez savoir sur le back office sur mesure pour conciergeries.</p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-slate-800 rounded-lg bg-slate-900/50 px-4">
                <AccordionTrigger className="text-white hover:text-cyan-400 text-left text-lg font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 leading-relaxed pt-2 pb-4 text-base whitespace-pre-wrap">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-24 px-4 bg-slate-950 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Reprenez le contrôle de votre temps</h2>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed">
            Chaque heure passée à recopier, compiler et facturer est une heure perdue pour développer votre parc.
            Parlons de votre conciergerie et chiffrons ensemble votre back office sur mesure.
          </p>
          <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-full px-10 py-6 h-auto text-lg">
            <Link to="/contact" onClick={() => handleCtaClick('footer')}>
              Demander un devis gratuit
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BackOfficeConciergeriePage;
