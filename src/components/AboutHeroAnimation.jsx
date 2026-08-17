import React from 'react';

/**
 * Fond animé de la page À propos — narratif DATA → BLOCKCHAIN → IA.
 * Style futuriste : glow néon (filtre SVG), lignes à dégradé, paquets de données
 * en circulation (animateMotion), hexagones blockchain à double rotation + cœur
 * pulsant, réseau neuronal avec signaux « qui tirent » et ondes radar.
 * 100% SVG/CSS/SMIL : pas de JS de rendu, respecte prefers-reduced-motion.
 *
 * Intensité : volontairement discrète (opacité globale basse, amplitudes de
 * pulsation réduites, animations ralenties, glow léger) — le fond doit rester
 * une texture, jamais concurrencer le contenu du hero.
 */

// Hexagone (pointy-top) centré en (cx, cy), rayon r.
const hex = (cx, cy, r) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');

// DATA — maillage (gauche)
const dataNodes = [[90, 150], [195, 115], [275, 205], [135, 285], [255, 315], [95, 405], [305, 375], [185, 445]];
const dataEdges = [[0, 1], [0, 3], [1, 2], [2, 4], [3, 4], [3, 5], [4, 6], [5, 7], [4, 7], [2, 6]];
const dataPackets = [[0, 2], [3, 4], [5, 7], [2, 6]]; // arêtes parcourues par un paquet
const stars = [[60, 80], [330, 100], [40, 340], [350, 260], [150, 60], [230, 480], [70, 500]];

// BLOCKCHAIN — chaîne de blocs (centre)
const hexes = [[480, 300], [600, 300], [720, 300]];

// IA — réseau neuronal (droite)
const layers = [[910, [180, 300, 420]], [1010, [150, 250, 350, 450]], [1110, [210, 300, 390]]];
const neuralNodes = [];
layers.forEach(([x, ys]) => ys.forEach((y) => neuralNodes.push([x, y])));
const neuralEdges = [];
for (let l = 0; l < layers.length - 1; l++) {
  const [x1, ys1] = layers[l];
  const [x2, ys2] = layers[l + 1];
  ys1.forEach((y1) => ys2.forEach((y2) => neuralEdges.push([[x1, y1], [x2, y2]])));
}
const firing = [
  [[910, 300], [1010, 250]], [[1010, 250], [1110, 210]],
  [[910, 180], [1010, 150]], [[1010, 450], [1110, 390]], [[910, 420], [1010, 350]],
];

const AboutHeroAnimation = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.22] [mask-image:radial-gradient(110%_90%_at_50%_45%,black,transparent_78%)]" aria-hidden="true">
    <style>{`
      @keyframes ahx-pulse{0%,100%{opacity:.25}50%{opacity:.55}}
      @keyframes ahx-soft{0%,100%{opacity:.08}50%{opacity:.22}}
      @keyframes ahx-flow{to{stroke-dashoffset:-160}}
      @keyframes ahx-spin{to{transform:rotate(360deg)}}
      @keyframes ahx-rspin{to{transform:rotate(-360deg)}}
      @keyframes ahx-tw{0%,100%{opacity:.08;transform:scale(.75)}50%{opacity:.4;transform:scale(1)}}
      @keyframes ahx-drift{0%,100%{transform:translate(0,0)}50%{transform:translate(22px,-16px)}}
      .ahx-node{animation:ahx-pulse 6s ease-in-out infinite}
      .ahx-edge{animation:ahx-soft 8s ease-in-out infinite}
      .ahx-flow{stroke-dasharray:4 10;animation:ahx-flow 6s linear infinite}
      .ahx-hex{transform-box:fill-box;transform-origin:center;animation:ahx-spin 90s linear infinite}
      .ahx-hex-in{transform-box:fill-box;transform-origin:center;animation:ahx-rspin 48s linear infinite}
      .ahx-tw{transform-box:fill-box;transform-origin:center;animation:ahx-tw 8s ease-in-out infinite}
      .ahx-pkt{opacity:.45}
      .ahx-drift{animation:ahx-drift 34s ease-in-out infinite}
      .ahx-drift2{animation:ahx-drift 40s ease-in-out infinite reverse}
      .ahx-lbl{fill:#64748b;font:600 12px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.34em}
      @media (prefers-reduced-motion:reduce){
        .ahx-node,.ahx-edge,.ahx-flow,.ahx-hex,.ahx-hex-in,.ahx-tw,.ahx-drift,.ahx-drift2,.ahx-pkt{animation:none}
      }
    `}</style>

    <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ahx-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#a3e635" />
        </linearGradient>
        <radialGradient id="ahx-cyan" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a5f3fc" /><stop offset="100%" stopColor="#0891b2" />
        </radialGradient>
        <radialGradient id="ahx-lime" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d9f99d" /><stop offset="100%" stopColor="#65a30d" />
        </radialGradient>
        <radialGradient id="ahx-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.22" /><stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ahx-aura2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" /><stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
        <filter id="ahx-glow" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Halos d'ambiance dérivants */}
      <circle className="ahx-drift" cx="330" cy="250" r="230" fill="url(#ahx-aura2)" />
      <circle className="ahx-drift2" cx="1000" cy="330" r="260" fill="url(#ahx-aura)" />

      {/* Étoiles / points scintillants */}
      {stars.map(([x, y], i) => (
        <circle key={i} className="ahx-tw" cx={x} cy={y} r="1.8" fill="#e2e8f0" style={{ animationDelay: `${i * 0.6}s` }} />
      ))}

      {/* Spine reliant les 3 univers + paquets lumineux */}
      <path id="ahx-spine" d="M 40 300 Q 300 210 500 300 T 950 300 T 1180 300" fill="none" stroke="url(#ahx-g)" strokeWidth="1.2" opacity="0.22" />
      {[0, 2, 4].map((d, i) => (
        <circle key={i} className="ahx-pkt" r="4.5" fill="#c4b5fd" filter="url(#ahx-glow)">
          <animateMotion dur="6s" begin={`${d}s`} repeatCount="indefinite" path="M 40 300 Q 300 210 500 300 T 950 300 T 1180 300" />
        </circle>
      ))}

      {/* ===== DATA (gauche) ===== */}
      <g stroke="#22d3ee" filter="url(#ahx-glow)">
        {dataEdges.map(([a, b], i) => (
          <line key={i} className="ahx-edge" x1={dataNodes[a][0]} y1={dataNodes[a][1]} x2={dataNodes[b][0]} y2={dataNodes[b][1]} strokeWidth="1" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
      </g>
      {dataNodes.map(([x, y], i) => (
        <circle key={i} className="ahx-node" cx={x} cy={y} r={i % 3 ? 4.5 : 7} fill="url(#ahx-cyan)" filter="url(#ahx-glow)" style={{ animationDelay: `${i * 0.35}s` }} />
      ))}
      {dataPackets.map(([a, b], i) => (
        <circle key={i} className="ahx-pkt" r="3" fill="#67e8f9" filter="url(#ahx-glow)">
          <animateMotion dur="2.4s" begin={`${i * 0.7}s`} repeatCount="indefinite"
            path={`M ${dataNodes[a][0]} ${dataNodes[a][1]} L ${dataNodes[b][0]} ${dataNodes[b][1]}`} />
        </circle>
      ))}
      <text className="ahx-lbl" x="70" y="540">DATA</text>

      {/* ===== BLOCKCHAIN (centre) ===== */}
      <g filter="url(#ahx-glow)">
        {hexes.slice(0, -1).map((_, i) => (
          <line key={i} className="ahx-flow" x1={hexes[i][0] + 46} y1="300" x2={hexes[i + 1][0] - 46} y2="300" stroke="#a78bfa" strokeWidth="2.5" />
        ))}
        {hexes.map(([cx, cy], i) => (
          <g key={i}>
            <polygon className="ahx-hex" points={hex(cx, cy, 46)} fill="rgba(167,139,250,0.05)" stroke="#a78bfa" strokeWidth="1.6" style={{ animationDelay: `${i * -8}s` }} />
            <polygon className="ahx-hex-in" points={hex(cx, cy, 26)} fill="none" stroke="#c4b5fd" strokeWidth="1.2" opacity="0.6" style={{ animationDelay: `${i * -4}s` }} />
            <circle className="ahx-node" cx={cx} cy={cy} r="5" fill="#ddd6fe" style={{ animationDelay: `${i * 0.5}s` }} />
          </g>
        ))}
        {/* énergie qui circule le long de la chaîne */}
        <circle className="ahx-pkt" r="3.5" fill="#ddd6fe">
          <animateMotion dur="3s" repeatCount="indefinite" path={`M ${hexes[0][0]} 300 L ${hexes[hexes.length - 1][0]} 300`} />
        </circle>
      </g>
      <text className="ahx-lbl" x="600" y="405" textAnchor="middle">BLOCKCHAIN</text>

      {/* ===== IA (droite) ===== */}
      <g stroke="#a3e635" filter="url(#ahx-glow)">
        {neuralEdges.map(([a, b], i) => (
          <line key={i} className="ahx-edge" x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} strokeWidth="0.7" style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </g>
      {neuralNodes.map(([x, y], i) => (
        <circle key={i} className="ahx-node" cx={x} cy={y} r="5.5" fill="url(#ahx-lime)" filter="url(#ahx-glow)" style={{ animationDelay: `${i * 0.28}s` }} />
      ))}
      {firing.map(([a, b], i) => (
        <circle key={i} className="ahx-pkt" r="3" fill="#ecfccb" filter="url(#ahx-glow)">
          <animateMotion dur="1.8s" begin={`${i * 0.5}s`} repeatCount="indefinite"
            path={`M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`} />
        </circle>
      ))}
      {/* ondes radar autour de la sortie */}
      {[0, 1.3, 2.6].map((d, i) => (
        <circle key={i} cx="1110" cy="300" r="10" fill="none" stroke="#a3e635" strokeWidth="1" opacity="0">
          <animate attributeName="r" from="10" to="70" dur="7s" begin={`${d * 2}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.25" to="0" dur="7s" begin={`${d * 2}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <text className="ahx-lbl" x="1010" y="540" textAnchor="middle">IA</text>
    </svg>
  </div>
);

export default AboutHeroAnimation;
