import React, { useEffect } from 'react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArticleSchemaProps {
  headline: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
}

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  isUrdu?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  article?: ArticleSchemaProps;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  canonicalPath,
  isUrdu = false,
  breadcrumbs = [],
  faqs = [],
  article,
}) => {
  const fullUrl = `https://learnislamiq.com${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

  useEffect(() => {
    // Title
    document.title = title;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', fullUrl);

    // OpenGraph Tags
    const setMetaProperty = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMetaProperty('og:title', title);
    setMetaProperty('og:description', description);
    setMetaProperty('og:url', fullUrl);
    setMetaProperty('og:type', article ? 'article' : 'website');
    setMetaProperty('og:locale', isUrdu ? 'ur_PK' : 'en_US');
    setMetaProperty('og:site_name', 'IslamIQ');

    // Twitter Card Tags
    const setMetaName = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMetaName('twitter:card', 'summary');
    setMetaName('twitter:title', title);
    setMetaName('twitter:description', description);

    // JSON-LD Structured Data Injection
    const structuredDataList: object[] = [];

    // 1. WebSite / WebPage Schema
    structuredDataList.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description: description,
      url: fullUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: 'IslamIQ',
        url: 'https://learnislamiq.com',
        description: 'Islamic learning platform for Kids and Adults. Learn • Quiz • Grow',
      },
    });

    // 2. Breadcrumbs Schema
    if (breadcrumbs.length > 0) {
      structuredDataList.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://learnislamiq.com/',
          },
          ...breadcrumbs.map((b, idx) => ({
            '@type': 'ListItem',
            position: idx + 2,
            name: b.name,
            item: `https://learnislamiq.com${b.url.startsWith('/') ? b.url : `/${b.url}`}`,
          })),
        ],
      });
    }

    // 3. FAQPage Schema (Only if real QA content exists)
    if (faqs.length > 0) {
      structuredDataList.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      });
    }

    // 4. Article Schema
    if (article) {
      structuredDataList.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.headline,
        description: article.description,
        datePublished: article.datePublished || '2026-09-15',
        dateModified: article.dateModified || '2026-09-15',
        author: {
          '@type': 'Organization',
          name: 'IslamIQ Editorial Team',
          url: 'https://learnislamiq.com/about',
        },
        publisher: {
          '@type': 'Organization',
          name: 'IslamIQ',
          url: 'https://learnislamiq.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://learnislamiq.com/logo.png',
          },
        },
      });
    }

    // Remove old dynamic JSON-LD scripts
    document.querySelectorAll('script[data-dynamic-seo="true"]').forEach((s) => s.remove());

    // Inject updated JSON-LD scripts
    structuredDataList.forEach((data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-dynamic-seo', 'true');
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll('script[data-dynamic-seo="true"]').forEach((s) => s.remove());
    };
  }, [title, description, fullUrl, isUrdu, breadcrumbs, faqs, article]);

  return null;
};
