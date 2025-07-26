import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.esystemlk.xyz';
 
  const pages = [
    '/',
    '/about',
    '/contact',
    '/portfolio',
    '/pricing',
    '/privacy-policy',
    '/services',
    '/testimonials',
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
  }));
}
