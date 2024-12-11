import { HfInference } from "@huggingface/inference";

const HF_TOKEN = import.meta.env.PUBLIC_HF_TOKEN;

export async function* getChatResponseStream(userMessage: string) {
  try {
    const client = new HfInference(HF_TOKEN);
    
    const stream = await client.chatCompletionStream({
      model: "Qwen/QwQ-32B-Preview",
      messages: [
        {
          role: "assistant",
          content: "What do you want to know about Ramon?"
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