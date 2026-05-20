import React from 'react';
import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDataLayer } from '@/contexts/DataLayerContext';

const ServicePageTemplate = ({ title, subtitle, features, benefits, accentColor = 'cyan' }) => {
  const { pushEvent } = useDataLayer();

  const handleCTAClick = (ctaName) => {
    pushEvent('cta_click', {
      cta_name: ctaName,
      cta_location: 'service-page',
      page_path: window.location.pathname
    });
  };

  const colorClasses = {
    cyan: {
      gradient: 'from-cyan-400 to-violet-400',
      button: 'from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600',
      shadow: 'hover:shadow-cyan-500/50',
      border: 'border-cyan-500/20 hover:border-cyan-500/40',
      icon: 'text-cyan-400',
      bg: 'from-cyan-500/20 to-cyan-500/0'
    },
    violet: {
      gradient: 'from-violet-400 to-cyan-400',
      button: 'from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600',
      shadow: 'hover:shadow-violet-500/50',
      border: 'border-violet-500/20 hover:border-violet-500/40',
      icon: 'text-violet-400',
      bg: 'from-violet-500/20 to-violet-500/0'
    },
    lime: {
      gradient: 'from-lime-400 to-cyan-400',
      button: 'from-lime-500 to-cyan-500 hover:from-lime-600 hover:to-cyan-600',
      shadow: 'hover:shadow-lime-500/50',
      border: 'border-lime-500/20 hover:border-lime-500/40',
      icon: 'text-lime-400',
      bg: 'from-lime-500/20 to-lime-500/0'
    }
  };

  const colors = colorClasses[accentColor];

  return (
    <div className="pt-16 lg:pt-20">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
              {title}
            </h1>
            <p className="text-xl lg:text-2xl text-slate-300 mb-8 leading-relaxed">
              {subtitle}
            </p>
            <Button
              asChild
              size="lg"
              className={`bg-gradient-to-r ${colors.button} text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg ${colors.shadow} transition-all`}
            >
              <Link to="/contact" onClick={() => handleCTAClick('Demander un devis')}>
                Demander un devis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </m.div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-slate-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-2xl mb-4`}>
                    <Icon className={`w-8 h-8 ${colors.icon}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </m.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <m.div
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
            </m.div>

            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`flex items-start gap-3 p-4 bg-slate-800/50 rounded-lg border border-slate-700 ${colors.border} transition-colors`}
                >
                  <CheckCircle className={`w-6 h-6 ${colors.icon} flex-shrink-0 mt-0.5`} />
                  <span className="text-slate-300">{benefit}</span>
                </m.div>
              ))}
            </div>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mt-12"
            >
              <Button
                asChild
                size="lg"
                className={`bg-gradient-to-r ${colors.button} text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg ${colors.shadow} transition-all`}
              >
                <Link to="/contact" onClick={() => handleCTAClick('Commencer maintenant')}>
                  Commencer maintenant
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </m.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePageTemplate;