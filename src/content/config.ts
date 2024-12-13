import { defineCollection, reference, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: reference('author'),
      date: z.date(),
      image: image().refine((img) => img.width < 1200, {
        message: 'Image should be lower than 1200px'
      }),
      tags: z.array(z.string()),
      description: z.string(),
      isDraft: z.boolean().default(false)
    })
});

const author = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image().refine((img) => img.width < 1200, {
        message: 'Image should be lower than 1200px'
      }),
      twitter: z.string(),
      linkedIn: z.string(),
      github: z.string(),
      bio: z.string(),
      subtitle: z.string()
    })
});

export const collections = { blog, author };
