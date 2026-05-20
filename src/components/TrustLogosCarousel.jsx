import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TrustLogosCarousel = () => {
  const logos = [
    {
      name: "EM Lyon",
      url: "https://em-lyon.com/themes/custom/emlyon/logo.svg"
    },
    {
      name: "Deejo",
      url: "https://b2044221.smushcdn.com/2044221/wp-content/uploads/2021/05/unnamed-e1622189966626.png"
    },
    {
      name: "Akinod",
      url: "	https://cdn.consentmanager.net/delivery/img/logo1750757896x2602.gif"
    },
    {
      name: "Moulin Rouge",
      url: "https://medias.moulinrouge.fr/app/uploads/2021/10/logo.png"
    },
    {
      name: "Noviscore",
      url: "https://www.noviscore.fr/build/img/fr/noviscore.0fa24db2.svg"
    },
    {
      name: "Artled",
      url: "https://www.artled.fr/wp-content/uploads/artled-logo_400.jpg"
    },
    {
      name: "VIP Concept",
      url: "https://www.logiciel-belami.com/wp-content/uploads/2019/03/logo-belami.png"
    },
    {
      name: "Wesco",
      url: "https://static.wesco.fr/media/logo/stores/19/logo-26.png"
    },
    {
      name: "Libralerte",
      url: "https://cdn.prod.website-files.com/63494a7d6e9ed53699dea41f/63e527da8f4c18854f64ac7c_LOGO1_FONDTRANSPARENT_Plan%20de%20travail%201%20copie.webp"
    },
    {
      name: "Château de Versailles",
      url: "https://www.emosia.fr/wp-content/uploads/2021/01/logo-chateau-de-versailles-soleil.png"
    },
    {
      name: "Blackfox",
      url: "https://blackfox-nature.com/wp-content/uploads/2024/09/NOUVEAU-LOGO-BLACKFOX-300x152.png"
    },
    {
      name: "Café Coton",
      url: "https://www.masculin.com/wp-content/uploads/sites/2/2023/02/cafe-coton-logo-2023.png"
    },
    {
      name: "Nathan",
      url: "https://static-www.nathan.fr/reseaux_sociaux/logo-editions-nathan-MKMVOD-NYMFI9.png"
    },
    {
      name: "PerfectStay",
      url: "https://horizons-cdn.hostinger.com/a0243299-3f37-4051-bfc2-4b0057952451/909ad732e835fdc287486f432de78f1c.jpg"
    },
    {
      name: "Ice-Watch",
      url: "https://cdn.worldvectorlogo.com/logos/ice-watch-logo.svg"
    },
    {
      name: "Mondialbox",
      url: "https://ac-franchise.com/uploads/2022/08/Article-Franchise-Mondial-Box.jpg"
    },
    {
      name: "Transavia Holidays",
      url: "https://api-upload-public.s3.eu-west-1.amazonaws.com/website/3b9a18f8-d19c-0144-6d60-adbd594e38e2/static/logo.png"
    }
  ];

  // Double the logos for a seamless infinite scroll
  const scrollLogos = [...logos, ...logos];

  return (
    <section className="py-6 bg-slate-900/12 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 mb-4">
        <h2 className="text-center text-slate-400 font-bold uppercase tracking-[0.2em] text-lg lg:text-xl">
          Ils m'ont fait confiance
        </h2>
      </div>
      
      <div className="relative flex overflow-hidden w-full">
        <motion.div
          className="flex whitespace-nowrap w-max items-center"
          animate={{
            x: [0, -50],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 70,
              ease: "linear",
            },
          }}
          style={{ x: "0%" }}
          onUpdate={(latest) => {
            if (latest.x !== undefined && typeof latest.x === 'number') {
              latest.x = `${latest.x}%`;
            }
          }}
        >
          {scrollLogos.map((logo, index) => (
            <LogoItem key={index} logo={logo} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const LogoItem = ({ logo }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex items-center justify-center mx-8 lg:mx-12 min-w-[120px] h-16">
      {!hasError ? (
        <img
          src={logo.url}
          alt={`Logo ${logo.name}`}
          className="max-h-12 lg:max-h-16 w-auto object-contain"
          width="120"
          height="48"
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="text-xl font-bold text-slate-300 tracking-wider">
          {logo.name}
        </span>
      )}
    </div>
  );
};

export default TrustLogosCarousel;