import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  SearchCheck, 
  Settings, 
  CheckCircle2, 
  ArrowRight,
  Lock,
  EyeOff,
  Cookie,
  Info,
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getCanonicalUrl } from '@/lib/canonicalUrlHandler';

const ConsentModePage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);

  const auditPoints = [
    "Configuration CMP : La bannière est-elle conforme RGPD ? Les textes sont-ils clairs ? Le design est-il correct ?",
    "Consent Mode V2 : Les signaux sont-ils correctement envoyés à Google ? Les paramètres ad_storage, analytics_storage... sont-ils gérés ?",
    "Mode Basic vs Advanced : Quel mode est implémenté ? Est-ce le bon choix pour votre situation ?",
    "Intégration GTM : Les tags se déclenchent-ils correctement en fonction du consentement ?",
    "Comportement par défaut : Que se passe-t-il avant le choix de l'utilisateur ? Après un refus ?",
    "Logs de consentement : Conservez-vous une preuve du consentement recueilli ?"
  ];

  const cmps = [
    { name: "Cookiebot", desc: "Solution robuste, scan auto" },
    { name: "CookieYes", desc: "Bon rapport qualité/prix" },
    { name: "Cookie First", desc: "Solution européenne" },
    { name: "Axeptio", desc: "Design soigné, Made in France" },
    { name: "Didomi", desc: "Solution enterprise" },
    { name: "Cookie Studio", desc: "Simple et efficace" }
  ];

  const installationIncludes = [
    "Configuration complète de la CMP",
    "Personnalisation du design (couleurs, textes, position)",
    "Intégration avec Google Tag Manager",
    "Configuration Consent Mode V2 (Basic ou Advanced)",
    "Paramétrage des déclencheurs GTM selon le consentement",
    "Test et validation sur tous les navigateurs",
    "Documentation d'utilisation"
  ];

  const faqs = [
    {
      question: "Qu'est-ce que le Consent Mode et pourquoi c'est important ?",
      answer: "Le Consent Mode est une fonctionnalité de Google qui permet à vos outils de tracking (Google Analytics, Google Ads, etc.) de fonctionner même sans consentement utilisateur. Au lieu de bloquer complètement le tracking, vous pouvez collecter des données en mode dégradé et les améliorer progressivement quand l'utilisateur accepte les cookies. C'est crucial pour la conformité RGPD tout en préservant vos données marketing."
    },
    {
      question: "Quel est l'impact du Consent Mode sur mes données Google Analytics et Google Ads ?",
      answer: "Sans Consent Mode, vous perdez 30-50% de vos données utilisateurs (ceux qui refusent les cookies). Avec Consent Mode, Google utilise des modèles statistiques pour estimer les données manquantes et vous offre une vue plus complète. Vos rapports restent fiables et vos campagnes Google Ads continuent à optimiser correctement, même avec moins de données brutes."
    },
    {
      question: "Comment implémenter le Consent Mode sur mon site ?",
      answer: "L'implémentation dépend de votre plateforme. Sur Shopify, c'est relativement simple avec des apps dédiées. Sur un site custom, vous devez configurer Google Tag Manager pour déclencher le Consent Mode avant de charger vos tags. Je recommande d'utiliser une solution comme OneTrust ou Didomi pour gérer les consentements, puis de les connecter à GTM. C'est une étape technique mais essentielle pour rester conforme."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-violet-500/30">
      <Helmet>
        <title>Consent Mode V2 & CMP - Conformité RGPD | Juh Ecomm Data</title>
        <meta name="description" content="Mise en conformité RGPD avec Google Consent Mode V2. Audit, installation de CMP (Cookiebot, Axeptio...) et configuration GTM pour respecter la vie privée." />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:url" content={canonicalUrl} />
        
        {/* Open Graph tags */}
        <meta property="og:site_name" content="Juh Ecomm Data" />
        <meta property="og:title" content="Consent Mode V2 & CMP | Juh Ecomm Data" />
        <meta property="og:description" content="Mise en conformité RGPD avec Consent Mode V2. Installation CMP, configuration GTM, données fiables et légales." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
        <meta property="og:locale" content="fr_FR" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@juh_ecomm" />
        <meta name="twitter:title" content="Consent Mode V2 & CMP | Juh Ecomm Data" />
        <meta name="twitter:description" content="Mise en conformité RGPD avec Consent Mode V2. Installation CMP, configuration GTM, données fiables et légales." />
        <meta name="twitter:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <Badge className="bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 border-violet-500/20 mb-6 px-4 py-1.5 text-sm uppercase tracking-wider">
            RGPD & Tracking
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight">
            Consent Mode V2, CMP <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
              et mise en conformité RGPD
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Depuis mars 2024, Google exige le Consent Mode V2 pour continuer à utiliser le remarketing et les mesures de conversion. Mais au-delà de l'obligation, une implémentation correcte vous permet de conserver un maximum de données tout en respectant le consentement de vos visiteurs. Je vous accompagne de l'audit à la mise en conformité complète.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-violet-500 hover:bg-violet-600 text-white font-bold px-8 h-14 text-lg rounded-full shadow-lg shadow-violet-500/20 transition-all hover:scale-105">
              <Link to="/contact">Mettre mon site en conformité</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Audit Section */}
      <section className="py-20 px-4 bg-slate-900/50 border-y border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-6">
                <SearchCheck className="w-4 h-4" /> Audit complet
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Audit de conformité Consent Mode et CMP
              </h2>
              <p className="text-lg text-slate-400 mb-8">
                Vous avez déjà une CMP en place mais vous n'êtes pas sûr qu'elle soit correctement configurée ? Je réalise un audit complet pour vérifier votre conformité.
              </p>
              
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-violet-400" /> Le Livrable
                </h3>
                <p className="text-slate-400 text-sm">
                  Un rapport d'audit avec le statut de conformité, les problèmes identifiés et les actions correctives à mener.
                </p>
              </div>
            </div>

            <div className="lg:w-1/2">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Ce que j'audite</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {auditPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-400">
                        <CheckCircle2 className="w-5 h-5 text-violet-500 mt-0.5 shrink-0" />
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

      {/* Mise en conformité Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Mise en conformité CMP et Consent Mode
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              Que vous partiez de zéro ou que vous ayez besoin de corriger une implémentation existante, je mets en place une solution complète et conforme.
            </p>
          </div>

          {/* Basic vs Advanced */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Consent Mode Basic vs Advanced</h3>
            <p className="text-slate-400 text-center max-w-2xl mx-auto mb-10">
              Google propose deux modes d'implémentation. Je configure celui qui correspond à votre situation :
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-slate-900 border-slate-800 hover:border-violet-500/30 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 border border-slate-700">
                    <Lock className="w-6 h-6 text-violet-400" />
                  </div>
                  <CardTitle className="text-xl text-white">Consent Mode Basic</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-slate-400 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0"></div>
                      <span>Les tags Google ne se chargent pas du tout tant que l'utilisateur n'a pas consenti</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-400 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0"></div>
                      <span>Aucune donnée collectée sans consentement explicite</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-400 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0"></div>
                      <span>Approche la plus stricte, recommandée si vous voulez une conformité maximale</span>
                    </li>
                    <li className="flex items-start gap-3 text-red-400 text-sm">
                      <EyeOff className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>Inconvénient : perte de données plus importante</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800 hover:border-violet-500/30 transition-colors border-t-4 border-t-violet-500">
                <CardHeader>
                  <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 border border-slate-700">
                    <Settings className="w-6 h-6 text-violet-400" />
                  </div>
                  <CardTitle className="text-xl text-white">Consent Mode Advanced</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-slate-400 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0"></div>
                      <span>Les tags Google se chargent avec des signaux "denied" par défaut</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-400 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0"></div>
                      <span>Google utilise la modélisation pour estimer les conversions non mesurées</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-400 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0"></div>
                      <span>Vous conservez plus de données tout en respectant le consentement</span>
                    </li>
                    <li className="flex items-start gap-3 text-green-400 text-sm">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>Approche recommandée pour la plupart des sites</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CMP Installation */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Installation et configuration de votre CMP</h3>
              <p className="text-slate-400 mb-8">
                Je maîtrise les principales plateformes de gestion du consentement du marché et peux installer celle qui correspond à vos besoins et votre budget :
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {cmps.map((cmp, index) => (
                  <div key={index} className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
                    <div className="font-semibold text-white mb-1 flex items-center gap-2">
                       <Cookie className="w-4 h-4 text-violet-400" /> {cmp.name}
                    </div>
                    <div className="text-xs text-slate-500">{cmp.desc}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 italic">
                Je vous conseille sur le choix de la CMP en fonction de votre trafic, votre budget et vos besoins spécifiques.
              </p>
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">L'installation inclut :</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {installationIncludes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-violet-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 border-violet-500/20 mb-4 px-3 py-1 text-xs uppercase tracking-wider">
              Questions Fréquentes
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Tout comprendre sur le Consent Mode
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Les réponses aux questions les plus courantes pour vous aider à y voir plus clair dans la conformité RGPD.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl border transition-all duration-300 ${
                  openFaq === index 
                    ? 'bg-slate-800/60 border-violet-500/50 shadow-lg shadow-violet-900/10' 
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className={`text-lg font-semibold transition-colors ${
                    openFaq === index ? 'text-violet-300' : 'text-slate-200'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full transition-all ${
                    openFaq === index ? 'bg-violet-500/20 rotate-180' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <ChevronDown className={`w-5 h-5 transition-colors ${
                      openFaq === index ? 'text-violet-300' : 'text-slate-400'
                    }`} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="h-px w-full bg-slate-700/30 mb-4" />
                        <p className="text-slate-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute inset-0 bg-violet-600/5 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Ne risquez pas votre conformité (ni vos données)
          </h2>
          <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-200 text-lg px-10 py-6 h-auto rounded-full shadow-lg shadow-white/5 transition-all hover:scale-105 font-bold">
            <Link to="/contact">
              Mettre mon site en conformité <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ConsentModePage;