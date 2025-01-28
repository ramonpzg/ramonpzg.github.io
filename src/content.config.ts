import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Define the schema for the projects collection
const projects = defineCollection({
  loader: glob({
    pattern: 'src/content/projects/**/*.{md,mdx}',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().optional(),
    status: z.enum(['completed', 'in-progress', 'planned']).default('completed'),
    link: z.string().url().optional(),
    pubDate: z.date().optional(),
  })
});

// Define other collections if needed
const posts = defineCollection({
  loader: glob({
    pattern: 'src/content/posts/**/*.{md,mdx}',
  }),
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

const lists = defineCollection({
  loader: glob({
    pattern: 'src/content/lists/**/*.{yaml,yml}',
  }),
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

const videos = defineCollection({
  loader: glob({
    pattern: 'src/content/videos/**/*.{md,mdx}',
  }),
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

// Export the collections
export const collections = {
  projects,
  posts,
  lists,
  videos,
}; 