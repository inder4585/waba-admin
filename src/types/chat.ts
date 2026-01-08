export interface ChatSession {
  id: string;
  profileName: string;
  wabaNumber: string;
  waId: string;
  message_type: string;
  lastMessageAt: string;
  createdAt: string;
  unreadCount?: number; // Optional, as it wasn't in the immediate screenshot but good to have
}

export interface ChatMessage {
  wabaNumber: string;
  waId: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  messageId: string;
  direction: 'INBOUND' | 'OUTBOUND';
  type: 'text' | 'image' | 'video' | 'document' | 'audio' | 'sticker' | 'interactive' | 'button'; // Expanded based on common WA types
  payload: {
    text?: { body: string };
    image?: { link?: string; id?: string; caption?: string };
    video?: { link?: string; id?: string; caption?: string };
    document?: { link?: string; id?: string; filename?: string };
    // Add other payload types as needed
  };
  createdAt: string;
}

export interface ChatSessionResponse {
  data: ChatSession[];
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface ChatMessageResponse {
  data: ChatMessage[];
   meta?: {
    page: number;
    limit: number;
    total: number;
  };
}
