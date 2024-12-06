import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
    image: z.string(),
    readingTime: z.string(),
    tags: z.array(z.string()).default([]),
    icon: z.string().optional().default('file-text')
  })
});

const listsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    items: z.array(z.object({
      name: z.string(),
      description: z.string(),
      url: z.string().url(),
      category: z.string()
    }))
  })
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    image: z.string(),
    link: z.string(),
    status: z.enum(['completed', 'in-progress']),
    type: z.string()
  })
});

const videos = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()),
    videoUrl: z.string().optional(),
    thumbnailUrl: z.string(),
    duration: z.string().optional(),
  })
});

export const collections = {
  posts: posts,
  'lists': listsCollection,
  projects: projects,
  videos: videos
};