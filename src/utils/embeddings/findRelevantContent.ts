import { HfInference } from "@huggingface/inference";
import type { EmbeddingItem } from './types';

const HF_TOKEN = import.meta.env.PUBLIC_HF_TOKEN;
const client = new HfInference(HF_TOKEN);

function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

export async function findRelevantContent(
  query: string,
  embeddings: EmbeddingItem[],
  topK: number = 5
): Promise<EmbeddingItem[]> {
  // Generate embedding for the query
  const queryEmbedding = await client.featureExtraction({
    model: 'sentence-transformers/all-MiniLM-L6-v2',
    inputs: query,
  });

  // Calculate similarities
  const similarities = embeddings.map(item => ({
    item,
    similarity: cosineSimilarity(queryEmbedding, item.embedding),
  }));

  // Sort by similarity and get top K results
  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK)
    .map(result => result.item);
} 