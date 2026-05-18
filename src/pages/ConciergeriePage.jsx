import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Clock, TrendingUp, ShieldCheck, Home, Key, Users, Wifi, MapPin, Coffee, AlertCircle, ArrowRight, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useDataLayer } from '@/contexts/DataLayerContext';
import { getCanonicalUrl } from '@/lib/canonicalUrlHandler';

const ConciergeriePage = () => {
  const { pushEvent } = useDataLayer();
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCtaClick = (location) => {
    pushEvent('cta_click', {
      cta_location: location,
      cta_text: 'Démarrer',
      service: 'Conciergerie Automation'
    });
  };

  const targetAudience = [
    {
      icon: Users,
      title: "Conciergeries",
      description: "Gérez plus de lots sans augmenter votre personnel de support."
    },
    {
      icon: Home,
      title: "Multi-propriétaires",
      description: "Centralisez la communication de tous vos appartements."
    },
    {
      icon: Key,
      title: "Gestionnaires",
      description: "Offrez une réactivité 5 étoiles à vos clients propriétaires."
    },
    {
      icon: Star,
      title: "Superhosts",
      description: "Maintenez votre badge grâce à un taux de réponse de 100%."
    }
  ];

  const benefits = [
    {
      title: "Gagnez des heures chaque semaine",
      description: "Ne répondez plus 10 fois par jour aux mêmes questions (wifi, parking, heure d'arrivée)."
    },
    {
      title: "Répondez 24h/24, 7j/7",
      description: "Votre assistant virtuel ne dort jamais. Vos voyageurs reçoivent une réponse immédiate, même la nuit."
    },
    {
      title: "Gérez plus de logements sans stress",
      description: "Passez de 5 à 50 logements sans noyer votre service client sous les demandes."
    },
    {
      title: "Améliorez votre taux de réponse",
      description: "Les plateformes favorisent les hôtes réactifs. Boostez votre classement Airbnb et Booking."
    },
    {
      title: "Expérience voyageur parfaite",
      description: "Des réponses précises, polies et instantanées créent un effet 'Wow' chez vos invités."
    },
    {
      title: "Réduisez les erreurs",
      description: "Plus d'oubli d'envoi du code de la boîte à clé ou du manuel de la maison."
    }
  ];

  const conversationExamples = [
    {
      guest: "Bonjour, quel est le code du Wi-Fi ?",
      bot: "Bonjour ! Le réseau est 'Appartement_Cosy' et le mot de passe est 'Vacances2024'. Vous trouverez aussi un QR code sur la table basse pour vous connecter directement. Bon séjour !"
    },
    {
      guest: "Est-ce qu'on peut laisser nos valises avant le check-in ?",
      bot: "Le check-in est prévu à 15h, mais vous pouvez déposer vos bagages dès 11h dans la consigne sécurisée située dans le hall. Voici le code pour y accéder : 1234."
    },
    {
      guest: "On cherche un bon resto italien dans le coin, une idée ?",
      bot: "Absolument ! Je vous recommande 'La Dolce Vita' à 5 min à pied, ils font d'excellentes pizzas. Sinon, 'Pasta & Basta' est super pour les familles. Je vous envoie les adresses."
    }
  ];

  const faqs = [
    {
      q: "Qu'est-ce que l'automatisation Airbnb & Booking et pourquoi est-ce important pour les gestionnaires immobiliers ?",
      a: "L'automatisation Airbnb & Booking consiste à utiliser l'intelligence artificielle pour gérer automatiquement les interactions avec vos voyageurs sur ces plateformes. Pour les gestionnaires de conciergeries ou de parcs locatifs, c'est devenu essentiel car : (1) Les voyageurs attendent des réponses instantanées 24h/24, (2) Gérer manuellement 10+ logements génère des centaines de messages identiques par semaine, (3) Les algorithmes d'Airbnb et Booking favorisent les hôtes ultra-réactifs dans leurs classements. Notre système répond automatiquement aux questions récurrentes (Wi-Fi, check-in, équipements) tout en vous alertant pour les demandes complexes nécessitant votre intervention humaine."
    },
    {
      q: "Comment l'automatisation réduit-elle concrètement ma charge de travail pour gérer plusieurs propriétés ?",
      a: "Pour chaque logement, vous recevez en moyenne 15 à 30 messages par réservation (avant, pendant et après le séjour). Multipliez cela par 20 logements et 50 réservations mensuelles : vous obtenez plus de 1000 messages à traiter manuellement. Notre système d'automatisation prend en charge 70 à 85% de ces messages en répondant instantanément aux questions standard (codes d'accès, horaires, règlement intérieur, recommandations locales). Résultat : vous passez de 4-5h/jour de messagerie à moins d'1h pour traiter uniquement les demandes spécifiques. Vous pouvez ainsi gérer 3 fois plus de logements avec la même équipe."
    },
    {
      q: "Quelles tâches peuvent être automatisées entre Airbnb et Booking ?",
      a: "Notre système automatise plusieurs flux de travail critiques : (1) Messagerie voyageurs : réponses automatiques aux questions fréquentes (Wi-Fi, parking, accès, équipements, horaires), envoi des instructions de check-in/check-out, recommandations locales. L'automatisation ne remplace pas votre expertise, elle libère votre temps pour vous concentrer sur l'expérience client et le développement de votre activité."
    },
    {
      q: "Comment l'automatisation améliore-t-elle la communication avec les voyageurs et les temps de réponse ?",
      a: "Les plateformes Airbnb et Booking pénalisent les hôtes dont le taux de réponse est inférieur à 90% ou dont le temps de réponse dépasse 1 heure. Avec l'automatisation, vos temps de réponse passent de plusieurs heures (voire le lendemain) à quelques secondes. L'impact est triple : (1) Meilleur classement : Airbnb met en avant les Superhosts qui répondent en moins d'1 heure à 90%+ des messages, (2) Satisfaction voyageur accrue : un touriste qui attend 6h pour connaître le code Wi-Fi commence son séjour frustré, avec une réponse instantanée, vous créez un 'effet wow' dès le premier contact, (3) Moins d'annulations : les voyageurs qui n'obtiennent pas de réponse rapide avant leur arrivée ont tendance à annuler ou laisser des avis négatifs. L'automatisation transforme la messagerie d'un fardeau en avantage compétitif."
    },
    {
      q: "L'automatisation peut-elle m'aider avec l'optimisation des tarifs sur plusieurs plateformes ?",
      a: "L'automatisation de la messagerie que nous proposons se concentre sur la communication avec les voyageurs. Pour l'optimisation tarifaire dynamique (dynamic pricing), nous recommandons des outils spécialisés comme PriceLabs, Wheelhouse ou Beyond Pricing qui analysent la demande locale, les événements, la concurrence et ajustent automatiquement vos tarifs. Cependant, notre système peut être couplé à ces outils pour créer un écosystème complet : pendant que votre revenue management optimise les prix, notre IA gère la communication, répondant notamment aux questions sur les tarifs spéciaux, les réductions longue durée ou les conditions d'annulation. L'objectif est de créer une machine de conversion où chaque élément travaille en synergie."
    },
    {
      q: "Comment les données et la vie privée des voyageurs sont-elles protégées dans un système automatisé ?",
      a: "La protection des données est notre priorité absolue, d'autant plus que nous traitons des informations sensibles (coordonnées, dates de séjour, parfois moyens de paiement). Notre système respecte le RGPD et les politiques de confidentialité d'Airbnb/Booking : (1) Chiffrement de bout en bout : toutes les données échangées sont cryptées, (2) Stockage sécurisé : les conversations sont hébergées sur des server européen certifiés, (3) Accès limité : seuls vous et votre équipe autorisée pouvez consulter les messages, l'IA ne stocke pas les données personnelles après traitement, (4) Conformité plateforme : nous respectons strictement les conditions d'utilisation d'Airbnb et Booking concernant l'automatisation. Les voyageurs ne savent pas qu'ils parlent à une IA (sauf si vous choisissez de le mentionner), et vous gardez un contrôle total avec la possibilité de valider les réponses avant envoi."
    },
    {
      q: "Combien de temps faut-il pour mettre en place l'automatisation complète ?",
      a: "Le déploiement se fait en 3 phases distinctes : (1) Phase d'audit et collecte (1-2 jours) : vous nous transmettez tous les documents relatifs à vos logements (guides de séjour, règlements, codes Wi-Fi, instructions d'accès, recommandations locales). Nous organisons un atelier pour comprendre vos processus et les questions les plus fréquentes, (2) Phase de paramétrage (3-5 jours) : nous configurons l'IA avec vos informations, créons des scénarios de réponse pour chaque type de question, testons le système en interne pour éliminer les erreurs, (3) Phase pilote (7-14 jours) : démarrage sur 1-3 logements en mode supervision (vous validez chaque réponse avant envoi), ajustements progressifs selon vos retours, passage en mode autonome une fois que vous êtes satisfait. Total : comptez 2 à 3 semaines entre le premier contact et l'automatisation complète de votre premier logement. Les logements suivants sont déployés en 24-48h car le système est déjà configuré."
    },
    {
      q: "Quelles économies puis-je réaliser en automatisant la gestion Airbnb & Booking ?",
      a: "Les économies se mesurent en temps et en coûts opérationnels. Prenons l'exemple d'une conciergerie gérant 20 logements avec 40 réservations/mois : (1) Temps gagné : 4h/jour de messagerie = 120h/mois. Si vous externalisez à un assistant virtuel à 15€/h, cela représente 1800€/mois économisés, (2) Coûts d'opportunité : avec le temps libéré, vous pouvez gérer 10 logements supplémentaires (soit +50% de revenus) sans embaucher, (3) Moins de turnover : vos équipes ne sont plus épuisées par la gestion répétitive des messages, vous réduisez les coûts de formation et de recrutement, (4) Meilleure conversion : un taux de réponse de 100% en moins de 5 minutes augmente votre taux de conversion des demandes en réservations confirmées de 15 à 25%. Pour un parc de 20 logements facturant 2000€/mois chacun, l'automatisation coûte environ 180€/mois (20 x 8,90€) mais génère un ROI de 10x à 15x en gains de productivité et revenus supplémentaires."
    },
    {
      q: "L'automatisation peut-elle gérer des scénarios complexes comme les annulations et la prévention des surbookings?",
      a: "Notre système de messagerie IA gère intelligemment les cas standards, mais pour les scénarios critiques (annulations, litiges, surbookings), une intervention humaine reste indispensable. Voici notre approche : (1) Annulations : l'IA détecte les demandes d'annulation et vous alerte immédiatement sans répondre, vous gérez ensuite selon votre politique (remboursement partiel, proposition de report, négociation), (2) Surbooking : si un voyageur signale une erreur de disponibilité, le système vous notifie en urgence et bloque l'envoi de réponses automatiques sur cette conversation, (3) Plaintes/Problèmes : l'IA reconnaît les messages contenant des mots-clés négatifs (problème, cassé, sale, bruit) et les escalade vers vous avec un marqueur de priorité haute, (4) Demandes spécifiques : early check-in, late check-out, animaux de compagnie, événements spéciaux... tout ce qui sort du cadre standard est transmis pour traitement manuel. En résumé : l'automatisation prend en charge 80% du volume (questions répétitives, informations standard) et vous laisse gérer les 20% critiques qui nécessitent votre expertise et votre jugement humain. C'est le meilleur des deux mondes."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <Helmet>
        <title>Conciergerie Marketing : Pilotage Expert | JUH Ecomm Data</title>
        <meta name="description" content="Service de conciergerie marketing : pilotage expert de vos campagnes, optimisation continue et résultats mesurables pour votre croissance e-commerce." />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Service Conciergerie Marketing | JUH Ecomm Data" />
        <meta property="og:description" content="Service de conciergerie marketing pour piloter votre stratégie. Expertise, optimisation continue et résultats garantis." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://www.juh-ecomm.fr/images/conciergerie-og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Conciergerie Marketing Expert | JUH Ecomm Data" />
        <meta name="twitter:description" content="Maîtrisez votre stratégie marketing avec notre service de conciergerie. Pilotage expert et résultats mesurables." />
        <meta name="twitter:url" content={canonicalUrl} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-900/30 via-slate-900 to-slate-900" />
        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <div className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">
            Nouveau Service
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Service pour conciergerie :<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400">
              automatisation Airbnb & Booking
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            Libérez-vous de la gestion des messages. Notre système répond intelligemment à vos voyageurs 24h/24 et 7j/7, pour que vous puissiez vous concentrer sur la croissance de votre parc.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-slate-900 hover:bg-slate-200 rounded-full px-8 py-6 h-auto text-lg font-semibold"
              onClick={() => handleCtaClick('hero')}
            >
              <Link to="/contact">Démarrer à 8,90€</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-slate-700 hover:bg-slate-800 text-slate-300 rounded-full px-8 py-6 h-auto text-lg"
            >
              <a href="#tarifs">Voir les tarifs</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Pour qui ? */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Pour qui est fait ce service ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudience.map((item, index) => (
              <Card key={index} className="bg-slate-900 border-slate-700/50 hover:border-violet-500/30 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <CardTitle className="text-lg text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 bg-gradient-to-r from-violet-900/20 to-cyan-900/20 border border-violet-500/20 rounded-xl p-6 text-center max-w-3xl mx-auto">
            <p className="text-lg text-violet-200">
              <TrendingUp className="inline-block w-5 h-5 mr-2 -mt-1" />
              <strong>Le saviez-vous ?</strong> Le gain de temps est exponentiel. Automatiser 1 logement est pratique, automatiser 20 logements change votre vie.
            </p>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-24 px-4 bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-8 text-white">Ce que le système gère automatiquement</h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="mt-1 bg-cyan-500/10 p-2 rounded-lg h-fit">
                    <Wifi className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">1. Informations pratiques</h4>
                    <p className="text-slate-400 leading-relaxed">
                      Adresse, codes Wi-Fi, heures de check-in/out, règlement intérieur, fonctionnement des équipements, parking...
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 bg-violet-500/10 p-2 rounded-lg h-fit">
                    <Home className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">2. Questions sur les prestations</h4>
                    <p className="text-slate-400 leading-relaxed">
                      Linge de lit, machine à café, gestion des poubelles, remise des clés, chauffage/climatisation...
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 bg-lime-500/10 p-2 rounded-lg h-fit">
                    <MapPin className="w-6 h-6 text-lime-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">3. Activités et vie locale</h4>
                    <p className="text-slate-400 leading-relaxed">
                      Recommandations de restaurants, supermarchés à proximité, transports en commun, activités touristiques...
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-2xl">
              <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Exemples réels</h4>
              <div className="space-y-6">
                {conversationExamples.map((conv, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-slate-800 text-slate-200 py-2 px-4 rounded-2xl rounded-tr-sm text-sm max-w-[85%]">
                        {conv.guest}
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-violet-600 text-white py-2 px-4 rounded-2xl rounded-tl-sm text-sm max-w-[90%] shadow-lg">
                        {conv.bot}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Validation Workflow */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-12">Vous gardez le contrôle</h2>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-700 -z-10" />
            
            {[
              { step: 1, text: "Réception message" },
              { step: 2, text: "Analyse IA" },
              { step: 3, text: "Brouillon généré" },
              { step: 4, text: "Validation (optionnelle)" },
              { step: 5, text: "Envoi" }
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center bg-slate-900 md:bg-transparent p-4 md:p-0 rounded-lg w-full md:w-auto">
                <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-violet-500 flex items-center justify-center font-bold text-violet-400 mb-2 z-10">
                  {item.step}
                </div>
                <span className="text-sm font-medium text-slate-300">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex items-start gap-3 text-left">
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-100/80">
              <strong>Sécurité avant tout :</strong> Si l'IA n'a pas de réponse, a un doute ou si la question est trop complexe, elle ne répond pas et vous notifie immédiatement pour prendre le relais. Aucune réponse hasardeuse n'est envoyée.
            </p>
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-16 px-4 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-8">Intégration directe avec vos plateformes</h2>
          <div className="flex flex-wrap justify-center gap-8 items-center grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 bg-white text-[#FF5A5F] px-6 py-3 rounded-lg font-bold text-xl shadow-lg">
              <svg viewBox="0 0 32 32" className="w-8 h-8 fill-current"><path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 15.465 9.575 22.023L31 27.574l-1.574.66c-.22.09-.76.32-1.38.56l-1.12.42c-2.3.84-5.32 1.48-6.9.96-.92-.3-1.46-.86-2-1.88-1.56-2.92-5.78-9.43-9.98-15.6l-.37-.53-.4.56c-4.14 5.95-8.38 12.56-10.02 15.65-.54.98-1.08 1.56-2 1.84-1.6.5-4.6-.14-6.9-.98l-1.08-.4c-.64-.24-1.2-.48-1.42-.56L0 27.6l.14-.27c3.46-6.56 7.62-18.2 9.57-22.02l.53-1.02C11.53 1.96 13 1 15 1zm0 2c-1.25 0-2.3.62-3.1 2.06l-.52 1.01c-1.93 3.8-6.07 15.35-9.48 21.8l2.06.76c2.4.88 4.73 1.23 5.4.98.05 0 .1-.04.16-.1l.16-.3c1.67-3.16 6.06-9.97 10.33-16.1l.6-.86.58.86c4.27 6.13 8.66 12.94 10.33 16.1l.16.3c.06.07.1.1.16.12.65.23 2.98-.12 5.37-.98l2.05-.8c-3.42-6.42-7.55-18-9.48-21.8l-.52-1.02C18.3 3.63 17.25 3 16 3z"/></svg>
              Airbnb
            </div>
            <div className="flex items-center gap-2 bg-[#003580] text-white px-6 py-3 rounded-lg font-bold text-xl shadow-lg">
              Booking.com
            </div>
          </div>
          <p className="mt-6 text-slate-400">
            Nécessite une adresse GMAIL et un travail en amont pour récolter et organiser toutes les informations nécessaires au bon fonctionnement de l'agent IA.
          </p>
        </div>
      </section>

      {/* Advantages Grid */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi automatiser la messagerie ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-6 bg-slate-800/20 border border-slate-700 rounded-xl hover:bg-slate-800/50 transition-colors">
                <div className="w-10 h-10 bg-violet-500/10 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-slate-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-sell GMB */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 lg:p-12 border border-slate-700 relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-4">Combinez avec Google My Business</h3>
                <p className="text-slate-300 mb-6">
                  Vous avez un site vitrine pour votre gîte ou votre conciergerie ? Ne négligez pas votre visibilité locale. 
                  Nous pouvons aussi automatiser les réponses aux avis Google et optimiser votre fiche pour attirer plus de clients directs.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center text-slate-400 text-sm">
                    <Check className="w-4 h-4 text-cyan-400 mr-2" /> Réponse aux avis 5 étoiles et négatifs
                  </li>
                  <li className="flex items-center text-slate-400 text-sm">
                    <Check className="w-4 h-4 text-cyan-400 mr-2" /> Publication automatique de posts
                  </li>
                </ul>
                <Button asChild variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-950">
                  <Link to="/google-my-business">Découvrir l'automatisation GMB</Link>
                </Button>
              </div>
              <div className="hidden lg:block">
                <MapPin className="w-40 h-40 text-slate-700/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Launch Offer */}
      <section id="tarifs" className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Une tarification simple, par logement</h2>
            <div className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-2 rounded-full font-bold shadow-lg transform hover:scale-105 transition-transform">
              🚀 Offre de lancement : -30% les 3 premiers mois
            </div>
          </div>

          <Card className="bg-slate-900 border-2 border-violet-500 overflow-hidden relative shadow-2xl shadow-violet-900/20">
            <div className="absolute top-0 right-0 bg-violet-500 text-white px-4 py-1 rounded-bl-lg font-bold text-sm">
              Populaire
            </div>
            <CardHeader className="text-center pt-10 pb-2">
              <CardTitle className="text-2xl text-white">Pack Sérénité</CardTitle>
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="text-slate-400 line-through text-xl">12,90€</span>
                <span className="text-5xl font-extrabold text-white">8,90€</span>
                <span className="text-slate-400 self-end mb-2">/logement/mois</span>
              </div>
              <p className="text-sm text-violet-300 font-medium mt-2">Prix fixe pour 3 mois, puis 12,90€ TTC</p>
            </CardHeader>
            <CardContent className="px-8 py-8">
              <ul className="space-y-4 mb-8">
                {[
                  "Réponses illimitées 24/7",
                  "Support multilingue (FR, EN, ES, IT...)",
                  "Intégration Airbnb & Booking",
                  "Support technique"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-white mb-4 text-center">Exemples de facturation (offre lancement)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-2 border border-slate-700 rounded">
                    <div className="text-xs text-slate-400">1 Logement</div>
                    <div className="font-bold text-white">8,90€</div>
                  </div>
                  <div className="p-2 border border-slate-700 rounded">
                    <div className="text-xs text-slate-400">5 Logements</div>
                    <div className="font-bold text-white">44,50€</div>
                  </div>
                  <div className="p-2 border border-slate-700 rounded">
                    <div className="text-xs text-slate-400">10 Logements</div>
                    <div className="font-bold text-white">89,00€</div>
                  </div>
                  <div className="p-2 border border-slate-700 rounded bg-violet-500/10 border-violet-500/30">
                    <div className="text-xs text-violet-300">20+ Logements</div>
                    <div className="font-bold text-white">Sur devis</div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <Button asChild size="lg" className="w-full md:w-auto bg-white text-slate-900 hover:bg-slate-200 text-lg px-12 py-6 h-auto font-bold rounded-full">
                  <Link to="/contact" onClick={() => handleCtaClick('pricing_table')}>
                    Démarrer à 8,90€
                  </Link>
                </Button>
                <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Sans engagement, annulable à tout moment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Questions Fréquentes</h2>
            <p className="text-slate-400">Tout ce que vous devez savoir sur l'automatisation Airbnb & Booking pour conciergeries.</p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-slate-800 rounded-lg bg-slate-900/50 px-4">
                <AccordionTrigger className="text-white hover:text-violet-400 text-left text-lg font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 leading-relaxed pt-2 pb-4 text-base whitespace-pre-wrap">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-slate-950 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Libérez-vous de la messagerie</h2>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed">
            Vos voyageurs méritent des réponses instantanées. Vous méritez de vraies nuits de sommeil.
            Testez notre solution sur un logement et voyez la différence.
          </p>
          <Button asChild size="lg" className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-10 py-6 h-auto text-lg">
            <Link to="/contact" onClick={() => handleCtaClick('footer')}>
              Contactez-moi pour démarrer
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

// Helper component for checklist items
const CheckCircle2 = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default ConciergeriePage;