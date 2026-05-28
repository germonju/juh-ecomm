import React from 'react';

const base = "absolute inset-0 w-full h-full pointer-events-none overflow-hidden";

/* ─── HomePage — constellation de nœuds data ─── */
export const DataNetworkIllustration = () => (
  <div className={base} aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes dn-pulse { 0%,100%{opacity:.12} 50%{opacity:.28} }
          @keyframes dn-flow { 0%{stroke-dashoffset:120} 100%{stroke-dashoffset:0} }
          @keyframes dn-dot { 0%,100%{r:3;opacity:.2} 50%{r:5;opacity:.5} }
        `}</style>
      </defs>
      {/* lignes de connexion */}
      {[
        [600,300, 300,160], [600,300, 900,160], [600,300, 180,340],
        [600,300,1020,340], [600,300, 420,480], [600,300, 780,480],
        [300,160, 180,60],  [300,160, 420,60],  [900,160,1020,60],
        [900,160, 780,60],  [180,340,  60,260], [1020,340,1140,260],
        [420,480, 300,560], [780,480, 900,560],
      ].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="url(#netGrad)" strokeWidth="1"
          strokeDasharray="120" strokeDashoffset="0"
          style={{animation:`dn-flow ${2.5+i*0.3}s linear infinite`, opacity:.15}} />
      ))}
      {/* nœuds */}
      {[
        [600,300,'#22d3ee',6],[300,160,'#8b5cf6',4],[900,160,'#8b5cf6',4],
        [180,340,'#a3e635',3],[1020,340,'#a3e635',3],[420,480,'#22d3ee',3],
        [780,480,'#22d3ee',3],[180,60,'#8b5cf6',2],[420,60,'#8b5cf6',2],
        [780,60,'#8b5cf6',2],[1020,60,'#8b5cf6',2],[60,260,'#a3e635',2],
        [1140,260,'#a3e635',2],[300,560,'#22d3ee',2],[900,560,'#22d3ee',2],
      ].map(([cx,cy,fill,r],i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={fill}
          style={{animation:`dn-dot ${2+i*0.4}s ease-in-out infinite`, opacity:.3}} />
      ))}
      <defs>
        <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
          <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

/* ─── Tracking Hub — radar / beacon ─── */
export const RadarIllustration = () => (
  <div className={base} aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes rad-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes rad-ring { 0%,100%{opacity:.08} 50%{opacity:.18} }
        `}</style>
      </defs>
      <g transform="translate(600,300)">
        {[260,200,140,80].map((r,i) => (
          <circle key={i} cx="0" cy="0" r={r} fill="none" stroke="#22d3ee" strokeWidth="1"
            style={{animation:`rad-ring ${2+i*0.7}s ease-in-out infinite`, opacity:.1}} />
        ))}
        {/* bras du radar */}
        {[0,45,90,135].map((angle,i) => (
          <line key={i} x1="0" y1="0"
            x2={Math.cos(angle*Math.PI/180)*260} y2={Math.sin(angle*Math.PI/180)*260}
            stroke="#22d3ee" strokeWidth="1" opacity=".07" />
        ))}
        {/* sweep */}
        <g style={{transformOrigin:'0 0', animation:'rad-spin 4s linear infinite'}}>
          <path d="M0,0 L240,-40 A260,260 0 0,1 240,40 Z"
            fill="url(#sweepGrad)" opacity=".12" />
        </g>
        {/* points cibles */}
        {[[160,-80],[−90,140],[200,100],[-180,-60],[50,200]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#22d3ee" opacity=".4"
            style={{animation:`rad-ring ${1.5+i*0.5}s ease-in-out infinite`}} />
        ))}
      </g>
      <defs>
        <radialGradient id="sweepGrad" cx="0" cy="0" r="260" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity=".6" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  </div>
);

/* ─── GTM Server-Side — flux client→serveur ─── */
export const ServerFlowIllustration = () => (
  <div className={base} aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes sf-flow { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
          @keyframes sf-blink { 0%,100%{opacity:.15} 50%{opacity:.4} }
        `}</style>
      </defs>
      {/* colonne gauche — client */}
      {[120,200,280,360,440].map((y,i) => (
        <g key={i}>
          <rect x="160" y={y-20} width="120" height="32" rx="4"
            fill="none" stroke="#8b5cf6" strokeWidth="1" opacity=".15" />
          <rect x="165" y={y-14} width={40+i*8} height="6" rx="2" fill="#8b5cf6" opacity=".1" />
        </g>
      ))}
      {/* colonne droite — serveur */}
      {[100,180,260,340,420,500].map((y,i) => (
        <g key={i}>
          <rect x="920" y={y-20} width="120" height="32" rx="4"
            fill="none" stroke="#a78bfa" strokeWidth="1" opacity=".15" />
          <circle cx="940" cy={y-4} r="4" fill="#a78bfa"
            style={{animation:`sf-blink ${1.5+i*0.3}s ease-in-out infinite`}} />
          <rect x="952" y={y-10} width={50+i*5} height="5" rx="2" fill="#a78bfa" opacity=".1" />
        </g>
      ))}
      {/* flux de données */}
      {[[160,240],[200,320],[240,200],[280,380],[320,280]].map(([y1,y2],i) => (
        <path key={i}
          d={`M280,${y1} C600,${y1} 600,${y2} 920,${y2}`}
          fill="none" stroke="#8b5cf6" strokeWidth="1.5"
          strokeDasharray="12 6"
          style={{animation:`sf-flow ${2+i*0.4}s linear infinite`, opacity:.15}} />
      ))}
      {/* nœud central */}
      <g transform="translate(600,300)">
        <circle cx="0" cy="0" r="28" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity=".2" />
        <circle cx="0" cy="0" r="16" fill="#8b5cf6" opacity=".08" />
        <text x="0" y="5" textAnchor="middle" fill="#a78bfa" fontSize="10" opacity=".4" fontFamily="monospace">GTM</text>
      </g>
      {/* particules en mouvement */}
      {[0,1,2,3,4].map(i => (
        <circle key={i} r="3" fill="#8b5cf6" opacity=".5">
          <animateMotion dur={`${2+i*0.5}s`} repeatCount="indefinite"
            path={`M280,${160+i*80} C600,${160+i*80} 600,${100+i*80} 920,${100+i*80}`} />
        </circle>
      ))}
    </svg>
  </div>
);

/* ─── GA4 — dashboard analytics fantôme ─── */
export const AnalyticsChartIllustration = () => (
  <div className={base} aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes ac-bar { 0%{transform:scaleY(0)} 100%{transform:scaleY(1)} }
          @keyframes ac-line { 0%{stroke-dashoffset:600} 100%{stroke-dashoffset:0} }
        `}</style>
      </defs>
      {/* grille de fond */}
      {[150,250,350,450].map((y,i) => (
        <line key={i} x1="200" y1={y} x2="1000" y2={y}
          stroke="#f97316" strokeWidth="1" opacity=".06" />
      ))}
      {[200,320,440,560,680,800,920,1040].map((x,i) => (
        <line key={i} x1={x} y1="120" x2={x} y2="480"
          stroke="#f97316" strokeWidth="1" opacity=".04" />
      ))}
      {/* barres */}
      {[
        [220,340,80],[340,240,80],[460,280,80],[580,180,80],
        [700,220,80],[820,160,80],[940,200,80],
      ].map(([x,y,w],i) => (
        <rect key={i} x={x} y={y} width={w} height={480-y} rx="4"
          fill="#f97316" opacity=".08"
          style={{transformOrigin:`${x+w/2}px 480px`, animation:`ac-bar .8s ${i*0.1}s ease-out both`}} />
      ))}
      {/* courbe de tendance */}
      <polyline
        points="260,340 380,240 500,280 620,180 740,220 860,160 980,200"
        fill="none" stroke="#f97316" strokeWidth="2"
        strokeDasharray="600"
        style={{animation:'ac-line 2s ease-out both', opacity:.25}} />
      {/* points de données */}
      {[[260,340],[380,240],[500,280],[620,180],[740,220],[860,160],[980,200]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill="#f97316" opacity=".35" />
      ))}
      {/* étiquettes fantômes */}
      {['Jan','Fév','Mar','Avr','Mai','Jun','Jul'].map((m,i) => (
        <text key={i} x={260+i*120} y="510" textAnchor="middle"
          fill="#f97316" fontSize="11" opacity=".15" fontFamily="monospace">{m}</text>
      ))}
    </svg>
  </div>
);

/* ─── Audit Google Ads — scan circulaire ─── */
export const AuditScanIllustration = () => (
  <div className={base} aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes as-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes as-ping { 0%{r:6;opacity:.4} 100%{r:18;opacity:0} }
          @keyframes as-pulse { 0%,100%{opacity:.08} 50%{opacity:.2} }
        `}</style>
      </defs>
      <g transform="translate(600,300)">
        {[280,210,140,70].map((r,i) => (
          <circle key={i} cx="0" cy="0" r={r} fill="none" stroke="#7c3aed" strokeWidth="1"
            strokeDasharray={i%2===0?"8 8":"4 4"}
            style={{animation:`as-pulse ${2+i*0.5}s ease-in-out infinite`, opacity:.1}} />
        ))}
        {/* sweep radar */}
        <g style={{transformOrigin:'0 0', animation:'as-spin 6s linear infinite'}}>
          <path d="M0,0 L260,-60 A280,280 0 0,1 260,60 Z"
            fill="url(#auditSweep)" opacity=".1" />
          <line x1="0" y1="0" x2="280" y2="0" stroke="#7c3aed" strokeWidth="1.5" opacity=".2" />
        </g>
        {/* cibles détectées */}
        {[[190,-80,'#7c3aed'],[-120,160,'#a78bfa'],[200,100,'#7c3aed'],[-60,-180,'#a78bfa']].map(([x,y,c],i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill={c} opacity=".3" />
            <circle cx={x} cy={y} r="6" fill="none" stroke={c} strokeWidth="1"
              style={{animation:`as-ping 2s ${i*0.5}s ease-out infinite`}} />
          </g>
        ))}
        {/* croix centrale */}
        <line x1="-20" y1="0" x2="20" y2="0" stroke="#7c3aed" strokeWidth="1" opacity=".3" />
        <line x1="0" y1="-20" x2="0" y2="20" stroke="#7c3aed" strokeWidth="1" opacity=".3" />
        <circle cx="0" cy="0" r="4" fill="#7c3aed" opacity=".4" />
      </g>
      <defs>
        <radialGradient id="auditSweep" cx="0" cy="0" r="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity=".4" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  </div>
);

/* ─── Automatisation Hub — circuit board ─── */
export const CircuitBoardIllustration = () => (
  <div className={base} aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes cb-trace { 0%{stroke-dashoffset:300} 100%{stroke-dashoffset:0} }
          @keyframes cb-glow { 0%,100%{opacity:.15} 50%{opacity:.4} }
        `}</style>
      </defs>
      {/* traces PCB horizontales */}
      {[100,180,260,340,420,500].map((y,i) => (
        <path key={i}
          d={`M${80+i*20},${y} L${400+i*10},${y} L${400+i*10},${y+(i%2===0?60:-60)} L${800-i*10},${y+(i%2===0?60:-60)} L${800-i*10},${y} L${1120-i*20},${y}`}
          fill="none" stroke="#7c3aed" strokeWidth="1.5"
          strokeDasharray="300"
          style={{animation:`cb-trace ${3+i*0.5}s linear infinite`, opacity:.1}} />
      ))}
      {/* jonctions */}
      {[
        [400,100],[400,180],[400,260],[800,180],[800,260],[800,340],
        [600,160],[600,300],[600,440],[300,300],[900,300],
      ].map(([cx,cy],i) => (
        <g key={i}>
          <rect x={cx-6} y={cy-6} width="12" height="12" rx="2"
            fill="#7c3aed" opacity=".12"
            style={{animation:`cb-glow ${1.5+i*0.3}s ease-in-out infinite`}} />
          <circle cx={cx} cy={cy} r="2.5" fill="#a78bfa" opacity=".3" />
        </g>
      ))}
      {/* composants */}
      {[[550,140,100,40],[550,280,100,40],[550,420,100,40]].map(([x,y,w,h],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="6"
          fill="none" stroke="#8b5cf6" strokeWidth="1" opacity=".15" />
      ))}
      {/* particules */}
      {[0,1,2].map(i => (
        <circle key={i} r="2.5" fill="#a78bfa" opacity=".6">
          <animateMotion dur={`${3+i}s`} repeatCount="indefinite"
            path={`M80,${100+i*160} L400,${100+i*160} L400,${160+i*160} L800,${160+i*160} L800,${100+i*160} L1120,${100+i*160}`} />
        </circle>
      ))}
    </svg>
  </div>
);

/* ─── Consent Mode — shield + circuit ─── */
export const ShieldCircuitIllustration = () => (
  <div className={base} aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes sc-pulse { 0%,100%{opacity:.08} 50%{opacity:.2} }
          @keyframes sc-trace { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
        `}</style>
      </defs>
      <g transform="translate(600,300)">
        {/* bouclier */}
        <path d="M0,-200 L160,-120 L160,80 C160,160 80,220 0,240 C-80,220 -160,160 -160,80 L-160,-120 Z"
          fill="none" stroke="#c026d3" strokeWidth="1.5" opacity=".15" />
        <path d="M0,-200 L160,-120 L160,80 C160,160 80,220 0,240 C-80,220 -160,160 -160,80 L-160,-120 Z"
          fill="#c026d3" opacity=".04"
          style={{animation:'sc-pulse 3s ease-in-out infinite'}} />
        {/* traces circuit internes */}
        {[
          "M-80,-80 L-40,-80 L-40,-40 L40,-40 L40,-80 L80,-80",
          "M-80,0 L-20,0 L-20,60 L20,60 L20,0 L80,0",
          "M0,-140 L0,-100",
          "M-120,20 L-80,20",
          "M80,20 L120,20",
        ].map((d,i) => (
          <path key={i} d={d} fill="none" stroke="#e879f9" strokeWidth="1.5"
            strokeDasharray="200"
            style={{animation:`sc-trace ${2+i*0.4}s linear infinite`, opacity:.15}} />
        ))}
        {/* nœuds */}
        {[[-80,-80],[40,-80],[-20,0],[20,60],[0,-140],[-120,20],[120,20]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="4" fill="#e879f9" opacity=".25"
            style={{animation:`sc-pulse ${1.5+i*0.4}s ease-in-out infinite`}} />
        ))}
        {/* cercles concentriques */}
        {[320,240,160].map((r,i) => (
          <circle key={i} cx="0" cy="0" r={r} fill="none" stroke="#c026d3" strokeWidth="1"
            strokeDasharray="8 16" opacity=".06"
            style={{animation:`sc-pulse ${3+i}s ease-in-out infinite`}} />
        ))}
      </g>
    </svg>
  </div>
);

/* ─── Conversions Offline — pont online→offline ─── */
export const BridgeIllustration = () => (
  <div className={base} aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes br-flow { 0%{stroke-dashoffset:400} 100%{stroke-dashoffset:0} }
          @keyframes br-ping { 0%{r:8;opacity:.3} 100%{r:24;opacity:0} }
          @keyframes br-pulse { 0%,100%{opacity:.1} 50%{opacity:.25} }
        `}</style>
      </defs>
      {/* île gauche — digital */}
      <ellipse cx="280" cy="360" rx="180" ry="60" fill="none" stroke="#84cc16" strokeWidth="1" opacity=".15" />
      <ellipse cx="280" cy="360" rx="120" ry="40" fill="#84cc16" opacity=".05"
        style={{animation:'br-pulse 2.5s ease-in-out infinite'}} />
      {[[-60,-40],[-30,-60],[10,-50],[50,-35],[-20,-20]].map(([dx,dy],i) => (
        <circle key={i} cx={280+dx} cy={360+dy} r="4" fill="#84cc16" opacity=".25" />
      ))}
      {/* île droite — offline */}
      <ellipse cx="920" cy="360" rx="180" ry="60" fill="none" stroke="#4ade80" strokeWidth="1" opacity=".15" />
      <ellipse cx="920" cy="360" rx="120" ry="40" fill="#4ade80" opacity=".05"
        style={{animation:'br-pulse 3s ease-in-out infinite'}} />
      {[[60,-40],[30,-60],[-10,-50],[-50,-35],[20,-20]].map(([dx,dy],i) => (
        <circle key={i} cx={920+dx} cy={360+dy} r="4" fill="#4ade80" opacity=".25" />
      ))}
      {/* arc de données */}
      <path d="M380,330 C600,160 600,160 820,330"
        fill="none" stroke="#84cc16" strokeWidth="2"
        strokeDasharray="400"
        style={{animation:'br-flow 3s linear infinite', opacity:.2}} />
      {/* particules traversant l'arc */}
      {[0,1,2].map(i => (
        <circle key={i} r="4" fill="#84cc16" opacity=".6">
          <animateMotion dur={`${2+i*0.8}s`} repeatCount="indefinite"
            path="M380,330 C600,160 600,160 820,330" />
        </circle>
      ))}
      {/* nœud central */}
      <g transform="translate(600,230)">
        <circle cx="0" cy="0" r="14" fill="#84cc16" opacity=".1"
          style={{animation:'br-pulse 2s ease-in-out infinite'}} />
        <circle cx="0" cy="0" r="6" fill="#84cc16" opacity=".3" />
        <circle cx="0" cy="0" r="8" fill="none" stroke="#84cc16" strokeWidth="1"
          style={{animation:'br-ping 2s ease-out infinite'}} />
      </g>
      {/* étiquettes */}
      <text x="280" y="440" textAnchor="middle" fill="#84cc16" fontSize="11" opacity=".2" fontFamily="monospace">DIGITAL</text>
      <text x="920" y="440" textAnchor="middle" fill="#4ade80" fontSize="11" opacity=".2" fontFamily="monospace">OFFLINE</text>
    </svg>
  </div>
);

/* ─── Google My Business — grille géo + pins ─── */
export const GeoGridIllustration = () => (
  <div className={base} aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes gg-ping { 0%{r:6;opacity:.4} 100%{r:20;opacity:0} }
          @keyframes gg-pulse { 0%,100%{opacity:.06} 50%{opacity:.16} }
        `}</style>
      </defs>
      {/* grille en perspective */}
      {[0,1,2,3,4,5,6].map(i => (
        <line key={i}
          x1={100+i*160} y1="120" x2={80+i*140} y2="520"
          stroke="#84cc16" strokeWidth="1" opacity=".07" />
      ))}
      {[0,1,2,3,4,5].map(i => {
        const y = 120+i*80;
        const shrink = i*10;
        return <line key={i} x1={100+shrink} y1={y} x2={1100-shrink} y2={y}
          stroke="#84cc16" strokeWidth="1" opacity=".07" />;
      })}
      {/* pins GPS */}
      {[
        [280,220],[600,160],[900,280],[420,380],[760,340],[160,420],[980,180],[560,460],
      ].map(([cx,cy],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="5" fill="#84cc16" opacity=".3" />
          <circle cx={cx} cy={cy} r="6" fill="none" stroke="#84cc16" strokeWidth="1"
            style={{animation:`gg-ping ${2+i*0.4}s ${i*0.3}s ease-out infinite`}} />
          <line x1={cx} y1={cy} x2={cx} y2={cy+20} stroke="#84cc16" strokeWidth="1" opacity=".2" />
          <ellipse cx={cx} cy={cy+22} rx="5" ry="2" fill="#84cc16" opacity=".15" />
        </g>
      ))}
      {/* lignes de connexion entre pins proches */}
      {[[280,220,420,380],[420,380,600,160],[600,160,760,340],[760,340,900,280]].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#84cc16" strokeWidth="1" strokeDasharray="6 4" opacity=".1"
          style={{animation:`gg-pulse ${2.5+i*0.3}s ease-in-out infinite`}} />
      ))}
    </svg>
  </div>
);

/* ─── Réponse Leads — arbre de décision ─── */
export const DecisionTreeIllustration = () => (
  <div className={base} aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes dt-flow { 0%{stroke-dashoffset:150} 100%{stroke-dashoffset:0} }
          @keyframes dt-pop { 0%,100%{opacity:.12} 50%{opacity:.28} }
        `}</style>
      </defs>
      {/* nœud racine */}
      <g transform="translate(200,300)">
        <rect x="-40" y="-20" width="80" height="40" rx="20"
          fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity=".25" />
        <circle cx="0" cy="0" r="6" fill="#22d3ee" opacity=".3" />
      </g>
      {/* branches + bulles */}
      {[
        {x:480,y:160,color:'#22d3ee',label:'Oui'},
        {x:480,y:440,color:'#06b6d4',label:'Non'},
      ].map(({x,y,color,label},i) => (
        <g key={i}>
          <path d={`M240,300 C360,300 360,${y} ${x},${y}`}
            fill="none" stroke={color} strokeWidth="1.5"
            strokeDasharray="150"
            style={{animation:`dt-flow ${1.5+i*0.5}s linear infinite`, opacity:.18}} />
          <rect x={x} y={y-22} width="100" height="44" rx="22"
            fill="none" stroke={color} strokeWidth="1.5" opacity=".2" />
          <text x={x+50} y={y+5} textAnchor="middle" fill={color}
            fontSize="11" opacity=".3" fontFamily="monospace">{label}</text>
          {/* sous-nœuds */}
          {[y-80,y+80].map((sy,j) => (
            <g key={j}>
              <path d={`M${x+100},${y} C${x+200},${y} ${x+200},${sy} ${x+300},${sy}`}
                fill="none" stroke={color} strokeWidth="1"
                strokeDasharray="120"
                style={{animation:`dt-flow ${2+j*0.4}s linear infinite`, opacity:.1}} />
              <rect x={x+300} y={sy-18} width="80" height="36" rx="18"
                fill="none" stroke={color} strokeWidth="1" opacity=".12" />
            </g>
          ))}
        </g>
      ))}
      {/* particules */}
      {[0,1].map(i => (
        <circle key={i} r="3" fill="#22d3ee" opacity=".5">
          <animateMotion dur={`${2.5+i}s`} repeatCount="indefinite"
            path={`M240,300 C360,300 360,${160+i*280} 480,${160+i*280}`} />
        </circle>
      ))}
    </svg>
  </div>
);

/* ─── Shopify — pipeline e-commerce ─── */
export const EcommerceFunnelIllustration = () => (
  <div className={base} aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes ef-flow { 0%{stroke-dashoffset:300} 100%{stroke-dashoffset:0} }
          @keyframes ef-pulse { 0%,100%{opacity:.1} 50%{opacity:.25} }
        `}</style>
      </defs>
      {/* étapes de l'entonnoir */}
      {[
        {x:100, w:1000, y:120, h:60, label:'TRAFIC', color:'#10b981'},
        {x:180, w:840,  y:220, h:60, label:'FICHES PRODUITS', color:'#34d399'},
        {x:280, w:640,  y:320, h:60, label:'PANIER', color:'#6ee7b7'},
        {x:380, w:440,  y:420, h:60, label:'CHECKOUT', color:'#10b981'},
        {x:460, w:280,  y:520, h:50, label:'ACHAT ✓', color:'#34d399'},
      ].map(({x,w,y,h,label,color},i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} rx="6"
            fill={color} opacity=".05"
            style={{animation:`ef-pulse ${2+i*0.3}s ease-in-out infinite`}} />
          <rect x={x} y={y} width={w} height={h} rx="6"
            fill="none" stroke={color} strokeWidth="1" opacity=".15" />
          <text x={x+w/2} y={y+h/2+4} textAnchor="middle" fill={color}
            fontSize="11" opacity=".25" fontFamily="monospace">{label}</text>
        </g>
      ))}
      {/* lignes de tracking */}
      {[160,280,400,520].map((y,i) => (
        <path key={i}
          d={`M${180+i*100},${y+60} L${180+i*100},${y+80} L${200+(i+1)*100},${y+80} L${200+(i+1)*100},${y+100}`}
          fill="none" stroke="#10b981" strokeWidth="1"
          strokeDasharray="300"
          style={{animation:`ef-flow ${2.5+i*0.4}s linear infinite`, opacity:.1}} />
      ))}
      {/* particules descendantes */}
      {[0,1,2].map(i => (
        <circle key={i} r="3" fill="#10b981" opacity=".4">
          <animateMotion dur={`${3+i*0.6}s`} repeatCount="indefinite"
            path={`M${600+i*60},120 L${600+i*40},220 L${600+i*20},320 L600,420 L600,520`} />
        </circle>
      ))}
    </svg>
  </div>
);

/* ─── Landing Pages — wireframe LP ─── */
export const WireframeIllustration = () => (
  <div className={base} aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes wf-draw { 0%{stroke-dashoffset:500} 100%{stroke-dashoffset:0} }
          @keyframes wf-pulse { 0%,100%{opacity:.08} 50%{opacity:.2} }
        `}</style>
      </defs>
      {/* frame principale */}
      <rect x="340" y="80" width="520" height="440" rx="8"
        fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity=".2"
        strokeDasharray="500"
        style={{animation:'wf-draw 3s ease-out both'}} />
      {/* header bar */}
      <rect x="340" y="80" width="520" height="50" rx="8" fill="#f59e0b" opacity=".05" />
      <rect x="360" y="95" width="120" height="16" rx="3" fill="#f59e0b" opacity=".12" />
      <rect x="740" y="95" width="60" height="16" rx="8" fill="#f59e0b" opacity=".15" />
      {/* hero wireframe */}
      <rect x="360" y="150" width="480" height="120" rx="4"
        fill="none" stroke="#f59e0b" strokeWidth="1" opacity=".1" />
      <line x1="360" y1="150" x2="840" y2="270" stroke="#f59e0b" strokeWidth="1" opacity=".06" />
      <line x1="840" y1="150" x2="360" y2="270" stroke="#f59e0b" strokeWidth="1" opacity=".06" />
      {/* texte wireframe */}
      {[290,310,330].map((y,i) => (
        <rect key={i} x={400+i*10} y={y} width={300-i*40} height="8" rx="2"
          fill="#f59e0b" opacity=".08" />
      ))}
      {/* CTA button */}
      <rect x="480" y="360" width="240" height="44" rx="22"
        fill="#f59e0b" opacity=".12"
        style={{animation:'wf-pulse 2s ease-in-out infinite'}} />
      <rect x="480" y="360" width="240" height="44" rx="22"
        fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity=".25" />
      {/* flèche conversion */}
      {[[-280,0],[-200,30],[200,-30],[280,0]].map(([dx,dy],i) => (
        <circle key={i} cx={600+dx} cy={300+dy} r="3" fill="#f59e0b" opacity=".15" />
      ))}
      <path d="M320,300 L360,300 M840,300 L880,300"
        stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"
        markerEnd="url(#arrowAmber)" opacity=".2" />
      <defs>
        <marker id="arrowAmber" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke="#f59e0b" strokeWidth="1" />
        </marker>
      </defs>
    </svg>
  </div>
);

/* ─── Conciergerie — workflow nœuds ─── */
export const WorkflowIllustration = () => (
  <div className={base} aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes wk-flow { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
          @keyframes wk-pulse { 0%,100%{opacity:.12} 50%{opacity:.3} }
        `}</style>
      </defs>
      {/* nœuds workflow */}
      {[
        {x:160, y:200, label:'MSG', color:'#8b5cf6'},
        {x:160, y:400, label:'BOOK', color:'#8b5cf6'},
        {x:420, y:300, label:'BOT', color:'#7c3aed', main:true},
        {x:680, y:180, label:'EMAIL', color:'#22d3ee'},
        {x:680, y:300, label:'SMS', color:'#22d3ee'},
        {x:680, y:420, label:'AGENDA', color:'#22d3ee'},
        {x:940, y:240, label:'AIRBNB', color:'#8b5cf6'},
        {x:940, y:360, label:'BOOKING', color:'#8b5cf6'},
      ].map(({x,y,label,color,main},i) => (
        <g key={i}>
          {main
            ? <circle cx={x} cy={y} r="36" fill={color} opacity=".08"
                style={{animation:`wk-pulse ${2}s ease-in-out infinite`}} />
            : null}
          <rect x={x-30} y={y-18} width="60" height="36" rx={main?18:6}
            fill="none" stroke={color} strokeWidth={main?1.5:1} opacity={main?.25:.15} />
          <text x={x} y={y+5} textAnchor="middle" fill={color}
            fontSize="9" opacity={main?.35:.2} fontFamily="monospace">{label}</text>
        </g>
      ))}
      {/* connexions */}
      {[
        [160,200,420,300],[160,400,420,300],
        [420,300,680,180],[420,300,680,300],[420,300,680,420],
        [680,180,940,240],[680,300,940,300],[680,420,940,360],
      ].map(([x1,y1,x2,y2],i) => (
        <path key={i}
          d={`M${x1+30},${y1} C${(x1+x2)/2},${y1} ${(x1+x2)/2},${y2} ${x2-30},${y2}`}
          fill="none" stroke="#8b5cf6" strokeWidth="1.5"
          strokeDasharray="200"
          style={{animation:`wk-flow ${2+i*0.3}s linear infinite`, opacity:.12}} />
      ))}
      {/* particules */}
      {[0,1,2].map(i => (
        <circle key={i} r="3" fill="#8b5cf6" opacity=".5">
          <animateMotion dur={`${2+i*0.7}s`} repeatCount="indefinite"
            path={`M190,${200+i*100} C310,${200+i*100} 310,300 390,300`} />
        </circle>
      ))}
    </svg>
  </div>
);
