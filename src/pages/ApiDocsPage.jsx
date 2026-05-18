import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { getCanonicalUrl } from '@/lib/canonicalUrlHandler';
import { Terminal, Key, Copy, CheckCircle2, BookOpen, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ApiDocsPage = () => {
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pt-20 pb-12">
      <Helmet>
        <title>Documentation API Blog | Juh Ecomm Data</title>
        {/* ADDED: Noindex directive to prevent Google indexing */}
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Documentation de l'API pour la gestion des articles de blog. Endpoints, authentification et exemples." />
        
        {/* Open Graph tags */}
        <meta property="og:site_name" content="Juh Ecomm Data" />
        <meta property="og:title" content="Documentation API Blog | Juh Ecomm Data" />
        <meta property="og:description" content="Documentation de l'API pour la gestion des articles de blog. Endpoints, authentification et exemples." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
        <meta property="og:locale" content="fr_FR" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@juh_ecomm" />
        <meta name="twitter:title" content="Documentation API Blog | Juh Ecomm Data" />
        <meta name="twitter:description" content="Documentation de l'API pour la gestion des articles de blog. Endpoints, authentification et exemples." />
        <meta name="twitter:image" content="https://www.juh-ecomm.fr/images/og-image.jpg" />
      </Helmet>

      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="mb-12">
          <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 mb-4">Développeurs</Badge>
          <h1 className="text-4xl font-bold text-white mb-4">Documentation API Blog</h1>
          <p className="text-xl text-slate-400">
            Gérez votre contenu programmatiquement via notre API REST sécurisée.
          </p>
        </div>

        <div className="grid gap-10">
          {/* Authentication */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                <Key className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Authentification</h2>
            </div>
            
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <p className="text-slate-400 mb-4">
                  Toutes les requêtes API doivent inclure votre clé API dans le header <code className="bg-slate-800 px-2 py-1 rounded text-cyan-300 text-sm font-mono">x-api-key</code>.
                </p>
                
                <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 font-mono text-sm overflow-x-auto">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="text-slate-500">// Header Example</div>
                      <div>
                        <span className="text-purple-400">x-api-key</span>: <span className="text-green-400">votre_cle_secrete_ici</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-3 p-4 bg-yellow-900/10 border border-yellow-500/20 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-200">
                    Gardez votre clé API secrète. Ne l'exposez jamais dans du code client (navigateur).
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Endpoints */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                <Terminal className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Endpoints</h2>
            </div>

            <Tabs defaultValue="create" className="w-full">
              <TabsList className="bg-slate-900 border border-slate-800 mb-6">
                <TabsTrigger value="create">Créer un article</TabsTrigger>
                <TabsTrigger value="list">Lister les articles</TabsTrigger>
              </TabsList>

              <TabsContent value="create">
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">POST</Badge>
                      <code className="text-lg text-white font-mono">/functions/v1/create-article</code>
                    </div>
                    <CardTitle className="mt-2 text-base font-normal text-slate-400">
                      Crée un nouvel article de blog.
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3">Body Parameters (JSON)</h4>
                      <div className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-slate-900 text-slate-400">
                            <tr>
                              <th className="px-4 py-3 font-medium">Champ</th>
                              <th className="px-4 py-3 font-medium">Type</th>
                              <th className="px-4 py-3 font-medium">Requis</th>
                              <th className="px-4 py-3 font-medium">Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800 text-slate-300">
                            <tr>
                              <td className="px-4 py-3 font-mono text-cyan-300">title</td>
                              <td className="px-4 py-3 text-purple-300">string</td>
                              <td className="px-4 py-3 text-red-400">Oui</td>
                              <td className="px-4 py-3">Titre principal de l'article</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-cyan-300">slug</td>
                              <td className="px-4 py-3 text-purple-300">string</td>
                              <td className="px-4 py-3 text-red-400">Oui</td>
                              <td className="px-4 py-3">URL unique (ex: mon-super-article)</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-cyan-300">content</td>
                              <td className="px-4 py-3 text-purple-300">string</td>
                              <td className="px-4 py-3 text-red-400">Oui</td>
                              <td className="px-4 py-3">Contenu HTML de l'article</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-cyan-300">category</td>
                              <td className="px-4 py-3 text-purple-300">string</td>
                              <td className="px-4 py-3 text-slate-500">Non</td>
                              <td className="px-4 py-3">Catégorie (Tracking, Analytics, etc.)</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-cyan-300">status</td>
                              <td className="px-4 py-3 text-purple-300">string</td>
                              <td className="px-4 py-3 text-slate-500">Non</td>
                              <td className="px-4 py-3">'draft' ou 'published' (défaut: draft)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3">Exemple de requête</h4>
                      <div className="relative group">
                        <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <pre className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-sm font-mono text-slate-300 overflow-x-auto">
{`curl -X POST https://[PROJECT_REF].supabase.co/functions/v1/create-article \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: votre_cle_api" \\
  -d '{
    "title": "Comment optimiser son tracking GA4",
    "slug": "optimiser-tracking-ga4",
    "content": "<h2>Introduction</h2><p>Le tracking est essentiel...</p>",
    "meta_description": "Guide complet pour optimiser votre configuration GA4.",
    "category": "Analytics",
    "status": "published"
  }'`}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="list">
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">GET</Badge>
                      <code className="text-lg text-white font-mono">/rest/v1/articles</code>
                    </div>
                    <CardTitle className="mt-2 text-base font-normal text-slate-400">
                      Récupère la liste des articles. Utilisez les paramètres de requête pour filtrer.
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3">Query Parameters</h4>
                      <div className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-slate-900 text-slate-400">
                            <tr>
                              <th className="px-4 py-3 font-medium">Paramètre</th>
                              <th className="px-4 py-3 font-medium">Description</th>
                              <th className="px-4 py-3 font-medium">Exemple</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800 text-slate-300">
                            <tr>
                              <td className="px-4 py-3 font-mono text-cyan-300">select</td>
                              <td className="px-4 py-3">Champs à retourner</td>
                              <td className="px-4 py-3 font-mono text-slate-500">*</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-cyan-300">status</td>
                              <td className="px-4 py-3">Filtrer par statut</td>
                              <td className="px-4 py-3 font-mono text-slate-500">eq.published</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-mono text-cyan-300">limit</td>
                              <td className="px-4 py-3">Nombre d'articles</td>
                              <td className="px-4 py-3 font-mono text-slate-500">10</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ApiDocsPage;