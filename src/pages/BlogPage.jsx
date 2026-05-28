import React, { useEffect, useState, useCallback } from 'react';
import { BlogIllustration } from '@/components/HeroIllustrations';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Tag, Calendar, ArrowRight, LayoutGrid, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getArticles, getArticlesByCategory, BLOG_CATEGORIES } from '@/lib/blogService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getCanonicalUrl } from '@/lib/canonicalUrlHandler';

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const categorySlug = searchParams.get('category');
  
  const currentCategory = categorySlug 
    ? BLOG_CATEGORIES.find(c => c.slug === categorySlug) 
    : null;

  // Fetch all articles once on mount to calculate counts
  useEffect(() => {
    const fetchAllArticlesForCounts = async () => {
      try {
        const data = await getArticles();
        setAllArticles(data);
        
        // Calculate counts per category
        const counts = {};
        BLOG_CATEGORIES.forEach(cat => {
          counts[cat.slug] = data.filter(article => {
            if (!article.category) return false;
            const articleCategory = String(article.category).trim().toLowerCase();
            return articleCategory === cat.name.toLowerCase();
          }).length;
        });
        setCategoryCounts(counts);
      } catch (err) {
        console.error("Error fetching articles for counts:", err);
      }
    };

    fetchAllArticlesForCounts();
  }, []);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      let data = [];
      if (currentCategory) {
        data = await getArticlesByCategory(currentCategory.name);
      } else {
        data = await getArticles();
      }
      setArticles(data);
    } catch (err) {
      setFetchError("Impossible de charger les articles. Veuillez réessayer plus tard.");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [currentCategory]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleCategoryClick = (slug) => {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  const getEffectiveImageSrc = (article) => {
    if (article.image_name) {
      return `/images/blog/${article.image_name}.webp`;
    }
    return article.featured_image;
  };

  const handleImageError = (e, article) => {
    if (article.featured_image && article.featured_image !== e.target.src) {
      e.target.src = article.featured_image;
    }
  };

  const canonicalUrl = getCanonicalUrl(location.pathname);
  const totalArticlesCount = allArticles.length;

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      <Helmet>
        <title>{currentCategory ? `${currentCategory.name} — Blog Tracking & Ads | JUH Ecomm` : 'Blog Expert Google Ads, GA4 & GTM | JUH Ecomm Data'}</title>
        <meta name="description" content="Guides complets sur Google Ads, GA4 et GTM e-commerce. Conseils d'experts, cas d'études et stratégies pour optimiser votre performance digitale." />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Blog Marketing Digital | JUH Ecomm Data" />
        <meta property="og:description" content="Guides experts sur Google Ads, GA4, GTM et e-commerce. Stratégies et conseils pour optimiser votre performance." />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog Marketing Digital | JUH Ecomm Data" />
        <meta name="twitter:description" content="Découvrez nos guides complets sur Google Ads, GA4 et e-commerce. Conseils d'experts et stratégies éprouvées." />
        <meta name="twitter:url" content={canonicalUrl} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 border-b border-slate-800">
        <BlogIllustration />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMzQxNTUiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2Mi1oMmMwLTEuMS0uOS0yLTItMnptMC00aDJjMS4xIDAgMiAuOSAyIDJoLTJ2LTJ6bS0yIDJ2Mmgydi0yaC0yem0tMiAwaC0ydjJoMnYtMnptMC00aDJ2LTJjMC0xLjEtLjktMi0yLTJ2Mmgyem0tMiAydjJoMnYtMmgtMnptLTIgMGgtMnYyaDJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              {currentCategory ? `Articles : ${currentCategory.name}` : 'Le Blog Expert Data'}
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
              Veille, tutoriels et stratégies avancées pour optimiser votre écosystème e-commerce.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar / Filters */}
          <aside className="lg:w-1/4 space-y-8">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 sticky top-24">
              <div className="flex items-center gap-2 mb-4 text-white font-semibold">
                <LayoutGrid className="w-5 h-5 text-cyan-400" />
                Catégories
              </div>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className={`w-full justify-between ${!currentCategory ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
                  onClick={() => handleCategoryClick(null)}
                >
                  <span>Tous les articles</span>
                  <span className="text-xs text-slate-500 font-normal">({totalArticlesCount})</span>
                </Button>
                {BLOG_CATEGORIES.map((cat) => {
                  const count = categoryCounts[cat.slug] || 0;
                  return (
                    <Button
                      key={cat.slug}
                      variant="ghost"
                      className={`w-full justify-between ${currentCategory?.slug === cat.slug ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
                      onClick={() => handleCategoryClick(cat.slug)}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-slate-500 font-normal">({count})</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {loading ? (
               <div className="grid md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-slate-800 rounded-xl h-96 animate-pulse"></div>
                ))}
               </div>
            ) : fetchError ? (
              <Alert variant="destructive" className="bg-red-950 border-red-900 text-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erreur de chargement</AlertTitle>
                <AlertDescription className="mt-2 flex flex-col items-start gap-4">
                  <p>{fetchError}</p>
                  <Button onClick={fetchArticles} variant="outline" className="border-red-800 hover:bg-red-900/50 text-red-100">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Réessayer
                  </Button>
                </AlertDescription>
              </Alert>
            ) : articles.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {articles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-900/20 group flex flex-col h-full"
                  >
                    <Link to={`/blog/${article.slug}`} className="block relative aspect-video overflow-hidden">
                      <img 
                        src={getEffectiveImageSrc(article)}
                        alt={article.image_alt || article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => handleImageError(e, article)}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-slate-900/80 backdrop-blur-sm text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-slate-700">
                          {article.category}
                        </span>
                      </div>
                    </Link>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.publish_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      
                      <Link to={`/blog/${article.slug}`} className="block mb-3">
                        <h2 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                          {article.title}
                        </h2>
                      </Link>
                      
                      <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-1">
                        {article.meta_description}
                      </p>
                      
                      <Link 
                        to={`/blog/${article.slug}`}
                        className="inline-flex items-center text-cyan-400 font-semibold hover:text-cyan-300 transition-colors mt-auto"
                      >
                        Lire l'article <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-800/30 rounded-xl border border-slate-700 border-dashed">
                <Search className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Aucun article trouvé</h3>
                <p className="text-slate-400">
                  {currentCategory 
                    ? `Il n'y a pas encore d'articles dans la catégorie "${currentCategory.name}".` 
                    : "Aucun article publié pour le moment."}
                </p>
                <Button 
                  variant="link" 
                  className="mt-4 text-cyan-400"
                  onClick={() => handleCategoryClick(null)}
                >
                  Voir tous les articles
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;