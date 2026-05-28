import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDataLayer } from '@/contexts/DataLayerContext';
import { getCanonicalUrl } from '@/lib/canonicalUrlHandler';

const ContactPage = () => {
  const { pushEvent } = useDataLayer();
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    url: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const services = [
    "Audit GTM",
    "Audit Google Ads",
    "Audit de tracking global",
    "Plan de Marquage & Plan de Tagging",
    "GTM Server-Side",
    "Conversions Offline",
    "Google Analytics 4 (GA4)",
    "Configuration Google Ads",
    "Tracking Publicitaire",
    "Automatisation Marketing",
    "Formation / Accompanement",
    "Autre"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const adParams = window._adParams || { gclid: null, gbraid: null };
      
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        url: formData.url,
        service: formData.service,
        message: formData.message,
        gclid: adParams.gclid,
        gbraid: adParams.gbraid,
        page_url: window.location.href,
        timestamp: new Date().toISOString()
      };

      const webhookUrl = import.meta.env.VITE_CONTACT_WEBHOOK_URL || 'https://n8n.srv954228.hstgr.cloud/webhook/juhecomm-formulaire-site';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', url: '', service: '', message: '' });
        
        pushEvent('generate_lead', {
          form_name: 'premium_contact_form',
          lead_service: payload.service
        });
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contactez votre Expert Tracking & Data | JUH Ecomm Data</title>
        <meta name="description" content="Discutez de votre stratégie marketing avec nos experts JUH Ecomm Data. Découvrez comment accélérer votre croissance e-commerce dès maintenant." />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Contactez JUH Ecomm Data | JUH Ecomm Data" />
        <meta property="og:description" content="Contactez notre équipe d'experts. Discutez de votre stratégie et découvrez comment nous pouvons vous aider." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@juh_ecomm" />
        <meta name="twitter:title" content="Contactez JUH Ecomm Data | JUH Ecomm Data" />
        <meta name="twitter:description" content="Contactez notre équipe d'experts JUH Ecomm Data. Accélérez votre croissance e-commerce." />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
      </Helmet>

      <div className="min-h-screen pt-24 pb-20 bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          
          {/* Header Section */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
              Parlons de votre projet tracking
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              Décrivez votre situation et recevez une réponse personnalisée sous 24h.
            </p>
          </div>

          {/* Contact Info Horizontal Bar */}
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-center items-center md:items-stretch gap-6 md:gap-8 mb-16">
            <div className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 px-6 py-4 rounded-2xl flex-1 w-full md:w-auto justify-center md:justify-start hover:bg-slate-900 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-0.5">Email</h3>
                <a href="mailto:contact@juh-ecomm.fr" className="text-white font-medium hover:text-blue-400 transition-colors">
                  contact@juh-ecomm.fr
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 px-6 py-4 rounded-2xl flex-1 w-full md:w-auto justify-center md:justify-start hover:bg-slate-900 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-0.5">Téléphone</h3>
                <a href="tel:+33768936424" className="text-white font-medium hover:text-blue-400 transition-colors">
                  +33 7 68 93 64 24
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 px-6 py-4 rounded-2xl flex-1 w-full md:w-auto justify-center md:justify-start hover:bg-slate-900 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-0.5">Localisation</h3>
                <p className="text-white font-medium">
                  France
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 p-8 md:p-14 w-full relative z-10 rounded-[2rem] shadow-2xl">
              <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl font-bold text-white mb-3">Envoyez-moi un message</h2>
                <p className="text-slate-400 text-lg">Les champs marqués d'un <span className="text-blue-500">*</span> sont obligatoires.</p>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-10 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-emerald-300 text-lg font-medium">✅ Message envoyé ! Je vous réponds sous 24h.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-10 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-red-300 text-lg font-medium">❌ Une erreur est survenue. Veuillez réessayer.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-slate-300 text-base font-medium">Nom complet <span className="text-blue-500">*</span></Label>
                    <Input 
                      id="name" 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                      className="h-14 bg-slate-950/50 border-slate-800 text-white text-base px-5 focus-visible:ring-blue-600 focus-visible:border-blue-600 rounded-xl" 
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-slate-300 text-base font-medium">Email professionnel <span className="text-blue-500">*</span></Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                      className="h-14 bg-slate-950/50 border-slate-800 text-white text-base px-5 focus-visible:ring-blue-600 focus-visible:border-blue-600 rounded-xl" 
                      placeholder="jean@entreprise.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-slate-300 text-base font-medium">Téléphone <span className="text-blue-500">*</span></Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-14 bg-slate-950/50 border-slate-800 text-white text-base px-5 focus-visible:ring-blue-600 focus-visible:border-blue-600 rounded-xl" 
                      placeholder="+33 6 00 00 00 00"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="url" className="text-slate-300 text-base font-medium">URL de votre site</Label>
                    <Input 
                      id="url" 
                      name="url" 
                      type="url" 
                      value={formData.url}
                      onChange={handleChange}
                      className="h-14 bg-slate-950/50 border-slate-800 text-white text-base px-5 focus-visible:ring-blue-600 focus-visible:border-blue-600 rounded-xl" 
                      placeholder="https://monsite.fr"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="service" className="text-slate-300 text-base font-medium">Sujet <span className="text-blue-500">*</span></Label>
                  <Select onValueChange={handleSelectChange} value={formData.service} required>
                    <SelectTrigger className="h-14 bg-slate-950/50 border-slate-800 text-white text-base px-5 focus:ring-blue-600 focus:border-blue-600 rounded-xl">
                      <SelectValue placeholder="Sélectionnez un sujet" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800 text-white rounded-xl shadow-xl max-h-[400px]">
                      {services.map((subj) => (
                        <SelectItem 
                          key={subj} 
                          value={subj} 
                          className="py-3.5 px-4 text-base cursor-pointer hover:bg-slate-800 focus:bg-slate-800 focus:text-blue-400 transition-colors"
                        >
                          {subj}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="text-slate-300 text-base font-medium">Votre message <span className="text-blue-500">*</span></Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    required 
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-[200px] bg-slate-950/50 border-slate-800 text-white text-base p-5 focus-visible:ring-blue-600 focus-visible:border-blue-600 rounded-xl resize-none" 
                    placeholder="Décrivez vos besoins..."
                  />
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full text-white text-lg font-semibold h-16 rounded-xl hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-blue-600/25 bg-blue-600 hover:bg-blue-500 border-0"
                  >
                    {isSubmitting ? (
                      'Envoi en cours...'
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Envoyer ma demande <ArrowRight className="w-6 h-6" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ContactPage;