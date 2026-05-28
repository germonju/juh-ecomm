import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, Target, MessageSquare, TrendingUp, Activity, ShoppingBag, 
  PieChart, BarChart3, Users, ArrowRight, 
  CheckCircle, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getCanonicalUrl } from '@/lib/canonicalUrlHandler';

const AuditGoogleAdsPage = () => {
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);

  const analysisPoints = [{
    icon: Search,
    title: "Structure du compte",
    description: "Campagnes, groupes d'annonces, cohérence globale, organisation, nomenclature."
  }, {
    icon: Target,
    title: "Ciblage",
    description: "Mots-clés, audiences, emplacements, appareils, zones géographiques, exclusions."
  }, {
    icon: MessageSquare,
    title: "Annonces",
    description: "Qualité des textes, utilisation des extensions, tests A/B, pertinence des landing pages."
  }, {
    icon: TrendingUp,
    title: "Stratégies d'enchères",
    description: "Adéquation avec vos objectifs, paramétrage, historique de performance."
  }, {
    icon: Activity,
    title: "Tracking et conversions",
    description: "Les conversions remontent-elles correctement ? Les valeurs sont-elles justes ? Le suivi enhanced est-il en place ? Recommandations pour fiabiliser vos données."
  }, {
    icon: ShoppingBag,
    title: "Flux produits",
    description: "Qualité des titres, descriptions, images, attributs manquants, optimisations possibles (pour Shopping/PMax)."
  }, {
    icon: PieChart,
    title: "Budget et répartition",
    description: "Parts d'impression perdues, répartition entre campagnes, opportunités de réallocation."
  }, {
    icon: BarChart3,
    title: "Performances globales",
    description: "ROAS, CPA, taux de conversion par segment, tendances, comparaison avec les benchmarks sectoriels."
  }];

  const methodologySteps = [
    {
      title: "Step 2 — Analyse du Flux Produit",
      description: "Un bon flux = des campagnes qui performent.",
      details: [
        "Structure et complétude du Google Merchant Center",
        "Qualité des titres, descriptions et catégorisation produits",
        "Attributs manquants ou mal renseignés (GTIN, MPN, prix promo…)",
        "Taux de produits approuvés / refusés / en avertissement",
        "Cohérence entre le flux et les pages produits"
      ]
    },
    {
      title: "Step 3 — Audit du Tracking & Conversions",
      description: "Si les conversions sont mal mesurées, tout le reste est faux.",
      details: [
        "Vérification des balises de conversion Google Ads",
        "Analyse des doublons ou sous-comptages",
        "Contrôle de la valeur de conversion remontée",
        "Évaluation du modèle d'attribution utilisé",
        "Présence et qualité des conversions améliorées (Enhanced Conversions)",
        "Cohérence avec les données GA4"
      ]
    },
    {
      title: "Step 4 — Analyse des Dépenses",
      description: "Où va réellement votre budget ?",
      details: [
        "Répartition des dépenses par campagne, type, réseau",
        "Détection des gaspillages (heures, devices, zones géo non rentables)",
        "Analyse du Search Impression Share et des pertes",
        "Étude du ROAS réel vs ROAS cible par segment",
        "Évolution des coûts sur les 90 derniers jours"
      ]
    },
    {
      title: "Step 5 — Qualité des Mots-Clés",
      description: "Le bon message, à la bonne personne, au bon moment.",
      details: [
        "Analyse des termes de recherche déclencheurs",
        "Détection des mots-clés hors sujet ou cannibalisants",
        "Couverture des correspondances (exact, expression, large)",
        "Mots-clés négatifs manquants",
        "Score de qualité et facteurs limitants"
      ]
    },
    {
      title: "Step 6 — Qualité des Annonces",
      description: "Des annonces qui convertissent, pas juste qui cliquent.",
      details: [
        "Analyse des scores d'optimisation et forces d'annonces",
        "Présence et utilisation de tous les assets disponibles",
        "Pertinence titres / descriptions / landing pages",
        "Taux de clics par annonce et variantes testées",
        "Cohérence message annonce ↔ page de destination"
      ]
    },
    {
      title: "Step 7 — Audit Performance Max",
      description: "PMax bien configuré = levier de croissance. Mal configuré = boîte noire.",
      details: [
        "Structure des groupes d'assets (visuels, titres, descriptions)",
        "Qualité et variété des créatifs",
        "Signaux d'audiences fournis (pertinence et richesse)",
        "Listes clients uploadées (taille, fraîcheur, segmentation)",
        "Analyse des insights disponibles (catégories, audiences, produits)",
        "Budget alloué vs retour observé"
      ]
    },
    {
      title: "Step 8 — Signaux d'Audiences & Listes Clients",
      description: "Votre data CRM est votre avantage compétitif.",
      details: [
        "Qualité des audiences de remarketing configurées",
        "Présence des segments stratégiques (acheteurs, abandons panier, top clients)",
        "Taux de correspondance des listes clients",
        "Utilisation en observation vs ciblage",
        "Opportunités de segmentation RFM non exploitées"
      ]
    }
  ];

  const faqs = [
    {
      q: "Qu'est-ce qu'un audit Google Ads et pourquoi est-ce nécessaire ?",
      a: "Un audit Google Ads est une analyse profonde de la structure, des paramètres et des performances de votre compte. Même un compte qui semble rentable peut cacher un gaspillage budgétaire important (mots-clés non pertinents, mauvais ciblage). L'audit permet d'identifier les leviers immédiats pour maximiser votre ROI (E-commerce) ou réduire votre coût par prospect (Lead Gen)."
    },
    {
      q: "Comment un audit peut-il améliorer la rentabilité de mon site E-commerce ?",
      a: "Pour l'E-commerce, nous nous concentrons sur le ROAS (Retour sur Dépenses Publicitaires). L'audit examine la santé de votre flux Google Merchant Center, l'efficiency de vos campagnes Performance Max et Shopping, ainsi que la segmentation de vos produits. L'objectif est de s'assurer que votre budget est alloué aux produits les plus rentables tout en éliminant les 'clics perdus'."
    },
    {
      q: "Est-ce que cet audit m'aidera à obtenir des leads de meilleure qualité ?",
      a: "Absolument. En Lead Gen, le volume ne fait pas tout. Nous analysons vos termes de recherche pour exclure le trafic de 'curiosité' et nous vérifions votre configuration de suivi des conversions (GA4, formulaires, appels). Nous nous assurons que Google optimise vos campagnes pour des prospects qualifiés (MQL/SQL) et des conversions à forte valeur ajoutée."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Audit Google Ads Expert : ROI & Performance | JUH Ecomm</title>
        <meta name="description" content="Audit complet de votre compte Google Ads (Search, Shopping, PMax). Identifiez les gaspillages budgétaires et boostez votre rentabilité e-commerce ou leadgen." />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph tags */}
        <meta property="og:site_name" content="Juh Ecomm Data" />
        <meta property="og:title" content="Audit Google Ads Expert | Optimisation ROI & Performance | Juh Ecomm Data" />
        <meta property="og:description" content="Audit complet de votre compte Google Ads (Search, Shopping, PMax). Identifiez les gaspillages budgétaires et boostez votre rentabilité e-commerce ou leadgen." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
        <meta property="og:locale" content="fr_FR" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@juh_ecomm" />
        <meta name="twitter:title" content="Audit Google Ads Expert | Optimisation ROI & Performance | Juh Ecomm Data" />
        <meta name="twitter:description" content="Audit complet de votre compte Google Ads (Search, Shopping, PMax). Identifiez les gaspillages budgétaires et boostez votre rentabilité e-commerce ou leadgen." />
        <meta name="twitter:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
        <meta name="twitter:url" content={canonicalUrl} />
      </Helmet>

      {/* Main container with standard page background */}
      <div className="min-h-screen bg-slate-900 pt-24 pb-20 relative overflow-hidden">
        {/* Background decorative elements to restore depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-violet-600/10 to-transparent pointer-events-none" />
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-[20%] right-[5%] w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

        <section className="container mx-auto px-4 lg:px-8 relative z-10">
          
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20 px-4 py-1 text-sm rounded-full">
              Expertise Google Ads & Analytics
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Optimisez vos campagnes avec un <span className="text-violet-400">Audit Google Ads</span> complet
            </h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              Arrêtez de gaspiller votre budget publicitaire. Obtenez une analyse approfondie de votre compte et un plan d'action concret pour booster vos performances.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg shadow-violet-900/20">
                <Link to="/contact">
                  Réserver mon audit <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Overview Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {analysisPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <Card key={index} className="bg-slate-800/50 border-slate-700/50 hover:border-violet-500/50 transition-all duration-300 group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-violet-400" />
                    </div>
                    <CardTitle className="text-lg text-white group-hover:text-violet-400 transition-colors">
                      {point.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Methodology Section */}
          <div className="mb-24 relative">
            <div className="absolute inset-0 bg-slate-800/20 rounded-3xl -z-10 border border-slate-700/30" />
            <div className="p-6 lg:p-12">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">🔍 Ma Méthodologie d'Audit Google Ads</h2>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Chaque audit commence par une chose essentielle : comprendre vos objectifs business avant d'analyser la moindre donnée.
                </p>
              </div>

              {/* Step 1 - The Foundation (Full Width) */}
              <Card className="bg-slate-900/80 border-violet-500/30 shadow-xl shadow-violet-900/10 mb-8 overflow-hidden">
                <CardHeader className="bg-violet-900/20 border-b border-violet-500/20 pb-6">
                  <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="bg-violet-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg">1</span>
                    Step 1 — Cadrage & Objectifs
                  </CardTitle>
                  <p className="text-slate-300 mt-3 text-lg">
                    Avant toute analyse technique, on aligne la stratégie. Chaque compte Google Ads est unique parce que chaque business a ses propres priorités. Cette première étape permet de calibrer l'audit sur ce qui compte vraiment pour vous.
                  </p>
                </CardHeader>
                <CardContent className="p-6 lg:p-8 space-y-10">
                  
                  {/* Strategic Objectives */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      🎯 Vos objectifs stratégiques
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {["Chiffre d'affaires", "ROAS cible", "Marge", "LTV", "Acquisition client", "Volume de leads"].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-300 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700/50">
                          <CheckCircle className="w-4 h-4 text-violet-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quantitative Objectives Table */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      📊 Vos objectifs chiffrés
                    </h3>
                    <div className="overflow-x-auto rounded-xl border border-slate-700/50">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-800/80">
                            <th className="p-4 text-slate-200 font-semibold border-b border-slate-700/50 w-1/3">Objectif</th>
                            <th className="p-4 text-slate-200 font-semibold border-b border-slate-700/50">Exemple de question posée</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50 bg-slate-900/50">
                          <tr className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-4 text-white font-medium flex items-center gap-2">💰 Chiffre d'affaires</td>
                            <td className="p-4 text-slate-300">Quel CA mensuel Google Ads doit générer ? Quelle part du CA total ?</td>
                          </tr>
                          <tr className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-4 text-white font-medium flex items-center gap-2">📦 Volume de ventes</td>
                            <td className="p-4 text-slate-300">Combien de commandes par mois visez-vous ?</td>
                          </tr>
                          <tr className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-4 text-white font-medium flex items-center gap-2">👥 Nombre de nouveaux clients</td>
                            <td className="p-4 text-slate-300">Quel volume de primo-acheteurs souhaitez-vous acquérir ?</td>
                          </tr>
                          <tr className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-4 text-white font-medium flex items-center gap-2">🏷️ Marge nette</td>
                            <td className="p-4 text-slate-300">Connaissez-vous votre marge par produit ou catégorie ?</td>
                          </tr>
                          <tr className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-4 text-white font-medium flex items-center gap-2">🔄 Écoulement produit</td>
                            <td className="p-4 text-slate-300">Avez-vous des produits à écouler en priorité (stocks, saisonnalité) ?</td>
                          </tr>
                          <tr className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-4 text-white font-medium flex items-center gap-2">📈 LTV & réachat</td>
                            <td className="p-4 text-slate-300">Quelle est la valeur moyenne d'un client sur 12 mois ?</td>
                          </tr>
                          <tr className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-4 text-white font-medium flex items-center gap-2">🎯 CPA cible</td>
                            <td className="p-4 text-slate-300">Quel coût d'acquisition maximum par client est rentable pour vous ?</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Business Context */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      ⚙️ Contexte business
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Comment se positionne votre offre sur le marché actuel ?",
                        "Quels sont vos principaux concurrents en ligne ?",
                        "Êtes-vous soumis à une forte saisonnalité ?",
                        "Quelles sont vos contraintes logistiques ou budgétaires actuelles ?"
                      ].map((question, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-300 bg-slate-800/30 p-4 rounded-lg border border-slate-700/30">
                          <span className="text-violet-400 mt-1 flex-shrink-0">✦</span>
                          <span className="leading-relaxed">{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </CardContent>
              </Card>

              {/* Steps 2-8 Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {methodologySteps.map((step, idx) => (
                  <Card key={idx} className="bg-slate-900/60 border-slate-700/50 hover:border-violet-500/40 transition-colors h-full">
                    <CardHeader className="pb-3 border-b border-slate-800">
                      <CardTitle className="text-xl font-bold text-white mb-2">
                        {step.title}
                      </CardTitle>
                      <p className="text-slate-400 text-sm font-medium">
                        {step.description}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-5">
                      <ul className="space-y-3">
                        {step.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-slate-300 text-sm">
                            <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Deliverables Section */}
          <div className="max-w-4xl mx-auto mb-24">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">📋 Ce que vous recevez à l'issue de l'audit</h2>
            <Card className="bg-slate-900 border-slate-700 overflow-hidden shadow-2xl shadow-black/50">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-800 border-b border-slate-700">
                      <th className="p-5 text-white font-semibold w-1/3 text-lg">Livrable</th>
                      <th className="p-5 text-white font-semibold text-lg">Détail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-5 text-white font-medium flex items-center gap-3">
                        <span className="text-2xl">✅</span> Rapport détaillé
                      </td>
                      <td className="p-5 text-slate-300 leading-relaxed">Analyse point par point avec captures d'écran</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-5 text-white font-medium flex items-center gap-3">
                        <span className="text-2xl">🎯</span> Plan d'action priorisé
                      </td>
                      <td className="p-5 text-slate-300 leading-relaxed">Classé par impact potentiel / effort requis</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-5 text-white font-medium flex items-center gap-3">
                        <span className="text-2xl">📊</span> Score de maturité
                      </td>
                      <td className="p-5 text-slate-300 leading-relaxed">Évaluation globale de votre configuration</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-5 text-white font-medium flex items-center gap-3">
                        <span className="text-2xl">🗓️</span> Session de restitution
                      </td>
                      <td className="p-5 text-slate-300 leading-relaxed">1h de débrief visio pour répondre à vos questions</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto mb-24">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Questions fréquentes sur l'audit</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-slate-800 bg-slate-800/30 rounded-xl px-6">
                  <AccordionTrigger className="text-left text-white hover:text-violet-400 py-6 font-semibold">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400 pb-6 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-violet-900/40 to-slate-900 border border-violet-500/20 rounded-3xl p-8 lg:p-12 text-center max-w-5xl mx-auto relative overflow-hidden group">
            <div className="absolute inset-0 bg-violet-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 relative z-10">Prêt à transformer vos campagnes ?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
              Recevez un rapport détaillé identifiant vos points de blocage et les opportunités de croissance immédiates pour votre business.
            </p>
            <div className="relative z-10">
              <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-10 py-7 text-xl rounded-full shadow-xl shadow-white/5 transition-all">
                <Link to="/contact">Démarrer l'Audit Maintenant</Link>
              </Button>
              <p className="mt-6 text-slate-400 text-sm flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> Sans engagement • Rapport complet sous 72h
              </p>
            </div>
          </div>
          
        </section>
      </div>
    </>
  );
};

export default AuditGoogleAdsPage;