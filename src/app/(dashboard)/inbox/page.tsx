'use client';

import ChatSessionList from '@/components/Chat/ChatSessionList';
import ChatWindow from '@/components/Chat/ChatWindow';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { wabaNumberService } from '@/services/wabaNumberService';
import { ChatSession } from '@/types/chat';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function ChatInbox() {
  const { data: sessionData } = useSession();
  const [selectedWabaId, setSelectedWabaId] = useState<string>('');
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);

  // Fetch WABA Numbers
  const { data: wabaData, isLoading: isLoadingWaba } = useQuery({
    queryKey: ['wabaNumbers', sessionData?.user?.email], // distinct query key
    queryFn: async () => {
       // Assuming userId is required or optional, passing generic id if session incomplete
       // But practically, wabaNumberService.getAll might handle userId internally if we change it or just pass what we have.
       // Based on read file earlier, it takes userId param.
       // We'll try to pass session id if valid.
       const userId = (sessionData?.user as any)?.id || '';
       return wabaNumberService.getAll({ page: 1, limit: 100, userId });
    },
    enabled: !!sessionData,
  });

  const wabaNumbers = wabaData?.data || [];

  // Auto-select first WABA number
  useEffect(() => {
    if (wabaNumbers.length > 0 && !selectedWabaId) {
        setSelectedWabaId(wabaNumbers[0].wabaId); // Assuming wabaId is the field needed for chat API
    }
  }, [wabaNumbers, selectedWabaId]);

  // Find the actual number string if needed, api might need wabaNumber (phone number) or wabaId (id). 
  // chatService.getChatSessions takes `wabaNumber`.
  // Looking at wabaNumberService types: `wabaId` vs `number` (phone).
  // The User Request example URL: `/api/chat-session/waba-number/15556388655`. This looks like a phone number.
  // So we should pass generic `number` field or `wabaNumber` field if it matches.
  // In `wabaNumberService`: `number: string; wabaId: string;`.
  // I will assume `wabaNumber` means the phone number in `chatService`.
  // I will verify which field from `wabaNumbers` corresponds to the phone number. `number`.
  
  const selectedWabaNumberObj = wabaNumbers.find((w: any) => w.wabaId === selectedWabaId || w.number === selectedWabaId);
  const selectedPhoneNumber = selectedWabaNumberObj?.number;

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.20))] md:h-[calc(100vh-theme(spacing.16))] bg-white border rounded-lg shadow-sm overflow-hidden md:translate-y-[-1rem]">
      {/* Mobile/Desktop WABA Selector - Optional but good for context */}
      <div className="p-2 border-b bg-slate-50 flex items-center justify-between md:hidden">
          <span className="text-sm font-semibold text-slate-700">Inbox</span>
           {/* Mobile WABA Select */}
             {isLoadingWaba ? (
                <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
            ) : (
                 <Select value={selectedWabaId} onValueChange={setSelectedWabaId}>
                    <SelectTrigger className="w-[180px] h-8 text-xs bg-white">
                        <SelectValue placeholder="Select WABA" />
                    </SelectTrigger>
                    <SelectContent>
                        {wabaNumbers.map((w: any) => (
                            <SelectItem key={w.id || w.wabaId} value={w.wabaId || w.number}>
                                {w.number} {w.groupName ? `(${w.groupName})` : ''}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
      </div>

      <div className="flex flex-1 overflow-hidden relative">
          {/* Sidebar */}
          <div className={`
                absolute inset-0 md:relative md:w-80 md:flex z-20 transition-transform duration-300 bg-white
                ${selectedSession ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
          `}>
             <div className="flex flex-col h-full">
                {/* Desktop WABA Select */}
                <div className="hidden md:block p-3 border-b bg-slate-50">
                    {isLoadingWaba ? (
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                             <Loader2 className="h-3 w-3 animate-spin" /> Loading numbers...
                        </div>
                    ) : (
                        <Select value={selectedWabaId} onValueChange={setSelectedWabaId}>
                            <SelectTrigger className="w-full h-9 text-sm bg-white border-slate-200">
                                <SelectValue placeholder="Select WABA Number" />
                            </SelectTrigger>
                            <SelectContent>
                                {wabaNumbers.map((w: any) => (
                                    <SelectItem key={w.id || w.wabaId} value={w.wabaId || w.number}>
                                        <div className="flex flex-col text-left">
                                            <span className="font-medium">{w.number}</span>
                                            {w.groupName && <span className="text-[10px] text-slate-400">{w.groupName}</span>}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </div>

                <ChatSessionList 
                    wabaNumber={selectedPhoneNumber || selectedWabaId} // Try passing phone first, fallback to ID if logic requires
                    selectedSessionId={selectedSession?.id || null} 
                    onSelectSession={setSelectedSession} 
                />
             </div>
          </div>

          {/* Chat Window */}
          <div className={`
                absolute inset-0 md:relative md:flex-1 bg-slate-50 z-10 transition-transform duration-300
                 ${selectedSession ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
          `}>
             {selectedSession ? (
                <ChatWindow 
                    wabaNumber={selectedPhoneNumber || selectedWabaId} 
                    selectedSession={selectedSession} 
                    onBack={() => setSelectedSession(null)}
                />
             ) : (
                <div className="hidden md:flex flex-1 flex-col items-center justify-center text-slate-400 gap-4">
                    <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center">
                         <svg className="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                         </svg>
                    </div>
                    <p>Select a conversation to start chatting</p>
                </div>
             )}
          </div>
      </div>
    </div>
  );
}
