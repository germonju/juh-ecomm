import { supabase } from '@/lib/customSupabaseClient';

/**
 * Blog Service
 * Handles interactions with Supabase DB for fetching articles
 * and Edge Function for creating articles.
 */

const EDGE_FUNCTION_URL = 'create-article'; // The name of the edge function
const API_KEY_STORAGE_KEY = 'blog_api_key';

export const BLOG_CATEGORIES = [
  { name: 'Acquisition', slug: 'acquisition' },
  { name: 'Automatisation', slug: 'automatisation' },
  { name: 'Conversions Offline', slug: 'conversions-offline' },
  { name: 'E-commerce', slug: 'e-commerce' },
  { name: 'GA4', slug: 'ga4' },
  { name: 'Google Ads', slug: 'google-ads' },
  { name: 'GTM Server-Side', slug: 'gtm-server-side' },
  { name: 'Marketing Digital', slug: 'marketing-digital' },
  { name: 'Merchant Center', slug: 'merchant-center' },
  { name: 'RGPD / Consent Mode', slug: 'rgpd-consent-mode' },
  { name: 'Shopify', slug: 'shopify' },
  { name: 'Tracking', slug: 'tracking' },
];

export const getApiKey = () => {
  let key = localStorage.getItem(API_KEY_STORAGE_KEY);
  if (!key) {
    key = 'sk_test_demo_key_12345'; 
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
  }
  return key;
};

export const setApiKey = (key) => {
  localStorage.setItem(API_KEY_STORAGE_KEY, key);
};

// Fetch multiple articles from Supabase
export const getArticles = async (status = 'published') => {
  try {
    let query = supabase
      .from('articles')
      .select('*')
      .order('publish_date', { ascending: false });

    if (status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }

    return data || [];
  } catch (err) {
    console.error("Unexpected error in getArticles:", err);
    throw err;
  }
};

// Fetch articles filtered by category
export const getArticlesByCategory = async (categoryName, status = 'published') => {
  if (!categoryName) {
    console.warn("[BlogService] getArticlesByCategory called without a category");
    return [];
  }

  try {
    let query = supabase
      .from('articles')
      .select('*')
      .order('publish_date', { ascending: false });

    if (status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching articles for category ${categoryName}:`, error);
      throw error;
    }

    if (!data || data.length === 0) {
      return [];
    }

    const targetCategory = String(categoryName).trim().toLowerCase();
    
    const filteredData = data.filter(article => {
      if (!article.category) return false;
      const articleCategory = String(article.category).trim().toLowerCase();
      return articleCategory === targetCategory;
    });

    return filteredData;
  } catch (err) {
    console.error("Unexpected error in getArticlesByCategory:", err);
    throw err;
  }
};

// Fetch simplified article data for counting
export const getArticlesMeta = async (status = 'published') => {
  try {
    let query = supabase
      .from('articles')
      .select('id, category')
      .eq('status', status);

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching article metadata:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Unexpected error in getArticlesMeta:", err);
    return [];
  }
};

// Fetch single article by slug
export const getArticleBySlug = async (slug) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .limit(1);

    if (error) {
      console.error('Error fetching article:', error);
      return null;
    }

    return data && data.length > 0 ? data[0] : null;
  } catch (err) {
    console.error("Unexpected error in getArticleBySlug:", err);
    return null;
  }
};

// Create article via Edge Function
export const createArticle = async (payload, apiKey) => {
  try {
    const { data, error } = await supabase.functions.invoke(EDGE_FUNCTION_URL, {
      body: payload,
      headers: {
        'X-API-Key': apiKey
      }
    });

    if (error) {
      try {
        const errorBody = JSON.parse(error.message || '{}');
        return { 
          status: error.status || 500, 
          error: errorBody.error || error.message || 'Unknown error occurred' 
        };
      } catch (e) {
        return { status: 500, error: error.message };
      }
    }

    if (data && data.error) {
       return { status: 400, error: data.error };
    }

    return { status: 201, data };

  } catch (err) {
    return { status: 500, error: err.message };
  }
};