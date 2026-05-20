import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { m } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, AlertCircle, FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getArticleBySlug, BLOG_CATEGORIES } from '@/lib/blogService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getCanonicalUrl } from '@/lib/canonicalUrlHandler';

const BlogPostPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasContentH1, setHasContentH1] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const data = await getArticleBySlug(slug);
      
      if (data) {
        if (!data.meta_title) {
          console.warn(`[SEO Warning] Article "${data.slug}" is missing meta_title`);
        }
        if (!data.meta_description) {
          console.warn(`[SEO Warning] Article "${data.slug}" is missing meta_description`);
        }
      }

      setArticle(data);
      setLoading(false);
    };

    fetchArticle();
  }, [slug]);

  useEffect(() => {
    if (article && contentRef.current) {
      const h1Count = contentRef.current.querySelectorAll('h1').length;
      if (h1Count > 0) {
        setHasContentH1(true);
      }
    }
  }, [article]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
        <Helmet>
          <title>Article introuvable | Juh Ecomm Data</title>
          <meta name="description" content="Cet article de blog n'existe pas ou a été supprimé." />
        </Helmet>
        <FileQuestion className="w-20 h-20 text-slate-700 mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">Article introuvable</h1>
        <p className="text-lg text-slate-400 mb-8 max-w-md">
          L'article que vous essayez de consulter n'existe pas ou a été supprimé.
        </p>
        <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-lg rounded-full">
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Retourner au blog
          </Link>
        </Button>
      </div>
    );
  }

  const formattedDate = article.publish_date 
    ? new Date(article.publish_date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Date inconnue';

  const getEffectiveImageSrc = () => {
    if (article.image_name) {
      return `/images/blog/${article.image_name}.webp`;
    }
    return article.featured_image || 'https://www.juh-ecomm.fr/images/og-image.jpg';
  };

  const handleImageError = (e) => {
    if (article.featured_image && article.featured_image !== e.target.src) {
      e.target.src = article.featured_image;
    }
  };

  const categorySlug = BLOG_CATEGORIES.find(
    c => c.name.toLowerCase() === (article.category || '').trim().toLowerCase()
  )?.slug;

  const categoryLink = categorySlug ? `/blog?category=${categorySlug}` : '/blog';

  const pageTitle = article.meta_title || article.title;
  const pageDesc = article.meta_description || article.title;
  const pageImage = getEffectiveImageSrc();

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-20">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph tags */}
        <meta property="og:site_name" content="Juh Ecomm Data" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:locale" content="fr_FR" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@juh_ecomm" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={pageImage} />
        <meta name="twitter:url" content={canonicalUrl} />
      </Helmet>

      <article className="container mx-auto px-4 max-w-3xl">
        {/* Navigation Header */}
        <div className="mb-10 text-center">
          <div className="flex justify-start items-center mb-8">
            <Button asChild variant="ghost" className="text-slate-400 hover:text-white transition-colors">
              <Link to="/blog">
                <ArrowLeft className="mr-2 w-4 h-4" /> Retour
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400 mb-6">
            {article.category && (
              <Link 
                to={categoryLink}
                className="flex items-center gap-1.5 bg-slate-800/50 border border-slate-700/50 px-3 py-1 rounded-full text-cyan-400 font-medium hover:bg-slate-800 hover:text-cyan-300 hover:border-cyan-900 transition-all cursor-pointer group"
              >
                <Tag className="w-3.5 h-3.5 group-hover:text-cyan-300" /> {article.category}
              </Link>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {formattedDate}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight tracking-tight text-balance">
            {article.title}
          </h1>
        </div>

        {/* Featured Image */}
        {(article.featured_image || article.image_name) && (
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-800 bg-slate-950 aspect-video relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
            <img 
              src={pageImage} 
              alt={article.image_alt || article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              onError={handleImageError}
            />
          </m.div>
        )}

        {hasContentH1 && (
          <Alert variant="destructive" className="mb-8 bg-red-900/20 border-red-900/50 text-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Avertissement SEO</AlertTitle>
            <AlertDescription>
              Ce contenu contient des balises H1. Pour un meilleur SEO, modifiez le contenu pour utiliser des H2 ou H3.
            </AlertDescription>
          </Alert>
        )}

        {/* Main Article Content */}
        <m.div 
          ref={contentRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        <div className="mt-20 pt-10 border-t border-slate-800 flex justify-between items-center">
            <Link 
              to="/blog" 
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Voir tous les articles
            </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;