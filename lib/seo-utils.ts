import { Platform, getUrlSlug } from './platform-detector';

/**
 * Utility functions for SEO optimization
 */

/**
 * Generates a canonical URL for a specific page
 * @param path - The path after the domain (e.g., '/youtube-video-saver')
 * @returns Full canonical URL
 */
export function getCanonicalUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fsmvid.com';
  // Remove trailing slash from base URL if present
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  // Ensure path starts with a slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${cleanBaseUrl}${cleanPath}`;
}

/**
 * Creates structured data for breadcrumbs in JSON-LD format
 * @param items - Array of breadcrumb items with name and url
 * @returns JSON-LD formatted breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items: Array<{name: string, url?: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      ...(item.url && { "item": item.url })
    }))
  };
}

/**
 * Index all platform pages and important static pages
 */
export async function indexAllSitePages() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fsmvid.com';
  
  // Collect all important URLs
  const urls: string[] = [
    // Main pages
    baseUrl,
    `${baseUrl}/about`,
    `${baseUrl}/contact`,
    `${baseUrl}/faq`,
    `${baseUrl}/privacy-policy`,
    `${baseUrl}/terms-of-service`,
    `${baseUrl}/blog`,
    `${baseUrl}/copyright-claims`,
  ];

  // Add platform pages
  const platforms: Platform[] = [
    'youtube',
    'tiktok',
    'facebook',
    'twitter',
    'instagram',
    'vimeo',
    'dailymotion',
    'telegram',
    'tumblr',
    'snapchat',
    'pinterest',
    'linkedin',
    'imgur',
    'rumble',
    '9gag',
    'bitchute',
    'bsky',
    'capcut',
    'douyin',
    'espn',
    'febspot',
    'ifunny',
    'imdb',
    'kuaishou',
    'mixcloud',
    'reddit',
    'soundcloud',
    'spotify',
    'ted',
    'threads',
    'weibo',
    'xiaohongshu',
    'zingmp3'
  ];

  // Add platform URLs
  platforms.forEach(platform => {
    urls.push(`${baseUrl}/${getUrlSlug(platform)}`);
  });

  // try {
  //   // Index all URLs
  //   // const results = await autoIndexUrls(urls); // Removed Google Indexing
  //   // console.log('Indexed site pages:', results);
  //   // return results;
  // } catch (error) {
  //   console.error('Error indexing site pages (Google Indexing removed):', error);
  //   // throw error; // Decide if this should still throw or return gracefully
  // }
  console.log('Google Indexing has been removed. Site pages were not submitted for indexing.');
  return Promise.resolve({ message: "Google Indexing removed." });
}
