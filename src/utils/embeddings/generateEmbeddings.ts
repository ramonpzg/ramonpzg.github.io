import { HfInference } from "@huggingface/inference";
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const HF_TOKEN = process.env.PUBLIC_HF_TOKEN;
const client = new HfInference(HF_TOKEN);

interface ContentItem {
  id: string;
  content: string;
  metadata: {
    title?: string;
    type: 'blog' | 'project' | 'experience';
    tags?: string[];
    path?: string;
  };
}

interface EmbeddingItem extends ContentItem {
  embedding: number[];
}

async function generateEmbedding(text: string): Promise<number[]> {
  const response = await client.featureExtraction({
    model: 'sentence-transformers/all-MiniLM-L6-v2',
    inputs: text,
  }) as number[];
  return response;
}

async function scanContent(): Promise<ContentItem[]> {
  const contentItems: ContentItem[] = [];
  // Add your content scanning logic here
  // Example: Scan markdown files, project data, etc.
  return contentItems;
}

async function main() {
  try {
    // Load existing embeddings if they exist
    let existingEmbeddings: EmbeddingItem[] = [];
    try {
      const embeddingsFile = await fs.readFile('public/data/embeddings.json', 'utf-8');
      existingEmbeddings = JSON.parse(embeddingsFile);
    } catch (error) {
      console.log('No existing embeddings found, creating new file');
    }

    // Scan content
    const contentItems = await scanContent();
    const newEmbeddings: EmbeddingItem[] = [];

    // Generate embeddings for new or modified content
    for (const item of contentItems) {
      const existing = existingEmbeddings.find(e => e.id === item.id);
      
      if (!existing) {
        const embedding = await generateEmbedding(item.content);
        newEmbeddings.push({ ...item, embedding });
        console.log(`Generated embedding for ${item.id}`);
      } else {
        newEmbeddings.push(existing);
        console.log(`Using existing embedding for ${item.id}`);
      }
    }

    // Save embeddings
    await fs.mkdir('public/data', { recursive: true });
    await fs.writeFile(
      'public/data/embeddings.json',
      JSON.stringify(newEmbeddings, null, 2)
    );

    console.log('Embeddings generated and saved successfully');
  } catch (error) {
    console.error('Error generating embeddings:', error);
  }
}

// Check if this module is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}