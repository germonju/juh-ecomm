import React from "react";
import { DataNetworkIllustration } from '@/components/HeroIllustrations';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Zap,
  Target,
  ArrowRight,
  BarChart3,
  Gauge,
  Shield,
  Briefcase,
  Building2,
  Calculator,
  ExternalLink,
  HelpCircle,
  CheckCircle,
  Award,
  Star,
  DollarSign,
  HeartHandshake as Handshake,
} from "lucide-react";
import { useDataLayer } from "@/contexts/DataLayerContext";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";
import TrustLogosCarousel from "@/components/TrustLogosCarousel";

const HomePage = () => {
  const { pushEvent } = useDataLayer();

  const handleCTAClick = (ctaName, ctaLocation) => {
    pushEvent("cta_click", {
      cta_name: ctaName,
      cta_location: ctaLocation,
      page_path: "/",
    });
  };

  const services = [
    {
      icon: TrendingUp,
      title: "Tracking Hub",
      description:
        "Configuration complète de votre tracking e-commerce / Leadgen pour des données fiables et exploitables.",
      link: "/tracking-data",
      color: "cyan",
    },
    {
      icon: Zap,
      title: "GTM Server-Side",
      description:
        "Implémentation du tracking côté serveur pour une précision maximale et récupérer 25 % de data supplémentaire.",
      link: "/tracking-data/gtm-server-side",
      color: "violet",
    },
    {
      icon: BarChart3,
      title: "GA4 Avancé",
      description: "Configuration avancée de Google Analytics 4 avec événements personnalisés et tableaux de bord.",
      link: "/tracking-data/ga4",
      color: "lime",
    },
    {
      icon: Gauge,
      title: "Automatisation",
      description: "Automatisez vos processus marketing et gagnez un temps précieux avec nos solutions sur mesure.",
      link: "/automatisation-ia",
      color: "cyan",
    },
    {
      icon: Target,
      title: "Audit Google Ads",
      description: "Analyse complète de vos campagnes publicitaires pour optimiser votre ROI.",
      link: "/tracking-data/audit-google-ads",
      color: "violet",
    },
    {
      icon: Shield,
      title: "Consent Mode",
      description: "Mise en conformité RGPD avec le Consent Mode V2 pour respecter la vie privée de vos utilisateurs.",
      link: "/tracking-data/consent-mode",
      color: "lime",
    },
  ];

  const stats = [
    {
      value: "50+",
      label: "Sites Trackés",
    },
    {
      value: "98%",
      label: "Satisfaction Client",
    },
    {
      value: "10M+",
      label: "Events Analysés/mois",
    },
    {
      value: "15 ans",
      label: "D'Expérience",
    },
  ];

  return (
    <>
      <SeoHead route="/" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": "https://www.juh-ecomm.fr/#julien",
              "name": "Julien Germon",
              "jobTitle": "Expert Tracking & Data Analytics",
              "description": "Consultant Senior en tracking e-commerce, GTM Server-Side, GA4 et automatisation marketing. +15 ans d'expérience.",
              "url": "https://www.juh-ecomm.fr",
              "sameAs": ["https://www.digitalkeys.fr"],
              "worksFor": { "@type": "Organization", "name": "Digitalkeys", "url": "https://www.digitalkeys.fr" },
              "knowsAbout": ["GTM Server-Side","Google Analytics 4","Google Ads","Consent Mode V2","Tracking E-commerce","Automatisation Marketing","Shopify","RGPD"]
            },
            {
              "@type": "WebSite",
              "@id": "https://www.juh-ecomm.fr/#website",
              "url": "https://www.juh-ecomm.fr",
              "name": "Juh Ecomm Data",
              "description": "Expert freelance en tracking e-commerce, GTM Server-Side, GA4 et automatisation marketing pour TPE et PME.",
              "inLanguage": "fr-FR",
              "publisher": { "@id": "https://www.juh-ecomm.fr/#julien" }
            },
            {
              "@type": "ProfessionalService",
              "@id": "https://www.juh-ecomm.fr/#service",
              "name": "Juh Ecomm Data",
              "url": "https://www.juh-ecomm.fr",
              "description": "Services freelance en tracking e-commerce, GTM Server-Side, GA4, Google Ads et automatisation marketing.",
              "provider": { "@id": "https://www.juh-ecomm.fr/#julien" },
              "areaServed": { "@type": "Country", "name": "France" },
              "serviceType": ["Tracking E-commerce","GTM Server-Side","Google Analytics 4","Audit Google Ads","Consent Mode","Automatisation Marketing"]
            }
          ]
        })}</script>
      </Helmet>

      <div className="pt-16 lg:pt-20">
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 lg:py-32">
          <DataNetworkIllustration />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMmQ3ZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJjMC0xLjEtLjktMi0yLTJ6bTAtNGgyYzEuMSAwIDIgLjkgMiAyaC0ydi0yem0tMiAydjJoMnYtMmgtMnptLTIgMGgtMnYyaDJ2LTJ6bTItMnYtMmgydjJoLTJ6bTAtNGgydi0yYzAtMS4xLS45LTItMi0ydjJoMnptLTIgMnYtMmgtMnYyaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-violet-400 to-lime-400 bg-clip-text text-transparent">
                Expert Tracking E-commerce & Leadgen | Data Analytics
              </h1>
              <p className="text-xl lg:text-2xl text-slate-300 mb-8 leading-relaxed">
                Transformez vos données en croissance. Configurez un système de mesure fiable pour prendre les bonnes décisions.
              </p>

              {/* Technologies Block */}
              <div className="hero-tech">
                <span className="hero-tech-label">Technologies maîtrisées</span>
                <div className="hero-tech-logos">
                  <div className="tech-item">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                      <img src="/images/logos/ga4.svg" alt="GA4" width="32" height="32" decoding="async" loading="lazy" />
                      <span className="tech-label">GA4</span>
                    </div>
                  </div>
                  <div className="tech-item">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                      <img src="/images/logos/gtm.webp" alt="GTM" width="32" height="32" decoding="async" loading="lazy" />
                      <span className="tech-label">GTM</span>
                    </div>
                  </div>
                  <div className="tech-item">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                      <img src="/images/logos/google-ads.webp" alt="Google Ads" width="32" height="32" decoding="async" loading="lazy" />
                      <span className="tech-label">GOOGLE ADS</span>
                    </div>
                  </div>
                  <div className="tech-item">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                      <img src="/images/logos/matomo.svg" alt="Matomo" width="32" height="32" decoding="async" loading="lazy" />
                      <span className="tech-label">MATOMO</span>
                    </div>
                  </div>
                  <div className="tech-item">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                      <img src="/images/logos/addingwell.webp" alt="Addingwell" width="32" height="32" decoding="async" loading="lazy" />
                      <span className="tech-label">ADDINGWELL</span>
                    </div>
                  </div>
                  <div className="tech-item">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                      <img src="/images/logos/n8n.webp" alt="n8n" width="32" height="32" decoding="async" loading="lazy" />
                      <span className="tech-label">N8N</span>
                    </div>
                  </div>
                  <div className="tech-item">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                      <img src="/images/logos/make.webp" alt="Make" width="32" height="32" decoding="async" loading="lazy" />
                      <span className="tech-label">MAKE</span>
                    </div>
                  </div>
                  <div className="tech-item">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                      <img src="/images/logos/claude.webp" alt="Claude" width="32" height="32" decoding="async" loading="lazy" />
                      <span className="tech-label">CLAUDE</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  <Link to="/contact" onClick={() => handleCTAClick("Démarrer un projet", "hero")}>
                    Démarrer un projet
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-semibold px-8 py-6 text-lg rounded-full transition-all"
                >
                  <Link to="/tracking-data" onClick={() => handleCTAClick("Découvrir mes services", "hero")}>
                    Découvrir mes services
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-sm lg:text-base">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <TrustLogosCarousel />

        {/* WHY CHOOSE ME SECTION */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                  {/* LEFT SIDE: Photo & Core Identity */}
                  <div className="lg:col-span-4 flex flex-col items-center lg:items-center text-center">
                    <div className="relative mb-8 group">
                      <div className="absolute -inset-1 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition duration-500" />

                      <div className="relative rounded-full p-1 bg-gradient-to-br from-white/20 to-white/5 border border-white/10 shadow-2xl">
                        <img
                          src="/images/julien-germon.webp"
                          alt="Julien Germon, expert en tracking et stratégie data depuis 15 ans"
                          className="w-48 h-48 rounded-full object-cover relative z-10"
                          width="192"
                          height="192"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      <div className="absolute bottom-4 right-4 z-20">
                        <span className="relative flex h-5 w-5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border-2 border-slate-900"></span>
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                        <Star className="w-3 h-3 fill-amber-400" /> Expert Senior
                      </div>

                      <p className="text-3xl font-bold text-white leading-tight">
                        Julien <span className="text-slate-400 text-lg font-normal block mt-1">46 ans</span>
                      </p>

                      <p className="text-slate-300 leading-relaxed text-sm lg:text-base">
                        Consultant Senior chez{" "}
                        <a
                          href="https://www.digitalkeys.fr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-gray-200 transition-colors"
                        >
                          <strong>Digitalkeys</strong>
                        </a>{" "}
                        le jour.
                        <br />
                        Partenaire de votre croissance le soir.
                      </p>

                      <div className="pt-6 w-full">
                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-orange-900/20 border border-orange-400/20 transition-all hover:scale-[1.02]"
                        >
                          <Link to="/contact" onClick={() => handleCTAClick("Me contacter", "profile-left")}>
                            Me contacter <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE: Content Blocks */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm">
                      <h2 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        Expert tracking & stratégie data depuis plus de 15 ans.
                      </h2>
                      <p className="text-slate-300 leading-relaxed text-lg">
                        J'accompagne en freelance les TPE et PME qui n'ont pas les budgets agence mais qui exigent la
                        même qualité de résultat. Je rends accessible l'expertise des grands comptes.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-300 group">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500/30 transition-colors">
                            <HelpCircle className="w-5 h-5 text-indigo-400" />
                          </div>
                          <h3 className="font-bold text-white">Pourquoi je fais ça ?</h3>
                        </div>
                        <ul className="space-y-3">
                          {[
                            "Les agences sont souvent inaccessibles pour les petites structures.",
                            "Les freelances juniors manquent parfois de recul stratégique.",
                            "Je veux démocratiser l'accès à un tracking de haute précision.",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                              <span className="text-indigo-400 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-300 group">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                            <Briefcase className="w-5 h-5 text-purple-400" />
                          </div>
                          <h3 className="font-bold text-white">Mon parcours en bref</h3>
                        </div>
                        <ul className="space-y-3">
                          {[
                            "15 ans d'expérience en marketing digital et data.",
                            "Consultant Senior chez Digitalkeys (Poste actuel).",
                            "Expertise certifiée Google (Analytics, Ads, GTM).",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                              <span className="text-purple-400 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-500/40 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-emerald-500/20 rounded-lg">
                          <Award className="w-5 h-5 text-emerald-400" />
                        </div>
                        <h3 className="font-bold text-white">Ce que je vous apporte</h3>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          "L'expertise 'Grands Comptes' adaptée à votre budget.",
                          "Une vision stratégique globale (pas juste technique).",
                          "Des solutions durables et conformes (RGPD, Server-Side).",
                          "Un interlocuteur unique, senior et réactif.",
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-3 text-slate-200 text-sm font-medium">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ENGAGEMENT / APPROACH SECTION */}
        <section className="py-20 relative bg-slate-900 border-t border-white/5">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-center text-white mb-12">Une Approche Sur-Mesure</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Card 1 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-slate-800 hover:border-amber-500/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                      <Briefcase className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Missions ponctuelles</h3>
                      <p className="text-slate-400 leading-relaxed">
                        Interventions ciblées sur des objectifs précis. Livrables clairs, sans engagement longue durée
                        inutile.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-slate-800 hover:border-amber-500/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                      <DollarSign className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Tarif transparent</h3>
                      <p className="text-slate-400 leading-relaxed">
                        450 € TTC / jour. Pas de coûts cachés. Vous payez uniquement l'expertise.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-slate-800 hover:border-amber-500/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                      <Star className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Expertise haut niveau</h3>
                      <p className="text-slate-400 leading-relaxed">
                        Plus de 10 ans d'expérience. Maîtrise des sujets complexes (Server-Side, Consent Mode,
                        Attribution).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-slate-800 hover:border-amber-500/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                      <Handshake className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Passerelle vers l'agence</h3>
                      <p className="text-slate-400 leading-relaxed">
                        Votre business décolle et vos besoins grandissent ? Vous avez besoin d'un suivi permanent ? Je
                        vous mets en relation avec Digitalkeys pour un accompagnement complet adapté à votre nouvelle
                        dimension.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SIMULATOR CTA SECTION */}
        <section className="py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEzIi8+PC9zdmc+')] opacity-20"></div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 lg:p-8 backdrop-blur-sm shadow-2xl max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-8">
                <div className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 p-3 rounded-xl border border-amber-500/30 shadow-lg shadow-amber-900/20 shrink-0">
                  <Calculator className="w-8 h-8 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white text-center md:text-left leading-tight">
                    💰 Combien investir pour atteindre vos objectifs ?
                  </h2>
                  <p className="text-amber-400 font-semibold text-lg text-center md:text-left mt-1">
                    Notre simulateur a la réponse.
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-400" />
                    Vous vous êtes déjà demandé :
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Quel budget prévoir pour faire 50k€ de CA ce mois-ci ?",
                      "À partir de quel investissement pub ma marge devient négative ?",
                      "Combien de leads dois-je générer pour être rentable ?",
                    ].map((q, i) => (
                      <div
                        key={i}
                        className="flex gap-3 p-4 rounded-xl bg-indigo-900/20 border border-indigo-500/10 hover:border-indigo-500/30 transition-all hover:translate-x-1 group"
                      >
                        <div className="shrink-0 w-1 bg-indigo-500 rounded-full h-full min-h-[1rem] group-hover:bg-indigo-400 transition-colors" />
                        <p className="text-slate-300 text-sm font-medium leading-relaxed group-hover:text-slate-200 transition-colors">
                          {q}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between h-full">
                  <div className="mb-6 lg:mb-0">
                    <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      Notre simulateur vous aide à :
                    </h3>
                    <div className="space-y-3">
                      {[
                        "Définir vos budgets d'acquisition avec précision",
                        "Anticiper votre rentabilité (marge brute et nette)",
                        "Prendre des décisions data-driven",
                      ].map((b, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 rounded-xl bg-emerald-900/10 border border-emerald-500/10 hover:bg-emerald-900/20 transition-all hover:shadow-lg hover:shadow-emerald-900/10"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          <p className="text-slate-300 text-sm font-medium">{b}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-700/50">
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-5 px-8 text-base rounded-xl shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                    >
                      <a
                        href="https://simulateur.juh-ecomm.fr"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleCTAClick("Simuler ma rentabilité maintenant", "simulator-cta")}
                      >
                        Simuler ma rentabilité maintenant
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </Button>

                    <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
                      <p className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        Gratuit & sans inscription
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
                        E-commerce & Leadgen
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-slate-900">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-white">Mes Services</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Des solutions sur mesure pour optimiser votre tracking et automatiser vos processus marketing
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                const colorClasses = {
                  cyan: "from-cyan-500/20 to-cyan-500/0 group-hover:from-cyan-500/30 border-cyan-500/20 group-hover:border-cyan-500/40",
                  violet:
                    "from-violet-500/20 to-violet-500/0 group-hover:from-violet-500/30 border-violet-500/20 group-hover:border-violet-500/40",
                  lime: "from-lime-500/20 to-lime-500/0 group-hover:from-lime-500/30 border-lime-500/20 group-hover:border-lime-500/40",
                };
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      to={service.link}
                      className="group block h-full"
                      onClick={() => handleCTAClick(service.title, "services-section")}
                    >
                      <div
                        className={`h-full p-8 rounded-2xl bg-gradient-to-br ${colorClasses[service.color]} border backdrop-blur-sm hover:scale-105 transition-all duration-300`}
                      >
                        <Icon className={`w-12 h-12 mb-4 text-${service.color}-400`} />
                        <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                        <p className="text-slate-400 leading-relaxed mb-4">{service.description}</p>
                        <div
                          className={`flex items-center text-${service.color}-400 font-semibold group-hover:translate-x-2 transition-transform`}
                        >
                          En savoir plus
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-800 to-slate-900">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-white">Prêt à Optimiser Votre Tracking ?</h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Contactez-nous pour un audit gratuit de votre configuration actuelle et découvrez comment améliorer vos
                performances.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-violet-500/50 transition-all"
              >
                <Link to="/contact" onClick={() => handleCTAClick("Demander un audit gratuit", "cta-section")}>
                  Demander un audit gratuit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
