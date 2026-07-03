import React from 'react';
import { CircuitBoardIllustration } from '@/components/HeroIllustrations';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Workflow, Clock, TrendingUp, Settings, Calendar, CheckCircle2, ArrowRight, Check, MapPin, MessageSquare, Key, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { getCanonicalUrl } from '@/lib/canonicalUrlHandler';

const AutomatisationHubPage = () => {
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);

  const features = [
    {
      icon: Zap,
      title: 'Workflows Personnalisés',
      description: 'Création d\'automatisations adaptées à vos besoins spécifiques'
    },
    {
      icon: Workflow,
      title: 'Intégrations Multi-outils',
      description: 'Connexion de tous vos outils marketing et CRM'
    },
    {
      icon: Clock,
      title: 'Gain de Temps',
      description: 'Automatisez les tâches répétitives et concentrez-vous sur l\'essentiel'
    },
    {
      icon: TrendingUp,
      title: 'Croissance Accélérée',
      description: 'Scalez votre activité sans augmenter vos équipes'
    }
  ];

  const services = [
    {
      icon: MapPin,
      title: 'Google My Business',
      description: 'Optimisez votre fiche GMB et répondez automatiquement aux avis pour améliorer votre SEO local.',
      link: '/google-my-business',
      color: 'text-blue-400'
    },
    {
      icon: MessageSquare,
      title: 'Réponse Leads',
      description: 'Qualifiez et répondez instantanément à vos leads entrants pour ne jamais manquer une opportunité.',
      link: '/reponse-leads',
      color: 'text-violet-400'
    },
    {
      icon: Key,
      title: 'Service pour conciergerie',
      description: 'Répondez automatiquement aux messages de vos voyageurs Airbnb et Booking 24h/24. Gérez plusieurs logements sans multiplier le temps passé.',
      link: '/conciergerie',
      color: 'text-emerald-400'
    },
    {
      icon: LayoutDashboard,
      title: 'Back office conciergerie',
      description: 'Fiches contact automatiques, statistiques en temps réel par propriétaire, rapports automatiques et facturation entièrement automatisée.',
      link: '/back-office-conciergerie',
      color: 'text-cyan-400'
    }
  ];

  const benefits = [
    'Audit de vos processus actuels',
    'Workflows Make/n8n personnalisés',
    'Intégration CRM et outils marketing',
    'Automatisation email',
    'Synchronisation données',
    'Notifications automatiques',
    'Formation équipe',
    'Création de CRM personnalisé'
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <Helmet>
        <title>Automatisation Marketing : Workflows & Make | JUH Ecomm</title>
        <meta name="description" content="Automatisez votre marketing avec notre hub complet. Workflows intelligents, optimisation continue et gain de temps pour accélérer votre croissance." />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph tags */}
        <meta property="og:site_name" content="Juh Ecomm Data" />
        <meta property="og:title" content="Automatisation Marketing Hub | JUH Ecomm Data" />
        <meta property="og:description" content="Automatisez votre marketing avec workflows intelligents. Optimisation continue et gain de temps." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
        <meta property="og:locale" content="fr_FR" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@juh_ecomm" />
        <meta name="twitter:title" content="Automatisation Marketing Hub | JUH Ecomm Data" />
        <meta name="twitter:description" content="Automatisez votre marketing avec notre hub complet. Workflows intelligents et optimisation continue." />
        <meta name="twitter:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
        <meta name="twitter:url" content={canonicalUrl} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <CircuitBoardIllustration />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-slate-900 to-slate-900" />
        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Automatisation Hub
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-8 leading-relaxed">
            Automatisez vos processus marketing et gagnez un temps précieux
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-8">
              <Link to="/contact">Démarrer maintenant</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* NEW: Specialized Services Section */}
      <section className="py-20 px-4 bg-slate-950/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Nos Solutions Spécialisées</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Découvrez nos packs d'automatisation clés en main pour des besoins spécifiques.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="bg-slate-900 border-slate-800 hover:border-violet-500/50 transition-all duration-300 flex flex-col h-full group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-slate-800/80 transition-colors`}>
                    <service.icon className={`w-6 h-6 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-slate-400 leading-relaxed">{service.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 p-0 h-auto font-medium">
                    <Link to={service.link} className="flex items-center">
                      En savoir plus <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Cards Section */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 transition-all duration-300">
                <CardHeader>
                  <feature.icon className="w-10 h-10 text-violet-400 mb-4" />
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 bg-slate-950/50 border-y border-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Un modèle tarifaire simple et transparent
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Pas de forfait obscur ni de surprise en fin de mois. Ma tarification est claire et adaptée à vos besoins réels.
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card 1: Set-up */}
            <Card className="bg-slate-900 border-slate-800 flex flex-col h-full hover:border-violet-500/50 transition-colors group">
              <CardHeader>
                <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
                  <Settings className="w-6 h-6 text-violet-400" />
                </div>
                <CardTitle className="text-xl font-bold text-white">Set-up sur devis</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400 leading-relaxed flex-grow">
                Chaque automatisation est unique. Je définis avec vous le périmètre exact de la mission et vous propose un devis adapté à la complexité de la tâche à réaliser. Vous savez précisément ce que vous payez avant de démarrer.
              </CardContent>
            </Card>

            {/* Card 2: Abonnement */}
            <Card className="bg-slate-900 border-slate-800 flex flex-col h-full hover:border-violet-500/50 transition-colors relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
              <CardHeader>
                <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
                  <Calendar className="w-6 h-6 text-violet-400" />
                </div>
                <CardTitle className="text-xl font-bold text-white">Abonnement mensuel</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400 leading-relaxed flex-grow">
                Une fois l'automatisation en place, un abonnement mensuel couvre son fonctionnement. Le montant est dimensionné en fonction du volume d'actions automatisées. Ce tarif inclut tous les frais liés aux outils, aux API et aux services d'intelligence artificielle utilisés.
              </CardContent>
            </Card>

            {/* Card 3: Sans engagement */}
            <Card className="bg-slate-900 border-slate-800 flex flex-col h-full hover:border-violet-500/50 transition-colors group">
              <CardHeader>
                <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-violet-400" />
                </div>
                <CardTitle className="text-xl font-bold text-white">Sans engagement</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400 leading-relaxed flex-grow">
                Vous restez libre. Sur simple demande, vous pouvez stopper une automatisation à tout moment. L'arrêt prend effet à la fin du mois suivant votre demande, sans frais ni pénalité.
              </CardContent>
            </Card>
          </div>

          {/* Summary Box */}
          <div className="bg-violet-900/10 border border-violet-500/30 rounded-xl p-6 md:p-8 text-center max-w-3xl mx-auto mb-12">
            <p className="text-lg md:text-xl font-medium text-violet-200">
              En résumé : un devis clair pour la mise en place + un abonnement mensuel tout compris + la liberté d'arrêter quand vous voulez.
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-200 text-lg px-8 py-6 h-auto rounded-full shadow-lg shadow-white/5 transition-all hover:scale-105">
              <Link to="/contact">
                Demandez votre devis personnalisé <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Les bénéfices de l'automatisation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                <div className="mt-1 bg-violet-500/20 p-1.5 rounded-full">
                  <Check className="w-4 h-4 text-violet-400" />
                </div>
                <span className="text-slate-300 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Prêt à automatiser votre croissance ?</h2>
          <p className="text-lg text-slate-400 mb-10">
            Discutons de vos besoins et identifions ensemble les opportunités d'automatisation pour votre business.
          </p>
          <Button asChild size="lg" className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-10 py-6 h-auto text-lg">
            <Link to="/contact">Réserver un audit gratuit</Link>
          </Button>
        </div>
      </section>

    </div>
  );
};

export default AutomatisationHubPage;