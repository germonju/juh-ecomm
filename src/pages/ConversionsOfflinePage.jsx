import React, { useState } from 'react';
import { BridgeIllustration } from '@/components/HeroIllustrations';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { 
  Database, UploadCloud, CheckCircle2, ArrowRight, Info, Settings, Server, 
  Target, TrendingUp, BarChart3, Users, XCircle, ChevronDown, ChevronUp,
  MousePointerClick, Save, BadgeCheck, RefreshCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { getCanonicalUrl } from '@/lib/canonicalUrlHandler';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-800 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-left group"
      >
        <span className="text-lg font-medium text-slate-200 group-hover:text-lime-400 transition-colors">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-lime-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-500 group-hover:text-lime-400 transition-colors" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-slate-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ConversionsOfflinePage = () => {
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);

  const faqData = [
    {
      question: "Est-ce compatible avec mon CRM ?",
      answer: "Oui, la solution est compatible avec 99% des CRM du marché (HubSpot, Salesforce, Pipedrive, Zoho...) tant qu'ils permettent l'export de données ou disposent d'une API. Même un simple Google Sheets ou Airtable fonctionne parfaitement."
    },
    {
      question: "Faut-il modifier mon site web ?",
      answer: "Les modifications sont minimes. Il suffit généralement d'ajouter un petit script de tracking et un champ caché dans vos formulaires pour capturer le paramètre GCLID de Google."
    },
    {
      question: "Combien de temps avant de voir les résultats ?",
      answer: "La mise en place technique est rapide (quelques jours). Ensuite, l'algorithme de Google Ads a besoin de 2 à 4 semaines d'apprentissage avec les nouvelles données de conversion pour optimiser pleinement vos campagnes."
    },
    {
      question: "Est-ce rétroactif ?",
      answer: "Google Ads permet d'importer des conversions jusqu'à 90 jours en arrière. Si vous avez déjà stocké les GCLID dans votre base de données, nous pourrons récupérer cet historique pour accélérer l'apprentissage de l'algorithme."
    },
    {
      question: "Quel budget Google Ads minimum est requis ?",
      answer: "Il n'y a pas de minimum budgétaire strict, mais pour que l'optimisation soit efficace, il est recommandé d'avoir un volume suffisant de conversions (idéalement au moins 15 à 30 conversions qualifiées par mois)."
    },
    {
      question: "Est-ce conforme au RGPD ?",
      answer: "Absolument. Nous traitons des données 'First Party' que vos utilisateurs vous ont confiées. Les identifiants sont envoyés de manière sécurisée et hachée à Google, strictement dans le but de mesurer la performance publicitaire, en conformité avec les directives de Google et du RGPD."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-lime-500/30">
      <Helmet>
        <title>Conversions Offline Google Ads & GA4 | JUH Ecomm Data</title>
        <meta name="description" content="Tracez vos conversions offline avec Google Ads et GA4. Connectez vos ventes en magasin à vos campagnes digitales pour une vision 360° de votre ROI." />
        <link rel="canonical" href={canonicalUrl} />
        
        <meta property="og:title" content="Conversions Offline | JUH Ecomm Data" />
        <meta property="og:description" content="Tracez vos conversions offline avec Google Ads et GA4. Connectez vos ventes en magasin à vos campagnes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@juh_ecomm" />
        <meta name="twitter:title" content="Conversions Offline | JUH Ecomm Data" />
        <meta name="twitter:description" content="Tracez vos conversions offline avec Google Ads et GA4. Vision 360° de votre ROI." />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-slate-950">
        <BridgeIllustration />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-lime-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <Badge className="bg-lime-500/10 text-lime-400 hover:bg-lime-500/20 border-lime-500/20 mb-6 px-4 py-1.5 text-sm uppercase tracking-wider">
            Google Ads & CRM
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight">
            Conversions Offline
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-green-500">
              Google Ads
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Optimisez vos campagnes sur la valeur réelle de vos ventes, pas juste sur les leads. Connectez votre CRM à Google Ads.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-lime-500 hover:bg-lime-600 text-slate-950 font-bold px-8 h-14 text-lg rounded-full shadow-lg shadow-lime-500/20 transition-all hover:scale-105">
              <Link to="/contact">Configurer mes conversions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Explainer Section */}
      <section className="py-20 px-4 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Pourquoi importer vos conversions offline ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
               <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                 <Database className="w-6 h-6 text-lime-400" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">La vraie valeur</h3>
               <p className="text-slate-400">Un lead ne vaut rien tant qu'il n'a pas signé. Dites à Google qui sont vos vrais clients pour qu'il en trouve d'autres similaires.</p>
             </div>
             <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
               <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                 <Settings className="w-6 h-6 text-lime-400" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Smart Bidding</h3>
               <p className="text-slate-400">Nourrissez l'algorithme avec des données de qualité (ROAS réel) pour débloquer tout le potentiel des enchères intelligentes.</p>
             </div>
             <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
               <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                 <UploadCloud className="w-6 h-6 text-lime-400" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Automatisé</h3>
               <p className="text-slate-400">Fini les imports manuels CSV. Je connecte votre CRM directement à l'API Google Ads pour une synchronisation quotidienne.</p>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 1 - Le problème */}
      <section className="py-24 px-4 bg-slate-950 border-b border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center md:text-left">
            Le problème : Google Ads ne voit que la moitié du tableau
          </h2>
          
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3 space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                Aujourd'hui, vos campagnes sont probablement optimisées sur le "Lead" (formulaire envoyé).
                Aux yeux de Google, <strong>tous les leads se valent</strong>.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Pourtant, la réalité de votre business est différente :
                <br />
                • Certains leads sont des curieux sans budget (0€).
                <br />
                • D'autres sont des clients idéaux à haute valeur (5 000€+).
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Sans l'import des conversions offline, vous demandez à Google de vous trouver "plus de gens qui remplissent le formulaire",
                peu importe s'ils achètent ou non. Résultat : vous payez pour du volume, pas pour de la rentabilité.
              </p>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {/* Visual Comparison Cards */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-500/10 text-red-400 text-xs font-bold px-2 py-1 rounded-bl">AVANT</div>
                <h3 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" /> Vue Google Classique
                </h3>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800 opacity-60">
                      <span className="text-sm text-slate-400">Lead #{i}</span>
                      <span className="text-sm font-mono text-slate-500">Valeur: 1 conv.</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-center text-sm text-red-400 font-medium">Google optimise au hasard</div>
              </div>

              <div className="bg-slate-900 rounded-xl border border-lime-500/30 p-5 shadow-lg shadow-lime-900/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-lime-500 text-slate-950 text-xs font-bold px-2 py-1 rounded-bl">APRÈS</div>
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400" /> Avec Conversions Offline
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800">
                    <span className="text-sm text-slate-400">Lead #1 (Curieux)</span>
                    <span className="text-sm font-mono text-slate-500">0 €</span>
                  </div>
                  <div className="flex justify-between items-center bg-lime-950/30 p-2 rounded border border-lime-500/30">
                    <span className="text-sm text-white font-medium">Lead #2 (Client)</span>
                    <span className="text-sm font-mono text-lime-400 font-bold">5 000 €</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800">
                    <span className="text-sm text-slate-400">Lead #3 (Hors cible)</span>
                    <span className="text-sm font-mono text-slate-500">0 €</span>
                  </div>
                </div>
                <div className="mt-3 text-center text-sm text-lime-400 font-medium">Google optimise pour le Chiffre d'Affaires</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - Comment ça marche */}
      <section className="py-24 px-4 bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Comment fonctionne l'import des conversions offline ?
          </h2>
          <p className="text-center text-slate-400 max-w-2xl mx-auto mb-16">
            Un processus en 4 étapes entièrement automatisé pour faire le pont entre vos clics publicitaires et votre chiffre d'affaires réel.
          </p>

          <div className="relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-800 -z-10"></div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: MousePointerClick,
                  step: "1",
                  title: "Capture du GCLID",
                  desc: "Lorsqu'un prospect clique sur votre annonce, nous capturons son identifiant unique Google (GCLID)."
                },
                {
                  icon: Database,
                  step: "2",
                  title: "Stockage CRM",
                  desc: "Ce GCLID est enregistré automatiquement dans votre CRM via un champ caché dans vos formulaires."
                },
                {
                  icon: BadgeCheck,
                  step: "3",
                  title: "Marquage Vente",
                  desc: "Vos commerciaux traitent les leads. Quand une vente est signée, le statut change dans le CRM."
                },
                {
                  icon: RefreshCcw,
                  step: "4",
                  title: "Import Automatique",
                  desc: "Chaque nuit, notre connecteur remonte les ventes validées et leur montant vers Google Ads."
                }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full bg-slate-900 border-4 border-slate-800 group-hover:border-lime-500 transition-colors flex items-center justify-center mb-6 relative z-10">
                    <item.icon className="w-10 h-10 text-slate-400 group-hover:text-lime-400 transition-colors" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center border border-slate-700 group-hover:bg-lime-500 group-hover:text-slate-900 transition-colors">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - Ce que ça change */}
      <section className="py-24 px-4 bg-slate-950 border-b border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-20 text-center">
            Ce que ça change concrètement pour vos campagnes
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 border border-slate-800 shadow-lg shadow-cyan-900/10">
                <Target className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Ciblage affiné par l'IA</h3>
              <p className="text-slate-400 leading-relaxed">
                Google comprend enfin qui sont vos vrais clients. Son IA va chercher des profils similaires à ceux qui achètent, pas juste ceux qui cliquent.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 border border-slate-800 shadow-lg shadow-lime-900/10">
                <TrendingUp className="w-8 h-8 text-lime-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Enchères sur la valeur</h3>
              <p className="text-slate-400 leading-relaxed">
                Passez du tCPA (Coût par Lead) au tROAS (Retour sur Investissement). Vous pouvez dire à Google : "Pour 1€ investi, je veux 5€ de marge signée".
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 border border-slate-800 shadow-lg shadow-violet-900/10">
                <BarChart3 className="w-8 h-8 text-violet-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Un reporting enfin fiable</h3>
              <p className="text-slate-400 leading-relaxed">
                Fini les écarts entre Google Ads et votre compta. Vos tableaux de bord marketing reflètent désormais la réalité de votre compte en banque.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - Pour qui ? */}
      <section className="py-24 px-4 bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">
            Pour qui est faite cette solution ?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <div className="bg-slate-950/50 rounded-2xl p-8 border border-slate-800">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-lime-500/20 flex items-center justify-center text-lime-400">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
                C'est fait pour vous si...
              </h3>
              <ul className="space-y-4">
                {[
                  "Vous générez des leads via Google Ads",
                  "Il s'écoule du temps entre le lead et la vente",
                  "Vos prospects n'ont pas tous la même valeur",
                  "Vous utilisez un CRM (ou êtes prêt à en utiliser un)",
                  "Vous voulez scaler vos campagnes de manière rentable"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-lime-500 shrink-0 mt-0.5" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950/50 rounded-2xl p-8 border border-slate-800">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                  <XCircle className="w-5 h-5" />
                </span>
                Ce n'est pas adapté si...
              </h3>
              <ul className="space-y-4">
                {[
                  "Vous faites 100% de vos ventes en ligne (E-commerce direct)",
                  "Vous n'avez aucun processus commercial de suivi",
                  "Vous avez moins de 10 leads par mois (volume trop faible)"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - FAQ */}
      <section className="py-24 px-4 bg-slate-950 border-b border-slate-800">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Questions fréquentes sur les conversions offline
          </h2>
          
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2 md:p-6">
            {faqData.map((item, index) => (
              <FaqItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Tarification claire selon votre situation
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Le tarif dépend de votre équipement actuel. Vous avez déjà un CRM ? Parfait, on s'y connecte. Vous n'en avez pas ? Je vous crée une solution sur-mesure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-slate-950 border-slate-800 hover:border-lime-500/30 transition-all duration-300 flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white mb-1">Vous avez déjà un CRM</CardTitle>
                <p className="text-slate-400 text-sm">Connexion à votre CRM existant</p>
                
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-slate-300">Set-up (unique)</span>
                    <span className="text-2xl font-bold text-white">780&nbsp;€ <span className="text-sm font-normal text-slate-500">TTC</span></span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-slate-300">Abonnement</span>
                    <span className="text-2xl font-bold text-lime-400">59&nbsp;€ <span className="text-sm font-normal text-lime-500/70">TTC / mois</span></span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Settings className="w-4 h-4 text-lime-400" /> Inclus dans le set-up
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Capture automatique du GCLID sur vos formulaires",
                        "Connexion à votre CRM (HubSpot, Pipedrive, Salesforce...)",
                        "Paramétrage de l'import automatique vers Google Ads",
                        "Configuration des fenêtres d'attribution",
                        "Test et validation",
                        "Documentation"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Server className="w-4 h-4 text-lime-400" /> Inclus dans l'abonnement
                    </h3>
                    <ul className="space-y-2">
                      {["Import automatique des conversions", "Maintenance et monitoring", "Support en cas de problème"].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-lime-500/50 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold border border-slate-700">
                  <Link to="/contact">Choisir cette offre</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-slate-950 border-lime-500 shadow-xl shadow-lime-900/10 relative flex flex-col transform md:scale-105 z-10">
              <div className="absolute top-0 right-0 bg-lime-500 text-slate-900 font-bold px-4 py-1 rounded-bl-xl rounded-tr-xl text-xs">
                SOLUTION COMPLÈTE
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white mb-1">Vous n'avez pas de CRM</CardTitle>
                <p className="text-slate-400 text-sm">CRM sur-mesure inclus</p>
                
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-slate-300">Set-up (unique)</span>
                    <span className="text-2xl font-bold text-white">890&nbsp;€ <span className="text-sm font-normal text-slate-500">TTC</span></span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-slate-300">Abonnement</span>
                    <span className="text-2xl font-bold text-lime-400">89&nbsp;€ <span className="text-sm font-normal text-lime-500/70">TTC / mois</span></span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Settings className="w-4 h-4 text-lime-400" /> Inclus dans le set-up
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Tout le set-up de la formule 'CRM existant'",
                        "Création d'un CRM simplifié sur-mesure (Google Sheets, Notion ou Airtable)",
                        "Interface de suivi de vos leads",
                        "Workflow de qualification des leads",
                        "Formation à l'utilisation"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Server className="w-4 h-4 text-lime-400" /> Inclus dans l'abonnement
                    </h3>
                    <ul className="space-y-2">
                      {["Import automatique des conversions", "Maintenance CRM et monitoring", "Support en cas de problème"].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-lime-500/50 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-lime-500 hover:bg-lime-600 text-slate-900 font-bold">
                  <Link to="/contact">Choisir cette offre</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex items-start gap-4 max-w-2xl mx-auto">
            <Info className="w-6 h-6 text-lime-400 flex-shrink-0 mt-1" />
            <p className="text-slate-300 text-center w-full">
              Tous les abonnements sont sans engagement. L'arrêt prend effet à la fin du mois suivant votre demande.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-slate-950 border-t border-slate-800 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Prêt à tracker vos vraies ventes ?</h2>
          <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-200 font-bold px-10 py-6 h-auto text-lg rounded-full">
            <Link to="/contact">
              Contactez-moi <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ConversionsOfflinePage;