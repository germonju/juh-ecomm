import React from 'react';
import { RadarIllustration } from '@/components/HeroIllustrations';
import SeoHead from '@/components/SeoHead';
import Breadcrumb from '@/components/Breadcrumb';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Shield, Zap, CheckCircle, ArrowRight, Database, Search, Tag, Globe, ClipboardCheck, FileText, Server, Workflow, Settings, CheckCircle2, MessageCircle, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useDataLayer } from '@/contexts/DataLayerContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const TrackingHubPage = () => {
  const { pushEvent } = useDataLayer();

  const handleCTAClick = (ctaName) => {
    pushEvent('cta_click', {
      cta_name: ctaName,
      cta_location: 'tracking-hub-page',
      page_path: '/tracking-data'
    });
  };

  const features = [
    {
      icon: Target,
      title: 'Configuration Complète',
      description: 'Setup de A à Z de votre système de tracking pour des données précises et exploitables'
    },
    {
      icon: TrendingUp,
      title: 'Optimisation Continue',
      description: 'Surveillance et amélioration régulière de vos configurations pour maintenir la qualité des données'
    },
    {
      icon: Shield,
      title: 'Conformité RGPD',
      description: 'Respect total des réglementations sur la protection des données personnelles'
    },
    {
      icon: Zap,
      title: 'Performance Optimale',
      description: 'Tracking rapide et léger qui n\'impacte pas les performances de votre site'
    }
  ];

  const benefits = [
    'Tracking précis des conversions et du parcours client',
    'Tableaux de bord personnalisés dans GA4',
    'Attribution multi-canal des ventes',
    'Suivi des revenus et ROI en temps réel',
    'Événements personnalisés adaptés à votre business',
    'Documentation complète de votre configuration',
    'Formation de votre équipe',
    'Support technique'
  ];

  const faqGroups = [
    {
      title: "Vous voulez savoir où vous en êtes",
      subtitle: "Audit & Diagnostic",
      icon: Search,
      color: "indigo",
      questions: [
        {
          q: "Mon tracking fonctionne, j'ai des données dans GA4 et Google Ads — pourquoi faire un audit ?",
          a: "Avoir des données est une chose, avoir des données justes en est une autre. Un audit permet de vérifier si vous ne comptez pas vos conversions en double (ex: à chaque rafraîchissement de page), si les valeurs remontées correspondent à la réalité (HT vs TTC, frais de port inclus ou non), et si votre attribution n'est pas faussée. C'est la base pour ne pas piloter votre budget à l'aveugle."
        },
        {
          q: "Combien de temps dure un audit et qu'est-ce que je reçois concrètement ?",
          a: "Un audit complet prend généralement 3 à 5 jours ouvrés. Vous recevez un document clair (PDF ou présentation) qui liste chaque anomalie trouvée, son niveau de gravité (critique, moyen, mineur), son impact sur vos données business, et la recommandation exacte pour la corriger."
        },
        {
          q: "J'ai plusieurs personnes qui ont touché à mon GTM au fil du temps. C'est récupérable ?",
          a: "Oui, c'est même un cas très fréquent. L'audit GTM sert justement à cartographier ce qui est actif, ce qui est obsolète et ce qui fait doublon. On restructure ensuite le conteneur avec une nomenclature propre (dossiers, conventions de nommage) pour que la gestion future soit saine et sans risque de conflit."
        },
        {
          q: "C'est quoi la différence entre un plan de marquage et un plan de tagging ?",
          a: "Le plan de marquage est la vision 'métier' : que veut-on mesurer sur le site (ex: clic sur 'Ajouter au panier') et pourquoi. Le plan de tagging est la vision 'technique' : comment on implémente cette mesure concrètement dans GTM (quel déclencheur, quelles variables, quel nom d'événement envoyé à GA4, Facebook, etc.). Les deux sont indispensables."
        }
      ]
    },
    {
      title: "Vous voulez un tracking plus robuste",
      subtitle: "GTM Server-Side & Tracking Avancé",
      icon: Server,
      color: "cyan",
      questions: [
        {
          q: "J'entends parler du server-side partout. C'est vraiment indispensable ?",
          a: "Aujourd'hui, oui, particulièrement pour l'e-commerce et la leadgen à fort enjeu. Avec les adblockers et l'ITP d'Apple (Safari/iOS), un tracking classique perd entre 20 et 40% des données. Le server-side permet de récupérer ces données perdues, d'allonger la durée de vie des cookies (pour une meilleure attribution) et d'améliorer le temps de chargement de votre site."
        },
        {
          q: "Est-ce que le server-side remplace complètement le client-side ?",
          a: "Non. Le server-side ne remplace pas le client-side (GTM web classique), il vient s'y ajouter. Le navigateur envoie toujours la donnée, mais au lieu de l'envoyer directement à Google ou Facebook (où elle peut être bloquée), il l'envoie à votre propre serveur (qui lui n'est pas bloqué). C'est votre serveur qui dispatche ensuite aux différentes plateformes."
        },
        {
          q: "Est-ce que le GTM server-side aide pour le RGPD ?",
          a: "Oui, c'est l'un de ses grands avantages. Contrairement au tracking direct où Facebook ou Google collectent tout ce qu'ils veulent sur le navigateur de l'utilisateur (adresse IP, user agent, etc.), en server-side, vous avez un contrôle total. Vous pouvez anonymiser les adresses IP ou filtrer certaines données sensibles avant même de les envoyer aux plateformes publicitaires."
        },
        {
          q: "Combien ça coûte d'héberger un conteneur server-side ?",
          a: "Contrairement à GTM Web qui est 100% gratuit, GTM Server-Side nécessite un hébergement (cloud). Il existe d'excellentes solutions dédiées comme Addingwell (infrastructure premium, très performante et 100% européenne axée sur la conformité) ou directement via Google Cloud Platform (Google recommande au minimum 3 instances, ce qui revient à environ 90-120€/mois pour un trafic standard)."
        }
      ]
    },
    {
      title: "Vous faites de la génération de leads",
      subtitle: "Conversions Offline & ROI",
      icon: Database,
      color: "lime",
      questions: [
        {
          q: "Je génère des leads en ligne mais mes ventes se concluent par téléphone ou en rendez-vous. Comment mesurer ça ?",
          a: "C'est l'objectif du suivi des conversions offline (Oci). On capture l'identifiant du clic Google Ads (le GCLID) ou les paramètres de l'utilisateur au moment où il remplit le formulaire, on l'envoie dans votre CRM avec le lead. Quand ce lead devient client (parfois des mois plus tard), on renvoie cette information à Google Ads via un webhook ou un import automatisé."
        },
        {
          q: "Mon CRM est-il compatible avec cette solution ?",
          a: "La quasi-totalité des CRM modernes sont compatibles (HubSpot, Salesforce, Pipedrive, Zoho, etc.). Si votre CRM dispose d'une API, d'une intégration Zapier/Make, ou même simplement s'il permet l'export régulier de données au format Google Sheets/CSV, nous pouvons mettre en place le suivi des conversions offline."
        },
        {
          q: "Est-ce que Google Ads optimise vraiment mieux avec les conversions offline ?",
          a: "Absolument. Si vous ne remontez que les formulaires, Google cherchera des profils qui 'remplissent des formulaires' (souvent curieux, pas qualifiés, ou bots). En remontant les ventes réelles, l'algorithme d'enchères intelligentes (Smart Bidding) comprend le profil de vos VRAIS acheteurs et va chercher des prospects similaires. La qualité des leads s'améliore drastiquement."
        },
        {
          q: "Est-ce que je peux remonter des valeurs de vente différentes selon les produits ou services ?",
          a: "Oui, c'est tout l'intérêt. Non seulement vous dites à Google Ads 'ce lead a signé', mais vous lui dites aussi 'il a signé pour 5000€' ou 'il a signé pour 500€'. Google pourra ainsi optimiser pour maximiser votre Chiffre d'Affaires (stratégie ROAS cible) et non plus juste le volume de conversions."
        }
      ]
    }
  ];

  return (
    <>
      <SeoHead route="/tracking-data" />

      <div className="pt-16 lg:pt-20">
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 lg:py-32">
          <RadarIllustration />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <Breadcrumb route="/tracking-data" />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Tracking Hub
              </h1>
              <p className="text-xl lg:text-2xl text-slate-300 mb-8 leading-relaxed">
                Configuration complète de votre système de tracking e-commerce pour des décisions basées sur des données fiables
              </p>
              
              <p className="text-lg lg:text-xl text-slate-400 mb-10 leading-relaxed max-w-3xl mx-auto">
                En 2024, les bloqueurs de publicité, les restrictions iOS et la fin des cookies tiers ont rendu le tracking navigateur de moins en moins fiable. Un e-commerçant sur deux prend aujourd'hui des décisions publicitaires sur des données incomplètes — sans le savoir. Le Tracking Hub regroupe toutes les configurations nécessaires pour récupérer les données que vous perdez et les activer là où elles ont de l'impact.
              </p>
              
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                <Link to="/contact" onClick={() => handleCTAClick('Demander un devis')}>
                  Demander un devis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Audit Section */}
        <section className="py-20 lg:py-24 bg-slate-950 border-y border-slate-800">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
                <Search className="w-4 h-4" />
                <span>Diagnostic & Analyse</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Audit de votre tracking existant
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Avant de construire, il faut savoir d'où l'on part. Si vous avez déjà un tracking en place mais que vous doutez de sa fiabilité, je réalise un audit complet pour identifier les problèmes et vous livrer des recommandations claires.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
              {/* GTM Audit */}
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6">
                    <Tag className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Audit Google Tag Manager</h3>
                  <p className="text-slate-400 mb-6">
                    Votre conteneur GTM a été configuré il y a longtemps ? Plusieurs personnes y ont mis les mains ? Il est temps de faire le ménage.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Structure du conteneur (organisation, nomenclature, dossiers)",
                      "Tags actifs vs tags obsolètes ou en doublon",
                      "Déclencheurs et variables : cohérence et optimisation",
                      "Règles de déclenchement vs consent mode",
                      "Performance : impact sur le temps de chargement",
                      "Bonnes pratiques : prévisualisation, versioning, droits d'accès"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-slate-400 mt-6 pt-6 border-t border-slate-800">
                    Un conteneur GTM non maintenu, c'est des tags en doublon, des conversions gonflées et des budgets publicitaires orientés dans la mauvaise direction. L'audit GTM remet les compteurs à zéro.
                  </p>
                </CardContent>
              </Card>

              {/* Global Audit */}
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6">
                    <Globe className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Audit de tracking global</h3>
                  <p className="text-slate-400 mb-6">
                    Au-delà de GTM, j'analyse l'ensemble de votre chaîne de mesure pour m'assurer que vos données sont fiables et exploitables.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Configuration GA4 : événements, conversions, paramètres e-commerce",
                      "Tracking Google Ads : conversions, valeurs, enhanced conversions",
                      "Tracking Meta/TikTok : pixels, events, déduplication",
                      "DataLayer : structure, données remontées, cohérence",
                      "Consent Mode : implémentation correcte, signaux envoyés",
                      "Écarts de données : comparaison entre plateformes, identification des fuites"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-slate-400 mt-6 pt-6 border-t border-slate-800">
                    L'objectif n'est pas de produire un rapport technique illisible. Chaque problème identifié est associé à son impact réel sur vos données et à une recommandation concrète. Vous savez exactement quoi corriger en priorité et pourquoi.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="max-w-5xl mx-auto mb-16">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">Plan de Marquage & Plan de Tagging</h2>
                <p className="text-indigo-400 font-medium mb-4">La documentation qui manque à 90% des projets tracking</p>
                <p className="text-slate-400 leading-relaxed max-w-3xl mx-auto">
                  Faire du tracking sans plan de marquage documenté, c'est construire une maison sans plan d'architecte. À la première modification, tout s'effondre. Je mets en place (ou met à jour) les documents de référence qui guideront vos équipes marketing et techniques pour les années à venir.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader className="border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-500/10 rounded border border-indigo-500/20">
                        <FileText className="w-5 h-5 text-indigo-400" />
                      </div>
                      <CardTitle className="text-lg text-white">Plan de Marquage — Ce que vous voulez mesurer</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-slate-400 mb-4 text-sm">Le document métier (souvent un tableau structuré) qui définit la stratégie de tracking globale avant toute implémentation technique :</p>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Liste de tous les événements à tracker</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Objectif business rattaché</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Conditions de déclenchement</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Paramètres associés (valeur, devise, type...)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Niveau de priorité</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Correspondance des plateformes cibles</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader className="border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-500/10 rounded border border-indigo-500/20">
                        <Settings className="w-5 h-5 text-indigo-400" />
                      </div>
                      <CardTitle className="text-lg text-white">Plan de Tagging — Comment c'est implémenté</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-slate-400 mb-4 text-sm">Le document technique qui traduit le plan de marquage en instructions concrètes pour les développeurs et l'intégration GTM :</p>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Correspondance exacte Événement / Tag</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Structure du dataLayer attendue</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Nommage exact (events GA4, pixels)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Variables GTM utilisées</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Règles de consentement appliquées</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Historique des modifications</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <h4 className="text-white font-bold mb-1">Création from scratch</h4>
                    <p className="text-indigo-400 text-xs mb-4">Vous n'avez aucune documentation</p>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li>• Audit des besoins</li>
                      <li>• Alignement KPIs business</li>
                      <li>• Rédaction Plan de Marquage</li>
                      <li>• Rédaction Spécifications dataLayer</li>
                      <li>• Document finalisé & livré</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <h4 className="text-white font-bold mb-1">Mise à jour</h4>
                    <p className="text-indigo-400 text-xs mb-4">Votre doc n'est plus à jour</p>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li>• Reprise de l'ancien plan</li>
                      <li>• Confrontation avec l'existant (GTM)</li>
                      <li>• Ajout des nouveaux besoins</li>
                      <li>• Nettoyage des événements obsolètes</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <h4 className="text-white font-bold mb-1">Audit de plan existant</h4>
                    <p className="text-indigo-400 text-xs mb-4">Vous souhaitez valider vos specs</p>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li>• Analyse de votre plan actuel</li>
                      <li>• Contrôle des conventions GA4</li>
                      <li>• Recommandations d'optimisation</li>
                      <li>• Validation technique dataLayer</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <p className="text-slate-300 italic mb-6">"Ces documents ne sont pas une formalité : ce sont vos assurances anti-casse pour toutes les futures refontes de votre site ou changements d'agence."</p>
                <Button asChild variant="outline" className="border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300">
                  <Link to="/contact" onClick={() => handleCTAClick('Créer documentation tracking')}>
                    Créer ou mettre à jour ma documentation tracking
                  </Link>
                </Button>
              </div>
            </div>

            <div className="max-w-3xl mx-auto bg-indigo-900/10 border border-indigo-500/20 rounded-xl p-6 text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-2 text-indigo-300 font-semibold">
                <ClipboardCheck className="w-5 h-5" />
                <span>Le Livrable</span>
              </div>
              <p className="text-indigo-100">
                Un rapport détaillé avec les problèmes identifiés, leur impact sur vos données, et des recommandations priorisées pour corriger et optimiser votre tracking.
              </p>
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-indigo-500/20 transition-all">
                <Link to="/contact" onClick={() => handleCTAClick('Demander audit tracking')}>
                  Demander un audit de mon tracking <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-slate-900">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-cyan-500/0 border border-cyan-500/20 rounded-2xl mb-4">
                      <Icon className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-400">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-950 border-y border-slate-800">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700 overflow-hidden">
              <div className="p-8 lg:p-12">
                <Badge className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border-cyan-500/20 mb-6 uppercase tracking-wider">
                  Recommandé
                </Badge>
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white mb-4">
                      GTM Server-Side — La collecte qui résiste aux bloqueurs
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed mb-8">
                      Votre tracking client-side perd entre 20 et 40% des données selon votre audience. Le server-side les récupère.
                    </p>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                          <Target className="w-5 h-5 text-cyan-400" /> Pourquoi passer en server-side
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3 text-slate-400 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"></div>
                            <span>Contournement naturel des bloqueurs de publicité (Adblockers)</span>
                          </li>
                          <li className="flex items-start gap-3 text-slate-400 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"></div>
                            <span>Cookies "First-party" durables résistant à l'ITP d'Apple (Safari/iOS)</span>
                          </li>
                          <li className="flex items-start gap-3 text-slate-400 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"></div>
                            <span>Amélioration du temps de chargement de vos pages (moins de scripts tiers chargés)</span>
                          </li>
                          <li className="flex items-start gap-3 text-slate-400 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"></div>
                            <span>Contrôle total sur les données envoyées aux plateformes publicitaires</span>
                          </li>
                          <li className="flex items-start gap-3 text-slate-400 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"></div>
                            <span>Conformité RGPD facilitée et sécurisée</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                          <Settings className="w-5 h-5 text-cyan-400" /> Ce que j'installe
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3 text-slate-400 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"></div>
                            <span>Création et configuration du conteneur GTM Server (sur Addingwell ou GCP)</span>
                          </li>
                          <li className="flex items-start gap-3 text-slate-400 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"></div>
                            <span>Migration de vos tags principaux (GA4, Facebook CAPI, Google Ads, TikTok)</span>
                          </li>
                          <li className="flex items-start gap-3 text-slate-400 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"></div>
                            <span>Configuration du sous-domaine personnalisé (first-party cookies)</span>
                          </li>
                          <li className="flex items-start gap-3 text-slate-400 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"></div>
                            <span>Tests de déduplication et vérification de la couverture des événements</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/3">
                    <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-700 h-full flex flex-col justify-center items-center text-center">
                      <Server className="w-16 h-16 text-cyan-400 mb-6" />
                      <p className="text-white font-medium mb-2">Passez au Server-Side</p>
                      <p className="text-slate-400 text-sm mb-6">Récupérez jusqu'à 30% de données perdues sur vos campagnes.</p>
                      <Button asChild className="w-full bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl">
                        <Link to="/tracking-data/gtm-server-side">En savoir plus</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conversions Offline Section */}
        <section className="py-20 bg-slate-900">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 lg:p-12 rounded-3xl border border-slate-700 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-400 text-sm font-medium mb-4">
                  <Database className="w-4 h-4" />
                  <span>Nouveau Service</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Conversions Offline Google Ads</h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  Vous faites de la génération de leads ? Découvrez comment remonter vos ventes réelles (signées hors ligne) directement dans Google Ads pour optimiser votre ROI sur le chiffre d'affaires et non sur les formulaires.
                </p>
                
                <div className="mt-8 mb-8">
                  <h3 className="text-xl font-bold text-white mb-3 text-lime-400">Le problème que ça résout</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    Optimiser des campagnes publicitaires sur des soumissions de formulaires conduit Google à trouver les utilisateurs les plus enclins à remplir des champs (curieux, concurrents, indécis) au lieu des vrais acheteurs. L'algorithme se nourrit de faux signaux de rentabilité, ce qui épuise vos équipes commerciales et dilapide votre budget.
                  </p>
                  
                  <h3 className="text-xl font-bold text-white mb-4">Comment ça fonctionne :</h3>
                  <div className="space-y-4 text-sm text-slate-300">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded bg-lime-500/20 text-lime-400 flex items-center justify-center shrink-0 font-bold text-xs">1</div>
                      <p><strong className="text-white">Capture :</strong> On capte l'identifiant de clic unique (GCLID) ou les informations du prospect lors de la soumission du formulaire et on les envoie dans votre CRM avec le lead.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded bg-lime-500/20 text-lime-400 flex items-center justify-center shrink-0 font-bold text-xs">2</div>
                      <p><strong className="text-white">Suivi :</strong> Votre équipe commerciale gère le lead normalement dans le CRM jusqu'à ce qu'il se transforme en client payant.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded bg-lime-500/20 text-lime-400 flex items-center justify-center shrink-0 font-bold text-xs">3</div>
                      <p><strong className="text-white">Remontée :</strong> Dès que l'opportunité est "Gagnée", une automatisation renvoie l'information exacte et le montant généré à Google Ads, qui ajuste instantanément son algorithme de ciblage.</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-slate-950/50 rounded-lg border border-slate-800 flex items-center gap-3">
                    <LinkIcon className="w-5 h-5 text-lime-400 shrink-0" />
                    <p className="text-xs text-slate-400 italic">Compatible avec HubSpot, Pipedrive, Salesforce, Notion, Airtable et tout CRM connecté à Make.com, Zapier ou n8n.</p>
                  </div>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="border-lime-500 text-lime-400 hover:bg-lime-500/10 hover:text-lime-300"
                >
                  <Link to="/tracking-data/conversions-offline" onClick={() => handleCTAClick('Découvrir Conversions Offline')}>
                    Découvrir les conversions offline
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex-shrink-0 bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Lead (Formulaire)</span>
                    <span className="ml-auto font-mono">100&nbsp;€</span>
                  </div>
                  <div className="w-px h-4 bg-slate-700 ml-1"></div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span>Qualification</span>
                    <span className="ml-auto font-mono">--</span>
                  </div>
                  <div className="w-px h-4 bg-slate-700 ml-1"></div>
                  <div className="flex items-center gap-3 font-bold text-lime-400 bg-lime-500/10 px-3 py-2 rounded-lg border border-lime-500/20">
                    <div className="w-2 h-2 rounded-full bg-lime-500"></div>
                    <span>Vente Réelle</span>
                    <span className="ml-auto font-mono">2500&nbsp;€</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-950 border-t border-slate-800">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ces configurations fonctionnent ensemble — pas isolément
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Le tracking moderne n'est plus un simple script ajouté dans le header. C'est un écosystème global où chaque brique renforce l'autre pour alimenter vos plateformes publicitaires.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="hidden md:flex flex-row items-center justify-between gap-4">
                <div className="flex-1 text-center bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl">
                  <FileText className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                  <p className="text-white font-bold text-sm">1. AUDIT & DOCS</p>
                  <p className="text-indigo-300 text-xs mt-1">La fondation stratégique</p>
                </div>
                
                <ArrowRight className="w-6 h-6 text-slate-600 shrink-0" />
                
                <div className="flex-1 text-center bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                  <Settings className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-white font-bold text-sm">2. GTM CLIENT</p>
                  <p className="text-blue-300 text-xs mt-1">Collecte & Consentement</p>
                </div>
                
                <ArrowRight className="w-6 h-6 text-slate-600 shrink-0" />
                
                <div className="flex-1 text-center bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-xl">
                  <Server className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <p className="text-white font-bold text-sm">3. GTM SERVER</p>
                  <p className="text-cyan-300 text-xs mt-1">Sécurisation Data</p>
                </div>
                
                <ArrowRight className="w-6 h-6 text-slate-600 shrink-0" />
                
                <div className="flex-1 text-center bg-lime-500/10 border border-lime-500/20 p-4 rounded-xl">
                  <Database className="w-8 h-8 text-lime-400 mx-auto mb-2" />
                  <p className="text-white font-bold text-sm">4. CONV. OFFLINE</p>
                  <p className="text-lime-300 text-xs mt-1">Liaison CRM & ROI</p>
                </div>
              </div>

              {/* Mobile flow layout */}
              <div className="flex flex-col md:hidden items-center justify-center gap-4">
                <div className="w-full text-center bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl flex items-center justify-start gap-4">
                  <FileText className="w-8 h-8 text-indigo-400" />
                  <div className="text-left">
                    <p className="text-white font-bold text-sm">1. AUDIT & DOCUMENTATION</p>
                    <p className="text-indigo-300 text-xs mt-1">La fondation stratégique</p>
                  </div>
                </div>
                
                <div className="h-6 w-px bg-slate-600"></div>
                
                <div className="w-full text-center bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-center justify-start gap-4">
                  <Settings className="w-8 h-8 text-blue-400" />
                  <div className="text-left">
                    <p className="text-white font-bold text-sm">2. GTM CLIENT-SIDE</p>
                    <p className="text-blue-300 text-xs mt-1">Collecte & Consentement</p>
                  </div>
                </div>
                
                <div className="h-6 w-px bg-slate-600"></div>
                
                <div className="w-full text-center bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-xl flex items-center justify-start gap-4">
                  <Server className="w-8 h-8 text-cyan-400" />
                  <div className="text-left">
                    <p className="text-white font-bold text-sm">3. GTM SERVER-SIDE</p>
                    <p className="text-cyan-300 text-xs mt-1">Sécurisation de la Data</p>
                  </div>
                </div>
                
                <div className="h-6 w-px bg-slate-600"></div>
                
                <div className="w-full text-center bg-lime-500/10 border border-lime-500/20 p-4 rounded-xl flex items-center justify-start gap-4">
                  <Database className="w-8 h-8 text-lime-400" />
                  <div className="text-left">
                    <p className="text-white font-bold text-sm">4. CONVERSIONS OFFLINE</p>
                    <p className="text-lime-300 text-xs mt-1">Liaison CRM & ROI réel</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 p-6 rounded-2xl text-center">
                <Workflow className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">Décisions basées sur des données fiables</h3>
                <p className="text-slate-300 max-w-2xl mx-auto">Toute cette infrastructure a un seul but final : vous donner la confiance nécessaire pour investir, scaler et optimiser en connaissant le vrai coût d'acquisition de vos clients.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-800 to-slate-900">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-white">
                  Ce que vous obtenez
                </h2>
                <p className="text-xl text-slate-400">
                  Une solution complète clés en main
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-cyan-500/40 transition-colors"
                  >
                    <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center mt-12"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-violet-500/50 transition-all"
                >
                  <Link to="/contact" onClick={() => handleCTAClick('Commencer maintenant')}>
                    Commencer maintenant
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-24 bg-slate-950 border-t border-slate-800">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Vos questions sur le tracking — les vraies réponses
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Le tracking e-commerce est technique, mais les vraies questions sont business. Voici ce que demandent nos clients.
              </p>
            </div>

            <div className="space-y-12">
              {faqGroups.map((group, gIndex) => {
                const GroupIcon = group.icon;
                return (
                  <div key={gIndex}>
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                      <GroupIcon className={`w-6 h-6 text-${group.color}-400`} />
                      <div>
                        <h3 className="text-2xl font-bold text-white">{group.title}</h3>
                        <p className={`text-sm text-${group.color}-400 mt-1`}>{group.subtitle}</p>
                      </div>
                    </div>
                    <Accordion type="single" collapsible className="space-y-4">
                      {group.questions.map((faq, i) => (
                        <AccordionItem key={i} value={`faq-${gIndex}-${i}`} className="border border-slate-800 rounded-lg bg-slate-900/50 px-4">
                          <AccordionTrigger className={`text-white hover:text-${group.color}-400 text-left text-base font-medium py-4`}>
                            {faq.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-slate-400 leading-relaxed pt-2 pb-4 text-sm">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 text-center bg-slate-900/80 border border-slate-800 p-8 rounded-2xl">
              <MessageCircle className="w-10 h-10 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Votre question n'est pas dans la liste ?</h3>
              <p className="text-slate-400 mb-6">Parlons directement de votre infrastructure de tracking actuelle.</p>
              <Button asChild variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                <Link to="/contact" onClick={() => handleCTAClick('FAQ Contact')}>
                  Posez-la directement
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TrackingHubPage;