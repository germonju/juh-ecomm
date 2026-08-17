import React from 'react';
import { Helmet } from 'react-helmet';
import { DataNetworkIllustration } from '@/components/HeroIllustrations';
import SeoHead from '@/components/SeoHead';
import Breadcrumb from '@/components/Breadcrumb';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  AlertTriangle,
  ClipboardList,
  Layers,
  Code2,
  ShoppingCart,
  ShieldCheck,
  Server,
  Bug,
  GraduationCap,
  Search,
  Wrench,
  CheckCircle2,
  LifeBuoy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ROUTE = '/tracking-data/specialiste-google-tag-manager';

// Symptômes d'un conteneur GTM qui a besoin d'un spécialiste.
const symptoms = [
  "Vos conversions Google Ads ne correspondent pas aux commandes de votre back-office.",
  'Votre conteneur GTM contient des balises orphelines dont plus personne ne connaît le rôle.',
  'Un même achat est compté deux fois (balise en double, déclencheur trop large).',
  "GA4 affiche des événements e-commerce incomplets : pas de valeur, pas d'articles, pas de devise.",
  "Le bandeau cookies est en place mais les balises se déclenchent quand même avant le consentement.",
  'Personne ne sait dire ce qui est mesuré, où, ni depuis quand.',
];

// Prestations d'un spécialiste GTM.
const services = [
  {
    icon: Search,
    title: 'Audit du conteneur GTM',
    desc: "Revue complète de vos balises, déclencheurs et variables : doublons, balises mortes, déclencheurs trop larges, conflits entre conteneurs. Vous repartez avec un état des lieux clair et une liste d'actions priorisées.",
  },
  {
    icon: ClipboardList,
    title: 'Plan de marquage (tagging plan)',
    desc: "La documentation qui manque à 90 % des conteneurs : quels événements sont mesurés, avec quels paramètres, sur quelles pages et vers quelles plateformes. Une référence partagée entre vous, votre agence et vos développeurs.",
  },
  {
    icon: Code2,
    title: 'DataLayer propre et documenté',
    desc: "Conception et implémentation du dataLayer : nommage cohérent, paramètres normalisés, spécifications prêtes à donner à vos développeurs. C'est la fondation qui rend un conteneur GTM fiable dans la durée.",
  },
  {
    icon: ShoppingCart,
    title: 'Tracking e-commerce complet',
    desc: "Suivi du parcours d'achat de bout en bout (vue produit, ajout au panier, tunnel, achat) avec les articles, la valeur et la devise. Conforme au format e-commerce attendu par GA4 et exploitable par Google Ads.",
  },
  {
    icon: ShieldCheck,
    title: 'Consent Mode V2 & RGPD',
    desc: "Branchement de votre CMP à GTM, gestion des états de consentement et des déclencheurs associés. Vos balises respectent le choix de l'utilisateur, sans sacrifier la mesure des utilisateurs consentants.",
  },
  {
    icon: Server,
    title: 'GTM Server-Side',
    desc: "Mise en place du conteneur serveur quand le besoin le justifie : fiabilité de la donnée, résistance aux bloqueurs, contrôle de ce qui est transmis aux plateformes. Le prolongement naturel d'un conteneur web bien construit.",
  },
  {
    icon: Bug,
    title: 'Debug, recette et QA',
    desc: "Tests via Tag Assistant, l'aperçu GTM et le DebugView GA4, sur desktop et mobile. Chaque événement est vérifié dans les vraies conditions avant mise en production — pas seulement « en preview ».",
  },
  {
    icon: GraduationCap,
    title: 'Formation & accompagnement',
    desc: "Prise en main de votre conteneur par votre équipe : conventions de nommage, environnements, versions et publication. Vous gardez la main sur votre outil au lieu d'en dépendre.",
  },
];

// Déroulé type d'une mission.
const steps = [
  {
    title: 'Cadrage de vos objectifs business',
    desc: "On part de ce que vous devez piloter (rentabilité, leads qualifiés, tunnel e-commerce) et non d'une liste de balises. Le tracking se conçoit à l'envers : d'abord la décision à prendre, ensuite la mesure.",
  },
  {
    title: 'Audit de l\'existant',
    desc: "Analyse de votre conteneur GTM, de vos propriétés GA4 et de vos comptes Google Ads : ce qui fonctionne, ce qui est faux, ce qui manque. Restitution écrite avec les écarts constatés et leur impact.",
  },
  {
    title: 'Plan de marquage et implémentation',
    desc: "Rédaction du plan de marquage, puis implémentation dans GTM : balises, déclencheurs, variables, dataLayer, gestion du consentement. Travail dans un espace de travail dédié, sans toucher à votre production.",
  },
  {
    title: 'Recette avant publication',
    desc: "Chaque événement est testé en conditions réelles et comparé à votre back-office. Rien n'est publié tant que les chiffres ne se réconcilient pas — c'est ce qui distingue un tracking installé d'un tracking fiable.",
  },
  {
    title: 'Documentation et suivi',
    desc: "Vous recevez le plan de marquage à jour et la documentation du conteneur. Ensuite, suivi des évolutions : nouvelle plateforme, refonte du site, changement de CMP ou d'API publicitaire.",
  },
];

// Environnements et destinations pris en charge.
const platforms = ['Shopify', 'WooCommerce', 'PrestaShop', 'WordPress', 'Webflow', 'Sites sur mesure (React, Next.js…)'];
const destinations = ['Google Analytics 4', 'Google Ads', 'Meta Conversions API', 'Microsoft Ads', 'TikTok Ads', 'LinkedIn Ads'];

// Formats d'intervention.
const formats = [
  {
    icon: Search,
    title: 'Audit GTM ponctuel',
    desc: "Un diagnostic complet de votre conteneur et de vos conversions, avec un rapport actionnable. Le bon point de départ quand vous héritez d'un tracking existant.",
  },
  {
    icon: Wrench,
    title: 'Implémentation complète',
    desc: "Refonte ou création de votre tracking : plan de marquage, dataLayer, conteneur GTM, GA4, Google Ads et consentement. Livré testé et documenté.",
  },
  {
    icon: LifeBuoy,
    title: 'Accompagnement continu',
    desc: "Un spécialiste GTM disponible dans la durée : évolutions du site, nouvelles campagnes, nouvelles plateformes, veille sur les changements Google.",
  },
];

const faqs = [
  {
    q: "Qu'est-ce qu'un spécialiste Google Tag Manager fait exactement ?",
    a: "Un spécialiste Google Tag Manager conçoit, implémente et maintient la couche de mesure de votre site. Concrètement : il audite votre conteneur GTM, rédige un plan de marquage, définit le dataLayer avec vos développeurs, configure les balises et déclencheurs vers GA4, Google Ads et vos autres plateformes, gère le consentement, puis teste chaque événement avant publication. Son rôle n'est pas de « poser des balises » mais de garantir que les chiffres sur lesquels vous pilotez sont justes.",
  },
  {
    q: 'Quelle différence entre un spécialiste GTM et une agence web ?',
    a: "Une agence web installe généralement GTM parce qu'il faut bien le faire : le conteneur est créé, quelques balises sont posées, et personne ne revient dessus. Un spécialiste GTM travaille la donnée elle-même : cohérence des événements, réconciliation avec votre back-office, qualité des conversions envoyées à Google Ads, conformité RGPD. C'est un métier de mesure, pas un livrable annexe d'un projet de site.",
  },
  {
    q: "Ai-je besoin d'un développeur pour travailler avec vous ?",
    a: "Pas toujours. Une grande partie du marquage se fait directement dans GTM sans toucher au code. En revanche, un dataLayer fiable — surtout en e-commerce — demande souvent quelques ajouts côté site. Dans ce cas, je fournis des spécifications précises à vos développeurs (ou à votre agence) et je recette leur intégration. Sur Shopify, l'essentiel se met en place sans développement spécifique.",
  },
  {
    q: 'Combien de temps prend une mission GTM ?',
    a: "Un audit de conteneur se livre généralement en quelques jours. Une implémentation complète (plan de marquage, dataLayer, GTM, GA4, Google Ads, consentement) s'étale plutôt sur deux à quatre semaines selon la complexité du site et la disponibilité des équipes techniques. Le passage en Server-Side ajoute une phase supplémentaire de mise en place et de recette.",
  },
  {
    q: "Faut-il repartir de zéro si mon conteneur GTM est en désordre ?",
    a: "Rarement. Dans la plupart des cas, on nettoie l'existant : suppression des balises mortes, correction des déclencheurs, normalisation des variables. Une reconstruction complète ne se justifie que si le conteneur est devenu ingérable ou si le site change entièrement. Dans tous les cas, on travaille dans un espace de travail dédié avec un historique de versions : rien n'est perdu, tout est réversible.",
  },
  {
    q: 'GTM Web ou GTM Server-Side : lequel me faut-il ?',
    a: "Le conteneur Web reste la base : c'est lui qui capte les interactions sur votre site. Le Server-Side s'ajoute par-dessus quand la fiabilité de la donnée devient un enjeu (bloqueurs de publicité, limitations des navigateurs, performance, contrôle de ce qui part vers les plateformes). Commencer par un conteneur web propre est toujours la bonne première étape ; le Server-Side vient ensuite amplifier ce qui est déjà correct.",
  },
  {
    q: 'Est-ce que Google Tag Manager est compatible RGPD ?',
    a: "Oui, à condition d'être configuré correctement. GTM n'est qu'un gestionnaire de balises : la conformité dépend de ce que vous déclenchez et à quel moment. Avec une CMP branchée au Consent Mode V2 et des déclencheurs conditionnés au consentement, vos balises respectent le choix de l'utilisateur. C'est un point systématiquement vérifié en audit, car c'est aussi l'une des sources d'erreurs de mesure les plus fréquentes.",
  },
  {
    q: 'Intervenez-vous sur un site déjà suivi par une agence ?',
    a: "Oui, et c'est un cas fréquent. J'interviens sur le périmètre mesure — conteneur GTM, GA4, conversions Google Ads — pendant que votre agence garde la main sur les campagnes ou le site. Le plan de marquage sert alors de référence commune : tout le monde travaille sur les mêmes définitions et les mêmes chiffres.",
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Spécialiste Google Tag Manager',
  name: 'Spécialiste Google Tag Manager (GTM)',
  description:
    "Audit de conteneur GTM, plan de marquage, dataLayer, tracking e-commerce, Consent Mode V2 et GTM Server-Side pour un tracking fiable et réconcilié avec votre back-office.",
  provider: {
    '@type': 'Organization',
    name: 'Juh Ecomm Data',
    url: 'https://www.juh-ecomm.fr',
  },
  areaServed: { '@type': 'Country', name: 'France' },
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://www.juh-ecomm.fr/contact',
  },
};

const SpecialisteGtmPage = () => (
  <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30">
    <SeoHead route={ROUTE} />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
    </Helmet>

    {/* Hero */}
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <DataNetworkIllustration />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10 text-center">
        <Breadcrumb route={ROUTE} />
        <Badge className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border-cyan-500/20 mb-6 px-4 py-1.5 text-sm uppercase tracking-wider">
          Google Tag Manager
        </Badge>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight">
          Spécialiste Google Tag Manager
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Un expert GTM qui ne se contente pas d'installer des balises : plan de marquage, dataLayer,
          recette et documentation, pour que vos chiffres <strong className="text-white">se réconcilient enfin</strong> avec
          votre back-office.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-8 h-14 text-lg rounded-full shadow-lg shadow-cyan-500/20 transition-all hover:scale-105">
            <Link to="/contact">Faire auditer mon GTM</Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-14 text-sm">
          {[
            { k: '10 ans +', v: "d'expérience tracking & e-commerce" },
            { k: 'Web & Server-Side', v: 'les deux conteneurs GTM maîtrisés' },
            { k: 'GA4, Ads, Meta', v: 'des conversions envoyées proprement' },
          ].map((item, i) => (
            <div key={i} className="bg-slate-900/70 border border-slate-800 rounded-xl px-4 py-5">
              <div className="text-cyan-400 font-bold text-lg">{item.k}</div>
              <div className="text-slate-400 mt-1">{item.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Symptômes */}
    <section className="py-20 px-4 bg-slate-900/50 border-y border-slate-800">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-6">
              <AlertTriangle className="w-4 h-4" /> Le constat
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Google Tag Manager est simple à installer, difficile à bien configurer
            </h2>
            <p className="text-lg text-slate-400 mb-4">
              N'importe qui peut créer un conteneur GTM et coller un extrait de code. C'est ensuite que
              les choses se compliquent : déclencheurs approximatifs, balises empilées par trois prestataires
              successifs, dataLayer inexistant, consentement mal branché.
            </p>
            <p className="text-lg text-slate-400">
              Résultat : des données que plus personne n'ose regarder, et des décisions publicitaires prises
              sur des chiffres faux. Le rôle d'un spécialiste GTM est exactement là — remettre la mesure au
              niveau des décisions qu'elle sert.
            </p>
          </div>

          <div className="lg:w-1/2">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" /> Vous vous reconnaissez ?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {symptoms.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>

    {/* Prestations */}
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border-cyan-500/20 mb-6 px-4 py-1.5 text-sm uppercase tracking-wider">
            Les prestations
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ce que couvre une mission de spécialiste GTM
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            De l'audit du conteneur existant à la formation de vos équipes, en passant par le dataLayer et le
            Server-Side : tout ce qui rend un tracking exploitable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <Card key={i} className="bg-slate-900 border-slate-800 hover:border-cyan-500/30 transition-all">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center shrink-0">
                    <s.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <CardTitle className="text-lg text-white">{s.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 leading-relaxed text-sm">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Méthode */}
    <section className="py-24 px-4 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Comment se déroule une mission</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Une méthode identique quel que soit le projet : comprendre, auditer, documenter, implémenter, recetter.
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-5 bg-slate-950 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-10 py-6 h-auto rounded-full shadow-lg shadow-cyan-500/20">
            <Link to="/contact">
              Parler de mon conteneur GTM <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Environnements */}
    <section className="py-24 px-4 bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Environnements et destinations</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            GTM sert de chef d'orchestre entre votre site et vos plateformes. Encore faut-il qu'il parle
            correctement aux deux.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Plateformes de site</h3>
            <ul className="space-y-3">
              {platforms.map((p, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Destinations de la donnée</h3>
            <ul className="space-y-3">
              {destinations.map((d, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Web vs Server-Side */}
    <section className="py-24 px-4 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">GTM Web ou GTM Server-Side ?</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Les deux conteneurs ne s'opposent pas, ils se complètent. Voici comment choisir par quoi commencer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-slate-950 border-slate-800">
            <CardHeader className="border-b border-slate-800">
              <CardTitle className="text-xl text-white">Conteneur Web</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-400 mb-4">
                La base indispensable : il capte les interactions sur votre site et les envoie aux plateformes.
              </p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" /> Mise en place rapide, coût d'infrastructure nul</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" /> Couvre la majorité des besoins de mesure</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" /> Sensible aux bloqueurs et aux limites des navigateurs</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-cyan-500/5 border-cyan-500/30">
            <CardHeader className="border-b border-cyan-500/20">
              <CardTitle className="text-xl text-white">Conteneur Server-Side</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-400 mb-4">
                L'étage supérieur : la donnée transite par votre serveur avant d'atteindre les plateformes.
              </p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" /> Conversions plus complètes et plus durables</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" /> Moins de scripts tiers, site plus rapide</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" /> Contrôle précis de ce qui est transmis (RGPD)</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-slate-400 mt-8">
          Server-Side déjà à l'ordre du jour ?{' '}
          <Link to="/tracking-data/gtm-server-side" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
            Découvrir la mise en place de GTM Server-Side
          </Link>
        </p>
      </div>
    </section>

    {/* Formats d'intervention */}
    <section className="py-24 px-4 bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Trois façons de travailler ensemble</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Selon que vous ayez besoin d'un diagnostic, d'une refonte complète ou d'un spécialiste GTM disponible
            dans la durée.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {formats.map((f, i) => (
            <div key={i} className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-colors">
              <f.icon className="w-6 h-6 text-cyan-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-24 px-4 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Vos questions sur Google Tag Manager</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Ce que fait un spécialiste GTM, comment se déroule une mission et ce que ça change pour vos données.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border border-slate-800 rounded-lg bg-slate-950/50 px-4">
              <AccordionTrigger className="text-white hover:text-cyan-400 text-left text-base font-medium py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 leading-relaxed pt-2 pb-4 text-sm">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>

    {/* CTA final */}
    <section className="py-20 px-4 text-center border-t border-slate-800">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Besoin d'un spécialiste Google Tag Manager ?
        </h2>
        <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-200 font-bold px-10 py-6 h-auto text-lg rounded-full">
          <Link to="/contact">
            Discuter de mon projet <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>

        <div className="mt-14 pt-8 border-t border-slate-800">
          <p className="text-slate-500 text-sm mb-4">Pour aller plus loin dans le silo Tracking &amp; Data</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link to="/tracking-data/gtm-server-side" className="text-slate-400 hover:text-cyan-400 transition-colors">GTM Server-Side</Link>
            <Link to="/tracking-data/ga4" className="text-slate-400 hover:text-cyan-400 transition-colors">GA4 Avancé</Link>
            <Link to="/tracking-data/consent-mode" className="text-slate-400 hover:text-cyan-400 transition-colors">Consent Mode V2</Link>
            <Link to="/tracking-data/tracking-ecommerce-shopify" className="text-slate-400 hover:text-cyan-400 transition-colors">Tracking Shopify</Link>
            <Link to="/tracking-data/pilotage-a-la-marge" className="text-slate-400 hover:text-cyan-400 transition-colors">Pilotage à la marge</Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default SpecialisteGtmPage;
