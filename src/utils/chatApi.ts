import { HfInference } from "@huggingface/inference";
import { findRelevantContent } from './embeddings/findRelevantContent';
import type { EmbeddingItem } from './embeddings/types';

const HF_TOKEN = import.meta.env.PUBLIC_HF_TOKEN;

async function fetchEmbeddings(): Promise<EmbeddingItem[]> {
  const response = await fetch('/data/embeddings.json');
  return response.json();
}

export async function* getChatResponseStream(userMessage: string) {
  try {
    const client = new HfInference(HF_TOKEN);
    
    // Fetch embeddings and find relevant content
    const embeddings = await fetchEmbeddings();
    const relevantContent = await findRelevantContent(userMessage, embeddings);
    
    // Create context from relevant content
    const context = relevantContent
      .map(item => `${item.metadata.title || 'Content'}: ${item.content}`)
      .join('\n\n');

    const stream = await client.chatCompletionStream({
      model: "Qwen/QwQ-32B-Preview",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant for Ramon. Use the following context to answer questions about Ramon:\n\n${context}`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      max_tokens: 500
    });

    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const newContent = chunk.choices[0].delta.content;
        if (newContent) {
          yield newContent;
        }
      }
    }
  } catch (error) {
    console.error('Chat API Error:', error);
    throw new Error('Failed to get chat response');
  }
} 