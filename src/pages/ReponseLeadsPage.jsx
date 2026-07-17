import React from 'react';
import { DecisionTreeIllustration } from '@/components/HeroIllustrations';
import SeoHead from '@/components/SeoHead';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  Zap,
  Target,
  Clock,
  Check,
  ArrowRight,
  Inbox,
  Brain,
  Mail,
  Bell,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ReponseLeadsPage = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'Réponses Instantanées',
      description: 'Répondez automatiquement à vos leads en quelques secondes'
    },
    {
      icon: Zap,
      title: 'Qualification Automatique',
      description: 'Triez et qualifiez vos leads automatiquement'
    },
    {
      icon: Target,
      title: 'Personnalisation',
      description: 'Messages adaptés au profil et besoin de chaque lead'
    },
    {
      icon: Clock,
      title: 'Disponibilité 24/7',
      description: 'Ne perdez plus jamais un lead, même en dehors des heures d\'ouverture'
    }
  ];

  const pricingFeatures = [
    'Analyse automatique de chaque demande par IA',
    'Réponse personnalisée instantanée (email)',
    'Adaptation au contexte et au service demandé',
    'Indication tarifaire ou fourchette de prix',
    'Proposition de créneau de rappel',
    'Notification à chaque nouveau lead',
    'Tableau de bord de suivi'
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30">
      <SeoHead route="/reponse-leads" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <DecisionTreeIllustration />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <Badge className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border-cyan-500/20 mb-6 px-4 py-1.5 text-sm uppercase tracking-wider">
            Automatisation & Conversion
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight">
            Réponse Leads
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Automatisez la gestion et la qualification de vos leads pour maximiser vos conversions.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold px-8 h-14 text-lg rounded-full shadow-lg shadow-cyan-500/20 transition-all hover:scale-105">
              <Link to="/contact">Automatiser mes leads</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 transition-all duration-300">
                <CardHeader>
                  <feature.icon className="w-10 h-10 text-cyan-400 mb-4" />
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

      {/* Example Section */}
      <section className="py-24 px-4 bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Exemple concret : de la demande à la conversion</h2>
            <p className="text-lg text-slate-400">Voici ce qui se passe concrètement quand un prospect remplit votre formulaire de contact à 22h un samedi soir :</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-cyan-500/30 flex items-center justify-center shrink-0 z-10 relative">
                  <Inbox className="w-6 h-6 text-cyan-400" />
                  <div className="absolute top-12 bottom-[-40px] left-1/2 w-px bg-slate-800 -z-10" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">1. Réception instantanée</h3>
                  <p className="text-slate-400 text-sm font-mono mb-2 text-cyan-300">22h03</p>
                  <p className="text-slate-300">Un prospect remplit votre formulaire de contact depuis votre site.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-cyan-500/30 flex items-center justify-center shrink-0 z-10 relative">
                  <Brain className="w-6 h-6 text-cyan-400" />
                  <div className="absolute top-12 bottom-[-40px] left-1/2 w-px bg-slate-800 -z-10" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">2. Analyse automatique</h3>
                  <p className="text-slate-400 text-sm font-mono mb-2 text-cyan-300">22h03</p>
                  <p className="text-slate-300">L'IA analyse le contenu de la demande : type de service, contexte, budget.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-cyan-500/30 flex items-center justify-center shrink-0 z-10 relative">
                  <Mail className="w-6 h-6 text-cyan-400" />
                  <div className="absolute top-12 bottom-[-40px] left-1/2 w-px bg-slate-800 -z-10" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">3. Réponse personnalisée</h3>
                  <p className="text-slate-400 text-sm font-mono mb-2 text-cyan-300">22h04</p>
                  <p className="text-slate-300">Le prospect reçoit un email ultra-personnalisé avec une proposition de créneau.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-cyan-500/30 flex items-center justify-center shrink-0 z-10 relative">
                  <Bell className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">4. Notification</h3>
                  <p className="text-slate-400 text-sm font-mono mb-2 text-cyan-300">22h04</p>
                  <p className="text-slate-300">Vous recevez une notification avec le résumé de la demande.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-2xl border border-slate-700 max-w-md mx-auto lg:mx-0 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="bg-slate-100 p-3 border-b border-slate-200 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="p-6 bg-white text-slate-800 font-sans text-sm leading-relaxed">
                <p className="mb-2 text-slate-500 text-xs uppercase tracking-wide font-semibold">Objet : Votre demande de devis — [Nom entreprise]</p>
                <div className="w-full h-px bg-slate-100 mb-4" />
                <p className="mb-3">Bonjour [Prénom],</p>
                <p className="mb-3">Merci pour votre demande concernant <strong>[service mentionné]</strong>.</p>
                <p className="mb-3">J'ai bien noté que vous recherchez [reformulation du besoin]. C'est exactement le type de mission que j'accompagne régulièrement.</p>
                <p className="mb-3">Pour ce type de prestation, comptez généralement entre <strong>[fourchette de prix]</strong> selon la complexité du projet.</p>
                <p className="mb-4">Je serais ravi d'échanger avec vous pour affiner votre besoin. Êtes-vous disponible pour un appel de 15 minutes cette semaine ?</p>
                <div className="bg-cyan-50 p-3 rounded border border-cyan-100 mb-4 text-cyan-800 font-medium text-center cursor-pointer hover:bg-cyan-100 transition-colors">
                  → Réserver un créneau : [lien calendrier]
                </div>
                <p className="mb-4 text-xs text-slate-500">Ou si vous préférez, je peux vous rappeler au [numéro du formulaire]...</p>
                <p>À très vite,<br />[Signature]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters section */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Pourquoi cette réactivité change tout</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "Captez le lead au moment de l'intention", d: "Un prospect qui remplit un formulaire est dans une phase active de recherche. En répondant instantanément, vous êtes le premier dans sa boîte mail." },
              { t: "Créez une impression de professionnalisme", d: "Une réponse immédiate et personnalisée donne l'image d'une entreprise réactive et organisée." },
              { t: "Augmentez votre taux de conversion", d: "Les études montrent qu'un lead contacté dans les 5 minutes a 9 fois plus de chances de convertir." },
              { t: "Qualifiez avant même de décrocher le téléphone", d: "L'analyse automatique pré-qualifie chaque demande. Quand vous rappelez, vous savez déjà de quoi il s'agit." },
              { t: "Ne perdez plus jamais un lead", d: "Week-end, vacances, nuit : chaque demande reçoit une réponse." }
            ].map((item, i) => (
               <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-cyan-500/40 transition-colors">
                 <h3 className="text-xl font-bold text-white mb-3">{item.t}</h3>
                 <p className="text-slate-400 text-sm leading-relaxed">{item.d}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - NEW */}
      <section className="py-24 px-4 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Tarification simple et transparente</h2>
          </div>

          <div className="flex justify-center mb-12">
            <Card className="bg-slate-800 border-cyan-500 shadow-xl shadow-cyan-500/10 relative max-w-md w-full transform hover:scale-105 transition-all duration-300">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-slate-950 font-bold px-4 py-1 rounded-full text-sm shadow-lg">
                POPULAIRE
              </div>
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl font-bold text-white mb-2">Réponse automatique aux leads</CardTitle>
                <div className="flex items-baseline justify-center gap-1 mt-4">
                  <span className="text-sm text-slate-400">À partir de</span>
                  <span className="text-5xl font-extrabold text-white">179&nbsp;€</span>
                  <span className="text-slate-400 text-lg">TTC / mois</span>
                </div>
                <div className="text-sm text-slate-400 mt-2 font-medium text-center">Frais de mise en place : 490 € TTC (unique)</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {pricingFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold h-12 text-lg">
                  <Link to="/contact">Demander un devis</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex items-start gap-4 max-w-2xl mx-auto">
            <Info className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
            <p className="text-slate-300 text-center w-full">
              Tous les abonnements sont sans engagement. Sur simple demande, vous pouvez stopper à tout moment. L'arrêt prend effet à la fin du mois suivant votre demande. Si vous reprenez l'abonnement ultérieurement, aucun nouveau frais de mise en place ne sera facturé.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Transformez chaque demande en opportunité</h2>
          <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-200 font-bold px-10 py-6 h-auto text-lg rounded-full shadow-lg shadow-white/10 transition-all hover:scale-105">
            <Link to="/contact">
              Contactez-moi pour démarrer <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ReponseLeadsPage;