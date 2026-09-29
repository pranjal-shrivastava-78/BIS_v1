import { apiClient } from './client';
import { ChatMessageOut, ChatResponse, ConversationOut } from '../types/api';

export const chatApi = {
  sendMessage: async (message: string, conversationId?: string): Promise<ChatResponse> => {
    return apiClient.post<ChatResponse>('/chat', {
      message,
      conversation_id: conversationId,
    });
  },

  listConversations: async (): Promise<ConversationOut[]> => {
    return apiClient.get<ConversationOut[]>('/chat/conversations');
  },

  getConversationMessages: async (conversationId: string): Promise<ChatMessageOut[]> => {
    return apiClient.get<ChatMessageOut[]>(`/chat/conversations/${conversationId}/messages`);
  },
};
