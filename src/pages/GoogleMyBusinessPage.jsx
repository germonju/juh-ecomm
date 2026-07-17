import React from 'react';
import { GeoGridIllustration } from '@/components/HeroIllustrations';
import SeoHead from '@/components/SeoHead';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Store, 
  Utensils, 
  Scissors, 
  Wrench, 
  Briefcase, 
  Hotel, 
  Car, 
  Info,
  Star,
  MessageSquare,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ShieldAlert,
  Zap,
  Check,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const GoogleMyBusinessPage = () => {
  const businessTypes = [
    { icon: Utensils, label: "Restaurants & Bars" },
    { icon: Store, label: "Commerces de proximité" },
    { icon: Scissors, label: "Salons de coiffure & Beauté" },
    { icon: Wrench, label: "Artisans & BTP" },
    { icon: Briefcase, label: "Professions libérales" },
    { icon: Zap, label: "Services à la personne" },
    { icon: Hotel, label: "Hôtels & Hébergements" },
    { icon: Car, label: "Garages & Concessionnaires" },
  ];

  const reviewImpacts = [
    "Amélioration significative de votre référencement local (SEO)",
    "Augmentation du taux de clics vers votre site web",
    "Renforcement de la confiance des prospects (Preuve sociale)",
    "Meilleure conversion des visiteurs en clients",
    "Avantage concurrentiel immédiat sur votre zone"
  ];

  const reviewCollectionMethods = [
    "Envoi automatique de SMS après visite ou achat",
    "Séquence email personnalisée et optimisée",
    "QR Codes intelligents en point de vente",
    "Relances douces et non intrusives",
    "Filtrage intelligent pour maximiser les notes positives"
  ];

  const responseBenefits = [
    "Montre aux clients que vous vous souciez d'eux",
    "Google favorise les fiches actives et réactives",
    "Transforme les clients mécontents en ambassadeurs",
    "Fidélise votre clientèle existante",
    "Donne une image professionnelle et dynamique"
  ];

  const articleReasons = [
    "Signaux de fraîcheur envoyés à l'algorithme Google",
    "Mise en avant de vos offres et actualités",
    "Possibilité d'ajouter des boutons d'action (Appeler, Réserver)",
    "Augmentation de l'engagement sur votre fiche",
    "Occupation de l'espace visuel dans les résultats de recherche"
  ];

  const socialAutomation = [
    "Instagram: Visuel adapté au format carré/story + légende optimisée avec hashtags locaux",
    "Facebook: Post avec image, texte engageant et lien vers votre site ou fiche Google",
    "Cohérence de marque: Le même message décliné sur tous vos canaux sans effort supplémentaire",
    "Gain de temps: Vous n'avez plus à gérer vos publications, tout est automatisé"
  ];

  const pricingPlans = [
    {
      title: "Gestion des avis",
      price: "90\u00A0€",
      period: "/mois",
      description: "L'essentiel pour maîtriser votre e-réputation.",
      features: [
        "Collecte automatisée (SMS/Email)",
        "Réponses aux avis 24/7",
        "Validation manuelle avis < 4★",
        "Tableau de bord de suivi",
        "Alerte immédiate avis négatif",
        "Support par email"
      ],
      cta: "Choisir cette offre",
      popular: false
    },
    {
      title: "Avis + 1 article/sem",
      price: "119\u00A0€",
      period: "/mois",
      description: "Le meilleur rapport visibilité/prix pour votre activité.",
      features: [
        "Tout du pack Gestion des avis",
        "1 Post Google My Business / sem",
        "Optimisation SEO des posts",
        "Diffusion automatique Instagram + Facebook",
        "Images libres de droits incluses",
        "Support prioritaire"
      ],
      option: "Option: +10\u00A0€ / mois — Publication sur votre blog (WordPress, Shopify ou autre CMS compatible API)",
      cta: "Choisir cette offre",
      popular: true
    },
    {
      title: "Avis + 2 articles/sem",
      price: "129\u00A0€",
      period: "/mois",
      description: "Pour une visibilité maximale et une domination locale.",
      features: [
        "Tout du pack Gestion des avis",
        "2 Posts Google My Business / sem",
        "Diffusion automatique Instagram + Facebook",
        "Stratégie de contenu avancée",
        "Analyse mensuelle détaillée",
        "Support prioritaire + visio"
      ],
      option: "Option: +10\u00A0€ / mois — Publication sur votre blog (WordPress, Shopify ou autre CMS compatible API)",
      cta: "Choisir cette offre",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-lime-500/30">
      <SeoHead route="/google-my-business" />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <GeoGridIllustration />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-lime-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <Badge className="bg-lime-500/10 text-lime-400 hover:bg-lime-500/20 border-lime-500/20 mb-6 px-4 py-1.5 text-sm uppercase tracking-wider">
            SEO Local & E-Réputation
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Google My Business
            </span>
            <br />
            <span className="text-lime-400">automatisé</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Votre fiche Google est souvent le premier contact d'un client avec votre entreprise. 
            Transformez-la en machine à attirer des clients grâce à une gestion 100% automatisée et intelligente.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-lime-500 hover:bg-lime-600 text-slate-950 font-bold px-8 h-14 text-lg rounded-full shadow-lg shadow-lime-500/20 transition-all hover:scale-105">
              <Link to="/contact">Je veux booster ma visibilité</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-slate-700 hover:bg-slate-800 text-slate-300 h-14 text-lg rounded-full px-8">
              <a href="#tarifs">Voir les tarifs</a>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Target Section */}
      <section className="py-20 px-4 bg-slate-900/50 border-y border-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pour tous les professionnels avec une présence locale
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {businessTypes.map((type, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-6 bg-slate-800 rounded-xl hover:bg-slate-750 transition-colors border border-slate-700 hover:border-lime-500/30 group">
                <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-slate-700 group-hover:border-lime-500/50">
                  <type.icon className="w-7 h-7 text-lime-400" />
                </div>
                <span className="text-slate-200 font-medium text-center">{type.label}</span>
              </div>
            ))}
          </div>

          <div className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-6 flex items-start gap-4 max-w-3xl mx-auto">
            <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
            <p className="text-blue-100 text-lg">
              <span className="font-semibold text-blue-300">Simple :</span> Si vos clients peuvent vous trouver sur Google Maps, cette solution est faite pour vous. Elle s'adapte à la taille de votre entreprise et à votre volume de clientèle.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Section 1 - Collecte d'avis */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 text-lime-400 text-sm font-medium mb-6">
                <Star className="w-4 h-4 fill-current" /> Collecte d'avis
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Collecte d'avis <span className="text-lime-400">automatisée</span>
              </h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Les avis Google sont le carburant de votre visibilité locale. Plus vous en avez, plus vous montez dans les résultats. Ne laissez plus vos clients partir sans donner leur opinion.
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-lime-400" /> L'impact des avis sur votre business
                  </h3>
                  <ul className="space-y-3">
                    {reviewImpacts.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-400">
                        <CheckCircle2 className="w-5 h-5 text-lime-500/50 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-lime-400" /> Comment je collecte vos avis automatiquement
                  </h3>
                  <ul className="space-y-3">
                    {reviewCollectionMethods.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-400">
                        <CheckCircle2 className="w-5 h-5 text-lime-500/50 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Visual representation */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-lime-500 to-emerald-500 rounded-2xl opacity-20 blur-2xl"></div>
              <div className="relative bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-6">
                  <div>
                    <div className="text-4xl font-bold text-white">4.9 <span className="text-lg text-slate-500 font-normal">/5</span></div>
                    <div className="flex gap-1 mt-2">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 text-yellow-400 fill-current" />)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-lime-400">+42</div>
                    <div className="text-sm text-slate-500">avis ce mois-ci</div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex gap-4 items-start p-4 bg-slate-800/50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex-shrink-0" />
                      <div>
                        <div className="h-4 w-24 bg-slate-700 rounded mb-2" />
                        <div className="h-3 w-48 bg-slate-700/50 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section 2 - Réponses automatiques */}
      <section className="py-24 px-4 bg-slate-900/50 border-y border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Réponses automatiques <span className="text-lime-400">intelligentes</span>
            </h2>
            <p className="text-lg text-slate-400">
              Répondre aux avis est crucial mais chronophage. Je mets en place une IA qui rédige et publie des réponses personnalisées, tout en vous laissant le contrôle sur les situations délicates.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Des réponses personnalisées selon la note</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-slate-800 rounded-xl border border-slate-700/50">
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />)}
                    </div>
                    <span className="text-xs text-lime-400 font-bold bg-lime-500/10 px-2 py-0.5 rounded">AUTO</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">5 Étoiles : Ton Chaleureux</h4>
                    <p className="text-sm text-slate-400 mt-1">Remerciement enthousiaste, invitation à revenir. Publication immédiate.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-800 rounded-xl border border-slate-700/50">
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <div className="flex gap-0.5">
                      {[1,2,3,4].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />)}
                      <Star className="w-3 h-3 text-slate-600" />
                    </div>
                    <span className="text-xs text-lime-400 font-bold bg-lime-500/10 px-2 py-0.5 rounded">AUTO</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">4 Étoiles : Ton Reconnaissant</h4>
                    <p className="text-sm text-slate-400 mt-1">Remerciement pour la visite, ouverture à l'amélioration. Publication immédiate.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-800 rounded-xl border-l-4 border-l-orange-500 border-y border-r border-slate-700/50">
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <div className="flex gap-0.5">
                      {[1,2,3].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />)}
                      <Star className="w-3 h-3 text-slate-600" />
                      <Star className="w-3 h-3 text-slate-600" />
                    </div>
                    <span className="text-xs text-orange-400 font-bold bg-orange-500/10 px-2 py-0.5 rounded">VALID.</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">3 Étoiles : Ton Constructif</h4>
                    <p className="text-sm text-slate-400 mt-1">Excuses pour la déception, demande de détails. <span className="text-orange-300 font-medium">Validation manuelle requise.</span></p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-800 rounded-xl border-l-4 border-l-red-500 border-y border-r border-slate-700/50">
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <div className="flex gap-0.5">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      {[2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-slate-600" />)}
                    </div>
                    <span className="text-xs text-red-400 font-bold bg-red-500/10 px-2 py-0.5 rounded">VALID.</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">1-2 Étoiles : Ton Empathique & Pro</h4>
                    <p className="text-sm text-slate-400 mt-1">Réponse calme, proposition de contact direct (email/tel). <span className="text-red-300 font-medium">Validation manuelle requise.</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Les bénéfices d'une réponse systématique</h3>
                <ul className="space-y-3">
                  {responseBenefits.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400">
                      <CheckCircle2 className="w-5 h-5 text-lime-500/50 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-900/10 border border-amber-500/20 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="flex items-start gap-4 relative z-10">
                  <ShieldAlert className="w-8 h-8 text-amber-500 shrink-0" />
                  <div>
                    <h4 className="text-lg font-bold text-amber-200 mb-2">Sécurité & Contrôle Total</h4>
                    <p className="text-amber-100/80 leading-relaxed text-sm">
                      Gardez le contrôle sur les avis sensibles. Pour les notes de 1 à 3 étoiles, l'IA rédige un brouillon mais ne publie RIEN sans votre validation. Vous recevez une alerte email, relisez la réponse proposée, et validez (ou modifiez) en un clic. Zéro risque de "bad buzz" automatisé.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section 3 - Articles GMB */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 text-lime-400 text-sm font-medium mb-6">
                <MessageSquare className="w-4 h-4 fill-current" /> Articles SEO & Réseaux Sociaux
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Publiez du contenu sur <span className="text-lime-400">Google, Instagram et Facebook</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Votre présence en ligne ne se limite pas à Google. Je publie automatiquement du contenu optimisé sur votre fiche Google My Business, mais aussi sur vos pages Instagram et Facebook. Un seul effort de création, une diffusion multi-canal.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <TrendingUp className="w-6 h-6 text-lime-400" />
                  Pourquoi publier régulièrement ?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {articleReasons.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-lime-500 mt-2 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Share2 className="w-6 h-6 text-lime-400" />
                  Diffusion automatique sur les réseaux sociaux
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 mb-4">Chaque article créé pour votre fiche Google est automatiquement adapté et publié sur vos réseaux sociaux :</p>
                <ul className="space-y-4">
                  {socialAutomation.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-lime-500 mt-2 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 6. Pricing Section */}
      <section id="tarifs" className="py-24 px-4 bg-slate-900/50 border-t border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Des tarifs simples et tout compris
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Pas de surprise, pas de frais cachés. Chaque abonnement inclut les outils, les API et l'intelligence artificielle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`flex flex-col relative ${
                  plan.popular 
                    ? 'bg-slate-800 border-lime-500 shadow-xl shadow-lime-900/20 scale-105 z-10' 
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-lime-500 text-slate-900 font-bold px-4 py-1 rounded-full text-sm shadow-lg">
                    POPULAIRE
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white mb-2">{plan.title}</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-slate-500">{plan.period}</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-2 font-medium">Frais de mise en place : 390 € TTC (unique)</p>
                  <p className="text-sm text-slate-400 mt-4">{plan.description}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4 mt-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-lime-400' : 'text-slate-500'}`} />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.option && (
                     <div className="mt-6 pt-4 border-t border-slate-700/50">
                       <p className="text-xs text-slate-400 italic">{plan.option}</p>
                     </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button asChild className={`w-full ${plan.popular ? 'bg-lime-500 hover:bg-lime-600 text-slate-900 font-bold' : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'}`}>
                    <Link to="/contact">{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-6 max-w-3xl mx-auto mb-6 flex flex-col md:flex-row gap-4 items-start">
            <Info className="w-6 h-6 text-lime-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-white font-bold mb-1">Frais de mise en place : 390 € TTC (paiement unique)</h4>
              <p className="text-slate-300 text-sm">Ces frais couvrent la configuration complète de votre automatisation. Si vous stoppez votre abonnement et souhaitez le reprendre ultérieurement, aucun nouveau frais de mise en place ne sera facturé.</p>
            </div>
          </div>

          {/* Blog Info Box */}
          <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6 text-center max-w-3xl mx-auto mb-6">
            <p className="text-purple-100">
              <span className="font-bold text-purple-300 mr-2">Option Blog :</span>
              Pour 10&nbsp;€ supplémentaires par mois, chaque article est également publié automatiquement sur votre blog WordPress, Shopify, Wix ou tout autre CMS disposant d'une API. Votre blog reste actif sans effort et améliore votre SEO global.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center max-w-3xl mx-auto">
            <p className="text-slate-300">
              <span className="text-lime-400 mr-2">ℹ️</span>
              Tous les abonnements sont <strong>sans engagement</strong>. Vous pouvez arrêter quand vous voulez, il se désactivera à la fin du mois suivant.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Final CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
            Boostez votre visibilité locale dès maintenant
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Ne laissez plus vos concurrents prendre votre place. Automatisez votre présence Google My Business et concentrez-vous sur votre métier.
          </p>
          <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-200 text-lg px-10 py-6 h-auto rounded-full shadow-lg shadow-white/5 transition-all hover:scale-105">
            <Link to="/contact">
              Contactez-moi pour démarrer <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default GoogleMyBusinessPage;