import { HfInference } from "@huggingface/inference";

// Instead of directly accessing import.meta.env
const getHfToken = () => {
  // Check for the token in window.__HF_TOKEN__ first (set during build)
  const tokenFromWindow = (window as any).__HF_TOKEN__;
  if (tokenFromWindow) return tokenFromWindow;
  
  // Fallback to env variable
  const envToken = import.meta.env.PUBLIC_HF_TOKEN;
  if (envToken) return envToken;
  
  throw new Error('Configuration error: API token is missing');
};

// For static sites, we'll fetch the context at runtime
async function getContext() {
  try {
    const response = await fetch('/content/system/context.md');
    return await response.text();
  } catch (error) {
    console.error('Failed to load context:', error);
    // Provide a minimal fallback context if fetch fails
    return `
      Hi there! I'm an rAImond, the digital version of Ramon. I help answer questions about his work, 
      projects, and experience. While I'm having trouble loading the full context right now, 
      I'll do my best to help you with general questions.
    `;
  }
}

export async function* getChatResponseStream(userMessage: string) {
  console.log('Starting chat response stream');
  
  const HF_TOKEN = getHfToken();
  
  if (!HF_TOKEN) {
    console.error('HF_TOKEN is missing');
    throw new Error('Configuration error: API token is missing');
  }
  
  try {
    const client = new HfInference(HF_TOKEN);
    console.log('HF client initialized');
    
    // Get context at runtime
    const CONTEXT = await getContext();
    
    console.log('Sending message to HF');
    
    const stream = await client.chatCompletionStream({
      model: "Qwen/QwQ-32B-Preview",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant called rAImon and you only answer questions about Ramon as if you were Ramon 
                    himself. You can only answer in English, Spanish or French. Here is all the context you need about Ramon. If you 
                    don't know the answer, just say that you don't know. Context:\n\n${CONTEXT}`
        },
        {
          role: "assistant",
          content: "👋 Hey there! I'm rAImond - a digital version of the real(?) Ramon. I know all about his work, projects, and experiences so ask away!"
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      max_tokens: 500
    });
    
    if (!stream) {
      throw new Error('No response stream received from HuggingFace');
    }
    
    console.log('Stream received from HF');
    
    for await (const chunk of stream) {
      if (chunk.choices?.[0]?.delta?.content) {
        yield chunk.choices[0].delta.content;
      }
    }
  } catch (error) {
    console.error('Detailed error:', error);
    if (error instanceof Error) {
      throw new Error(`Chat API Error: ${error.message}`);
    }
    throw new Error('Unknown error occurred while processing chat request');
  }
} 