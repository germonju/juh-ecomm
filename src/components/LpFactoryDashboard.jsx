import React from 'react';
import {
  Eye, ShieldCheck, Clock, Inbox, Target, Activity, Rocket, Calendar, ChevronDown, Layers,
} from 'lucide-react';

/* Maquette du tableau de bord de la LP Factory — données de démonstration.
   Tous les totaux, taux et histogrammes sont dérivés du détail par version
   pour rester cohérents entre eux. */

const LANDING_PAGES = [
  {
    name: 'Devis Toiture',
    versions: [
      { id: 'A', label: 'Version A', impressions: 312, seconds: 112, leads: 16, status: 'winner' },
      { id: 'B', label: 'Version B', impressions: 98, seconds: 38, leads: 1, status: 'killed' },
      { id: 'C', label: 'Version C', impressions: 204, seconds: 101, leads: 10, status: 'testing' },
    ],
  },
  {
    name: 'Audit Énergétique',
    versions: [
      { id: 'A', label: 'Version A', impressions: 241, seconds: 78, leads: 8, status: 'testing' },
      { id: 'B', label: 'Version B', impressions: 236, seconds: 93, leads: 11, status: 'winner' },
    ],
  },
  {
    name: 'Pack Découverte',
    versions: [
      { id: 'A', label: 'Version A', impressions: 87, seconds: 47, leads: 2, status: 'killed' },
      { id: 'B', label: 'Version B', impressions: 70, seconds: 65, leads: 3, status: 'testing' },
    ],
  },
];

const TRACKING_COVERAGE = 96.8; // % des sessions servies dont les événements sont bien mesurés
const CONSENT_RATE = 62.4; // % d'acceptations / impressions

// Profils journaliers (30 jours) utilisés pour répartir les totaux
const IMPRESSION_WEIGHTS = [22, 31, 48, 40, 18, 15, 36, 44, 52, 47, 39, 21, 17, 41, 49, 55, 50, 43, 24, 19, 45, 53, 61, 57, 48, 26, 20, 50, 58, 34];
const LEAD_WEIGHTS = [0, 1, 2, 1, 0, 0, 2, 1, 3, 2, 1, 0, 1, 2, 2, 3, 2, 1, 0, 0, 2, 3, 4, 2, 2, 1, 0, 3, 3, 1];

const STATUS = {
  winner: { label: 'Gagnante', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  testing: { label: 'En test', className: 'bg-violet-50 text-violet-700 border-violet-200' },
  killed: { label: 'Arrêtée', className: 'bg-slate-100 text-slate-500 border-slate-200' },
};

const sum = (arr, key) => arr.reduce((acc, item) => acc + item[key], 0);

// Répartit `total` selon des poids (méthode du plus fort reste) → la somme tombe juste
const distribute = (total, weights) => {
  const wSum = weights.reduce((a, b) => a + b, 0);
  const raw = weights.map((w) => (w / wSum) * total);
  const out = raw.map(Math.floor);
  let rest = total - out.reduce((a, b) => a + b, 0);
  raw
    .map((v, i) => [v - Math.floor(v), i])
    .sort((a, b) => b[0] - a[0])
    .forEach(([, i]) => { if (rest > 0) { out[i] += 1; rest -= 1; } });
  return out;
};

const fmtPct = (v) => `${v.toFixed(2).replace('.', ',')} %`;
const fmtDuration = (s) => {
  const r = Math.round(s);
  const m = Math.floor(r / 60);
  return m ? `${m} min ${String(r % 60).padStart(2, '0')} s` : `${r} s`;
};
const conv = (leads, impressions) => (impressions ? (leads / impressions) * 100 : 0);

const pages = LANDING_PAGES.map((lp) => {
  const impressions = sum(lp.versions, 'impressions');
  const leads = sum(lp.versions, 'leads');
  const seconds = lp.versions.reduce((a, v) => a + v.seconds * v.impressions, 0) / impressions;
  return { ...lp, impressions, leads, seconds };
}).sort((a, b) => b.leads - a.leads);

const allVersions = LANDING_PAGES.flatMap((lp) => lp.versions);
const totalImpressions = sum(allVersions, 'impressions');
const totalLeads = sum(allVersions, 'leads');
const avgSeconds = allVersions.reduce((a, v) => a + v.seconds * v.impressions, 0) / totalImpressions;

const dailyImpressions = distribute(totalImpressions, IMPRESSION_WEIGHTS);
const dailyLeads = distribute(totalLeads, LEAD_WEIGHTS);
const DAY_LABELS = { 0: '04/09', 7: '11/09', 14: '18/09', 21: '25/09', 29: '03/10' };

const KPIS = [
  { icon: Eye, label: 'Impressions', value: totalImpressions.toLocaleString('fr-FR'), sub: 'toutes LP', tone: 'text-sky-600 bg-sky-50' },
  { icon: ShieldCheck, label: 'Couverture tracking', value: `${TRACKING_COVERAGE.toFixed(1).replace('.', ',')} %`, sub: 'sessions mesurées', tone: 'text-emerald-600 bg-emerald-50' },
  { icon: ShieldCheck, label: 'Taux de consentement', value: `${CONSENT_RATE.toFixed(1).replace('.', ',')} %`, sub: 'acceptations / impressions', tone: 'text-amber-600 bg-amber-50' },
  { icon: Inbox, label: 'Leads', value: totalLeads, sub: 'formulaires envoyés', tone: 'text-violet-600 bg-violet-50', accent: true },
  { icon: Target, label: 'Conversion', value: fmtPct(conv(totalLeads, totalImpressions)), sub: 'leads / impressions', tone: 'text-rose-600 bg-rose-50' },
  { icon: Clock, label: 'Temps moyen', value: fmtDuration(avgSeconds), sub: 'onglet visible', tone: 'text-orange-600 bg-orange-50' },
];

const BarChart = ({ title, icon: Icon, data, unit, bar, cap, iconColor }) => {
  const max = Math.max(...data);
  const total = data.reduce((a, b) => a + b, 0);
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`w-4 h-4 ${iconColor}`} />
        <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
      </div>
      <div className="flex flex-wrap justify-between gap-x-3 text-[11px] text-slate-500 mb-3">
        <span>2026-09-04 → 2026-10-03</span>
        <span><span className="font-semibold text-slate-800">Total : {total} {unit}</span> · Jour le plus actif : {max}</span>
      </div>
      <div className="relative h-28 sm:h-32 flex items-end gap-[3px] border-b border-dashed border-slate-200">
        <span className="absolute -top-1 left-0 text-[10px] text-slate-400">{max}</span>
        {data.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end h-full">
            <div
              className={`w-full rounded-t-[2px] ${bar} border-t-2 ${cap}`}
              style={{ height: `${Math.max((v / max) * 100, v ? 4 : 0)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="relative h-4 mt-1 text-[10px] text-slate-400">
        {Object.entries(DAY_LABELS).map(([i, label]) => (
          <span key={i} className="absolute -translate-x-1/2" style={{ left: `${((Number(i) + 0.5) / data.length) * 100}%` }}>{label}</span>
        ))}
      </div>
    </div>
  );
};

const LpFactoryDashboard = () => (
  <figure className="m-0">
    <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl shadow-black/40 bg-slate-50 text-slate-900">
      {/* barre de fenêtre */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-200/70 border-b border-slate-200">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 text-[11px] text-slate-500 font-mono truncate">lp-factory · statistiques</span>
      </div>

      {/* en-tête + filtres */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 px-4 sm:px-6 py-4 bg-white border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900 leading-tight">Statistiques</h3>
          <p className="text-xs text-slate-500">Toutes les landing pages · sur 30 jours</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs" aria-hidden="true">
          <span className="inline-flex items-center gap-1.5 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700">
            <Rocket className="w-3.5 h-3.5 text-slate-400" /> Toutes les LP <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </span>
          <span className="inline-flex items-center gap-1 bg-slate-100 rounded-lg p-1 text-slate-500">
            {['7 j', '30 j', '90 j'].map((p) => (
              <span key={p} className={`px-2 py-0.5 rounded-md ${p === '30 j' ? 'bg-white text-slate-900 font-semibold shadow-sm' : ''}`}>{p}</span>
            ))}
            <span className="inline-flex items-center gap-1 px-2 py-0.5"><Calendar className="w-3 h-3" /> Dates</span>
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        {/* KPI */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {KPIS.map(({ icon: Icon, label, value, sub, tone, accent }) => (
            <div key={label} className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 shadow-sm min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${tone}`}><Icon className="w-4 h-4" /></span>
                <span className="text-[10px] uppercase tracking-wide text-slate-500 leading-tight">{label}</span>
              </div>
              <div className={`text-xl sm:text-2xl font-bold ${accent ? 'text-violet-600' : 'text-slate-900'}`}>{value}</div>
              <div className="text-[11px] text-slate-400 truncate">{sub}</div>
            </div>
          ))}
        </div>

        {/* histogrammes */}
        <div className="grid md:grid-cols-2 gap-4">
          <BarChart title="Impressions / jour" icon={Activity} iconColor="text-violet-600" data={dailyImpressions} unit="impr." bar="bg-violet-100" cap="border-violet-600" />
          <BarChart title="Leads / jour" icon={Inbox} iconColor="text-emerald-600" data={dailyLeads} unit="leads" bar="bg-emerald-100" cap="border-emerald-500" />
        </div>

        {/* tableau par LP */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-4 sm:px-5 pt-4 pb-3">
            <Layers className="w-4 h-4 text-violet-600" />
            <div>
              <h4 className="font-semibold text-slate-900 text-sm leading-tight">Par landing page</h4>
              <p className="text-[11px] text-slate-500">classées par nombre de leads</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-wide text-slate-500 bg-slate-50 border-y border-slate-200">
                  <th className="text-left font-medium px-4 sm:px-5 py-2">Landing page</th>
                  <th className="text-right font-medium px-3 py-2">Impressions</th>
                  <th className="text-right font-medium px-3 py-2">Temps moyen</th>
                  <th className="text-right font-medium px-3 py-2">Leads</th>
                  <th className="text-right font-medium px-4 sm:px-5 py-2">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((lp) => (
                  <React.Fragment key={lp.name}>
                    <tr className="border-b border-slate-100">
                      <td className="px-4 sm:px-5 py-2.5 font-medium text-slate-900">{lp.name}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums">{lp.impressions}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums">{fmtDuration(lp.seconds)}</td>
                      <td className="px-3 py-2.5 text-right font-semibold tabular-nums">{lp.leads}</td>
                      <td className="px-4 sm:px-5 py-2.5 text-right font-semibold text-violet-600 tabular-nums">{fmtPct(conv(lp.leads, lp.impressions))}</td>
                    </tr>
                    {lp.versions.map((v) => {
                      const killed = v.status === 'killed';
                      return (
                        <tr key={v.id} className={`border-b border-slate-100 bg-slate-50/60 text-[13px] ${killed ? 'text-slate-400' : 'text-slate-600'}`}>
                          <td className="pl-8 sm:pl-10 pr-3 py-2">
                            <span className="inline-flex items-center gap-2">
                              <span className="w-5 h-5 rounded border border-slate-300 bg-white text-[10px] font-semibold flex items-center justify-center text-slate-600">{v.id}</span>
                              <span className={killed ? 'line-through' : ''}>{v.label}</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${STATUS[v.status].className}`}>{STATUS[v.status].label}</span>
                            </span>
                          </td>
                          <td className="px-3 py-2 text-right tabular-nums">{v.impressions}</td>
                          <td className="px-3 py-2 text-right tabular-nums">{fmtDuration(v.seconds)}</td>
                          <td className="px-3 py-2 text-right tabular-nums">{v.leads}</td>
                          <td className={`px-4 sm:px-5 py-2 text-right tabular-nums ${killed ? '' : 'text-violet-600'}`}>{fmtPct(conv(v.leads, v.impressions))}</td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <figcaption className="text-center text-xs text-slate-500 mt-3">
      Aperçu du tableau de bord LP Factory — données de démonstration.
    </figcaption>
  </figure>
);

export default LpFactoryDashboard;
