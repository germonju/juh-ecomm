import React, { useEffect, useState } from 'react';
import SeoHead from '@/components/SeoHead';
import Breadcrumb from '@/components/Breadcrumb';
import { Link } from 'react-router-dom';
import {
  Bot, MessageSquare, CalendarClock, Users, Receipt, Database,
  Zap, Search, Clock, ArrowRight, Check, Sparkles, Brain, PlugZap,
  Euro, Send, ShieldCheck, Workflow
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useDataLayer } from '@/contexts/DataLayerContext';

// ---------------------------------------------------------------------------
// Illustrations SVG sur mesure
// ---------------------------------------------------------------------------

// Mockup d'une conversation avec l'agent IA (thème sombre, données fictives).
// Le chat cycle sur une douzaine d'exemples : la question apparaît, l'agent
// « écrit » (indicateur de frappe), puis la réponse s'affiche, puis on enchaîne
// sur l'exemple suivant. Exemples 100% fictifs, à visée démonstrative.
const CHAT_EXAMPLES = [
  { q: "Quel est mon CA ce mois-ci et qui n'a pas réglé sa facture ?", a: "CA du mois : 18 420 € (+12 %). 2 factures impayées : Dupont SARL (1 240 €, échue) et Martin & Co (860 €, dans 3 jours)." },
  { q: "Suis-je disponible jeudi après-midi ?", a: "Oui : créneau libre jeudi de 14h à 16h30, puis RDV avec Mme Leroy à 16h30." },
  { q: "Crée un devis : 3 jours à 600 €/jour pour la société Nova.", a: "Devis prêt : 3 j × 600 € = 1 800 € HT (2 160 € TTC). Je te l'envoie pour validation ?" },
  { q: "Quels clients n'ont pas eu de nouvelles depuis 2 mois ?", a: "5 clients sans contact depuis 60 jours. Je prépare un e-mail de relance personnalisé ?" },
  { q: "Résume-moi le dernier échange avec le client Bernard.", a: "E-mail du 12 juin : il attend un devis pour la refonte de son site et demande les délais. Pas encore de réponse de ta part." },
  { q: "Combien de RDV cette semaine, et lesquels sont à confirmer ?", a: "8 RDV cette semaine, 2 à confirmer : mardi 10h (Durand) et vendredi 15h (Petit)." },
  { q: "Envoie un rappel aux clients avec une facture en retard.", a: "3 clients concernés. J'ai rédigé les rappels — tu valides l'envoi ?" },
  { q: "Quel est mon panier moyen ce trimestre ?", a: "Panier moyen T2 : 74 € (+5 % vs T1). Meilleur mois : juin (81 €)." },
  { q: "Ajoute un rendez-vous demain à 9h avec le fournisseur Kler.", a: "RDV créé : demain 9h–9h30, « Fournisseur Kler ». J'envoie l'invitation ?" },
  { q: "Qui sont mes 3 meilleurs clients cette année ?", a: "1. Nova — 12 400 €  ·  2. Dupont SARL — 9 100 €  ·  3. Bernard — 7 350 €." },
  { q: "Rédige une réponse à l'avis Google 3★ de Mme Roy.", a: "Brouillon prêt (ton pro et courtois). Je te le montre avant publication ?" },
  { q: "Combien me reste-t-il à facturer ce mois-ci ?", a: "4 prestations livrées non facturées = 3 250 €. Je génère les factures ?" },
];

const ChatConversationIllustration = () => {
  const [idx, setIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowAnswer(false);
    const t1 = setTimeout(() => setShowAnswer(true), 1300);
    const t2 = setTimeout(() => setIdx((v) => (v + 1) % CHAT_EXAMPLES.length), 5200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [idx]);

  const ex = CHAT_EXAMPLES[idx];

  return (
    <div
      className="w-full max-w-md mx-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden"
      role="img"
      aria-label="Aperçu animé d'une conversation avec l'agent IA : l'utilisateur pose une question en langage naturel (CA, agenda, factures, devis, relances, avis…) et l'agent répond instantanément à partir des données de l'entreprise."
    >
      <style>{`
        @keyframes chatfade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        @keyframes chatdot{0%,100%{opacity:.25;transform:translateY(0)}50%{opacity:1;transform:translateY(-2px)}}
        .chatfade{animation:chatfade .35s ease-out both}
        .chatdot{animation:chatdot 1.1s ease-in-out infinite}
        @media (prefers-reduced-motion:reduce){.chatfade{animation:none}.chatdot{animation:none}}
      `}</style>

      {/* Barre de titre */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center">
            <Bot className="w-4 h-4 text-violet-300" />
          </span>
          <span className="text-sm font-bold text-slate-50">Votre assistant IA</span>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400" /> En ligne
        </span>
      </div>

      {/* Corps de la conversation */}
      <div className="p-4 h-[300px] flex flex-col gap-3 overflow-hidden">
        {/* Question de l'utilisateur */}
        <div key={`q-${idx}`} className="chatfade self-end max-w-[88%] rounded-2xl rounded-tr-sm bg-cyan-500/15 border border-cyan-400/30 px-4 py-2.5 text-sm text-cyan-50 leading-relaxed">
          {ex.q}
        </div>

        {/* Frappe puis réponse de l'agent */}
        {!showAnswer ? (
          <div key={`t-${idx}`} className="chatfade self-start flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-violet-300" />
            </span>
            <span className="flex items-center gap-1.5 rounded-2xl bg-slate-800 border border-slate-700 px-4 py-3">
              <span className="w-2 h-2 rounded-full bg-violet-400 chatdot" style={{ animationDelay: '0s' }} />
              <span className="w-2 h-2 rounded-full bg-violet-400 chatdot" style={{ animationDelay: '.2s' }} />
              <span className="w-2 h-2 rounded-full bg-violet-400 chatdot" style={{ animationDelay: '.4s' }} />
            </span>
          </div>
        ) : (
          <div key={`a-${idx}`} className="chatfade self-start flex items-start gap-2 max-w-[92%]">
            <span className="w-7 h-7 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center shrink-0 mt-0.5">
              <Bot className="w-3.5 h-3.5 text-violet-300" />
            </span>
            <span className="rounded-2xl rounded-tl-sm bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm text-slate-100 leading-relaxed">
              {ex.a}
            </span>
          </div>
        )}
      </div>

      {/* Barre de saisie */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-slate-700">
        <div className="flex-1 rounded-full bg-slate-800 border border-slate-700 px-4 py-2 text-sm text-slate-500">Posez votre question…</div>
        <span aria-hidden="true" className="w-9 h-9 rounded-full bg-violet-500 flex items-center justify-center shrink-0">
          <Send className="w-4 h-4 text-white" />
        </span>
      </div>
    </div>
  );
};

// Fond du hero : des particules de données (agenda, mails, CRM, tableurs…)
// qui convergent en flux lumineux vers un cœur central pulsant.
const ConvergingDataIllustration = () => {
  const CX = 600, CY = 300;
  const sources = [
    [120, 90, '#22d3ee'], [1060, 110, '#8b5cf6'], [90, 300, '#a3e635'],
    [1120, 300, '#22d3ee'], [180, 520, '#8b5cf6'], [1030, 500, '#a3e635'],
    [430, 60, '#22d3ee'], [800, 545, '#8b5cf6'], [340, 470, '#a3e635'],
    [880, 120, '#22d3ee'], [250, 210, '#8b5cf6'], [960, 380, '#a3e635'],
  ];
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden [mask-image:radial-gradient(65%_65%_at_58%_45%,#000_35%,transparent_100%)]"
      aria-hidden="true"
    >
      <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="cv-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
          <style>{`
            @keyframes cv-flow { to { stroke-dashoffset: -200; } }
            @keyframes cv-core { 0%,100% { transform: scale(1); opacity:.55 } 50% { transform: scale(1.15); opacity:.9 } }
            @keyframes cv-src  { 0%,100% { opacity:.35 } 50% { opacity:.9 } }
            .cv-flow { stroke-dasharray: 2 16; stroke-linecap: round; animation: cv-flow 2.4s linear infinite; }
            .cv-core { transform-origin: 600px 300px; animation: cv-core 5s ease-in-out infinite; }
            .cv-src  { animation: cv-src 3s ease-in-out infinite; }
            @media (prefers-reduced-motion: reduce) {
              .cv-flow, .cv-core, .cv-src { animation: none; }
            }
          `}</style>
        </defs>

        {sources.map(([x, y, c], i) => (
          <g key={i}>
            <line x1={x} y1={y} x2={CX} y2={CY} stroke={c} strokeWidth="1" opacity="0.1" />
            <line x1={x} y1={y} x2={CX} y2={CY} stroke={c} strokeWidth="1.6" opacity="0.55" className="cv-flow" style={{ animationDelay: `${i * 0.2}s` }} />
            <circle cx={x} cy={y} r="3" fill={c} className="cv-src" style={{ animationDelay: `${i * 0.25}s` }} />
          </g>
        ))}

        {/* Cœur central pulsant */}
        <circle cx={CX} cy={CY} r="60" fill="url(#cv-core)" className="cv-core" />
        <circle cx={CX} cy={CY} r="6" fill="#c4b5fd" opacity="0.8" />
      </svg>
    </div>
  );
};

// Schéma : l'agent IA au centre, relié à toutes vos sources de données
const ConnectionsSchemaIllustration = () => {
  const sources = [
    { cy: 60,  label: 'Planning',        sub: 'agenda, RDV',      color: '#22d3ee' },
    { cy: 140, label: 'Clients',         sub: 'CRM, contacts',    color: '#8b5cf6' },
    { cy: 220, label: 'Facturation',     sub: 'devis, factures',  color: '#22d3ee' },
    { cy: 300, label: 'Base de données', sub: 'produits, stock',  color: '#8b5cf6' },
  ];
  const HUB_X = 420, HUB_Y = 180;
  // Point d'arrivée en éventail sur le bord gauche du hub
  const endY = (i) => HUB_Y + (i - 1.5) * 12;

  return (
    <svg viewBox="0 0 780 360" className="w-full h-auto min-w-[680px] md:min-w-0" role="img" aria-label="Schéma de l'agent IA relié à votre planning, vos clients, votre facturation et votre base de données">
      <defs>
        <linearGradient id="agentCore" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
        <marker id="agentArrow" markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#22d3ee" />
        </marker>
        <style>{`
          @keyframes cs-flow { to { stroke-dashoffset: -16; } }
          @keyframes cs-spin { to { transform: rotate(360deg); } }
          @keyframes cs-breathe { 0%,100% { opacity:.35 } 50% { opacity:.6 } }
          .cs-flow { stroke-dasharray: 1 15; stroke-linecap: round; animation: cs-flow 1.3s linear infinite; }
          .cs-ring { transform-origin: 420px 180px; animation: cs-spin 24s linear infinite; }
          .cs-glow { animation: cs-breathe 5s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .cs-flow, .cs-ring, .cs-glow { animation: none; }
          }
        `}</style>
      </defs>

      <g fontFamily="sans-serif">
        {/* Connexions source → hub (base + flux animé) */}
        {sources.map((s, i) => {
          const d = `M224,${s.cy} C 312,${s.cy} 330,${endY(i)} 366,${endY(i)}`;
          return (
            <g key={`link-${i}`}>
              <path d={d} fill="none" stroke={s.color} strokeWidth="1.5" opacity="0.18" />
              <path d={d} fill="none" stroke={s.color} strokeWidth="2.4" className="cs-flow" style={{ animationDelay: `${i * 0.28}s` }} />
            </g>
          );
        })}

        {/* Cartes sources (colonne gauche) */}
        {sources.map((s, i) => (
          <g key={`src-${i}`}>
            <rect x="24" y={s.cy - 27} width="200" height="54" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
            <rect x="24" y={s.cy - 27} width="4" height="54" rx="2" fill={s.color} />
            <circle cx="48" cy={s.cy} r="8" fill={s.color} fillOpacity="0.15" stroke={s.color} strokeWidth="1.3" />
            <circle cx="48" cy={s.cy} r="2.4" fill={s.color} />
            <text x="70" y={s.cy - 3} fill="#f8fafc" fontSize="13" fontWeight="bold">{s.label}</text>
            <text x="70" y={s.cy + 14} fill="#94a3b8" fontSize="10">{s.sub}</text>
          </g>
        ))}

        {/* Hub — Agent IA */}
        <circle cx={HUB_X} cy={HUB_Y} r="88" fill="url(#hubGlow)" className="cs-glow" />
        <circle cx={HUB_X} cy={HUB_Y} r="68" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4 8" opacity="0.5" className="cs-ring" />
        <circle cx={HUB_X} cy={HUB_Y} r="56" fill="#0f172a" stroke="url(#agentCore)" strokeWidth="2" />
        <circle cx={HUB_X} cy={HUB_Y} r="56" fill="url(#agentCore)" fillOpacity="0.1" />
        <text x={HUB_X} y={HUB_Y - 4} textAnchor="middle" fill="#f8fafc" fontSize="17" fontWeight="bold">Agent IA</text>
        <text x={HUB_X} y={HUB_Y + 15} textAnchor="middle" fill="#c4b5fd" fontSize="11">conversationnel</text>

        {/* Pastille sous le hub */}
        <g>
          <rect x={HUB_X - 78} y={HUB_Y + 74} width="156" height="26" rx="13" fill="#0e7490" fillOpacity="0.15" stroke="#22d3ee" strokeOpacity="0.4" strokeWidth="1" />
          <circle cx={HUB_X - 58} cy={HUB_Y + 87} r="3" fill="#34d399" />
          <text x={HUB_X + 6} y={HUB_Y + 91} textAnchor="middle" fill="#67e8f9" fontSize="10.5" fontWeight="500">réponses en temps réel</text>
        </g>

        {/* Sortie : la réponse / l'action */}
        <path d="M480,180 L560,180" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.25" />
        <path d="M480,180 L560,180" fill="none" stroke="#22d3ee" strokeWidth="2.4" className="cs-flow" markerEnd="url(#agentArrow)" />
        <rect x="576" y="118" width="184" height="124" rx="14" fill="#1e293b" stroke="#22d3ee" strokeWidth="1.5" />
        <text x="668" y="146" textAnchor="middle" fill="#22d3ee" fontSize="13" fontWeight="bold">Vous</text>
        <line x1="612" y1="158" x2="724" y2="158" stroke="#334155" strokeWidth="1" />
        <text x="668" y="180" textAnchor="middle" fill="#e2e8f0" fontSize="11">« Réponse immédiate,</text>
        <text x="668" y="196" textAnchor="middle" fill="#e2e8f0" fontSize="11">chiffrée et sourcée »</text>
        <text x="668" y="220" textAnchor="middle" fill="#94a3b8" fontSize="10">+ tâches exécutées à votre place</text>
      </g>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const AgentIaPage = () => {
  const { pushEvent } = useDataLayer();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCtaClick = (ctaLocation) => {
    pushEvent('cta_click', {
      cta_location: ctaLocation,
      cta_text: 'Demander un devis',
      service: 'Agent IA Conversationnel'
    });
  };

  const agentFeatures = [
    {
      icon: MessageSquare,
      title: "Une seule interface, toutes vos réponses",
      description: "Posez vos questions en langage naturel, comme à un collaborateur. L'agent comprend, cherche dans vos données et répond instantanément — par écrit ou à la voix."
    },
    {
      icon: CalendarClock,
      title: "Connecté à votre planning",
      description: "« Quels sont mes rendez-vous demain ? », « Suis-je disponible jeudi après-midi ? » : votre agenda devient consultable et pilotable d'un simple message."
    },
    {
      icon: Users,
      title: "Connecté à vos clients",
      description: "Historique, coordonnées, dernières commandes, échanges en cours : retrouvez la fiche d'un client et son contexte sans ouvrir votre CRM."
    },
    {
      icon: Receipt,
      title: "Connecté à votre facturation",
      description: "CA du mois, factures impayées, relances à envoyer, création d'un devis : votre comptabilité répond à vos questions au lieu de vous en poser."
    },
    {
      icon: Database,
      title: "Connecté à votre base de données",
      description: "Produits, stock, contrats, documents internes… L'agent puise dans vos données réelles et cite ses sources. Fini les recherches manuelles à droite et à gauche."
    },
    {
      icon: Workflow,
      title: "Il accomplit des tâches",
      description: "Au-delà des réponses, il agit : créer un rappel, envoyer un e-mail, générer une facture, mettre à jour une fiche. Vous demandez, il exécute."
    },
    {
      icon: Sparkles,
      title: "Il crée du contenu pour vous",
      description: "Rédaction d'e-mails, de devis, de fiches produit ou de posts, à partir de vos propres données et de votre ton. Un premier jet prêt à valider en quelques secondes."
    },
    {
      icon: ShieldCheck,
      title: "Vos données restent les vôtres",
      description: "L'agent est cloisonné à votre environnement, avec gestion des accès et respect du RGPD. Il ne répond qu'à vous, sur vos informations."
    }
  ];

  const timeWasters = [
    { task: "Chercher une info client dans le CRM, les mails et les fichiers Excel", freq: "Plusieurs fois par jour" },
    { task: "Vérifier une disponibilité dans l'agenda avant de répondre", freq: "À chaque demande" },
    { task: "Compiler le CA et repérer les factures impayées", freq: "Chaque semaine" },
    { task: "Retrouver un devis, un contrat ou une fiche produit", freq: "En continu" },
    { task: "Rédiger le même type d'e-mail ou de document encore et encore", freq: "Tous les jours" }
  ];

  const useCases = [
    {
      icon: CalendarClock,
      q: "« Qu'est-ce que j'ai de prévu jeudi ? »",
      a: "Il lit votre agenda et vous liste vos rendez-vous, créneaux libres et rappels du jour."
    },
    {
      icon: Users,
      q: "« Rappelle-moi le dossier de Mme Durand »",
      a: "Il ressort son historique, ses dernières commandes et les échanges en cours, sourcés depuis votre CRM."
    },
    {
      icon: Receipt,
      q: "« Génère la facture du chantier Martin »",
      a: "Il prépare la facture à partir des données réelles, prête à relire et à envoyer."
    },
    {
      icon: Search,
      q: "« Combien de références sont en rupture ? »",
      a: "Il interroge votre base et vous donne la liste chiffrée, en temps réel."
    }
  ];

  const faqs = [
    {
      q: "Qu'est-ce qu'un agent IA conversationnel connecté à mes données ?",
      a: "C'est un assistant intelligent, disponible via une simple messagerie (chat écrit ou vocal), branché sur VOS outils : planning, CRM/clients, facturation, base de données et documents internes. Au lieu d'ouvrir cinq logiciels différents pour retrouver une information, vous la demandez en langage naturel et l'agent vous répond instantanément, en s'appuyant sur vos données réelles et en citant ses sources. Contrairement à un chatbot générique, il connaît votre activité et peut agir dessus."
    },
    {
      q: "À quels outils l'agent peut-il se connecter ?",
      a: "À la grande majorité des outils du marché dès qu'ils disposent d'une API ou d'un export : agendas (Google Calendar, Outlook), CRM (HubSpot, Pipedrive, Salesforce…), facturation et comptabilité, bases de données (Airtable, Notion, PostgreSQL, Google Sheets), messageries et espaces de documents. Lors du cadrage, nous identifions ensemble vos sources prioritaires et la façon la plus sûre de les connecter. L'agent peut se brancher sur plusieurs sources à la fois pour croiser les informations."
    },
    {
      q: "L'agent peut-il vraiment accomplir des tâches, pas seulement répondre ?",
      a: "Oui. En plus de répondre à vos questions, il peut exécuter des actions que vous lui autorisez : créer un rendez-vous ou un rappel, envoyer un e-mail, générer un devis ou une facture, mettre à jour une fiche client, rédiger un contenu. Vous gardez la main : pour les actions sensibles (envoi, facturation), l'agent prépare et vous validez d'un clic avant exécution."
    },
    {
      q: "Mes données sont-elles en sécurité et conformes au RGPD ?",
      a: "La sécurité et la confidentialité sont au cœur du dispositif. L'agent est cloisonné à votre environnement, avec une gestion fine des droits d'accès : il ne voit que ce que vous l'autorisez à voir et ne répond qu'à vous. Les échanges sont chiffrés, aucune donnée n'est utilisée pour entraîner des modèles publics, et l'ensemble est conçu dans le respect du RGPD. Nous définissons ensemble ce qui est accessible, par qui, et pour quelles actions."
    },
    {
      q: "Comment interagit-on avec l'agent au quotidien ?",
      a: "Comme avec n'importe quelle messagerie : depuis votre ordinateur ou votre téléphone, par écrit ou à la voix. On peut aussi l'intégrer aux outils que vous utilisez déjà (Slack, WhatsApp, Teams, un widget sur votre intranet…), pour qu'il soit là où vous travaillez, sans nouvelle application à adopter."
    },
    {
      q: "Combien de temps faut-il pour le mettre en place ?",
      a: "Cela dépend du nombre de sources à connecter et des tâches à automatiser. Un premier agent utile — connecté à une ou deux sources clés — se met généralement en place en quelques jours. On démarre sur un périmètre restreint à forte valeur, on valide les résultats, puis on élargit progressivement les connexions et les actions au fur et à mesure de vos besoins."
    },
    {
      q: "Pourquoi le tarif est-il sur devis ?",
      a: "Parce que chaque activité a ses outils, ses données et ses cas d'usage. Le prix dépend du nombre de sources à connecter, de la complexité des tâches à automatiser et du niveau d'intégration souhaité. Après un échange pour comprendre votre fonctionnement, vous recevez un devis détaillé et transparent, sans engagement. Le retour sur investissement se mesure vite : le temps passé à chercher l'information et à refaire les mêmes tâches fond dès les premières semaines."
    },
    {
      q: "Est-ce compatible avec mes autres automatisations ?",
      a: "Absolument, les deux se complètent. L'agent conversationnel est votre point d'entrée pour interroger et piloter votre activité, tandis que nos automatisations (workflows, réponse aux leads, back office) travaillent en arrière-plan. Ensemble, ils forment un système où l'information circule seule et où vous gardez le contrôle par la simple conversation."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <SeoHead route="/automatisation-ia/agent-ia-conversationnel" />

      {/* Hero */}
      <section className="relative py-20 lg:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-900/30 via-slate-900 to-slate-900" />
        <div className="absolute inset-0 bg-tech-grid pointer-events-none" />
        <ConvergingDataIllustration />
        <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[600px] h-[400px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none glow-pulse" />
        <div className="absolute top-24 right-0 w-[380px] h-[380px] bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none glow-pulse" />
        <div className="container mx-auto relative z-10 max-w-6xl">
          <Breadcrumb route="/automatisation-ia/agent-ia-conversationnel" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 text-sm font-medium rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
                </span>
                Nouveau Service
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-[1.15] tracking-tight text-balance">
                Votre agent IA conversationnel,{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400">
                  relié à toute votre activité
                </span>
              </h1>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-xl">
                Un assistant branché sur votre planning, vos clients, votre facturation et votre base de données.
                Demandez-lui ce que vous voulez : il répond instantanément et accomplit vos tâches à votre place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="group relative rounded-full px-8 py-6 h-auto text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-lg shadow-violet-900/40 hover:shadow-xl hover:shadow-violet-700/40 transition-all duration-300"
                  onClick={() => handleCtaClick('hero')}
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    Demander un devis
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="group rounded-full px-8 py-6 h-auto text-base font-medium bg-white/5 border-slate-700 text-slate-200 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-500/40 hover:text-white transition-all duration-300"
                >
                  <a href="#fonctionnalites" className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400 transition-transform duration-300 group-hover:scale-110" />
                    Découvrir les fonctionnalités
                  </a>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <ChatConversationIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Le problème : l'info éparpillée */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4">Combien de temps à chercher la bonne info ?</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            L'information est là, mais éparpillée : le CRM, l'agenda, la compta, les fichiers, les mails.
            Chaque réponse demande d'ouvrir trois outils et de recouper à la main.
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
          <div className="mt-10 bg-gradient-to-r from-violet-900/20 to-cyan-900/20 border border-violet-500/20 rounded-xl p-6">
            <p className="flex items-start sm:items-center justify-center gap-3 text-lg text-violet-200 text-center">
              <Zap className="w-5 h-5 flex-shrink-0 mt-1 sm:mt-0 text-violet-300" />
              <span>
                <strong className="text-white">Une seule question suffit.</strong> Votre agent va chercher l'information là où elle se trouve et vous répond en quelques secondes.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Schéma : agent relié à vos sources */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            Un seul assistant,{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400">branché sur tout</span>
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            L'agent centralise vos sources et vous répond en langage naturel — plus besoin d'aller chercher l'info à droite ou à gauche.
          </p>
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 lg:p-10 overflow-x-auto">
            <ConnectionsSchemaIllustration />
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section id="fonctionnalites" className="py-20 px-4 bg-slate-800/30 scroll-mt-20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bot className="w-7 h-7 text-violet-400" />
            <h2 className="text-3xl font-bold text-center">Ce que votre agent sait faire</h2>
          </div>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Un assistant construit autour de vos outils et de vos données, qui répond, agit et vous fait gagner du temps chaque jour.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agentFeatures.map((feature, index) => (
              <Card key={index} className="group relative bg-slate-900 border-slate-700/50 border-gradient-glow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-900/20">
                <CardHeader>
                  <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center mb-4 ring-1 ring-inset ring-violet-500/20 transition-all group-hover:bg-violet-500/20 group-hover:ring-violet-400/40">
                    <feature.icon className="w-6 h-6 text-violet-400 transition-transform group-hover:scale-110" />
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

      {/* Focus interface conversationnelle */}
      <section className="py-24 px-4 bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <ChatConversationIllustration />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                Aussi simple qu'un message
              </div>
              <h2 className="text-3xl font-bold mb-6 text-white">Vous demandez, il répond. Instantanément.</h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Pas de tableau de bord complexe, pas de requête à construire. Vous écrivez ou dictez votre question
                comme à un collaborateur, et l'agent vous répond avec l'information exacte, chiffrée et sourcée.
              </p>
              <ul className="space-y-4">
                {[
                  "Langage naturel : posez vos questions comme vous les diriez à l'oral",
                  "Réponses sourcées : chaque chiffre provient de vos données réelles",
                  "Disponible 24h/24, sur ordinateur comme sur mobile",
                  "Intégrable à Slack, WhatsApp, Teams ou votre intranet"
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

      {/* Cas d'usage */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageSquare className="w-7 h-7 text-cyan-400" />
            <h2 className="text-3xl font-bold text-center">Quelques questions, mille usages</h2>
          </div>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Voici des exemples concrets de ce que vous pouvez demander à votre agent, dès le premier jour.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((item, index) => (
              <div key={index} className="group relative bg-slate-900 border border-slate-700/50 rounded-xl p-6 border-gradient-glow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-900/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0 ring-1 ring-inset ring-cyan-500/20 transition-all group-hover:bg-cyan-500/20 group-hover:ring-cyan-400/40">
                    <item.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-2 leading-snug">{item.q}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Il agit à votre place */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">
                Bien plus qu'une réponse
              </div>
              <h2 className="text-3xl font-bold mb-6 text-white">Il n'informe pas seulement, il agit</h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Un vrai assistant ne se contente pas de répondre : il accomplit les tâches à votre place.
                Vous formulez la demande, il l'exécute — et vous validez d'un clic les actions sensibles.
              </p>
              <ul className="space-y-4">
                {[
                  "Créer un rendez-vous, un rappel ou un événement dans votre agenda",
                  "Rédiger et préparer un e-mail, un devis ou une facture",
                  "Mettre à jour une fiche client ou une entrée de votre base",
                  "Générer du contenu à partir de vos données et de votre ton"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <PlugZap className="w-6 h-6 text-violet-400" />
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Exemple d'action</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-cyan-900/20 border border-cyan-500/20 rounded-lg p-4">
                  <p className="text-xs text-cyan-300 mb-1">Vous</p>
                  <p className="text-sm text-slate-200">« Envoie une relance à tous les clients dont la facture est en retard. »</p>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-slate-600 rotate-90" />
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <p className="text-xs text-violet-300 mb-1">Agent IA</p>
                  <p className="text-sm text-slate-200 mb-3">3 factures en retard détectées. J'ai préparé 3 relances personnalisées.</p>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-600 text-white text-xs font-semibold">
                      <Send className="w-3 h-3" /> Valider l'envoi
                    </span>
                    <span className="text-xs text-slate-500">Modifier avant envoi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-sell automatisation */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 lg:p-12 border border-slate-700 relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-4">Complétez avec l'automatisation de vos workflows</h3>
                <p className="text-slate-300 mb-6">
                  L'agent conversationnel est votre point d'entrée pour interroger et piloter votre activité.
                  En arrière-plan, nos automatisations font circuler l'information seule : réponse aux leads, synchronisation
                  de vos outils, tâches déclenchées automatiquement. Ensemble, ils forment un système complet.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center text-slate-400 text-sm">
                    <Check className="w-4 h-4 text-violet-400 mr-2" /> Vos outils synchronisés en temps réel
                  </li>
                  <li className="flex items-center text-slate-400 text-sm">
                    <Check className="w-4 h-4 text-violet-400 mr-2" /> Des workflows qui tournent 24h/24, sans intervention
                  </li>
                </ul>
                <Button asChild variant="outline" className="border-violet-500 text-violet-400 hover:bg-violet-950">
                  <Link to="/automatisation-ia">
                    Découvrir l'automatisation Hub
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="hidden lg:block">
                <Brain className="w-40 h-40 text-slate-700/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarif sur devis */}
      <section id="tarifs" className="py-20 px-4 bg-slate-900 scroll-mt-20">
        <div className="container mx-auto max-w-3xl">
          <Card className="bg-slate-900 border-2 border-violet-500 overflow-hidden relative shadow-2xl shadow-violet-900/20">
            <CardHeader className="text-center pt-10 pb-2">
              <div className="w-14 h-14 mx-auto bg-violet-500/10 rounded-2xl flex items-center justify-center mb-4">
                <Euro className="w-7 h-7 text-violet-400" />
              </div>
              <CardTitle className="text-2xl text-white">Tarif sur devis</CardTitle>
              <p className="text-slate-400 mt-4 max-w-xl mx-auto">
                Chaque activité a ses outils, ses données et ses cas d'usage. Votre agent est construit sur mesure —
                votre devis aussi.
              </p>
            </CardHeader>
            <CardContent className="px-8 py-8">
              <ul className="space-y-4 mb-8 max-w-md mx-auto">
                {[
                  "Échange gratuit pour cadrer vos sources et cas d'usage",
                  "Devis détaillé et transparent sous 48h",
                  "Démarrage sur un périmètre à forte valeur, puis élargissement",
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
            <p className="text-slate-400">Tout ce que vous devez savoir sur la création d'un agent IA conversationnel sur mesure.</p>
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
      <section className="relative py-24 px-4 bg-slate-950 text-center overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none glow-pulse" />
        <div className="container mx-auto relative z-10 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">
            Arrêtez de chercher,{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400">commencez à demander</span>
          </h2>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            Vos données valent de l'or, à condition d'y accéder en une phrase. Parlons de votre activité et
            construisons ensemble l'agent IA qui vous répond et agit à votre place.
          </p>
          <Button asChild size="lg" className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-10 py-6 h-auto text-lg">
            <Link to="/contact" onClick={() => handleCtaClick('footer')}>
              Demander un devis gratuit
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AgentIaPage;
