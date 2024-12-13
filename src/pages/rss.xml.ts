import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ params, request, site }) => {
  const blog = await getCollection('blog');

  return rss({
    title: 'Blog with Astro',
    description: 'A blog built with Astro',
    site: site!,
    items: blog.map(({ data, slug }) => ({
      title: data.title,
      description: data.description,
      link: `/blog/${slug}`,
      pubDate: data.date
    }))
  });
};
