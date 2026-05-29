import React from 'react';

const base = "absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-[1]";

/* ─── HomePage — réseau décentralisé blockchain ─── */
export const DataNetworkIllustration = () => {
  const nodes = [
    [100,100,'#22d3ee',3],[340,75,'#8b5cf6',3],[600,110,'#a3e635',3],
    [860,80,'#22d3ee',3],[1080,115,'#8b5cf6',3],[170,270,'#a3e635',4],
    [400,250,'#22d3ee',4],[640,230,'#8b5cf6',4],[880,260,'#a3e635',4],
    [1110,240,'#22d3ee',3],[90,440,'#8b5cf6',3],[320,420,'#a3e635',3],
    [570,460,'#22d3ee',3],[810,435,'#8b5cf6',3],[1050,450,'#a3e635',3],
    [210,550,'#22d3ee',3],[470,530,'#8b5cf6',3],[720,555,'#a3e635',3],
    [970,520,'#22d3ee',3],
  ];
  const edges = [
    [0,1],[0,5],[1,2],[1,6],[2,3],[2,7],[3,4],[3,8],[4,9],[4,14],
    [5,6],[5,10],[5,11],[6,7],[6,11],[6,12],[7,8],[7,12],[7,13],
    [8,9],[8,13],[8,14],[9,14],[9,18],[10,11],[10,15],[11,12],
    [11,15],[11,16],[12,13],[12,16],[12,17],[13,14],[13,17],[13,18],
    [14,18],[15,16],[16,17],[17,18],[0,6],[2,8],[4,13],[9,17],[1,11],[3,12],
  ];
  return (
    <div className={base} aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>{`
            @keyframes dn2-flow{0%{stroke-dashoffset:180}100%{stroke-dashoffset:0}}
            @keyframes dn2-dot{0%,100%{opacity:.15}50%{opacity:.4}}
          `}</style>
        </defs>
        {edges.map(([a,b],i) => (
          <line key={i}
            x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
            stroke={nodes[a][2]} strokeWidth="1" strokeDasharray="180"
            style={{animation:`dn2-flow ${3+i*0.15}s linear infinite`,opacity:.12}} />
        ))}
        {nodes.map(([cx,cy,fill,r],i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={fill}
            style={{animation:`dn2-dot ${2+i*0.3}s ease-in-out infinite`}} />
        ))}
      </svg>
    </div>
  );
};

/* ─── Tracking Hub — schéma technique full-hero ─── */
export const RadarIllustration = () => (
  <div className={base} aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes th-scan{0%{stroke-dashoffset:1200}100%{stroke-dashoffset:0}}
          @keyframes th-pulse{0%,100%{opacity:.05}50%{opacity:.18}}
          @keyframes th-tick{0%,100%{opacity:.1}50%{opacity:.3}}
          @keyframes th-scroll-1{0%{transform:translateX(0)}100%{transform:translateX(-1400px)}}
          @keyframes th-scroll-2{0%{transform:translateX(-600px)}100%{transform:translateX(-2000px)}}
          @keyframes th-scroll-3{0%{transform:translateX(-200px)}100%{transform:translateX(-1600px)}}
        `}</style>
      </defs>
      {/* grille technique pleine largeur */}
      {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
        <line key={i} x1={i*120} y1="0" x2={i*120} y2="600"
          stroke="#22d3ee" strokeWidth="1" opacity=".04" />
      ))}
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <line key={i} x1="0" y1={i*80} x2="1200" y2={i*80}
          stroke="#22d3ee" strokeWidth="1" opacity=".04" />
      ))}
      {/* lignes de scan horizontales animées */}
      {[120,280,440].map((y,i) => (
        <line key={i} x1="0" y1={y} x2="1200" y2={y}
          stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="1200"
          style={{animation:`th-scan ${4+i*1.2}s linear infinite`,opacity:.1}} />
      ))}
      {/* axes de mesure */}
      <line x1="80" y1="40" x2="80" y2="560" stroke="#22d3ee" strokeWidth="1" opacity=".15" />
      <line x1="80" y1="560" x2="1140" y2="560" stroke="#22d3ee" strokeWidth="1" opacity=".15" />
      {/* graduations axe X */}
      {[200,320,440,560,680,800,920,1040].map((x,i) => (
        <g key={i}>
          <line x1={x} y1="555" x2={x} y2="565" stroke="#22d3ee" strokeWidth="1" opacity=".2" />
          <text x={x} y="578" textAnchor="middle" fill="#22d3ee" fontSize="9" opacity=".15" fontFamily="monospace">{(i+1)*100}</text>
        </g>
      ))}
      {/* graduations axe Y */}
      {[80,160,240,320,400,480].map((y,i) => (
        <g key={i}>
          <line x1="75" y1={y} x2="85" y2={y} stroke="#22d3ee" strokeWidth="1" opacity=".2" />
          <text x="70" y={y+4} textAnchor="end" fill="#22d3ee" fontSize="9" opacity=".15" fontFamily="monospace">{(6-i)*20}%</text>
        </g>
      ))}
      {/* courbe de données principale */}
      <polyline
        points="80,500 200,420 320,380 440,300 560,260 680,200 800,180 920,150 1040,120 1140,100"
        fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="1200"
        style={{animation:'th-scan 5s ease-out both',opacity:.25}} />
      {/* courbe secondaire */}
      <polyline
        points="80,540 200,480 320,450 440,390 560,350 680,310 800,290 920,270 1040,250 1140,230"
        fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="1200"
        style={{animation:'th-scan 6s ease-out both',opacity:.12}} />
      {/* points de données */}
      {[[200,420],[320,380],[440,300],[560,260],[680,200],[800,180],[920,150],[1040,120]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="none" stroke="#22d3ee" strokeWidth="1.5"
          style={{animation:`th-tick ${2+i*0.4}s ease-in-out infinite`}} />
      ))}
      {/* lignes de code JS qui défilent */}
      {[
        {y:52,  anim:'th-scroll-1', dur:'18s', code:"dataLayer.push({ event: 'purchase', ecommerce: { value: 149.90, currency: 'EUR', items: [{ item_id: 'SKU_001' }] } });   gtag('event','conversion',{ send_to:'AW-XXXXX', value: 149.90 });   fbq('track','Purchase',{ value: 149.90, currency: 'EUR' });"},
        {y:155, anim:'th-scroll-3', dur:'22s', code:"window._paq.push(['trackEcommerceOrder','ORD-1042',149.90]);   fetch('/collect',{ method:'POST', body: JSON.stringify({ client_id: ga_cid, events:[{name:'purchase'}] }) });"},
        {y:210, anim:'th-scroll-2', dur:'16s', code:"gtag('set','user_properties',{ customer_type: 'returning' });   dataLayer.push({ event: 'add_to_cart', ecommerce: { currency: 'EUR', value: 49.90 } });   analytics.track('Page Viewed', { path: window.location.pathname });"},
        {y:345, anim:'th-scroll-1', dur:'24s', code:"const gclid = new URLSearchParams(location.search).get('gclid');   sessionStorage.setItem('gclid', gclid);   gtag('event','generate_lead',{ value: 1, currency:'EUR', gclid });"},
        {y:465, anim:'th-scroll-3', dur:'20s', code:"if(consent.analytics){ gtag('consent','update',{ analytics_storage:'granted' }); }   window.dataLayer = window.dataLayer || [];   function gtag(){dataLayer.push(arguments);}   gtag('js', new Date());"},
        {y:530, anim:'th-scroll-2', dur:'14s', code:"TagManager.dataLayer({ dataLayer: { event: 'page_view', page_title: document.title } });   clarity('set','user_id', userId);   hotjar.identify(userId, { plan: 'pro' });"},
      ].map(({y,anim,dur,code},i) => (
        <text key={i} y={y} fill="#22d3ee" fontSize="11" fontFamily="monospace" opacity=".07"
          style={{animation:`${anim} ${dur} linear infinite`,display:'inline'}}>
          {code}
        </text>
      ))}
      {/* annotations techniques */}
      {[['80,420','EVENT'],['440,290','CONV.'],['800,168','PEAK'],['1040,108','MAX']].map(([pos,label],i) => {
        const [x,y] = pos.split(',');
        return (
          <g key={i}>
            <line x1={x} y1={parseInt(y)+4} x2={x} y2={parseInt(y)+22} stroke="#22d3ee" strokeWidth="1" opacity=".15" />
            <text x={parseInt(x)+6} y={parseInt(y)+20} fill="#22d3ee" fontSize="8" opacity=".2" fontFamily="monospace">{label}</text>
          </g>
        );
      })}
    </svg>
  </div>
);

/* ─── GTM Server-Side — sources → serveur → dispatch ─── */
export const ServerFlowIllustration = () => {
  const sources = [[100,140],[100,230],[100,300],[100,370],[100,460]];
  const srcLabels = ['BROWSER','MOBILE','APP','PIXEL','SDK'];
  const dests = [[1100,140],[1100,220],[1100,300],[1100,380],[1100,460]];
  const destLabels = ['GA4','G.ADS','META','PIANO','BigQ.'];
  return (
    <div className={base} aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>{`
            @keyframes gtm-in{0%{stroke-dashoffset:320}100%{stroke-dashoffset:0}}
            @keyframes gtm-out{0%{stroke-dashoffset:320}100%{stroke-dashoffset:0}}
            @keyframes gtm-pulse{0%,100%{opacity:.12}50%{opacity:.3}}
          `}</style>
        </defs>
        {/* nœuds sources (gauche) */}
        {sources.map(([cx,cy],i) => (
          <g key={i}>
            <rect x={cx-36} y={cy-14} width="72" height="28" rx="14"
              fill="none" stroke="#8b5cf6" strokeWidth="1" opacity=".18" />
            <text x={cx} y={cy+4} textAnchor="middle" fill="#a78bfa"
              fontSize="8" opacity=".25" fontFamily="monospace">{srcLabels[i]}</text>
          </g>
        ))}
        {/* flux entrants → serveur */}
        {sources.map(([cx,cy],i) => (
          <path key={i} d={`M${cx+36},${cy} C380,${cy} 380,300 480,300`}
            fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="320"
            style={{animation:`gtm-in ${2.5+i*0.35}s linear infinite`,opacity:.14}} />
        ))}
        {/* nœud serveur central */}
        <g transform="translate(600,300)">
          <rect x="-70" y="-50" width="140" height="100" rx="8"
            fill="none" stroke="#a78bfa" strokeWidth="1.5" opacity=".25"
            style={{animation:'gtm-pulse 2s ease-in-out infinite'}} />
          <rect x="-55" y="-36" width="110" height="14" rx="3"
            fill="none" stroke="#8b5cf6" strokeWidth="1" opacity=".15" />
          <rect x="-55" y="-14" width="110" height="14" rx="3"
            fill="none" stroke="#8b5cf6" strokeWidth="1" opacity=".15" />
          <rect x="-55" y="8" width="110" height="14" rx="3"
            fill="none" stroke="#8b5cf6" strokeWidth="1" opacity=".15" />
          {[-29,-7,15].map((y,i) => (
            <circle key={i} cx="-42" cy={y} r="3" fill="#a78bfa"
              style={{animation:`gtm-pulse ${1.2+i*0.4}s ease-in-out infinite`}} />
          ))}
          <text x="0" y="44" textAnchor="middle" fill="#a78bfa"
            fontSize="9" opacity=".3" fontFamily="monospace">GTM SERVER</text>
        </g>
        {/* flux sortants serveur → destinations */}
        {dests.map(([cx,cy],i) => (
          <path key={i} d={`M720,300 C820,300 820,${cy} ${cx-36},${cy}`}
            fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="320"
            style={{animation:`gtm-out ${2.2+i*0.4}s linear infinite`,opacity:.14}} />
        ))}
        {/* nœuds destinations (droite) */}
        {dests.map(([cx,cy],i) => (
          <g key={i}>
            <rect x={cx-36} y={cy-14} width="72" height="28" rx="14"
              fill="none" stroke="#7c3aed" strokeWidth="1" opacity=".18" />
            <text x={cx} y={cy+4} textAnchor="middle" fill="#a78bfa"
              fontSize="8" opacity=".25" fontFamily="monospace">{destLabels[i]}</text>
          </g>
        ))}
        {/* particules en transit */}
        {sources.map((_,i) => (
          <circle key={i} r="3" fill="#8b5cf6" opacity=".4">
            <animateMotion dur={`${2.5+i*0.35}s`} repeatCount="indefinite"
              path={`M${sources[i][0]+36},${sources[i][1]} C380,${sources[i][1]} 380,300 480,300`} />
          </circle>
        ))}
        {dests.map((_,i) => (
          <circle key={i} r="3" fill="#7c3aed" opacity=".4">
            <animateMotion dur={`${2.2+i*0.4}s`} repeatCount="indefinite"
              path={`M720,300 C820,300 820,${dests[i][1]} ${dests[i][0]-36},${dests[i][1]}`} />
          </circle>
        ))}
      </svg>
    </div>
  );
};

/* ─── GA4 — scatter plot + courbe de tendance ─── */
export const AnalyticsChartIllustration = () => (
  <div className={base} aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes ac-line{0%{stroke-dashoffset:700}100%{stroke-dashoffset:0}}
          @keyframes ac-dot{0%,100%{opacity:.1}50%{opacity:.25}}
          @keyframes ac-v1{0%{transform:translateY(-100%)}100%{transform:translateY(700px)}}
          @keyframes ac-v2{0%{transform:translateY(-300px)}100%{transform:translateY(900px)}}
          @keyframes ac-v3{0%{transform:translateY(-500px)}100%{transform:translateY(1100px)}}
        `}</style>
      </defs>
      {/* grille minimaliste — tirets légers */}
      {[160,260,360,460].map((y,i) => (
        <line key={i} x1="160" y1={y} x2="1040" y2={y}
          stroke="#f97316" strokeWidth="1" strokeDasharray="4 12" opacity=".06" />
      ))}
      {/* courbe de tendance — trait fin */}
      <polyline
        points="180,420 300,340 420,370 540,260 660,300 780,220 900,250 1020,180"
        fill="none" stroke="#f97316" strokeWidth="1.5" strokeDasharray="700"
        style={{animation:'ac-line 3s ease-out both',opacity:.15}} />
      {/* seconde courbe — sessions */}
      <polyline
        points="180,460 300,400 420,420 540,320 660,360 780,290 900,310 1020,250"
        fill="none" stroke="#fb923c" strokeWidth="1" strokeDasharray="700"
        style={{animation:'ac-line 3.5s ease-out both',opacity:.08}} />
      {/* points de données uniquement */}
      {[[180,420],[300,340],[420,370],[540,260],[660,300],[780,220],[900,250],[1020,180]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="none" stroke="#f97316" strokeWidth="1.5"
          style={{animation:`ac-dot ${1.5+i*0.3}s ease-in-out infinite`,opacity:.2}} />
      ))}
      {/* axes */}
      <line x1="160" y1="120" x2="160" y2="500" stroke="#f97316" strokeWidth="1" opacity=".08" />
      <line x1="160" y1="500" x2="1060" y2="500" stroke="#f97316" strokeWidth="1" opacity=".08" />
      {/* colonnes de code dataLayer défilant de haut en bas */}
      {[
        {x:260,  anim:'ac-v1', dur:'14s', lines:["dataLayer.push({","  event: 'view_item',","  ecommerce: {","    currency: 'EUR',","    items: [{","      item_id: 'SKU-001',","      item_name: 'Pack Pro',","      price: 149.90,","      quantity: 1","    }]","  }","});","","dataLayer.push({","  event: 'add_to_cart',","  ecommerce: {","    value: 49.90,","  }","});"]},
        {x:560,  anim:'ac-v3', dur:'18s', lines:["dataLayer.push({","  event: 'purchase',","  ecommerce: {","    transaction_id:","      'T-2048',","    value: 299.00,","    currency: 'EUR',","    tax: 49.83,","    shipping: 0,","  }","});","","dataLayer.push({","  event: 'begin_checkout',","  value: 299.00,","});"]},
        {x:860,  anim:'ac-v2', dur:'16s', lines:["dataLayer.push({","  event: 'generate_lead',","  lead_source: 'cpc',","  service: 'GA4',","  value: 1.0,","});","","dataLayer.push({","  event: 'page_view',","  page_title:","    document.title,","  page_location:","    location.href,","});"]},
      ].map(({x,anim,dur,lines},col) => (
        <g key={col} style={{animation:`${anim} ${dur} linear infinite`}}>
          {lines.map((line,i) => (
            <text key={i} x={x} y={i*16} fill="#f97316" fontSize="10"
              fontFamily="monospace" opacity=".09">{line}</text>
          ))}
        </g>
      ))}
    </svg>
  </div>
);

/* ─── Audit Google Ads — enchères PPC ─── */
export const AuditScanIllustration = () => (
  <div className={base} aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes ga-ping{0%{r:14;opacity:.25}100%{r:36;opacity:0}}
          @keyframes ga-pulse{0%,100%{opacity:.1}50%{opacity:.25}}
          @keyframes ga-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        `}</style>
      </defs>
      {/* bulles d'enchères de tailles différentes */}
      {[
        [220,200,44,'#7c3aed','€2.40'],[500,160,36,'#6d28d9','€1.80'],
        [780,220,52,'#7c3aed','€3.10'],[980,170,30,'#8b5cf6','€0.95'],
        [340,380,38,'#6d28d9','€1.60'],[640,350,48,'#7c3aed','€2.80'],
        [880,400,34,'#8b5cf6','€1.20'],[120,420,28,'#6d28d9','€0.75'],
      ].map(([cx,cy,r,c,label],i) => (
        <g key={i} style={{animation:`ga-float ${3+i*0.4}s ease-in-out infinite`}}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={c} strokeWidth="1" opacity=".2" />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={c} strokeWidth="1"
            style={{animation:`ga-ping 2.5s ${i*0.4}s ease-out infinite`}} />
          <text x={cx} y={cy+4} textAnchor="middle" fill={c}
            fontSize="10" opacity=".3" fontFamily="monospace">{label}</text>
        </g>
      ))}
      {/* courbe de performance CPC */}
      <polyline points="100,500 220,440 340,420 500,360 640,280 780,240 980,210 1100,190"
        fill="none" stroke="#7c3aed" strokeWidth="1.5" opacity=".15" strokeDasharray="8 4" />
      {/* barres de qualité score */}
      {[160,320,480,640,800,960].map((x,i) => (
        <g key={i}>
          <line x1={x} y1="540" x2={x} y2={540-[60,90,40,110,75,50][i]}
            stroke="#8b5cf6" strokeWidth="6" strokeLinecap="round" opacity=".1" />
        </g>
      ))}
      {/* étiquettes keywords */}
      {[
        [150,130,'[EXACT]'],[420,280,'[PHRASE]'],[700,130,'[BROAD]'],[1050,310,'+BMM'],
      ].map(([x,y,kw],i) => (
        <g key={i} style={{animation:`ga-pulse ${2+i*0.5}s ease-in-out infinite`}}>
          <rect x={x-30} y={y-12} width={kw.length*7+20} height="22" rx="4"
            fill="none" stroke="#7c3aed" strokeWidth="1" opacity=".15" />
          <text x={x+kw.length*3.5} y={y+4} textAnchor="middle"
            fill="#a78bfa" fontSize="9" opacity=".2" fontFamily="monospace">{kw}</text>
        </g>
      ))}
    </svg>
  </div>
);

/* ─── Automatisation Hub — workflow n8n complexe ─── */
export const CircuitBoardIllustration = () => {
  const nodes = [
    {x:80, y:300, w:100, h:36, color:'#f97316', label:'Webhook', rx:18},
    {x:240,y:200, w:90,  h:32, color:'#8b5cf6', label:'HTTP Req', rx:6},
    {x:240,y:300, w:90,  h:32, color:'#8b5cf6', label:'Set Data', rx:6},
    {x:240,y:400, w:90,  h:32, color:'#8b5cf6', label:'Schedule', rx:6},
    {x:420,y:250, w:80,  h:32, color:'#f59e0b', label:'IF', rx:16},
    {x:420,y:380, w:90,  h:32, color:'#8b5cf6', label:'Transform', rx:6},
    {x:590,y:180, w:80,  h:32, color:'#22d3ee', label:'Email', rx:6},
    {x:590,y:280, w:80,  h:32, color:'#22d3ee', label:'Slack', rx:6},
    {x:590,y:380, w:80,  h:32, color:'#8b5cf6', label:'Loop', rx:16},
    {x:760,y:230, w:80,  h:32, color:'#8b5cf6', label:'Filter', rx:6},
    {x:760,y:350, w:80,  h:32, color:'#8b5cf6', label:'Merge', rx:6},
    {x:930,y:280, w:90,  h:32, color:'#10b981', label:'DB Write', rx:6},
    {x:930,y:380, w:90,  h:32, color:'#8b5cf6', label:'Respond', rx:6},
    {x:1090,y:300,w:90,  h:36, color:'#10b981', label:'Done ✓', rx:18},
  ];
  const edges = [
    [0,1],[0,2],[0,3],[1,4],[2,4],[3,5],[4,6],[4,7],[5,8],
    [6,9],[7,9],[8,10],[9,11],[10,11],[10,12],[11,13],[12,13],
  ];
  return (
    <div className={base} aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 1240 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>{`
            @keyframes n8-flow{0%{stroke-dashoffset:250}100%{stroke-dashoffset:0}}
            @keyframes n8-pulse{0%,100%{opacity:.15}50%{opacity:.35}}
          `}</style>
        </defs>
        {edges.map(([a,b],i) => {
          const na=nodes[a], nb=nodes[b];
          const x1=na.x+na.w, y1=na.y+na.h/2, x2=nb.x, y2=nb.y+nb.h/2;
          return (
            <path key={i} d={`M${x1},${y1} C${(x1+x2)/2},${y1} ${(x1+x2)/2},${y2} ${x2},${y2}`}
              fill="none" stroke={na.color} strokeWidth="1.5" strokeDasharray="250"
              style={{animation:`n8-flow ${2.5+i*0.25}s linear infinite`,opacity:.13}} />
          );
        })}
        {nodes.map(({x,y,w,h,color,label,rx},i) => (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} rx={rx}
              fill="none" stroke={color} strokeWidth="1.5" opacity=".2"
              style={{animation:`n8-pulse ${2+i*0.2}s ease-in-out infinite`}} />
            <text x={x+w/2} y={y+h/2+4} textAnchor="middle"
              fill={color} fontSize="9" opacity=".28" fontFamily="monospace">{label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/* ─── Consent Mode — shield + circuit ─── */
export const ShieldCircuitIllustration = () => (
  <div className={base} aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes sc-pulse{0%,100%{opacity:.08}50%{opacity:.2}}
          @keyframes sc-trace{0%{stroke-dashoffset:200}100%{stroke-dashoffset:0}}
        `}</style>
      </defs>
      <g transform="translate(600,300)">
        <path d="M0,-200 L160,-120 L160,80 C160,160 80,220 0,240 C-80,220 -160,160 -160,80 L-160,-120 Z"
          fill="none" stroke="#c026d3" strokeWidth="1.5" opacity=".15" />
        <path d="M0,-200 L160,-120 L160,80 C160,160 80,220 0,240 C-80,220 -160,160 -160,80 L-160,-120 Z"
          fill="#c026d3" opacity=".04"
          style={{animation:'sc-pulse 3s ease-in-out infinite'}} />
        {[
          "M-80,-80 L-40,-80 L-40,-40 L40,-40 L40,-80 L80,-80",
          "M-80,0 L-20,0 L-20,60 L20,60 L20,0 L80,0",
          "M0,-140 L0,-100",
          "M-120,20 L-80,20",
          "M80,20 L120,20",
        ].map((d,i) => (
          <path key={i} d={d} fill="none" stroke="#e879f9" strokeWidth="1.5"
            strokeDasharray="200"
            style={{animation:`sc-trace ${2+i*0.4}s linear infinite`,opacity:.15}} />
        ))}
        {[[-80,-80],[40,-80],[-20,0],[20,60],[0,-140],[-120,20],[120,20]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="4" fill="#e879f9" opacity=".25"
            style={{animation:`sc-pulse ${1.5+i*0.4}s ease-in-out infinite`}} />
        ))}
        {[320,240,160].map((r,i) => (
          <circle key={i} cx="0" cy="0" r={r} fill="none" stroke="#c026d3"
            strokeWidth="1" strokeDasharray="8 16" opacity=".06"
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
          @keyframes br-flow{0%{stroke-dashoffset:400}100%{stroke-dashoffset:0}}
          @keyframes br-ping{0%{r:8;opacity:.3}100%{r:24;opacity:0}}
          @keyframes br-pulse{0%,100%{opacity:.1}50%{opacity:.25}}
        `}</style>
      </defs>
      <ellipse cx="280" cy="360" rx="180" ry="60" fill="none" stroke="#84cc16" strokeWidth="1" opacity=".15" />
      <ellipse cx="280" cy="360" rx="120" ry="40" fill="#84cc16" opacity=".05"
        style={{animation:'br-pulse 2.5s ease-in-out infinite'}} />
      {[[-60,-40],[-30,-60],[10,-50],[50,-35],[-20,-20]].map(([dx,dy],i) => (
        <circle key={i} cx={280+dx} cy={360+dy} r="4" fill="#84cc16" opacity=".25" />
      ))}
      <ellipse cx="920" cy="360" rx="180" ry="60" fill="none" stroke="#4ade80" strokeWidth="1" opacity=".15" />
      <ellipse cx="920" cy="360" rx="120" ry="40" fill="#4ade80" opacity=".05"
        style={{animation:'br-pulse 3s ease-in-out infinite'}} />
      {[[60,-40],[30,-60],[-10,-50],[-50,-35],[20,-20]].map(([dx,dy],i) => (
        <circle key={i} cx={920+dx} cy={360+dy} r="4" fill="#4ade80" opacity=".25" />
      ))}
      <path d="M380,330 C600,160 600,160 820,330"
        fill="none" stroke="#84cc16" strokeWidth="2" strokeDasharray="400"
        style={{animation:'br-flow 3s linear infinite',opacity:.2}} />
      <g transform="translate(600,230)">
        <circle cx="0" cy="0" r="14" fill="#84cc16" opacity=".1"
          style={{animation:'br-pulse 2s ease-in-out infinite'}} />
        <circle cx="0" cy="0" r="6" fill="#84cc16" opacity=".3" />
        <circle cx="0" cy="0" r="8" fill="none" stroke="#84cc16" strokeWidth="1"
          style={{animation:'br-ping 2s ease-out infinite'}} />
      </g>
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
          @keyframes gg-ping{0%{r:6;opacity:.4}100%{r:20;opacity:0}}
          @keyframes gg-pulse{0%,100%{opacity:.06}50%{opacity:.16}}
        `}</style>
      </defs>
      {[0,1,2,3,4,5,6].map(i => (
        <line key={i} x1={100+i*160} y1="120" x2={80+i*140} y2="520"
          stroke="#84cc16" strokeWidth="1" opacity=".07" />
      ))}
      {[0,1,2,3,4,5].map(i => {
        const y = 120+i*80;
        const shrink = i*10;
        return <line key={i} x1={100+shrink} y1={y} x2={1100-shrink} y2={y}
          stroke="#84cc16" strokeWidth="1" opacity=".07" />;
      })}
      {[
        [280,220],[600,160],[900,280],[420,380],
        [760,340],[160,420],[980,180],[560,460],
      ].map(([cx,cy],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="5" fill="#84cc16" opacity=".3" />
          <circle cx={cx} cy={cy} r="6" fill="none" stroke="#84cc16" strokeWidth="1"
            style={{animation:`gg-ping 2s ${i*0.3}s ease-out infinite`}} />
          <line x1={cx} y1={cy} x2={cx} y2={cy+20} stroke="#84cc16" strokeWidth="1" opacity=".2" />
          <ellipse cx={cx} cy={cy+22} rx="5" ry="2" fill="#84cc16" opacity=".15" />
        </g>
      ))}
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
          @keyframes dt-flow{0%{stroke-dashoffset:150}100%{stroke-dashoffset:0}}
          @keyframes dt-pop{0%,100%{opacity:.12}50%{opacity:.28}}
        `}</style>
      </defs>
      <g transform="translate(200,300)">
        <rect x="-40" y="-20" width="80" height="40" rx="20"
          fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity=".25" />
        <circle cx="0" cy="0" r="6" fill="#22d3ee" opacity=".3" />
      </g>
      {[
        {y:160,label:'Oui',color:'#22d3ee'},
        {y:440,label:'Non',color:'#06b6d4'},
      ].map(({y,label,color},i) => (
        <g key={i}>
          <path d={`M240,300 C360,300 360,${y} 480,${y}`}
            fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="150"
            style={{animation:`dt-flow ${1.5+i*0.5}s linear infinite`,opacity:.18}} />
          <rect x="480" y={y-22} width="100" height="44" rx="22"
            fill="none" stroke={color} strokeWidth="1.5" opacity=".2" />
          <text x="530" y={y+5} textAnchor="middle" fill={color}
            fontSize="11" opacity=".3" fontFamily="monospace">{label}</text>
          {[y-80,y+80].map((sy,j) => (
            <g key={j}>
              <path d={`M580,${y} C680,${y} 680,${sy} 780,${sy}`}
                fill="none" stroke={color} strokeWidth="1" strokeDasharray="120"
                style={{animation:`dt-flow ${2+j*0.4}s linear infinite`,opacity:.1}} />
              <rect x="780" y={sy-18} width="80" height="36" rx="18"
                fill="none" stroke={color} strokeWidth="1" opacity=".12" />
            </g>
          ))}
        </g>
      ))}
    </svg>
  </div>
);

/* ─── Shopify — flux de données e-commerce ─── */
export const EcommerceFunnelIllustration = () => (
  <div className={base} aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes ef-flow{0%{stroke-dashoffset:400}100%{stroke-dashoffset:0}}
          @keyframes ef-dot{0%,100%{opacity:.1}50%{opacity:.3}}
        `}</style>
      </defs>
      {/* lignes de flux diagonales */}
      {[80,160,240,320,400,480,560].map((y,i) => (
        <line key={i} x1="0" y1={y} x2="1200" y2={y+160}
          stroke="#10b981" strokeWidth="1" strokeDasharray="400"
          style={{animation:`ef-flow ${4+i*0.4}s linear infinite`,opacity:.06}} />
      ))}
      {/* nœuds de conversion */}
      {[
        [200,200,'VISIT'],[400,280,'FICHE'],[600,220,'PANIER'],
        [800,300,'CHECK'],[1000,240,'ACHAT'],
      ].map(([cx,cy,label],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="22" fill="none" stroke="#10b981" strokeWidth="1" opacity=".15" />
          <circle cx={cx} cy={cy} r="4" fill="#10b981"
            style={{animation:`ef-dot ${2+i*0.4}s ease-in-out infinite`}} />
          <text x={cx} y={cy+36} textAnchor="middle" fill="#10b981"
            fontSize="9" opacity=".15" fontFamily="monospace">{label}</text>
        </g>
      ))}
      {/* liaisons entre nœuds */}
      {[[200,200,400,280],[400,280,600,220],[600,220,800,300],[800,300,1000,240]].map(([x1,y1,x2,y2],i) => (
        <path key={i} d={`M${x1+22},${y1} C${(x1+x2)/2},${y1} ${(x1+x2)/2},${y2} ${x2-22},${y2}`}
          fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="400"
          style={{animation:`ef-flow ${2.5+i*0.5}s linear infinite`,opacity:.12}} />
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
          @keyframes wf-draw{0%{stroke-dashoffset:500}100%{stroke-dashoffset:0}}
          @keyframes wf-pulse{0%,100%{opacity:.08}50%{opacity:.2}}
        `}</style>
      </defs>
      <rect x="340" y="80" width="520" height="440" rx="8"
        fill="none" stroke="#f59e0b" strokeWidth="1" opacity=".1"
        strokeDasharray="500"
        style={{animation:'wf-draw 3s ease-out both'}} />
      <rect x="340" y="80" width="520" height="50" rx="8" fill="#f59e0b" opacity=".025" />
      <rect x="360" y="95" width="120" height="16" rx="3" fill="#f59e0b" opacity=".06" />
      <rect x="740" y="95" width="60" height="16" rx="8" fill="#f59e0b" opacity=".07" />
      <rect x="360" y="150" width="480" height="120" rx="4"
        fill="none" stroke="#f59e0b" strokeWidth="1" opacity=".05" />
      <line x1="360" y1="150" x2="840" y2="270" stroke="#f59e0b" strokeWidth="1" opacity=".03" />
      <line x1="840" y1="150" x2="360" y2="270" stroke="#f59e0b" strokeWidth="1" opacity=".03" />
      {[290,310,330].map((y,i) => (
        <rect key={i} x={400+i*10} y={y} width={300-i*40} height="8" rx="2"
          fill="#f59e0b" opacity=".04" />
      ))}
      <rect x="480" y="360" width="240" height="44" rx="22"
        fill="#f59e0b" opacity=".05"
        style={{animation:'wf-pulse 2s ease-in-out infinite'}} />
      <rect x="480" y="360" width="240" height="44" rx="22"
        fill="none" stroke="#f59e0b" strokeWidth="1" opacity=".1" />
    </svg>
  </div>
);

/* ─── Blog — data viz high-tech : barres + courbes + chiffres ─── */
export const BlogIllustration = () => (
  <div className={base} aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes bl-bar{0%{transform:scaleY(0);opacity:0}100%{transform:scaleY(1);opacity:1}}
          @keyframes bl-line{0%{stroke-dashoffset:900}100%{stroke-dashoffset:0}}
          @keyframes bl-num{0%,100%{opacity:.1}33%{opacity:.3}66%{opacity:.2}}
          @keyframes bl-grid{0%,100%{opacity:.04}50%{opacity:.08}}
        `}</style>
      </defs>
      {/* grille de fond */}
      {[100,200,300,400,500].map((y,i) => (
        <line key={i} x1="80" y1={y} x2="1120" y2={y}
          stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 8"
          style={{animation:`bl-grid ${3+i*0.4}s ease-in-out infinite`}} />
      ))}
      {/* barres à bâtons — groupe gauche */}
      {[
        [120,320,60,'#22d3ee'],[200,260,60,'#06b6d4'],[280,380,60,'#22d3ee'],
        [360,200,60,'#0891b2'],[440,290,60,'#22d3ee'],[520,170,60,'#06b6d4'],
      ].map(([x,y,w,color],i) => (
        <rect key={i} x={x} y={y} width={w} height={500-y} rx="3"
          fill="none" stroke={color} strokeWidth="1.5" opacity=".09"
          style={{transformOrigin:`${x+w/2}px 500px`,animation:`bl-bar .8s ${i*0.15}s ease-out both`}} />
      ))}
      {/* barres — groupe droit (couleur différente) */}
      {[
        [640,340,60,'#8b5cf6'],[720,240,60,'#7c3aed'],[800,300,60,'#8b5cf6'],
        [880,180,60,'#6d28d9'],[960,260,60,'#8b5cf6'],[1040,200,60,'#7c3aed'],
      ].map(([x,y,w,color],i) => (
        <rect key={i} x={x} y={y} width={w} height={500-y} rx="3"
          fill="none" stroke={color} strokeWidth="1.5" opacity=".18"
          style={{transformOrigin:`${x+w/2}px 500px`,animation:`bl-bar .8s ${.9+i*0.15}s ease-out both`}} />
      ))}
      {/* courbe de tendance principale */}
      <polyline
        points="150,320 230,260 310,380 390,200 470,290 550,170 670,340 750,240 830,300 910,180 990,260 1070,200"
        fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="900"
        style={{animation:'bl-line 3s ease-out both',opacity:.2}} />
      {/* courbe secondaire */}
      <polyline
        points="150,360 230,300 310,420 390,260 470,340 550,230 670,380 750,290 830,340 910,230 990,310 1070,250"
        fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="900"
        style={{animation:'bl-line 4s ease-out both',opacity:.12}} />
      {/* chiffres flottants */}
      {[
        [160,300,'+14%'],[390,185,'+28%'],[550,155,'+41%'],
        [710,225,'+19%'],[910,165,'+33%'],[1070,185,'+22%'],
      ].map(([x,y,val],i) => (
        <text key={i} x={x} y={y} textAnchor="middle" fill="#22d3ee"
          fontSize="10" fontFamily="monospace"
          style={{animation:`bl-num ${2+i*0.4}s ease-in-out infinite`,opacity:.18}}>{val}</text>
      ))}
      {/* axe X */}
      <line x1="80" y1="500" x2="1120" y2="500" stroke="#334155" strokeWidth="1" opacity=".2" />
    </svg>
  </div>
);

/* ─── Conciergerie — workflow nœuds ─── */
export const WorkflowIllustration = () => (
  <div className={base} aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes wk-flow{0%{stroke-dashoffset:200}100%{stroke-dashoffset:0}}
          @keyframes wk-pulse{0%,100%{opacity:.12}50%{opacity:.3}}
        `}</style>
      </defs>
      {[
        {x:160,y:200,label:'MSG',  color:'#8b5cf6',main:false},
        {x:160,y:400,label:'BOOK', color:'#8b5cf6',main:false},
        {x:420,y:300,label:'BOT',  color:'#7c3aed',main:true},
        {x:680,y:180,label:'EMAIL',color:'#22d3ee',main:false},
        {x:680,y:300,label:'SMS',  color:'#22d3ee',main:false},
        {x:680,y:420,label:'AGENDA',color:'#22d3ee',main:false},
        {x:940,y:240,label:'AIRBNB', color:'#8b5cf6',main:false},
        {x:940,y:360,label:'BOOKING',color:'#8b5cf6',main:false},
      ].map(({x,y,label,color,main},i) => (
        <g key={i}>
          {main && <circle cx={x} cy={y} r="36" fill={color} opacity=".08"
            style={{animation:`wk-pulse 2s ease-in-out infinite`}} />}
          <rect x={x-30} y={y-18} width="60" height="36" rx={main?18:6}
            fill="none" stroke={color} strokeWidth={main?1.5:1} opacity={main?.25:.15} />
          <text x={x} y={y+5} textAnchor="middle" fill={color}
            fontSize="9" opacity={main?.35:.2} fontFamily="monospace">{label}</text>
        </g>
      ))}
      {[
        [160,200,420,300],[160,400,420,300],
        [420,300,680,180],[420,300,680,300],[420,300,680,420],
        [680,180,940,240],[680,300,940,300],[680,420,940,360],
      ].map(([x1,y1,x2,y2],i) => (
        <path key={i}
          d={`M${x1+30},${y1} C${(x1+x2)/2},${y1} ${(x1+x2)/2},${y2} ${x2-30},${y2}`}
          fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="200"
          style={{animation:`wk-flow ${2+i*0.3}s linear infinite`,opacity:.12}} />
      ))}
    </svg>
  </div>
);
