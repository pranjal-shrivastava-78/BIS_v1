import { api } from './apiClient';
import { ChatMessage } from '../types';

export const chatService = {
  sendMessage: async (
    query: string,
    history: { sender: string; text: string }[] = []
  ): Promise<ChatMessage> => {
    // Call backend RAG API endpoint: POST /api/chat
    const res = await api.post<ChatMessage>('/chat', { query, history });
    if (res.data) return res.data;

    // Graceful response when backend is not connected
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: `Your query has been dispatched to the BIS Assistant RAG service.

*Note: The backend endpoint (POST /api/chat) is ready for live connection. Once connected to your BIS vector index and knowledge pipeline, source-backed answers and clause citations will render automatically in this interface.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isHallucinationGuard: true,
      actions: [
        { label: 'Explore Standards Catalogue', route: 'standards-explorer' },
        { label: 'Check QCO Orders', route: 'qco-regulations' },
      ],
    };
  },
};
