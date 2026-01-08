import { api } from '@/lib/api';
import { ChatSession, ChatMessage } from '@/types/chat';

// Helper to determine the base URL if not already configured in api
// Assuming api instance already handles base URL, but we need to match the specific paths requested.

export const chatService = {
  /**
   * Fetch list of chat sessions (users) for a specific WABA number.
   * Endpoint: /api/chat-session/waba-number/:wabaNumber
   */
  getChatSessions: async (
    wabaNumber: string, 
    page: number = 1, 
    limit: number = 20
  ): Promise<ChatSession[]> => {
    try {
      // Note: The user requested /api/chat-session/waba-number/:wabaNumber
      // We might need to add query params for pagination if the API supports it.
      // Assuming it does: ?page=1&limit=20
      const response = await api.get<{ data: ChatSession[] }>(`/chat-session/waba-number/${wabaNumber}`, {
        params: { page, limit }
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching chat sessions:', error);
      throw error;
    }
  },

  /**
   * Fetch messages for a specific user and WABA number.
   * Endpoint: /api/chat-session/user-number/:userNumber/:wabaNumber
   */
  getMessages: async (
    userNumber: string, // This corresponds to waId usually
    wabaNumber: string,
    page: number = 1,
    limit: number = 50
  ): Promise<ChatMessage[]> => {
    try {
      const response = await api.get<ChatMessage[] | { data: ChatMessage[] }>(`/chat-session/user-number/${userNumber}/${wabaNumber}`, {
        params: { page, limit }
      });
      
      // Handle potential variations in response structure (array directly vs { data: [] })
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && Array.isArray((response.data as any).data)) {
        return (response.data as any).data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  /**
   * Send a text message to a user.
   * Endpoint: /whatsapp-builder/api/waba-chat/send-text
   */
  sendText: async (data: { from: string; to: string; text: string }) => {
    try {
        const response = await api.post('/whatsapp-builder/api/waba-chat/send-text', data);
        return response.data;
    } catch (error) {
        console.error('Error sending text message:', error);
        throw error;
    }
  },

  /**
   * Send a template message to a user.
   * Endpoint: /whatsapp-builder/api/waba-chat/send-template
   */
  sendTemplate: async (data: { from: string; to: string; template_name: string }) => {
    try {
        const response = await api.post('/whatsapp-builder/api/waba-chat/send-template', data);
        return response.data;
    } catch (error) {
        console.error('Error sending template message:', error);
        throw error;
    }
  }
};
