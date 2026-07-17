import React from 'react';

/**
 * Fond animé de la page À propos : raconte visuellement l'expertise de Julien —
 * DATA (réseau de données) → BLOCKCHAIN (chaîne de blocs) → IA (réseau neuronal),
 * reliés par un flux continu. SVG + animations CSS/SMIL : léger, sans dépendance,
 * sans JS de rendu (bon pour l'INP / Core Web Vitals).
 */

// Points d'un hexagone (pointy-top) centré en (cx, cy), rayon r.
const hex = (cx, cy, r) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');

// DATA — réseau de nœuds (gauche)
const dataNodes = [[120, 180], [225, 135], [300, 250], [165, 335], [280, 385], [110, 440]];
const dataEdges = [[0, 1], [0, 2], [0, 3], [1, 2], [2, 4], [3, 4], [3, 5], [2, 3]];

// BLOCKCHAIN — chaîne de blocs (centre)
const hexes = [[500, 300], [620, 300], [740, 300]];

// IA — réseau neuronal (droite), 3 couches
const layers = [
  [[945, 215], [945, 385]],
  [[1040, 150], [1040, 300], [1040, 450]],
  [[1135, 230], [1135, 375]],
];
const neuralEdges = [];
for (let l = 0; l < layers.length - 1; l++)
  for (const a of layers[l]) for (const b of layers[l + 1]) neuralEdges.push([a, b]);

const AboutHeroAnimation = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-70" aria-hidden="true">
    <style>{`
      @keyframes ahx-pulse { 0%,100%{opacity:.3} 50%{opacity:1} }
      @keyframes ahx-soft  { 0%,100%{opacity:.12} 50%{opacity:.4} }
      @keyframes ahx-flow  { to { stroke-dashoffset:-120 } }
      @keyframes ahx-spin  { to { transform:rotate(360deg) } }
      .ahx-node{ animation:ahx-pulse 3.2s ease-in-out infinite }
      .ahx-edge{ animation:ahx-soft 4s ease-in-out infinite }
      .ahx-flow{ stroke-dasharray:5 9; animation:ahx-flow 3.5s linear infinite }
      .ahx-hex{ transform-box:fill-box; transform-origin:center; animation:ahx-spin 42s linear infinite }
      .ahx-lbl{ fill:#64748b; font:600 13px/1 ui-sans-serif,system-ui,sans-serif; letter-spacing:.22em }
      @media (prefers-reduced-motion: reduce){
        .ahx-node,.ahx-edge,.ahx-flow,.ahx-hex,.ahx-spine-dot{ animation:none }
      }
    `}</style>

    <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ahx-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#a3e635" />
        </linearGradient>
        <radialGradient id="ahx-node-c" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#0891b2" />
        </radialGradient>
      </defs>

      {/* Spine reliant les 3 univers + points de données en circulation */}
      <path id="ahx-spine" d="M 60 300 Q 300 220 500 300 T 945 300 T 1135 300" fill="none" stroke="url(#ahx-g)" strokeWidth="1.5" opacity="0.35" />
      {[0, 1.2, 2.4].map((d, i) => (
        <circle key={i} className="ahx-spine-dot" r="4" fill="#a78bfa">
          <animateMotion dur="6s" begin={`${d}s`} repeatCount="indefinite">
            <mpath href="#ahx-spine" />
          </animateMotion>
        </circle>
      ))}

      {/* DATA — réseau (gauche, cyan) */}
      <g stroke="#22d3ee">
        {dataEdges.map(([a, b], i) => (
          <line key={i} className="ahx-edge" x1={dataNodes[a][0]} y1={dataNodes[a][1]} x2={dataNodes[b][0]} y2={dataNodes[b][1]} strokeWidth="1" style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
      </g>
      {dataNodes.map(([x, y], i) => (
        <circle key={i} className="ahx-node" cx={x} cy={y} r={i % 2 ? 5 : 7} fill="url(#ahx-node-c)" style={{ animationDelay: `${i * 0.4}s` }} />
      ))}
      <text className="ahx-lbl" x="90" y="500">DATA</text>

      {/* BLOCKCHAIN — chaîne de blocs (centre, violet) */}
      <g>
        {hexes.slice(0, -1).map(([x], i) => (
          <line key={i} className="ahx-flow" x1={hexes[i][0] + 44} y1="300" x2={hexes[i + 1][0] - 44} y2="300" stroke="#a78bfa" strokeWidth="2" />
        ))}
        {hexes.map(([cx, cy], i) => (
          <g key={i}>
            <polygon className="ahx-hex" points={hex(cx, cy, 44)} fill="rgba(167,139,250,0.06)" stroke="#a78bfa" strokeWidth="1.5" style={{ animationDelay: `${i * -6}s` }} />
            <polygon points={hex(cx, cy, 22)} fill="none" stroke="#c4b5fd" strokeWidth="1" opacity="0.5" className="ahx-node" style={{ animationDelay: `${i * 0.5}s` }} />
          </g>
        ))}
      </g>
      <text className="ahx-lbl" x="560" y="405" textAnchor="middle">BLOCKCHAIN</text>

      {/* IA — réseau neuronal (droite, lime/cyan) */}
      <g stroke="#a3e635">
        {neuralEdges.map(([a, b], i) => (
          <line key={i} className="ahx-edge" x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} strokeWidth="0.8" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </g>
      {layers.flat().map(([x, y], i) => (
        <circle key={i} className="ahx-node" cx={x} cy={y} r="6" fill="#a3e635" style={{ animationDelay: `${i * 0.35}s` }} />
      ))}
      <text className="ahx-lbl" x="1040" y="510" textAnchor="middle">IA</text>
    </svg>
  </div>
);

export default AboutHeroAnimation;
