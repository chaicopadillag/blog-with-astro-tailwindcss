import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: z.string(),
      date: z.date(),
      image: image().refine((img) => img.width < 1200, {
        message: 'Image should be lower than 1200px'
      }),
      tags: z.array(z.string()),
      description: z.string()
    })
});

export const collections = { blog };
