import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Target, 
  Layers, 
  TrendingUp, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  Globe, 
  Shield, 
  Server, 
  Cookie,
  ShoppingCart,
  Users,
  Repeat
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getCanonicalUrl } from '@/lib/canonicalUrlHandler';

const Ga4AdvancedPage = () => {
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);

  const auditPoints = [
    "Configuration des événements et conversions",
    "Paramétrage e-commerce (si applicable)",
    "Groupes de canaux : sont-ils correctement configurés ? Le trafic est-il bien attribué ?",
    "Filtres et exclusions de données",
    "Liaison avec Google Ads, Search Console, BigQuery",
    "Audiences et segments",
    "Rapports personnalisés existants",
    "Rétention des données"
  ];

  const implementations = [
    {
      title: "Correction des groupes de canaux",
      desc: "Les groupes de canaux par défaut de GA4 sont souvent mal configurés : trafic paid social classé en organic, campagnes email non reconnues, referral pollué... Je corrige et personnalise vos groupes de canaux pour une attribution fiable."
    },
    {
      title: "Création de rapports personnalisés",
      desc: "Les rapports standards ne suffisent pas toujours. Je crée des rapports exploratoires sur-mesure adaptés à vos KPIs : tunnel de conversion détaillé, analyse de cohortes, parcours utilisateurs, performance par segment."
    },
    {
      title: "Paramétrage complet",
      desc: "Je configure GA4 de A à Z : événements recommandés, événements personnalisés, paramètres e-commerce, dimensions personnalisées, métriques calculées, audiences pour le remarketing."
    }
  ];

  const serverSideBenefits = [
    {
      title: "Contournement des ad blockers",
      desc: "Les requêtes GA4 classiques sont envoyées vers google-analytics.com et sont bloquées par ~30% des internautes. En server-side, les requêtes partent de votre propre domaine (ex: data.votresite.fr) et passent sous les radars."
    },
    {
      title: "Durée de vie des cookies étendue",
      desc: "Sur Safari et Firefox, les cookies posés en JavaScript sont limités à 7 jours (voire 24h). En server-side, le cookie est posé par votre serveur en first-party et peut durer jusqu'à 2 ans. L'attribution redevient fiable."
    },
    {
      title: "Enrichissement des données",
      desc: "Côté serveur, vous pouvez enrichir les hits GA4 avant de les envoyer : ajouter des données CRM, des marges produits, des segments utilisateurs... Impossible à faire côté client."
    },
    {
      title: "Données plus complètes",
      desc: "Résultat : vous récupérez 20 à 40% de données en plus par rapport à une implémentation classique. Vos rapports GA4 reflètent enfin la réalité de votre trafic."
    },
    {
      title: "Meilleur contrôle RGPD",
      desc: "Vous maîtrisez ce qui est envoyé à Google. Possibilité de filtrer ou anonymiser certaines données avant transmission."
    }
  ];

  const ecommerceFaqs = [
    {
      q: "GA4 peut-il vraiment tracker toutes les étapes de mon tunnel d'achat ?",
      a: "Oui — mais pas avec une simple installation de base. GA4 utilise un modèle événementiel qui permet de mesurer chaque micro-étape : affichage de liste produits, clic sur une fiche, ajout au panier, début de checkout, saisie des infos de paiement, confirmation d'achat. Sans configuration spécifique via GTM, la plupart de ces événements ne remontent pas ou remontent mal. Une fois correctement paramétré, vous visualisez exactement où vous perdez vos clients dans le parcours d'achat."
    },
    {
      q: "Mes revenus dans GA4 ne correspondent pas à ceux de ma boutique Shopify / WooCommerce. C'est normal ?",
      a: "C'est fréquent et rarement anodin. Les écarts viennent généralement de trois sources : des commandes non trackées (utilisateurs avec bloqueurs de pub ou navigateurs restrictifs), des événements purchase déclenchés plusieurs fois sur la même commande, ou des remboursements non pris en compte. Un audit permet d'identifier la source exacte de l'écart et de le corriger. L'objectif : que GA4 reflète votre vrai chiffre d'affaires à moins de 5% d'écart."
    },
    {
      q: "Est-ce que GA4 me permet de savoir quels produits se vendent mal et pourquoi ?",
      a: "GA4 vous donne une vision complète de la performance produit : taux de clics sur les fiches, taux d'ajout au panier, taux de conversion produit, revenus générés. Mais surtout, les explorations avancées permettent de croiser ces données avec la source de trafic, le device ou le segment d'audience. Vous identifiez si un produit se vend mal parce qu'il n'est pas vu, parce que la fiche ne convainc pas, ou parce que le prix bloque à la dernière étape."
    },
    {
      q: "Puis-je utiliser GA4 pour alimenter mes campagnes Google Shopping et Performance Max ?",
      a: "Oui, et c'est l'un des usages les plus puissants. En connectant GA4 à Google Ads, vous importez des signaux de conversion enrichis qui améliorent l'optimisation automatique des campagnes. Les audiences GA4 (abandonnistes panier, acheteurs récents, visiteurs de catégories spécifiques) peuvent être utilisées directement dans vos campagnes pour affiner le ciblage. C'est ce qui fait la différence entre une campagne PMax qui dépense et une campagne PMax qui génère du ROI."
    },
    {
      q: "GA4 fonctionne-t-il si j'ai un site multidevise ou multilingue ?",
      a: "Oui, GA4 gère nativement plusieurs devises et peut être configuré pour plusieurs langues. Pour un site multidevise, les revenus sont convertis automatiquement dans la devise de référence de votre propriété GA4. Pour un site multilingue, des paramètres personnalisés permettent de segmenter les performances par langue ou par marché. Une configuration propre évite les doublons de données entre les différentes versions de votre site."
    }
  ];

  const leadgenFaqs = [
    {
      q: "GA4 peut-il tracker autre chose que les soumissions de formulaire ?",
      a: "Absolument. La soumission de formulaire est une conversion finale, mais GA4 permet de tracker toute la chaleur qui précède : un clic sur votre numéro de téléphone, un scroll jusqu'à votre section tarifs, le temps passé sur une page clé, un clic sur un bouton CTA sans conversion, ou encore la consultation d'une page de cas client. Ces micro-conversions vous donnent une image réelle de l'engagement de vos visiteurs — et permettent de créer des audiences remarketing beaucoup plus qualifiées."
    },
    {
      q: "Comment savoir quels canaux m'apportent les leads qui signent vraiment, pas juste ceux qui remplissent un formulaire ?",
      a: "C'est la question centrale en leadgen — et GA4 seul ne peut pas y répondre complètement. La solution : connecter GA4 à votre CRM via des événements server-side ou des webhooks. Quand un lead devient client dans votre CRM, l'information remonte dans GA4 avec sa source d'origine. Vous pouvez alors calculer un vrai coût par client acquis par canal, et non juste un coût par lead. C'est la boucle de mesure complète."
    },
    {
      q: "Mes formulaires sont sur des pages tierces (Typeform, Calendly, etc.). GA4 peut quand même tracker les conversions ?",
      a: "Oui, avec la bonne configuration. Pour des outils comme Calendly ou Typeform, il existe deux approches : soit une intégration via GTM qui écoute les événements de confirmation sur la page embarquée, soit un webhook qui envoie l'information de conversion à GA4 via Measurement Protocol. Dans les deux cas, la conversion est bien attribuée à la session d'origine — vous ne perdez pas la source du lead."
    },
    {
      q: "J'ai plusieurs types de leads (devis, démo, contact simple). Puis-je les différencier dans GA4 ?",
      a: "C'est exactement ce que permettent les paramètres personnalisés. Chaque type de lead peut être tracké comme un événement distinct ou avec un paramètre qui précise la nature de la demande. Dans vos rapports, vous visualisez séparément les demandes de devis vs les prises de rendez-vous vs les contacts simples — avec pour chacun la source, le device, et le contenu consulté avant conversion. Vous pilotez votre acquisition avec une granularité que Google Analytics de base ne permet pas."
    }
  ];

  const generalFaqs = [
    {
      q: "Mes données GA4 sont-elles fiables si beaucoup de mes visiteurs utilisent des bloqueurs de pub ?",
      a: "C'est l'angle mort de GA4 en client-side : les bloqueurs de publicité et certains navigateurs comme Safari limitent ou bloquent complètement la collecte. En fonction de votre audience, cela peut représenter 20 à 40% de données manquantes. La solution est le tracking server-side via GTM Server-Side — les données transitent par votre propre serveur, contournent les bloqueurs et renforcent la conformité RGPD. C'est aujourd'hui un standard pour tout site qui veut des données réellement exploitables."
    },
    {
      q: "GA4 est-il conforme au RGPD ?",
      a: "GA4 est compatible RGPD si et seulement si il est correctement configuré. Cela implique : l'implémentation du Consent Mode v2 pour respecter les choix de consentement de vos utilisateurs, la configuration de la rétention des données, et idéalement un hébergement des données en Europe. Sans ces paramètres, une installation GA4 basique peut exposer votre site à des risques légaux. La conformité n'est pas une option — c'est un prérequis à toute collecte de données sérieuse."
    },
    {
      q: "Combien de temps avant d'avoir des données exploitables après la configuration ?",
      a: "La configuration technique est opérationnelle sous 1 à 3 semaines selon la complexité de votre site. En revanche, pour avoir des données statistiquement significatives et des tendances fiables, comptez 4 à 8 semaines de collecte post-configuration. C'est pourquoi il vaut mieux configurer GA4 correctement dès le départ plutôt que de corriger des données historiques erronées — GA4 ne permet pas de modifier les données déjà collectées."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-orange-500/30">
      <Helmet>
        <title>GA4 Avancé : Analytics, Audiences & Reporting | JUH Ecomm</title>
        <meta name="description" content="Maîtrisez Google Analytics 4 avancé pour exploiter tout le potentiel de vos données. Configurations avancées, audiences personnalisées et insights actionnables." />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph tags */}
        <meta property="og:site_name" content="Juh Ecomm Data" />
        <meta property="og:title" content="GA4 Avancé | JUH Ecomm Data" />
        <meta property="og:description" content="Maîtrisez GA4 avancé pour exploiter vos données. Configurations avancées et audiences personnalisées." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://juh-ecomm.fr/images/og-image.jpg" />
        <meta property="og:locale" content="fr_FR" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@juh_ecomm" />
        <meta name="twitter:title" content="GA4 Avancé | JUH Ecomm Data" />
        <meta name="twitter:description" content="Maîtrisez Google Analytics 4 avancé pour exploiter tout le potentiel de vos données et insights." />
        <meta name="twitter:image" content="https://juh-ecomm.fr/images/og-image.jpg" />
        <meta name="twitter:url" content={canonicalUrl} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <Badge className="bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 border-orange-500/20 mb-6 px-4 py-1.5 text-sm uppercase tracking-wider">
            Analytics & Data
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight">
            GA4 Avancé
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Configuration avancée de Google Analytics 4 avec événements personnalisés, tableaux de bord sur mesure et tracking Server-Side.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 h-14 text-lg rounded-full shadow-lg shadow-orange-500/20 transition-all hover:scale-105">
              <Link to="/contact">Optimiser mon GA4</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Audit Section */}
      <section className="py-20 px-4 bg-slate-900/50 border-y border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-6">
                <Search className="w-4 h-4" /> Diagnostic
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Audit de votre compte GA4
              </h2>
              <p className="text-lg text-slate-400 mb-8">
                Votre compte GA4 a été configuré rapidement ou par quelqu'un d'autre ? Il est probable que des erreurs ou des manques impactent la qualité de vos données. Je réalise un audit complet pour identifier les problèmes.
              </p>
              
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-400" /> Le Livrable
                </h3>
                <p className="text-slate-400 text-sm">
                  Un rapport d'audit avec les anomalies détectées et des recommandations priorisées.
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
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></div>
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

      {/* Implementation Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ce que j'implémente
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              Je transforme votre GA4 en outil de pilotage fiable et précis.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {implementations.map((item, index) => (
              <Card key={index} className="bg-slate-900 border-slate-800 hover:border-orange-500/30 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-white mb-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Server-Side Section */}
      <section className="py-24 px-4 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border-purple-500/20 mb-6 px-4 py-1.5 text-sm uppercase tracking-wider">
              Performance & Fiabilité
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              GA4 en Server-Side : des données encore plus fiables
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              Pour aller plus loin, je peux faire transiter vos données GA4 par votre propre serveur (server-side). C'est ce qu'on appelle "proxifier" GA4. Les avantages sont significatifs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {serverSideBenefits.map((benefit, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:bg-slate-750 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-10 py-6 h-auto rounded-full shadow-lg shadow-purple-500/20">
              <Link to="/contact">
                Passer GA4 en server-side <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* NEW SECTION 1: Business Model Configuration */}
      <section className="py-24 px-4 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Une configuration GA4 adaptée à votre modèle business
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              E-commerce ou Lead Generation : chaque modèle nécessite une configuration spécifique pour transformer vos données en décisions actionnables.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* E-commerce Column */}
            <Card className="bg-slate-900 border-slate-800 hover:border-orange-500/30 transition-all">
              <CardHeader className="border-b border-slate-800 pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white">Vous vendez en ligne</CardTitle>
                    <Badge variant="outline" className="mt-1 border-orange-500/30 text-orange-400">🛒 E-commerce</Badge>
                  </div>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Chaque étape du parcours d'achat doit être mesurée. De la première visite au ré-achat, GA4 devient votre tableau de bord commercial.
                </p>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-orange-400" />
                    Ce que je configure pour vous :
                  </h3>
                  <ul className="space-y-3 text-slate-400">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Événements e-commerce obligatoires: view_item_list, view_item, add_to_cart, begin_checkout, add_payment_info, purchase</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Suivi des remboursements et annulations pour CA net fiable</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Dimension produit enrichie: catégorie, marque, marge, stock</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Taux d'abandon panier et checkout avec entonnoirs de visualisation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Valeur vie client (LTV) et segmentation RFM dans les explorations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Import des revenus vers Google Ads pour ROAS sur données réelles</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Audiences remarketing: visiteurs fiches produits, abandonnistes panier, acheteurs 1x, clients VIP</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-orange-400" />
                    Métriques clés que vous pourrez lire :
                  </h3>
                  <ul className="space-y-3 text-slate-400">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Taux de conversion par source / campagne / device</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Revenu par utilisateur et par session</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Performance produit et catégorie</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Parcours de conversion multitouch</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mt-6">
                  <p className="text-sm text-orange-200 leading-relaxed">
                    <strong className="text-orange-100">Résultat business attendu:</strong> Vous savez exactement quelles campagnes génèrent du vrai chiffre d'affaires — pas juste des clics.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Lead Generation Column */}
            <Card className="bg-slate-900 border-slate-800 hover:border-blue-500/30 transition-all">
              <CardHeader className="border-b border-slate-800 pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white">Vous générez des leads</CardTitle>
                    <Badge variant="outline" className="mt-1 border-blue-500/30 text-blue-400">🎯 Lead Generation</Badge>
                  </div>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Un formulaire soumis n'est pas une vente. GA4 vous permet de tracer le chemin complet — du premier clic jusqu'au client signé.
                </p>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    Ce que je configure pour vous :
                  </h3>
                  <ul className="space-y-3 text-slate-400">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Événements de conversion leadgen: form_start, form_submit, cta_click, phone_click, page_clé visitée</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Suivi de la qualité des leads via paramètres personnalisés (source, scoring, type de demande)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Événements micro-conversions: téléchargement de ressource, scroll 75%, temps sur page, vidéo vue</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Entonnoirs de génération de leads: trafic → page service → formulaire → confirmation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Attribution cross-canal: quel canal amène les leads qui convertissent vraiment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Connexion CRM via événements server-side ou webhooks pour fermer la boucle offline</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Audiences qualifiées: visiteurs pages tarifs, leads chauds non convertis, prospects par secteur</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    Métriques clés que vous pourrez lire :
                  </h3>
                  <ul className="space-y-3 text-slate-400">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Coût par lead qualifié par canal</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Taux de transformation lead → client (si CRM connecté)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Pages et contenus qui génèrent le plus de demandes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                      <span className="text-sm">Délai et points de contact avant conversion</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-6">
                  <p className="text-sm text-blue-200 leading-relaxed">
                    <strong className="text-blue-100">Résultat business attendu:</strong> Vous arrêtez de payer pour des leads qui ne convertissent jamais — et vous doublez le budget sur ce qui fonctionne.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transition Block */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Repeat className="w-6 h-6 text-orange-400" />
              <h3 className="text-2xl font-bold text-white">Peu importe votre modèle — le principe reste le même</h3>
            </div>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-6">
              Des données fiables, des rapports lisibles, des décisions actionnables. La configuration change, l'objectif non : vous donner une vision claire de ce qui génère de la valeur dans votre business.
            </p>
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full shadow-lg shadow-orange-500/20">
              <Link to="/contact">
                Parlons de votre configuration <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* NEW SECTION 2: FAQ */}
      <section className="py-24 px-4 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Vos questions sur GA4 — les vraies réponses
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Pas de réponse générique. Les questions que posent vraiment les e-commerçants et les équipes marketing.
            </p>
          </div>

          <div className="space-y-12">
            {/* E-commerce FAQ Block */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <ShoppingCart className="w-6 h-6 text-orange-400" />
                <h3 className="text-2xl font-bold text-white">Vous gérez une boutique en ligne</h3>
              </div>
              <Accordion type="single" collapsible className="space-y-4">
                {ecommerceFaqs.map((faq, i) => (
                  <AccordionItem key={i} value={`ecom-${i}`} className="border border-slate-800 rounded-lg bg-slate-950/50 px-4">
                    <AccordionTrigger className="text-white hover:text-orange-400 text-left text-base font-medium py-4">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-400 leading-relaxed pt-2 pb-4 text-sm">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Lead Generation FAQ Block */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <Target className="w-6 h-6 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Vous générez des leads et des demandes de contact</h3>
              </div>
              <Accordion type="single" collapsible className="space-y-4">
                {leadgenFaqs.map((faq, i) => (
                  <AccordionItem key={i} value={`lead-${i}`} className="border border-slate-800 rounded-lg bg-slate-950/50 px-4">
                    <AccordionTrigger className="text-white hover:text-blue-400 text-left text-base font-medium py-4">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-400 leading-relaxed pt-2 pb-4 text-sm">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* General FAQ Block */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <Users className="w-6 h-6 text-purple-400" />
                <h3 className="text-2xl font-bold text-white">Questions générales sur GA4</h3>
              </div>
              <Accordion type="single" collapsible className="space-y-4">
                {generalFaqs.map((faq, i) => (
                  <AccordionItem key={i} value={`general-${i}`} className="border border-slate-800 rounded-lg bg-slate-950/50 px-4">
                    <AccordionTrigger className="text-white hover:text-purple-400 text-left text-base font-medium py-4">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-400 leading-relaxed pt-2 pb-4 text-sm">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 text-center border-t border-slate-800">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Besoin d'y voir plus clair dans vos données ?</h2>
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

export default Ga4AdvancedPage;