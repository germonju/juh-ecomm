import React from 'react';

const LandingPagesHeroImage = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1524221629551-6dd14def5ffd"
        alt="Landing page haute performance pour campagnes publicitaires"
        className="w-full h-full object-cover object-center scale-105"
        loading="eager"
      />
      {/* Heavy gradient overlay for text readability and dark theme integration */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-900/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
    </div>
  );
};

export default LandingPagesHeroImage;