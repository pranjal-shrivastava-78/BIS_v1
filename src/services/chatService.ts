import { ChatMessage, ConversationHistoryItem } from '../types';
import { chatApi } from '../api/chat';

export const chatService = {
  sendMessage: async (
    query: string,
    conversationId?: string
  ): Promise<ChatMessage & { conversation_id?: string }> => {
    const res = await chatApi.sendMessage(query, conversationId);

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: res.answer,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      conversation_id: res.conversation_id,
      citations: (res.citations || []).map((c: any, i: number) => ({
        id: `cit-${i}`,
        documentTitle: c.document_title || c.title || c.is_number || 'Indian Standard',
        isNumber: c.standard_number || c.is_number || 'Not available',
        versionYear: c.year || c.version_year || '',
        clause: c.clause,
        sourceName: c.source_name || 'BIS_MANAK_ONLINE',
        sourceUrl: c.source_url || 'https://standardsbis.bsbedge.com',
        retrievedDate: new Date().toISOString(),
        confidence: c.confidence ?? 1.0,
      })),
    };
  },

  getConversations: async (): Promise<ConversationHistoryItem[]> => {
    const convs = await chatApi.listConversations();
    return convs.map((c) => ({
      id: c.id,
      title: c.title || 'Inquiry Session',
      preview: 'Recorded session in backend database',
      timestamp: c.updated_at ? new Date(c.updated_at).toLocaleDateString() : 'Recent',
      messageCount: 2,
    }));
  },

  getConversationMessages: async (conversationId: string): Promise<ChatMessage[]> => {
    const msgs = await chatApi.getConversationMessages(conversationId);
    return msgs.map((m) => ({
      id: m.id,
      sender: m.role,
      text: m.content,
      timestamp: m.created_at
        ? new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : 'Recent',
      citations: (m.citations || []).map((c, i) => ({
        id: `cit-${i}`,
        documentTitle: c.title || c.is_number || 'Indian Standard',
        isNumber: c.is_number || 'Not available',
        versionYear: c.year || c.version_year || '',
        clause: c.clause,
        sourceName: c.source_name || 'BIS_MANAK_ONLINE',
        sourceUrl: c.source_url || 'https://standardsbis.bsbedge.com',
        retrievedDate: new Date().toISOString(),
        confidence: c.confidence ?? 1.0,
      })),
    }));
  },
};
