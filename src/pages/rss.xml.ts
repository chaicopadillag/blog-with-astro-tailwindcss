import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

const parser = new MarkdownIt();

export const GET: APIRoute = async ({ params, request, site }) => {
  const blog = await getCollection('blog');

  return rss({
    title: 'Blog with Astro',
    description: 'A blog built with Astro',
    site: site!,
    items: blog.map(({ data, slug, body }) => ({
      title: data.title,
      description: data.description,
      link: `/blog/${slug}`,
      pubDate: data.date,
      content: sanitizeHtml(parser.render(body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      }),

      customData: `<media:content
    type="image/${data.image.format === 'jpg' ? 'jpeg' : 'png'}"
    width="${data.image.width}"
    height="${data.image.height}"
    medium="image"
    url="${site + data.image.src}" />
`
    })),
    xmlns: {
      media: 'http://search.yahoo.com/mrss/'
    }
  });
};
