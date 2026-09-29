import { ChatMessage } from '../types';
import { getAssistantMockResponse } from '../data/assistant';

export const chatService = {
  sendMessage: async (
    query: string,
    _history: { sender: string; text: string }[] = []
  ): Promise<ChatMessage> => {
    // Simulated realistic response latency for AI assistant experience
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getAssistantMockResponse(query);
  },
};
