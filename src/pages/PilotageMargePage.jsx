import React from 'react';
import { AnalyticsChartIllustration } from '@/components/HeroIllustrations';
import SeoHead from '@/components/SeoHead';
import Breadcrumb from '@/components/Breadcrumb';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  AlertTriangle,
  Calculator,
  Send,
  Scale,
  Target,
  LineChart,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ROUTE = '/tracking-data/pilotage-a-la-marge';

const steps = [
  {
    icon: Calculator,
    title: 'On calcule votre marge, produit par produit',
    desc: "Récupération de vos coûts réels (achat, frais) depuis votre catalogue, votre back-office ou Shopify, pour connaître la marge de chaque produit et de chaque commande — pas une estimation globale.",
  },
  {
    icon: Send,
    title: 'On envoie la marge dans le tracking',
    desc: "Via GTM (Web & Server-Side), la marge est transmise à GA4 et Google Ads en plus du chiffre d'affaires. Vos plateformes voient enfin le profit réel derrière chaque vente.",
  },
  {
    icon: Scale,
    title: 'On mesure marge ET CA en parallèle',
    desc: "Phase d'observation : on garde le CA comme repère et on suit la marge à côté, pour valider les écarts et prouver, chiffres à l'appui, où part vraiment votre rentabilité.",
  },
  {
    icon: Target,
    title: 'On bascule la conversion principale sur la marge',
    desc: "Une fois la donnée fiable, la valeur optimisée par l'algorithme devient la marge. Le Smart Bidding (tROAS) optimise alors sur le profit, pas sur le chiffre d'affaires : il pousse le budget vers ce qui rapporte réellement.",
  },
];

const benefits = [
  { title: 'Un budget alloué aux vrais gagnants', desc: "L'algorithme pousse la dépense vers les produits et clients réellement rentables, pas vers les plus « flatteurs » en ROAS." },
  { title: 'La fin des faux bons ROAS', desc: 'Terminé les campagnes au ROAS élevé qui cachent une perte une fois la marge et les coûts déduits.' },
  { title: 'Le bon KPI au centre', desc: 'Vous pilotez sur le profit — le seul indicateur qui compte vraiment pour la santé de votre entreprise.' },
  { title: 'Des décisions sur des vrais chiffres', desc: 'Vous arbitrez vos budgets sur des données réelles réconciliées avec le back-office, plus « à vue ».' },
  { title: 'Compatible votre stack', desc: 'Shopify, GA4, Google Ads et tracking Server-Side : la marge s\'intègre à votre écosystème existant.' },
  { title: 'Un avantage concurrentiel', desc: 'Très peu d\'annonceurs pilotent à la marge. Le faire, c\'est prendre une longueur d\'avance sur des concurrents restés au ROAS.' },
];

const faqs = [
  {
    q: "C'est quoi le POAS, concrètement ?",
    a: "POAS signifie Profit On Ad Spend : c'est l'équivalent du ROAS, mais calculé sur la marge (le profit) au lieu du chiffre d'affaires. Là où le ROAS répond à « combien de CA pour 1 € dépensé ? », le POAS répond à « combien de profit pour 1 € dépensé ? » — une question bien plus utile pour piloter un budget.",
  },
  {
    q: 'Faut-il arrêter complètement de regarder le ROAS ?',
    a: "Non. Le ROAS reste un indicateur utile, mais il ne doit plus être le seul pilote de vos campagnes. Dans la pratique, on garde le CA en observation et on bascule l'optimisation de l'algorithme sur la marge. Vous continuez à voir votre ROAS, mais vous décidez sur le profit.",
  },
  {
    q: 'Comment récupérez-vous ma marge par produit ?',
    a: "À partir de vos coûts produits (prix d'achat, frais) présents dans votre catalogue, votre back-office ou Shopify. On calcule la marge par produit et par commande. Si ces coûts ne sont pas encore centralisés, on met en place une source fiable avant d'activer le pilotage à la marge.",
  },
  {
    q: 'Est-ce compatible avec le Smart Bidding et le tROAS de Google Ads ?',
    a: "Oui, et c'est même le cœur de la méthode. On envoie la marge comme valeur de conversion : le Smart Bidding (tROAS, Maximiser la valeur) optimise alors sur cette valeur — c'est-à-dire sur votre profit. L'algorithme travaille exactement de la même façon, mais sur le bon objectif.",
  },
  {
    q: 'Est-ce que ça fonctionne avec Shopify ?',
    a: "Parfaitement. Shopify expose les coûts produits et les données de commande nécessaires au calcul de la marge, et s'intègre très bien avec GTM Server-Side. C'est l'une des configurations où le pilotage à la marge se met en place le plus proprement.",
  },
];

const PilotageMargePage = () => (
  <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
    <SeoHead route={ROUTE} />

    {/* Hero Section */}
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <AnalyticsChartIllustration />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10 text-center">
        <Breadcrumb route={ROUTE} />
        <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20 mb-6 px-4 py-1.5 text-sm uppercase tracking-wider">
          Rentabilité &amp; POAS
        </Badge>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight">
          Pilotez vos campagnes à la marge, pas au ROAS
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Donnez à l'algorithme ce qui compte vraiment : votre <strong className="text-white">profit</strong>.
          Optimiser Google Ads sur la marge (POAS) plutôt que sur le chiffre d'affaires, c'est un game changer —
          et très peu d'annonceurs le font.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 h-14 text-lg rounded-full shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
            <Link to="/contact">Piloter à la marge</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Le piège du ROAS */}
    <section className="py-20 px-4 bg-slate-900/50 border-y border-slate-800">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-6">
              <AlertTriangle className="w-4 h-4" /> Le piège
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Un ROAS flatteur qui cache une perte
            </h2>
            <p className="text-lg text-slate-400 mb-4">
              Beaucoup d'annonceurs pilotent « à vue » : ils optimisent sur le ROAS, se réjouissent d'un chiffre
              élevé… et ne comprennent pas pourquoi leur back-office affiche une sous-performance, voire une perte.
            </p>
            <p className="text-lg text-slate-400">
              La raison est simple : le ROAS mesure le <em>chiffre d'affaires</em>, pas le <em>profit</em>. Un produit
              peut avoir un ROAS spectaculaire tout en rapportant très peu, parce que sa marge est faible. Tant que
              l'algorithme optimise sur le CA, il pousse votre budget vers les mauvais produits.
            </p>
          </div>

          <div className="lg:w-1/2">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-amber-400" /> Le symptôme classique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    'Vos campagnes affichent un « super ROAS » dans Google Ads.',
                    'Mais votre résultat net en fin de mois ne suit pas.',
                    'Les best-sellers en ROAS sont souvent des produits à faible marge.',
                    'Vous augmentez le budget… et la rentabilité baisse.',
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
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

    {/* L'exemple qui change tout */}
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">L'exemple qui change tout</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            À budget publicitaire égal (1 000 € chacun), le produit au meilleur ROAS n'est pas le plus rentable.
          </p>
          <p className="text-sm text-slate-500 mt-2">Exemple illustratif.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Produit A */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="border-b border-slate-800">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-white">Produit A — faible marge</CardTitle>
                <span className="text-2xl font-extrabold text-emerald-400">ROAS ×8</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-slate-400">Marge produit</dt><dd className="text-slate-200 font-medium">15 %</dd></div>
                <div className="flex justify-between"><dt className="text-slate-400">Budget pub</dt><dd className="text-slate-200 font-medium">1 000 €</dd></div>
                <div className="flex justify-between"><dt className="text-slate-400">CA généré</dt><dd className="text-slate-200 font-medium">8 000 €</dd></div>
                <div className="flex justify-between"><dt className="text-slate-400">Marge brute</dt><dd className="text-slate-200 font-medium">1 200 €</dd></div>
                <div className="flex justify-between border-t border-slate-800 pt-3 mt-1"><dt className="text-white font-semibold">Profit net (marge − pub)</dt><dd className="text-amber-400 font-extrabold text-lg">+200 €</dd></div>
              </dl>
            </CardContent>
          </Card>

          {/* Produit B */}
          <Card className="bg-emerald-500/5 border-emerald-500/30">
            <CardHeader className="border-b border-emerald-500/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-white">Produit B — forte marge</CardTitle>
                <span className="text-2xl font-extrabold text-slate-400">ROAS ×3</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-slate-400">Marge produit</dt><dd className="text-slate-200 font-medium">60 %</dd></div>
                <div className="flex justify-between"><dt className="text-slate-400">Budget pub</dt><dd className="text-slate-200 font-medium">1 000 €</dd></div>
                <div className="flex justify-between"><dt className="text-slate-400">CA généré</dt><dd className="text-slate-200 font-medium">3 000 €</dd></div>
                <div className="flex justify-between"><dt className="text-slate-400">Marge brute</dt><dd className="text-slate-200 font-medium">1 800 €</dd></div>
                <div className="flex justify-between border-t border-emerald-500/20 pt-3 mt-1"><dt className="text-white font-semibold">Profit net (marge − pub)</dt><dd className="text-emerald-400 font-extrabold text-lg">+800 €</dd></div>
              </dl>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 bg-gradient-to-r from-slate-900 to-slate-800 border border-emerald-500/20 rounded-xl p-8 flex items-start gap-4">
          <TrendingUp className="w-8 h-8 text-emerald-400 shrink-0" />
          <p className="text-lg text-slate-300">
            Le produit au <strong className="text-white">ROAS ×3 rapporte 4 fois plus de profit</strong> que celui au ROAS ×8.
            Piloté au ROAS, l'algorithme aurait pourtant privilégié le Produit A — le moins rentable. Piloté à la marge,
            il met le budget là où se trouve le vrai bénéfice.
          </p>
        </div>
      </div>
    </section>

    {/* Notre méthode */}
    <section className="py-24 px-4 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20 mb-6 px-4 py-1.5 text-sm uppercase tracking-wider">
            La méthode
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Optimiser sur la marge, étape par étape</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            On mesure d'abord la marge <em>en plus</em> du chiffre d'affaires, puis on l'utilise comme valeur de la
            conversion principale — pour que l'algorithme s'optimise sur le KPI le plus important : votre profit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, i) => (
            <Card key={i} className="bg-slate-950 border-slate-800 hover:border-emerald-500/30 transition-all">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">
                    <step.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-emerald-400 font-bold text-sm">Étape {i + 1}</span>
                    <CardTitle className="text-lg text-white mt-0.5">{step.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 leading-relaxed text-sm">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-10 py-6 h-auto rounded-full shadow-lg shadow-emerald-500/20">
            <Link to="/contact">
              Mettre en place le pilotage à la marge <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Ce que ça change */}
    <section className="py-24 px-4 bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ce que ça change pour vous</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Le passage du ROAS au POAS transforme la façon dont votre budget publicitaire crée de la valeur.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-colors">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-3 max-w-3xl mx-auto mt-12 text-slate-400 text-sm">
          <LineChart className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p>
            Le pilotage à la marge s'appuie sur un tracking fiable : un plan de marquage propre, GTM Server-Side pour
            la qualité de la donnée, et la remontée des coûts produits. C'est la fondation qui rend le POAS possible.
          </p>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-24 px-4 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Vos questions sur le pilotage à la marge</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            ROAS, POAS, marge, Smart Bidding : les réponses claires aux questions que se posent les e-commerçants.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border border-slate-800 rounded-lg bg-slate-950/50 px-4">
              <AccordionTrigger className="text-white hover:text-emerald-400 text-left text-base font-medium py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 leading-relaxed pt-2 pb-4 text-sm">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-20 px-4 text-center border-t border-slate-800">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Prêt à piloter vos campagnes sur le profit ?
        </h2>
        <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-200 font-bold px-10 py-6 h-auto text-lg rounded-full">
          <Link to="/contact">
            Discuter de mon projet <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>

        <div className="mt-14 pt-8 border-t border-slate-800">
          <p className="text-slate-500 text-sm mb-4">Pour aller plus loin dans le silo Tracking &amp; Data</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link to="/tracking-data/gtm-server-side" className="text-slate-400 hover:text-emerald-400 transition-colors">GTM Server-Side</Link>
            <Link to="/tracking-data/conversions-offline" className="text-slate-400 hover:text-emerald-400 transition-colors">Conversions Offline</Link>
            <Link to="/tracking-data/ga4" className="text-slate-400 hover:text-emerald-400 transition-colors">GA4 Avancé</Link>
            <Link to="/tracking-data/tracking-ecommerce-shopify" className="text-slate-400 hover:text-emerald-400 transition-colors">Tracking Shopify</Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default PilotageMargePage;
