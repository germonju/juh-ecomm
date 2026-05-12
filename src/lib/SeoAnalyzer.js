/**
 * SEO Analyzer Utility
 * Provides comprehensive SEO analysis functions for pages and articles.
 */

export const analyzeContent = (title, metaTitle, metaDescription, htmlContent) => {
  const parser = new DOMParser();
  
  // CRITICAL FIX: Blog articles have their H1 (title) rendered separately in the page template,
  // not in the article content HTML. We need to include it in our analysis.
  // Prepend the title as an H1 to get accurate heading structure analysis.
  const htmlWithTitle = `<h1>${title || ''}</h1>${htmlContent || ''}`;
  const doc = parser.parseFromString(htmlWithTitle, 'text/html');

  const results = {
    score: 100,
    title: analyzeTitle(title, metaTitle),
    metaDescription: analyzeMetaDescription(metaDescription),
    headings: analyzeHeadings(doc),
    content: analyzeTextContent(doc),
    images: analyzeImages(doc),
    links: analyzeLinks(doc),
    issues: []
  };

  // Calculate overall score based on individual checks
  let deductions = 0;
  
  if (results.title.status === 'error') deductions += 20;
  else if (results.title.status === 'warning') deductions += 10;

  if (results.metaDescription.status === 'error') deductions += 20;
  else if (results.metaDescription.status === 'warning') deductions += 10;

  if (results.headings.status === 'error') deductions += 15;
  else if (results.headings.status === 'warning') deductions += 5;

  if (results.content.status === 'error') deductions += 10;
  else if (results.content.status === 'warning') deductions += 5;

  if (results.images.status === 'warning') deductions += 5;
  
  results.score = Math.max(0, 100 - deductions);

  // Collect issues
  if (results.title.issue) results.issues.push({ type: 'Title', ...results.title.issue });
  if (results.metaDescription.issue) results.issues.push({ type: 'Meta', ...results.metaDescription.issue });
  if (results.headings.issue) results.issues.push({ type: 'Headings', ...results.headings.issue });
  if (results.content.issue) results.issues.push({ type: 'Content', ...results.content.issue });
  if (results.images.issue) results.issues.push({ type: 'Images', ...results.images.issue });

  return results;
};

const analyzeTitle = (title, metaTitle) => {
  const effectiveTitle = metaTitle || title || '';
  const length = effectiveTitle.length;
  
  if (length === 0) {
    return { status: 'error', length, issue: { severity: 'critical', message: 'Titre manquant', recommendation: 'Ajoutez un titre descriptif.' } };
  }
  if (length < 30) {
    return { status: 'warning', length, issue: { severity: 'medium', message: 'Titre trop court', recommendation: 'Allongez le titre (50-60 caractères).' } };
  }
  if (length > 60) {
    return { status: 'warning', length, issue: { severity: 'medium', message: 'Titre trop long', recommendation: 'Raccourcissez le titre (50-60 caractères).' } };
  }
  
  return { status: 'success', length, text: effectiveTitle };
};

const analyzeMetaDescription = (metaDesc) => {
  const desc = metaDesc || '';
  const length = desc.length;

  if (length === 0) {
    return { status: 'error', length, issue: { severity: 'high', message: 'Meta description manquante', recommendation: 'Ajoutez une description de 120-160 caractères.' } };
  }
  if (length < 120) {
    return { status: 'warning', length, issue: { severity: 'medium', message: 'Meta description trop courte', recommendation: 'Allongez la description (120-160 caractères).' } };
  }
  if (length > 160) {
    return { status: 'warning', length, issue: { severity: 'medium', message: 'Meta description trop longue', recommendation: 'Raccourcissez la description (120-160 caractères).' } };
  }

  return { status: 'success', length, text: desc };
};

const analyzeHeadings = (doc) => {
  const h1s = doc.querySelectorAll('h1').length;
  const h2s = doc.querySelectorAll('h2').length;
  const h3s = doc.querySelectorAll('h3').length;

  let status = 'success';
  let issue = null;

  if (h1s === 0) {
    status = 'error';
    issue = { severity: 'high', message: 'Aucun H1 détecté', recommendation: 'Ajoutez un titre principal en H1.' };
  } else if (h1s > 1) {
    status = 'error';
    issue = { severity: 'high', message: 'Plusieurs balises H1 détectées', recommendation: 'N\'utilisez qu\'un seul H1 par page.' };
  } else if (h2s === 0 && h3s > 0) {
    status = 'warning';
    issue = { severity: 'medium', message: 'Hiérarchie incorrecte des titres', recommendation: 'Utilisez des H2 avant des H3 pour respecter la hiérarchie.' };
  } else if (h2s === 0) {
    status = 'warning';
    issue = { severity: 'low', message: 'Aucun sous-titre H2', recommendation: 'Structurez votre contenu avec des H2 pour améliorer la lisibilité.' };
  }

  return { status, h1Count: h1s, h2Count: h2s, h3Count: h3s, issue };
};

const analyzeTextContent = (doc) => {
  const text = doc.body.textContent || '';
  const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;

  let status = 'success';
  let issue = null;

  if (words < 300) {
    status = 'error';
    issue = { severity: 'high', message: 'Contenu trop court', recommendation: 'Visez au moins 300 mots pour un bon référencement.' };
  } else if (words < 600) {
    status = 'warning';
    issue = { severity: 'medium', message: 'Contenu un peu court', recommendation: 'Un article de blog performant contient souvent plus de 800 mots.' };
  }

  return { status, wordCount: words, issue };
};

const analyzeImages = (doc) => {
  const images = Array.from(doc.querySelectorAll('img'));
  const total = images.length;
  const missingAlt = images.filter(img => !img.getAttribute('alt') || img.getAttribute('alt').trim() === '').length;

  let status = 'success';
  let issue = null;

  if (total > 0 && missingAlt > 0) {
    status = 'warning';
    issue = { severity: 'medium', message: `${missingAlt} image(s) sans attribut alt`, recommendation: `Ajoutez un texte alternatif descriptif à toutes les images.` };
  }

  const altCoverage = total > 0 ? Math.round(((total - missingAlt) / total) * 100) : 100;

  return { status, total, missingAlt, altCoverage, issue };
};

const analyzeLinks = (doc) => {
  const links = Array.from(doc.querySelectorAll('a'));
  const total = links.length;
  const internal = links.filter(a => {
    const href = a.getAttribute('href');
    return href && (href.startsWith('/') || href.includes('juh-ecomm.fr'));
  }).length;
  const external = total - internal;

  return { total, internal, external };
};