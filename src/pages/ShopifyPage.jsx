import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, 
  AlertTriangle, 
  Database, 
  Server, 
  ShieldCheck, 
  Code2, 
  ArrowRight, 
  CheckCircle,
  Globe,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getCanonicalUrl } from '@/lib/canonicalUrlHandler';

const ShopifyPage = () => {
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);

  const problems = [
    {
      title: "Pas de dataLayer natif",
      desc: "Contrairement à d'autres CMS, Shopify ne génère pas de dataLayer e-commerce standard. Chaque donnée (produit vu, ajout panier, achat) doit être extraite manuellement via du code personnalisé."
    },
    {
      title: "Checkout verrouillé",
      desc: "Le checkout Shopify est hébergé sur un sous-domaine séparé avec des restrictions strictes. Impossible d'y injecter du JavaScript classique. Seuls les Web Pixels et les scripts de checkout (Shopify Plus) permettent d'y accéder."
    },
    {
      title: "Scripts tiers limités",
      desc: "Shopify limite volontairement les scripts tiers pour des raisons de performance et de sécurité. Votre GTM peut se charger sur le site mais pas forcément sur les pages critiques."
    },
    {
      title: "Cookies ITP",
      desc: "Safari et Firefox raccourcissent la durée de vie des cookies à 7 jours max. Sur Shopify, sans server-side, votre attribution est faussée pour une grande partie de vos visiteurs."
    },
    {
      title: "Mises à jour fréquentes",
      desc: "Shopify fait évoluer régulièrement sa plateforme. Les Web Pixels, le checkout extensibility, les nouvelles API... Ce qui fonctionnait hier peut ne plus fonctionner demain."
    }
  ];

  const dataLayerEvents = [
    "view_item — Consultation d'une fiche produit",
    "view_item_list — Affichage d'une liste de produits (collection, recherche)",
    "select_item — Clic sur un produit dans une liste",
    "add_to_cart — Ajout au panier",
    "remove_from_cart — Retrait du panier",
    "view_cart — Consultation du panier",
    "begin_checkout — Début du tunnel de commande",
    "add_shipping_info — Sélection de la livraison",
    "add_payment_info — Sélection du paiement",
    "purchase — Achat confirmé"
  ];

  const serverSideBenefits = [
    {
      title: "Contournement du checkout verrouillé",
      desc: "Les données d'achat sont récupérées côté serveur via les webhooks Shopify, pas besoin d'injecter de script dans le checkout."
    },
    {
      title: "Cookies first-party étendus",
      desc: "Le Master Cookie posé par votre serveur dure jusqu'à 13 mois, même sur Safari."
    },
    {
      title: "Données complètes",
      desc: "Plus de perte liée aux ad blockers ou aux restrictions navigateurs."
    },
    {
      title: "Meta CAPI et TikTok Events API",
      desc: "Envoi des conversions directement aux plateformes publicitaires côté serveur."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
      <Helmet>
        <title>Shopify Tracking GA4 & Google Ads Expert | JUH Ecomm Data</title>
        <meta name="description" content="Optimisez votre boutique Shopify avec notre expertise. Intégrations Google Ads, GA4, tracking avancé et stratégie de croissance pour maximiser vos ventes." />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph tags */}
        <meta property="og:site_name" content="Juh Ecomm Data" />
        <meta property="og:title" content="Shopify Optimisé | JUH Ecomm Data" />
        <meta property="og:description" content="Optimisez votre boutique Shopify avec intégrations Google Ads et GA4. Stratégie de croissance pour vos ventes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
        <meta property="og:locale" content="fr_FR" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@juh_ecomm" />
        <meta name="twitter:title" content="Shopify Optimisé | JUH Ecomm Data" />
        <meta name="twitter:description" content="Optimisez votre boutique Shopify avec notre expertise. Intégrations avancées et stratégie de croissance." />
        <meta name="twitter:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
        <meta name="twitter:url" content={canonicalUrl} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20 mb-6 px-4 py-1.5 text-sm uppercase tracking-wider">
            E-commerce Specialist
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight">
            Tracking Shopify
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
              & E-commerce
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Shopify est une excellente plateforme e-commerce, mais son tracking est un véritable casse-tête. Entre les limitations du checkout, l'absence de dataLayer standard et les restrictions sur les scripts, mettre en place un tracking fiable relève du parcours du combattant. J'en ai fait ma spécialité.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold px-8 h-14 text-lg rounded-full shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
              <Link to="/contact">Fiabiliser mon tracking Shopify</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 bg-slate-900/50 border-y border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pourquoi le tracking Shopify est si compliqué
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              Si vous avez déjà essayé de configurer un tracking e-commerce complet sur Shopify, vous savez de quoi je parle. La plateforme n'a pas été pensée pour ça, et chaque mise à jour peut casser ce qui fonctionnait.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((item, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <CardTitle className="text-lg text-white mb-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Mes solutions pour un tracking Shopify fiable
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* DataLayer */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Code2 className="w-8 h-8 text-emerald-400" /> DataLayer e-commerce format GA4
              </h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                J'implémente un dataLayer complet et structuré, conforme aux spécifications e-commerce de GA4. Chaque interaction est capturée, avec toutes les données produits (ID, nom, prix, variante...). Vos rapports GA4 sont enfin complets.
              </p>
              
              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                <div className="bg-slate-800 p-3 border-b border-slate-700 font-mono text-xs text-slate-400 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  <span className="ml-2">events.json</span>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {dataLayerEvents.map((event, i) => (
                      <li key={i} className="flex items-center gap-3 font-mono text-sm">
                        <span className="text-emerald-400">✓</span>
                        <span className="text-slate-300">{event}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Server-Side */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Server className="w-8 h-8 text-emerald-400" /> Passage en Server-Side
              </h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Pour aller plus loin et résoudre définitivement les problèmes de Shopify, je passe votre tracking en server-side.
              </p>
              
              <div className="space-y-4 mb-8">
                {serverSideBenefits.map((benefit, i) => (
                  <div key={i} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <h4 className="font-bold text-white mb-1">{benefit.title}</h4>
                    <p className="text-sm text-slate-400">{benefit.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-6">
                <p className="text-emerald-200 text-sm">
                  <strong>Web + Server-Side :</strong> Je peux combiner les deux approches pour une couverture maximale. Le tracking web pour les interactions en temps réel, le server-side pour la fiabilité des conversions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-slate-900 border-t border-slate-800 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Arrêtez de piloter à l'aveugle</h2>
          <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-200 font-bold px-10 py-6 h-auto text-lg rounded-full">
            <Link to="/contact">
              Fiabiliser mon tracking Shopify <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ShopifyPage;