import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { META, getMeta } from '@/seo/meta.config';

/**
 * Fil d'Ariane visuel reflétant le silo : Accueil › Hub de silo › Page.
 * Lit la SOURCE UNIQUE src/seo/meta.config.js (champs `silo` + `breadcrumbName`).
 * Le pendant balisé (JSON-LD BreadcrumbList) est pré-rendu par
 * scripts/inject-social-meta.js — les deux restent cohérents par construction.
 *
 * Usage : <Breadcrumb route="/tracking-data/gtm-server-side" />
 * À placer en haut du contenu du hero (texte clair sur fond sombre).
 */
const Breadcrumb = ({ route, className = '' }) => {
  const meta = getMeta(route);
  if (!meta || route === '/') return null;

  const crumbs = [{ name: 'Accueil', path: '/' }];
  if (meta.silo && META[meta.silo]) {
    crumbs.push({ name: META[meta.silo].breadcrumbName, path: meta.silo });
  }
  crumbs.push({ name: meta.breadcrumbName, path: route, current: true });

  return (
    <nav aria-label="Fil d'Ariane" className={`mb-6 ${className}`}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-slate-400">
        {crumbs.map((crumb, i) => (
          <li key={crumb.path} className="flex items-center gap-x-1.5">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />}
            {crumb.current ? (
              <span aria-current="page" className="text-slate-300 font-medium">{crumb.name}</span>
            ) : (
              <Link to={crumb.path} className="hover:text-cyan-400 transition-colors">{crumb.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
