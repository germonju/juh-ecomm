import React from 'react';
import { ServerFlowIllustration } from '@/components/HeroIllustrations';
import { Helmet } from 'react-helmet';
import SeoHead from '@/components/SeoHead';
import Breadcrumb from '@/components/Breadcrumb';
import { Server, Lock, Gauge, BarChart3, CheckCircle2, Shield, Zap, Globe, Database, LineChart, UserCheck, Activity, PieChart, ArrowRight, Laptop, Layers, Share2, Cog, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useDataLayer } from '@/contexts/DataLayerContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const GtmServerSidePage = () => {
  const { pushEvent } = useDataLayer();

  const handleCTAClick = (ctaName) => {
    pushEvent('cta_click', {
      cta_name: ctaName,
      cta_location: 'gtm-server-side-page',
      page_path: '/tracking-data/gtm-server-side'
    });
  };

  const advantages = [
    {
      icon: Shield,
      title: 'Contournement des Ad Blockers',
      description: 'Les bloqueurs de publicité empêchent souvent le déclenchement des tags côté navigateur. Avec le server-side, les requêtes partent de votre propre domaine, rendant le tracking plus robuste et fiable.'
    },
    {
      icon: Zap,
      title: 'Nourrir les algorithmes',
      description: 'Envoyez des signaux de meilleure qualité aux plateformes publicitaires (Google Ads, Facebook, TikTok). Des données plus complètes permettent aux algorithmes d\'optimiser plus efficacement vos campagnes.'
    },
    {
      icon: Globe,
      title: 'Contournement ITP (Safari/Firefox)',
      description: 'Les navigateurs comme Safari limitent la durée de vie des cookies tiers (ITP). Le server-side permet de définir des cookies "first-party" avec une durée de vie étendue, préservant l\'historique utilisateur.'
    },
    {
      icon: Activity,
      title: 'GA4 Server-Side',
      description: 'Améliorez la précision de vos données Google Analytics 4 en contournant les bloqueurs. Réduisez la perte de données et assurez une meilleure conformité RGPD grâce à l\'anonymisation des IP côté serveur.'
    },
    {
      icon: PieChart,
      title: 'Matomo Server-Side',
      description: 'Optez pour une analytique "Privacy-First". Avec Matomo Server-Side, vous gardez la propriété totale de vos données, sans consentement cookies complexe, et restez parfaitement conforme RGPD par défaut.'
    },
    {
      icon: Database,
      title: 'Enrichissement des données',
      description: 'Enrichissez vos données avant de les envoyer aux plateformes marketing en y ajoutant des informations sécurisées (marge, statut client, etc.) sans les exposer dans le navigateur de l\'utilisateur.'
    },
    {
      icon: LineChart,
      title: 'Monitoring et Contrôle',
      description: 'Gardez le contrôle total sur les données envoyées aux tiers. Filtrez les informations sensibles (PII) avant qu\'elles ne quittent votre serveur pour une meilleure conformité.'
    },
    {
      icon: Server,
      title: 'Implémentation API (CAPI)',
      description: 'Mettez en place les conversions via API (Facebook CAPI, TikTok Events API, Google Enhanced Conversions) pour pallier la perte de données liée aux cookies tiers et améliorer la précision du tracking.'
    },
    {
      icon: UserCheck,
      title: 'Conformité RGPD renforcée',
      description: 'Le tracking server-side offre un meilleur contrôle sur la confidentialité des données. Vous décidez exactement quelles données sont partagées avec qui, renforçant votre conformité RGPD.'
    }
  ];

  const faqItems = [
    {
      question: "Le tracking Server-Side est-il conforme au RGPD ?",
      answer: "Absolument. En réalité, le Server-Side améliore votre conformité RGPD. Contrairement au tracking client-side où les données partent directement du navigateur vers des tiers (Google, Facebook), le Server-Side agit comme un filtre. Vous décidez exactement quelles données sont transmises, vous pouvez anonymiser les adresses IP et supprimer les données personnelles (PII) avant qu'elles ne soient partagées."
    },
    {
      question: "Est-ce que cela remplace Google Tag Manager classique ?",
      answer: "Non, cela le complète. Vous continuerez d'utiliser votre conteneur Web GTM pour collecter les actions sur votre site (clics, vues). Ce conteneur enverra ensuite les données à votre conteneur Serveur GTM au lieu de les envoyer directement aux plateformes publicitaires. Les deux travaillent en tandem."
    },
    {
      question: "Quel est l'impact sur la vitesse de mon site ?",
      answer: "L'impact est très positif. En déplaçant les scripts tiers (Facebook Pixel, Google Ads, TikTok, etc.) du navigateur de l'utilisateur vers le serveur, vous réduisez considérablement la quantité de JavaScript à charger et à exécuter côté client. Cela améliore le temps de chargement, le score Core Web Vitals et l'expérience utilisateur mobile."
    },
    {
      question: "Le Server-Side fonctionne-t-il avec Shopify ?",
      answer: "Oui, parfaitement. Shopify est l'une des meilleures plateformes pour implémenter le Server-Side. Nous pouvons configurer des webhooks et utiliser les événements natifs de Shopify pour alimenter le conteneur serveur, garantissant une fiabilité des données proche de 100% pour les achats et les ajouts au panier."
    },
    {
      question: "Combien coûte l'hébergement du serveur GTM ?",
      answer: "Le coût dépend du volume de trafic. Pour la plupart des sites e-commerce moyens, via une solution gérée comme AddingWell (recommandée), le coût démarre autour de 90€/mois. Si vous hébergez directement sur Google Cloud Platform, les coûts peuvent être variables mais Google offre un niveau gratuit généreux pour les petits sites."
    },
    {
      question: "Ai-je besoin de développeurs pour la maintenance ?",
      answer: "Une fois l'infrastructure en place, la maintenance quotidienne est minime. Cependant, le Server-Side est techniquement plus complexe que le Client-Side. C'est pourquoi je propose une formation de vos équipes ou un forfait de maintenance pour gérer les mises à jour des API et s'assurer que le flux de données reste constant."
    },
    {
      question: "Puis-je voir la différence de données entre Client et Server ?",
      answer: "Oui. Pendant la phase de mise en place, nous configurons souvent un 'double tracking' temporaire ou utilisons les outils de test pour comparer les volumes. On constate généralement une récupération de 15 à 30% de conversions supplémentaires qui étaient auparavant perdues à cause des AdBlockers ou des restrictions de navigateur."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <SeoHead route="/tracking-data/gtm-server-side" />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="pt-16 lg:pt-20 bg-slate-900">
        
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 lg:py-32">
          <ServerFlowIllustration />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4YjNWZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJjMC0xLjEtLjktMi0yLTJ6bTAtNGgyYzEuMSAwIDIgLjkgMiAyaC0ydi0yem0tMiAydjJoMnYtMmgtMnptLTIgMGgtMnYyaDJ2LTJ6bTItMnYtMmgydjJoLTJ6bTAtNGgydi0yYzAtMS4xLS45LTItMi0ydjJoMnptLTIgMnYtMmgtMnYyaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <Breadcrumb route="/tracking-data/gtm-server-side" />
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Google Tag Manager Server-Side
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Le tracking traditionnel via le navigateur shows ses limites : AdBlockers, ITP Safari, fin des cookies tiers... 
                Passez à la vitesse supérieure avec le tracking server-side pour reprendre le contrôle de vos données, sécuriser votre conformité et booster vos performances publicitaires.
              </p>
              <div className="flex justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg shadow-violet-500/50 transition-all"
                >
                  <Link to="/contact" onClick={() => handleCTAClick('Hero CTA')}>
                    Passez au tracking server-side
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION A: Qu'est-ce que le GTM Server-Side ? */}
        <section className="py-20 lg:py-28 bg-slate-900 text-white border-b border-slate-800">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Text Column (55%) */}
              <div className="lg:w-[55%]">
                <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-white">
                  Qu'est-ce que le GTM Server-Side ?
                </h2>
                <div className="prose prose-lg prose-invert leading-relaxed space-y-6">
                  <p className="text-slate-300">
                    Le Google Tag Manager Server-Side (sGTM) est une nouvelle méthode de collecte de données qui ajoute un point de contrôle intermédiaire : <strong className="text-white">votre propre serveur</strong>.
                  </p>
                  <p className="text-slate-300">
                    Au lieu de laisser le navigateur de l'utilisateur communiquer directement avec des dizaines de plateformes tierces (Google, Facebook, TikTok...), le navigateur n'envoie qu'un seul flux de données à votre serveur. C'est ensuite votre serveur qui distribue les informations aux partenaires.
                  </p>
                  <p className="text-slate-300">
                    Cette architecture agit comme un <strong className="text-white">proxy intelligent</strong> qui vous redonne la souveraineté sur vos données, contourne les limitations des navigateurs modernes et sécurise les informations de vos utilisateurs avant qu'elles ne soient partagées.
                  </p>
                </div>
              </div>

              {/* Visual Diagram Column (45%) */}
              <div className="lg:w-[45%] w-full">
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8 shadow-sm">
                  {/* CLIENT SIDE FLOW */}
                  <div className="mb-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">Tracking Classique (Client-Side)</div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-slate-800 rounded-full border border-slate-600 flex items-center justify-center shadow-sm">
                          <Laptop className="w-6 h-6 text-slate-400" />
                        </div>
                        <span className="text-xs font-medium text-slate-500">Client</span>
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                         <div className="h-0.5 bg-red-900/50 w-full relative">
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-red-400 bg-slate-900 px-1 border border-red-900/30 rounded">Bloqué par AdBlock</span>
                         </div>
                         <div className="h-0.5 bg-slate-700 w-full"></div>
                         <div className="h-0.5 bg-slate-700 w-full"></div>
                      </div>
                      <div className="flex flex-col gap-2">
                         <div className="w-8 h-8 rounded bg-blue-900/30 flex items-center justify-center text-blue-400 text-[10px] font-bold border border-blue-900/50">FB</div>
                         <div className="w-8 h-8 rounded bg-green-900/30 flex items-center justify-center text-green-400 text-[10px] font-bold border border-green-900/50">G</div>
                         <div className="w-8 h-8 rounded bg-slate-950 flex items-center justify-center text-white text-[10px] font-bold border border-slate-700">TT</div>
                      </div>
                    </div>
                  </div>

                  {/* SERVER SIDE FLOW */}
                  <div className="relative">
                     <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-full bg-violet-500 rounded-l-lg opacity-20"></div>
                     <div className="text-sm font-bold text-violet-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        GTM Server-Side
                     </div>
                     <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-slate-900 rounded-full border-2 border-violet-500 flex items-center justify-center shadow-md z-10">
                          <Laptop className="w-6 h-6 text-violet-400" />
                        </div>
                        <span className="text-xs font-bold text-violet-400">Client</span>
                      </div>
                      
                      <div className="flex-1 flex items-center relative">
                        <div className="h-1 bg-violet-900/40 w-full"></div>
                        <ArrowRight className="w-5 h-5 text-violet-500 absolute left-1/2 -translate-x-1/2 bg-slate-900 px-1 box-content" />
                      </div>

                      <div className="flex flex-col items-center gap-2 relative z-10">
                         <div className="w-16 h-16 bg-slate-950 rounded-xl border-2 border-violet-500 flex flex-col items-center justify-center shadow-xl shadow-violet-900/20">
                            <Server className="w-7 h-7 text-white mb-1" />
                            <span className="text-[10px] text-violet-200 font-mono">Server</span>
                         </div>
                      </div>

                      <div className="flex-1 flex flex-col gap-2 relative">
                         <div className="h-0.5 bg-violet-900/40 w-full"></div>
                         <div className="h-0.5 bg-violet-900/40 w-full"></div>
                         <div className="h-0.5 bg-violet-900/40 w-full"></div>
                      </div>

                      <div className="flex flex-col gap-2">
                         <div className="w-8 h-8 rounded bg-blue-900/30 flex items-center justify-center text-blue-400 text-[10px] font-bold shadow-sm border border-blue-900/50">FB</div>
                         <div className="w-8 h-8 rounded bg-green-900/30 flex items-center justify-center text-green-400 text-[10px] font-bold shadow-sm border border-green-900/50">G</div>
                         <div className="w-8 h-8 rounded bg-slate-950 flex items-center justify-center text-white text-[10px] font-bold shadow-sm border border-slate-700">TT</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION B: Pourquoi le tracking classique ne suffit plus */}
        <section className="py-20 lg:py-28 bg-slate-950 text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-white max-w-3xl mx-auto">
              Pourquoi le tracking classique ne suffit plus
            </h2>
            
            <p className="text-lg text-slate-400 text-center max-w-2xl mx-auto mb-16 leading-relaxed">
              L'écosystème digital a changé. Entre les régulations (RGPD), les restrictions technologiques (ITP) et les bloqueurs de publicité, le tracking traditionnel "Client-Side" perd chaque jour en efficacité.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-violet-400 mb-2">30-40%</div>
                <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">De perte de données</div>
                <p className="text-sm text-slate-400 mt-2">Moyenne observée chez les e-commerçants sans tracking serveur.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-violet-400 mb-2">7 jours</div>
                <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">Cookies Safari</div>
                <p className="text-sm text-slate-400 mt-2">Durée de vie maximale des cookies traceurs sur Safari (ITP 2.3).</p>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-violet-400 mb-2">2025</div>
                <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">Fin des cookies tiers</div>
                <p className="text-sm text-slate-400 mt-2">Disparition programmée des cookies tiers sur Chrome.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-violet-400 mb-2">-25%</div>
                <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">CPA Moyen</div>
                <p className="text-sm text-slate-400 mt-2">Baisse du coût d'acquisition constatée après implémentation CAPI.</p>
              </div>
            </div>

            <p className="text-center text-slate-500 italic max-w-3xl mx-auto border-t border-slate-800 pt-8">
              "Ne pas passer au Server-Side aujourd'hui, c'est accepter de piloter ses campagnes marketing avec un tableau de bord à moitié éteint."
            </p>
          </div>
        </section>

        {/* SECTION C: Comment fonctionne le GTM Server-Side ? */}
        <section className="py-20 lg:py-28 bg-slate-900 text-white border-t border-slate-800">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
                Comment fonctionne le GTM Server-Side ?
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Le processus se décompose en 4 étapes clés, transformant une donnée brute et vulnérable en un signal qualifié et sécurisé.
              </p>
            </div>

            <div className="max-w-4xl mx-auto relative">
              {/* Vertical Line */}
              <div className="absolute left-[20px] lg:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 lg:-translate-x-1/2"></div>

              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8 group">
                  <div className="lg:w-1/2 lg:text-right order-2 lg:order-1 pl-12 lg:pl-0 lg:pr-12">
                    <h3 className="text-xl font-bold text-white mb-2">1. Collecte</h3>
                    <p className="text-slate-400">Le client (navigateur) envoie les données à votre sous-domaine personnalisé (ex: <code>metrics.monsite.com</code>). C'est un contexte "first-party", donc non bloqué par les navigateurs.</p>
                  </div>
                  <div className="absolute left-0 lg:left-1/2 w-10 h-10 rounded-full bg-slate-900 border-4 border-violet-500 flex items-center justify-center z-10 lg:-translate-x-1/2 font-bold text-violet-400 shadow-lg group-hover:scale-110 transition-transform">1</div>
                  <div className="lg:w-1/2 order-3 lg:order-3 pl-12 lg:pl-12 hidden lg:block">
                     <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 inline-block">
                        <Laptop className="w-8 h-8 text-slate-500" />
                     </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8 group">
                  <div className="lg:w-1/2 order-3 lg:order-1 pr-12 lg:pr-12 hidden lg:flex justify-end">
                     <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 inline-block">
                        <Server className="w-8 h-8 text-slate-500" />
                     </div>
                  </div>
                  <div className="absolute left-0 lg:left-1/2 w-10 h-10 rounded-full bg-slate-900 border-4 border-violet-500 flex items-center justify-center z-10 lg:-translate-x-1/2 font-bold text-violet-400 shadow-lg group-hover:scale-110 transition-transform">2</div>
                  <div className="lg:w-1/2 order-2 lg:order-3 pl-12 lg:pl-12">
                    <h3 className="text-xl font-bold text-white mb-2">2. Réception</h3>
                    <p className="text-slate-400">Votre conteneur Serveur GTM reçoit la requête. Il agit comme un sas de sécurité. À ce stade, aucune donnée n'a encore été envoyée à Google ou Facebook.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8 group">
                  <div className="lg:w-1/2 lg:text-right order-2 lg:order-1 pl-12 lg:pl-0 lg:pr-12">
                    <h3 className="text-xl font-bold text-white mb-2">3. Traitement</h3>
                    <p className="text-slate-400">C'est la magie du Server-Side. On nettoie les données (suppression PII), on les enrichit (ajout marge, statut client via API interne) et on les formate.</p>
                  </div>
                  <div className="absolute left-0 lg:left-1/2 w-10 h-10 rounded-full bg-slate-900 border-4 border-violet-500 flex items-center justify-center z-10 lg:-translate-x-1/2 font-bold text-violet-400 shadow-lg group-hover:scale-110 transition-transform">3</div>
                  <div className="lg:w-1/2 order-3 lg:order-3 pl-12 lg:pl-12 hidden lg:block">
                     <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 inline-block">
                        <Cog className="w-8 h-8 text-slate-500" />
                     </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8 group">
                   <div className="lg:w-1/2 order-3 lg:order-1 pr-12 lg:pr-12 hidden lg:flex justify-end">
                     <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 inline-block">
                        <Share2 className="w-8 h-8 text-slate-500" />
                     </div>
                  </div>
                  <div className="absolute left-0 lg:left-1/2 w-10 h-10 rounded-full bg-slate-900 border-4 border-violet-500 flex items-center justify-center z-10 lg:-translate-x-1/2 font-bold text-violet-400 shadow-lg group-hover:scale-110 transition-transform">4</div>
                  <div className="lg:w-1/2 order-2 lg:order-3 pl-12 lg:pl-12">
                    <h3 className="text-xl font-bold text-white mb-2">4. Distribution</h3>
                    <p className="text-slate-400">Le serveur envoie les données nettoyées et enrichies aux différentes API (Facebook CAPI, Google Ads, GA4) en server-to-server. Fiable, rapide et sécurisé.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Existing Advantages Section */}
        <section className="py-20 bg-slate-950 text-white border-t border-slate-800">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                Les avantages du Server-Side
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Pourquoi migrer votre tracking vers le serveur est devenu indispensable en 2025
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advantages.map((adv, index) => {
                const Icon = adv.icon;
                return (
                  <div key={index} className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-violet-500/50 transition-all duration-300 group">
                    <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-violet-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{adv.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {adv.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION D: Ma méthode de mise en place */}
        <section className="py-20 lg:py-28 bg-slate-900 text-white border-t border-slate-800">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
                Ma méthode de mise en place
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Un processus structuré pour une transition sans perte de données.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Phase 1 */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-8 relative overflow-hidden group hover:border-violet-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-8xl font-black text-white leading-none">1</span>
                </div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 rounded bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-wider">
                            Phase 01
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Audit & Plan</h3>
                    <div className="flex items-center text-slate-400 text-sm mb-6">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Durée : 2-3 jours</span>
                    </div>

                    <div className="h-px bg-gradient-to-r from-slate-800 to-transparent mb-6"></div>

                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-sm text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-violet-500 shrink-0" />
                            <span>Audit du plan de taggage actuel</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-violet-500 shrink-0" />
                            <span>Configuration serveur (AddingWell/GCP)</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-violet-500 shrink-0" />
                            <span>Configuration sous-domaine tracking</span>
                        </li>
                    </ul>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-8 relative overflow-hidden group hover:border-violet-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-8xl font-black text-white leading-none">2</span>
                </div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 rounded bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-wider">
                            Phase 02
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Déploiement</h3>
                    <div className="flex items-center text-slate-400 text-sm mb-6">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Durée : 3-5 jours</span>
                    </div>

                    <div className="h-px bg-gradient-to-r from-slate-800 to-transparent mb-6"></div>

                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-sm text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-violet-500 shrink-0" />
                            <span>Setup Client GTM & Serveur GTM</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-violet-500 shrink-0" />
                            <span>Implémentation GA4 Server-Side</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-violet-500 shrink-0" />
                            <span>Implémentation CAPI (FB, TikTok)</span>
                        </li>
                    </ul>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-8 relative overflow-hidden group hover:border-violet-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-8xl font-black text-white leading-none">3</span>
                </div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 rounded bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-wider">
                            Phase 03
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Validation</h3>
                    <div className="flex items-center text-slate-400 text-sm mb-6">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Durée : 1 semaine</span>
                    </div>

                    <div className="h-px bg-gradient-to-r from-slate-800 to-transparent mb-6"></div>

                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-sm text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-violet-500 shrink-0" />
                            <span>Recette et débuggage des flux</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-violet-500 shrink-0" />
                            <span>Comparaison données Client vs Server</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-violet-500 shrink-0" />
                            <span>Validation finale et documentation</span>
                        </li>
                    </ul>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
               <p className="text-slate-500 text-sm italic">
                  * Délai total moyen constaté : 2 à 3 semaines selon la complexité du projet.
               </p>
            </div>
          </div>
        </section>

        {/* SECTION E: Questions fréquentes sur le GTM Server-Side */}
        <section className="py-20 lg:py-28 bg-slate-950 text-white border-t border-slate-800">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-white">
              Questions fréquentes sur le GTM Server-Side
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-slate-800">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-200 hover:text-white hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400 text-base leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Existing AddingWell Partnership Section */}
        <section className="py-20 bg-slate-900 border-t border-slate-800">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white">
                    Partenaire
                    </h2>
                     <img
                        src="/images/logos/addingwell.webp"
                        alt="AddingWell Logo"
                        className="h-10 w-auto object-contain opacity-90 brightness-0 invert"
                    />
                </div>
                
                <div className="prose prose-invert text-slate-300">
                  <p className="mb-4">
                    Pour garantir une infrastructure robuste et performante sans les complexités de gestion de serveurs Google Cloud Platform (GCP), je travaille en partenariat avec <strong>AddingWell</strong>.
                  </p>
                  <p className="mb-4">
                    Cette solution spécialisée offre un hébergement GTM Server-Side optimisé, sécurisé et scalables automatiquement.
                  </p>
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-violet-400" />
                      <span>Déploiement instantané et maintenance simplifiée</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-violet-400" />
                      <span>Monitoring avancé et alertes en temps réel</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-violet-400" />
                      <span>Infrastructure européenne conforme RGPD</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl max-w-sm w-full text-center">
                  <Server className="w-16 h-16 text-violet-400 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-white mb-2">Infrastructure Gérée</h3>
                  <p className="text-sm text-slate-400 mb-6">Performance, Sécurité et Scalabilité</p>
                  <div className="text-xs text-slate-500 font-mono bg-slate-950 p-3 rounded border border-slate-800">
                    Status: Operational<br/>
                    Latency: &lt;20ms<br/>
                    Uptime: 99.99%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Existing Final CTA */}
        <section className="py-20 bg-gradient-to-br from-violet-900/20 to-purple-900/20 border-t border-slate-800">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Prêt à sécuriser vos données ?</h2>
            <Button
              asChild
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-8 py-6 text-lg rounded-full shadow-lg transition-all"
            >
              <Link to="/contact" onClick={() => handleCTAClick('CTA Final')}>
                Passez au tracking server-side
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default GtmServerSidePage;