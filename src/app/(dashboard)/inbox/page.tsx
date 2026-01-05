'use client';

import { useState } from 'react';
import ChatSessionList from '@/components/Chat/ChatSessionList';
import ChatWindow from '@/components/Chat/ChatWindow';
import { dummyChatSessions, dummyMessages } from '@/data/dummyWabaData';

export default function ChatInbox() {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(dummyChatSessions[0].id);

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] bg-white border rounded-lg shadow-sm overflow-hidden translate-y-[-1rem]">
      {/* Subtracting approximate padding/topbar height for full height effect */}
      
      <ChatSessionList 
        sessions={dummyChatSessions}
        selectedSessionId={selectedSessionId}
        onSelectSession={setSelectedSessionId}
      />

      {selectedSessionId ? (
        <ChatWindow 
            sessionId={selectedSessionId} 
            initialMessages={dummyMessages} 
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-400">
            Select a conversation to start chatting
        </div>
      )}
    </div>
  );
}
