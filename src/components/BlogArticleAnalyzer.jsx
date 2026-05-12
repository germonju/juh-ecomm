import React, { useState, useEffect } from 'react';
import { getArticles } from '@/lib/blogService';
import { analyzeContent } from '@/lib/SeoAnalyzer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, BarChart3, FileText, Image as ImageIcon, Link as LinkIcon, Type } from 'lucide-react';

const BlogArticleAnalyzer = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticles('published');
      setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const handleAnalyze = () => {
    if (!selectedArticleId) return;
    const article = articles.find(a => a.id === selectedArticleId);
    if (!article) return;

    const result = analyzeContent(article.title, article.meta_title, article.meta_description, article.content);
    setAnalysisResult({ article, ...result });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-8">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Sélectionner un article</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <select
            className="flex-1 px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500"
            value={selectedArticleId}
            onChange={(e) => setSelectedArticleId(e.target.value)}
            disabled={loading}
          >
            <option value="">-- Choisir un article --</option>
            {articles.map(article => (
              <option key={article.id} value={article.id}>
                {article.title}
              </option>
            ))}
          </select>
          <Button 
            onClick={handleAnalyze} 
            disabled={!selectedArticleId || loading}
            className="bg-violet-600 hover:bg-violet-700 text-white"
          >
            <BarChart3 className="w-4 h-4 mr-2" /> Analyser
          </Button>
        </CardContent>
      </Card>

      {analysisResult && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card className="bg-slate-900 border-slate-800 text-center py-8">
              <div className={`text-6xl font-bold mb-2 ${getScoreColor(analysisResult.score)}`}>
                {analysisResult.score}
              </div>
              <div className="text-slate-400 text-sm uppercase tracking-wider">Score SEO Article</div>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-violet-400" /> Métadonnées
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-slate-400">Titre</div>
                  <div className="text-white text-sm font-medium">{analysisResult.article.meta_title || analysisResult.article.title}</div>
                  <div className="text-xs text-slate-500 mt-1">Longueur: {analysisResult.title.length} car.</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Meta Description</div>
                  <div className="text-white text-sm font-medium line-clamp-3">{analysisResult.article.meta_description || 'Aucune'}</div>
                  <div className="text-xs text-slate-500 mt-1">Longueur: {analysisResult.metaDescription.length} car.</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-violet-400" /> Analyse détaillée
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 flex items-center gap-2"><Type className="w-4 h-4" /> Mots</span>
                    <span className="text-white font-bold">{analysisResult.content.wordCount}</span>
                  </div>
                  <div className="text-xs text-slate-500">Idéal: {">"} 800 mots</div>
                </div>
                
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Images</span>
                    <span className="text-white font-bold">{analysisResult.images.total}</span>
                  </div>
                  <div className="text-xs text-slate-500">Sans Alt: {analysisResult.images.missingAlt}</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 flex items-center gap-2"><Type className="w-4 h-4" /> Titres (H1/H2/H3)</span>
                    <span className="text-white font-bold">{analysisResult.headings.h1Count}/{analysisResult.headings.h2Count}/{analysisResult.headings.h3Count}</span>
                  </div>
                  <div className="text-xs text-slate-500">Hierarchie logique requise</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 flex items-center gap-2"><LinkIcon className="w-4 h-4" /> Liens</span>
                    <span className="text-white font-bold">{analysisResult.links.total}</span>
                  </div>
                  <div className="text-xs text-slate-500">Int: {analysisResult.links.internal} | Ext: {analysisResult.links.external}</div>
                </div>
              </div>

              {analysisResult.issues.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Recommandations</h4>
                  {analysisResult.issues.map((issue, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${issue.severity === 'high' || issue.severity === 'critical' ? 'text-red-500' : 'text-yellow-500'}`} />
                      <div>
                        <div className="text-white text-sm font-medium">{issue.message}</div>
                        <div className="text-slate-400 text-sm mt-1">{issue.recommendation}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 p-4 rounded-lg text-green-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Excellent ! Aucun problème SEO majeur détecté sur cet article.</span>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogArticleAnalyzer;