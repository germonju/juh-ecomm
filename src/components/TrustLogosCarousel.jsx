import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TrustLogosCarousel = () => {
  const logos = [
    { name: "EM Lyon",              url: "/images/logos/clients/em-lyon.svg" },
    { name: "Deejo",                url: "/images/logos/clients/deejo.webp" },
    { name: "Akinod",               url: "/images/logos/clients/akinod.webp" },
    { name: "Moulin Rouge",         url: "/images/logos/clients/moulin-rouge.webp" },
    { name: "Noviscore",            url: "/images/logos/clients/noviscore.svg" },
    { name: "Artled",               url: "/images/logos/clients/artled.webp" },
    { name: "VIP Concept",          url: "/images/logos/clients/vip-concept.webp" },
    { name: "Wesco",                url: "/images/logos/clients/wesco.webp" },
    { name: "Libralerte",           url: "/images/logos/clients/libralerte.webp" },
    { name: "Château de Versailles",url: "/images/logos/clients/versailles.webp" },
    { name: "Blackfox",             url: "/images/logos/clients/blackfox.webp" },
    { name: "Café Coton",           url: "/images/logos/clients/cafe-coton.webp" },
    { name: "Nathan",               url: "/images/logos/clients/nathan.webp" },
    { name: "PerfectStay",          url: "/images/logos/clients/perfectstay.webp" },
    { name: "Ice-Watch",            url: "/images/logos/clients/ice-watch.svg" },
    { name: "Mondialbox",           url: "/images/logos/clients/mondialbox.jpg" },
    { name: "Transavia Holidays",   url: "/images/logos/clients/transavia.webp" },
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