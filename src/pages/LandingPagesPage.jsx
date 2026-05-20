import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { m } from 'framer-motion';
import { 
  ArrowRight, 
  Zap, 
  MousePointerClick, 
  Layout, 
  Database, 
  CheckCircle2,
  Code2,
  Gauge,
  Target,
  Users,
  Timer,
  ShieldCheck,
  Server,
  Settings,
  BarChart,
  ChevronRight,
  RefreshCw,
  Edit,
  BarChart3,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useScrollTracking } from '@/hooks/ScrollTrackingHook';
import { getCanonicalUrl } from '@/lib/canonicalUrlHandler';

const LandingPagesPage = () => {
  const { trackCtaClick, trackFaqToggle, trackSectionView } = useScrollTracking();
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);

  const handleScrollToProcess = (e) => {
    e.preventDefault();
    trackCtaClick('hero_secondary', 'Voir comment ça fonctionne');
    const element = document.getElementById('processus');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const problems = [
    { icon: Layout, title: "Pages Généralistes", text: "Envoyer du trafic payant vers votre page d'accueil dilue le message et fait fuir 80% des visiteurs." },
    { icon: Timer, title: "Chargement Lent", text: "Au-delà de 3 secondes, vous perdez 40% de votre trafic avant même d'avoir affiché votre offer." },
    { icon: MousePointerClick, title: "CTA Confus", text: "Trop d'options, pas d'appel à l'action clair : l'utilisateur hésite et finit par quitter la page." },
    { icon: Settings, title: "Formulaires Complexes", text: "Chaque champ inutile réduit votre taux de conversion de 10 à 15%." },
    { icon: Database, title: "Tracking Défaillant", text: "Impossible d'optimiser vos campagnes si vous ne savez pas exactement quel mot-clé a converti." },
    { icon: Target, title: "Quality Score Faible", text: "Une page non pertinente augmente votre coût par clic (CPC) et réduit la diffusion de vos pubs." }
  ];

  const solutions = [
    { icon: Target, title: "Alignement Parfait", text: "Le message de la pub correspond exactement au titre de la page (Message Match)." },
    { icon: Zap, title: "Performance Technique", text: "Core Web Vitals optimisés (LCP, CLS, FID) pour un chargement instantané." },
    { icon: Layout, title: "Design de Conversion", text: "Hiérarchie visuelle étudiée pour guider l'œil vers l'action principale." },
    { icon: CheckCircle2, title: "Formulaires Optimisés", text: "UX soignée, auto-complétion, validation en temps réel pour maximiser les leads." },
    { icon: BarChart, title: "Tracking Sur-mesure", text: "DataLayer complet poussé vers GA4, Google Ads et Meta (CAPI)." },
    { icon: Settings, title: "Automatisations", text: "Connexion directe à votre CRM, email de confirmation instantané." }
  ];

  const processSteps = [
    { 
      title: "Audit & Stratégie", 
      desc: "Analyse de vos campagnes actuelles, définition de l'offre, des personas et de l'angle d'attaque.",
      icon: Target
    },
    { 
      title: "Conception & Rédaction", 
      desc: "Copywriting persuasif (AIDA/PAS), wireframing UX et maquettage UI haute fidélité.",
      icon: Layout
    },
    { 
      title: "Développement Technique", 
      desc: "Intégration React/Next.js. Code propre et rapide.",
      icon: Code2
    },
    { 
      title: "Tracking & Automatisation", 
      desc: "Configuration GTM Server-Side, événements personnalisés, connexion CRM (n8n/Make).",
      icon: Database
    },
    { 
      title: "Tests & Optimisation", 
      desc: (
        <ul className="list-disc pl-4 space-y-1 text-slate-400 mt-2">
          <li>Tests de performance et compatibilité</li>
          <li>Vérification complète du tracking</li>
          <li>Tests formulaires et automatisations</li>
          <li>Point de validation avec vous</li>
          <li>Ajustements et modifications finales</li>
          <li className="font-bold text-amber-400">Livraison sous 2 à 4 jours</li>
        </ul>
      ),
      icon: Gauge
    }
  ];

  const supportCards = [
    {
      icon: RefreshCw,
      title: "Point de Validation",
      desc: "Après la mise en ligne, nous faisons un point ensemble pour valider que tout fonctionne parfaitement selon vos attentes."
    },
    {
      icon: Edit,
      title: "Modifications Incluses",
      desc: "Je me charge personnellement de toutes les modifications nécessaires pour optimiser les performances de votre landing page."
    },
    {
      icon: BarChart3,
      title: "Monitoring Continu",
      desc: "Surveillance du tracking et des conversions pour assurer la fiabilité des données et l'optimisation continue de vos campagnes."
    }
  ];

  const faqs = [
    { q: "Combien de temps pour créer une landing page ?", a: "Entre 2 et 4 jours selon la complexité du projet et vos besoins en automatisation. Les projets urgents peuvent être traités en mode prioritaire pour une livraison encore plus rapide." },
    { q: "Puis-je modifier la page après livraison ?", a: "Oui, nous faisons un point ensemble après la mise en ligne et je me charge personnellement de toutes les modifications nécessaires pour garantir des performances optimales." },
    { q: "Quel est le coût d'une landing page ?", a: "Le tarif dépend de vos besoins spécifiques (nombre d'automatisations, intégrations CRM, tracking complexe, etc.). Contactez-moi pour un devis personnalisé gratuit." },
    { q: "Fournissez-vous l'hébergement ?", a: "Je peux gérer l'hébergement ou travailler avec votre infrastructure existante. Pour le tracking server-side, je recommande une solution optimisée que je configure et maintiens." },
    { q: "Que se passe-t-il si le tracking ne fonctionne pas après la mise en ligne ?", a: "Tous mes projets incluent une période de garantie avec support. Je vérifie systématiquement le bon fonctionnement avant livraison et reste disponible pour corrections immédiates." },
    { q: "Peut-on faire de l'A/B testing ?", a: "Absolument. Je peux créer plusieurs versions de votre landing page et configurer les tests A/B directement sur vos plateformes publicitaires (Google Ads, Meta Ads, TikTok Ads) pour identifier la version la plus performante." },
    { q: "Travaillez-vous avec toutes les plateformes publicitaires ?", a: "Je travaille principalement avec Google Ads, Meta Ads (Facebook/Instagram) et TikTok Ads. Je peux m'adapter à d'autres plateformes selon vos besoins spécifiques." },
    { q: "Incluez-vous la rédaction du contenu ?", a: "Je peux rédiger le contenu orienté conversion en collaboration avec vous, ou travailler avec vos contenus existants que j'optimise pour la performance et l'alignement avec vos campagnes publicitaires." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-amber-500/30">
      <Helmet>
        <title>Landing Pages Haute Conversion & A/B Testing | JUH Ecomm</title>
        <meta name="description" content="Créez des landing pages haute conversion avec notre expertise. Designs optimisés, copywriting persuasif et tests A/B pour maximiser vos taux de conversion." />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph tags */}
        <meta property="og:site_name" content="Juh Ecomm Data" />
        <meta property="og:title" content="Landing Pages Haute Conversion | JUH Ecomm Data" />
        <meta property="og:description" content="Créez des landing pages haute conversion. Designs optimisés et copywriting persuasif pour maximiser vos conversions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
        <meta property="og:locale" content="fr_FR" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@juh_ecomm" />
        <meta name="twitter:title" content="Landing Pages Haute Conversion | JUH Ecomm Data" />
        <meta name="twitter:description" content="Créez des landing pages haute conversion avec notre expertise. Designs optimisés et tests A/B." />
        <meta name="twitter:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
        <meta name="twitter:url" content={canonicalUrl} />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          <m.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-6 px-4 py-1.5 text-sm uppercase tracking-wider backdrop-blur-md">
              Conversion Rate Optimization (CRO)
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Landing Pages <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Haute Conversion</span><br />
              pour Vos Campagnes Publicitaires
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Des pages de destination entièrement personnalisées, livrées en 2 à 4 jours, avec tracking avancé et automatisations pour transformer vos visiteurs en clients qualifiés.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold px-8 py-6 text-lg rounded-full shadow-lg shadow-amber-900/20 transition-all hover:scale-105">
                <Link to="/contact" onClick={() => trackCtaClick('hero_primary', 'Demander un devis personnalisé')}>
                  Demander un devis personnalisé
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-6 text-lg rounded-full backdrop-blur-sm">
                <a href="#processus" onClick={handleScrollToProcess}>
                  Voir comment ça fonctionne
                </a>
              </Button>
            </div>
          </m.div>
        </div>
      </section>

      {/* SECTION 1: PROBLÉMATIQUE */}
      <section className="py-20 lg:py-28 px-4 bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Pourquoi vos pubs ne sont pas rentables ?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Le problème n'est souvent pas la campagne, mais la destination.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {problems.map((item, idx) => (
              <m.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-950 p-8 rounded-xl border border-slate-800 hover:border-red-500/30 group transition-all hover:shadow-2xl hover:shadow-red-900/5 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-red-900/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-900/30 transition-colors">
                  <item.icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-200 mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{item.text}</p>
              </m.div>
            ))}
          </div>

          <m.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-red-950/40 to-slate-900 border border-red-500/20 rounded-xl p-6 md:p-8 flex items-center gap-6 max-w-4xl mx-auto"
          >
            <div className="hidden md:flex bg-red-500/10 p-4 rounded-full">
              <Timer className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-red-100 mb-2">Le saviez-vous ?</p>
              <p className="text-red-200/80">
                Une page qui charge en <span className="text-white font-bold">5 secondes</span> a un taux de rebond <span className="text-white font-bold">90% plus élevé</span> qu'une page qui charge en <span className="text-white font-bold">2 secondes</span>. La vitesse est votre première fonctionnalité.
              </p>
            </div>
          </m.div>
        </div>
      </section>

      {/* SECTION 2: SOLUTION */}
      <section className="py-20 lg:py-28 px-4 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">La Recette "Haute Conversion"</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Je ne conçois pas de "jolis sites". Je construis des machines à vendre.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((item, idx) => (
              <m.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-xl border border-slate-800 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/5 transition-all"
                onMouseEnter={() => trackSectionView('solution_card_hover')}
              >
                <item.icon className="w-10 h-10 text-amber-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{item.text}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: BUSINESS BENEFITS */}
      <section className="py-20 lg:py-28 px-4 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">L'Impact sur Votre Business</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 text-center shadow-lg">
              <div className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2">
                +150%
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Quality Score</h3>
              <p className="text-slate-400 text-sm">Des pages pertinentes améliorent votre score Google Ads et réduisent vos CPC.</p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 text-center shadow-lg">
              <div className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2">
                -30%
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Coût par Lead (CPL)</h3>
              <p className="text-slate-400 text-sm">En convertissant mieux le même trafic, votre coût d'acquisition s'effondre.</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 text-center shadow-lg">
              <div className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-2">
                100%
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Data Driven</h3>
              <p className="text-slate-400 text-sm">Fini les suppositions. Vos décisions sont basées sur des données fiables.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PROCESSUS */}
      <section id="processus" className="py-20 lg:py-28 px-4 bg-slate-950">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-4 px-3 py-1 text-xs uppercase tracking-wider">
              Méthodologie
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">De la Stratégie à la Performance</h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
            {processSteps.map((step, idx) => (
              <m.div 
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 group-hover:bg-amber-500 group-hover:border-amber-500 transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_8px_rgba(15,23,42,1)] z-10">
                  <step.icon className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-amber-500/30 transition-all shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white text-lg">{step.title}</h3>
                    <span className="text-slate-600 font-mono text-sm font-bold">0{idx + 1}</span>
                  </div>
                  <div className="text-slate-400 text-sm leading-relaxed">{step.desc}</div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: SUPPORT POST-LIVRAISON */}
      <section className="py-20 lg:py-28 px-4 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Support et Suivi Post-Livraison</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {supportCards.map((card, idx) => (
              <m.div
                key={idx}
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-amber-500/40 transition-all duration-300"
              >
                <div className="bg-amber-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <card.icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{card.desc}</p>
              </m.div>
            ))}
          </div>

          <m.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto bg-amber-950/20 border border-amber-500/20 rounded-lg p-6 flex gap-4 items-start"
          >
            <Lightbulb className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
            <p className="text-amber-100 text-sm md:text-base leading-relaxed">
              <span className="font-bold">Maintenance continue ?</span> Pour des modifications régulières et une optimisation constante, je propose des formules de suivi mensuel adaptées à vos besoins.
            </p>
          </m.div>
        </div>
      </section>

      {/* SECTION 5: USE CASES */}
      <section className="py-20 lg:py-28 px-4 bg-slate-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Cas d'Usage Fréquents</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl hover:scale-105 transition-transform duration-300 shadow-lg">
              <div className="bg-pink-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <ShoppingBagIcon className="text-pink-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">E-commerce Monoproduit</h3>
              <p className="text-slate-400 text-sm">Pour pousser une offre spécifique, un bundle ou un produit phare sans les distractions du catalogue complet.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl hover:scale-105 transition-transform duration-300 shadow-lg">
              <div className="bg-cyan-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Users className="text-cyan-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Génération de Leads B2B</h3>
              <p className="text-slate-400 text-sm">Pour capturer des contacts qualifiés (Livre blanc, Webinar, Devis) avec qualification automatique.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl hover:scale-105 transition-transform duration-300 shadow-lg">
              <div className="bg-amber-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Zap className="text-amber-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Lancement d'Offre</h3>
              <p className="text-slate-400 text-sm">Pour tester rapidement une nouvelle idée ou une offre flash avec un budget marketing maîtrisé.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: DIFFÉRENCIATION (TABLE) */}
      <section className="py-20 lg:py-28 px-4 bg-slate-950">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Pourquoi ne pas le faire soi-même ?</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800">
                  <th className="p-6 text-slate-400 font-medium">Critères</th>
                  <th className="p-6 text-slate-300 font-bold text-center">Template DIY</th>
                  <th className="p-6 text-slate-300 font-bold text-center">Agence Web Classique</th>
                  <th className="p-6 text-amber-400 font-extrabold text-center bg-amber-500/5 border-b border-amber-500/20">Ma Solution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                {[
                  { label: "Personnalisation", diy: "Faible", agence: "Bonne", me: "Sur-mesure (Data-Driven)" },
                  { label: "Tracking Avancé (GTM)", diy: "Non", agence: "Basique", me: "Expert (Server-Side)" },
                  { label: "Automatisations CRM", diy: "Non", agence: "En option (€€)", me: "Inclus" },
                  { label: "Optimisation pour la Pub", diy: "Non", agence: "Rarement", me: "Cœur de métier" },
                  { label: "Délai", diy: "Rapide", agence: "❌ 3-6 semaines", me: "✅ 2-4 jours", isDelay: true },
                  { label: "Support", diy: "Forum", agence: "Tickets", me: "Direct (WhatsApp/Email)" },
                  { label: "Tarif", diy: "Abonnement", agence: "Élevé (> 3k€)", me: "Compétitif" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/50 transition-colors" onMouseEnter={() => trackSectionView('comparison_row_hover')}>
                    <td className="p-4 px-6 text-slate-200 font-medium border-r border-slate-800">{row.label}</td>
                    <td className="p-4 text-center text-slate-400 border-r border-slate-800">{row.diy}</td>
                    <td className="p-4 text-center text-slate-400 border-r border-slate-800">{row.agence}</td>
                    <td className={`p-4 text-center text-white font-bold bg-amber-500/5 border-l border-amber-500/20 shadow-[inset_0_0_20px_rgba(245,158,11,0.05)]`}>
                      {row.isDelay ? <span className="font-extrabold">{row.me.replace('✅ ', '')}</span> : row.me}
                      {row.isDelay && <span className="text-amber-500 ml-1">✅</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 7: TECHNOLOGIES */}
      <section className="py-20 lg:py-28 px-4 bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-white">Ma Stack Technique</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
              {[
                { title: "Tracking & Analytics", items: ["Google Tag Manager", "GA4", "Piano Analytics", "Cookiebot"], icon: BarChart },
                { title: "Automatisation", items: ["Make (Integromat)", "Zapier", "n8n", "Brevo / Klaviyo"], icon: Zap },
                { title: "CRM & Data", items: ["Hubspot", "Salesforce", "Google Sheets", "Airtable"], icon: Database },
                { title: "Hébergement & Perf.", items: ["Vercel / Netlify", "React / Next.js", "Unbounce / Webflow", "Shopify"], icon: Server }
              ].map((cat, idx) => (
                <div key={idx} className="bg-slate-950 p-6 rounded-xl border border-slate-800 hover:border-amber-500/20 transition-colors">
                  <div className="flex items-center gap-3 mb-4 text-slate-200 font-bold">
                    <cat.icon className="w-5 h-5 text-amber-500" />
                    <h3 className="text-base font-bold text-white m-0 p-0">{cat.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((tech, tIdx) => (
                      <Badge key={tIdx} variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: SERVICE COMBINATIONS */}
      <section className="py-20 lg:py-28 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto max-w-6xl">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Pour aller plus loin</h2>
           </div>
           <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Tracking Server-Side", link: "/gtm-server-side", desc: "Fiabilisez vos conversions à 100%." },
                { title: "Audit de Tracking", link: "/tracking-hub", desc: "Vérifiez la santé de vos données actuelles." },
                { title: "Automatisation Marketing", link: "/automatisation-hub", desc: "Connectez votre landing page à tout votre écosystème." }
              ].map((card, i) => (
                <Link to={card.link} key={i} className="group" onClick={() => trackCtaClick('cross_sell', card.title)}>
                  <div className="bg-slate-950/50 p-8 rounded-xl border border-slate-700 hover:border-amber-500/50 transition-all h-full flex flex-col justify-between hover:shadow-lg">
                    <div>
                      <h3 className="font-bold text-white text-lg mb-2 group-hover:text-amber-400 transition-colors flex items-center gap-2">
                        {card.title} <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-slate-400 text-sm">{card.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
           </div>
        </div>
      </section>

      {/* SECTION 9: FAQ */}
      <section className="py-20 lg:py-28 px-4 bg-slate-950">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-10 text-white">Questions Fréquentes</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-slate-800 rounded-lg bg-slate-900/50 px-4">
                <AccordionTrigger 
                  className="text-white hover:text-amber-400 text-left text-lg font-medium"
                  onClick={() => trackFaqToggle(faq.q, true)}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 leading-relaxed pt-2 pb-4 text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* SECTION 10: FINAL CTA */}
      <section className="py-24 px-4 bg-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnL3N2ZyI+PHcirGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Prêt à faire décoller vos conversions ?</h2>
          <p className="text-amber-100 text-xl mb-10 max-w-2xl mx-auto">
            Discutons de votre projet. C'est gratuit, sans engagement, et je vous donnerai déjà mes premières pistes d'optimisation.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button asChild size="lg" className="bg-white text-amber-600 hover:bg-slate-100 font-bold px-10 py-7 text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
              <Link to="/contact" onClick={() => trackCtaClick('footer_primary', 'Démarrer mon projet')}>
                Démarrer mon projet <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-7 text-lg rounded-full bg-transparent">
              <Link to="/contact" onClick={() => trackCtaClick('footer_secondary', 'Me contacter')}>
                Me contacter
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 text-amber-100/80 text-sm font-medium">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Devis sous 24h</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Satisfait ou remboursé</span>
          </div>
        </div>
      </section>
    </div>
  );
};

// Simple icon component needed for one section
const ShoppingBagIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
)

export default LandingPagesPage;