'use client';

import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2, Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { chatService } from "@/services/chatService";
import { ChatSession } from "@/types/chat";
import { formatDistanceToNow } from "date-fns";

interface ChatSessionListProps {
  wabaNumber?: string;
  selectedSessionId: string | null;
  onSelectSession: (session: ChatSession) => void;
}

export default function ChatSessionList({ wabaNumber, selectedSessionId, onSelectSession }: ChatSessionListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { ref: loadMoreRef, isIntersecting } = useIntersectionObserver();

  // useInfiniteQuery for fetching sessions
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteQuery({
    queryKey: ['chatSessions', wabaNumber], // dependent on wabaNumber
    queryFn: async ({ pageParam = 1 }) => {
      if (!wabaNumber) return [];
      return chatService.getChatSessions(wabaNumber, pageParam as number, 20);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 20 ? allPages.length + 1 : undefined;
    },
    enabled: !!wabaNumber, // Only fetch if wabaNumber is selected
  });

  // Load more interaction
  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  // Flatten data
  const sessions = data?.pages.flatMap(page => page) || [];

  // Filter by search (client-side for now, ideally API should support search)
  const filteredSessions = sessions.filter(session => 
    session.profileName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.waId?.includes(searchTerm)
  );

  return (
    <div className="w-80 border-r h-full flex flex-col bg-white">
      <div className="p-4 border-b space-y-3">
         <h2 className="font-semibold text-lg">Inbox</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search name or number..." 
            className="pl-8 bg-slate-50" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {!wabaNumber ? (
            <div className="p-8 text-center text-slate-500 text-sm">
                Please select a WABA Number to view chats.
            </div>
        ) : isLoading ? (
            <div className="flex justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
            </div>
        ) : isError ? (
            <div className="p-8 text-center text-red-500 text-sm">
                Failed to load chat sessions.
            </div>
        ) : filteredSessions.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
                No conversations found.
            </div>
        ) : (
            <div className="divide-y">
                {filteredSessions.map((session) => (
                <div
                    key={session.id}
                    onClick={() => onSelectSession(session)}
                    className={cn(
                    "p-4 cursor-pointer hover:bg-slate-50 transition-colors group",
                    selectedSessionId === session.id && "bg-indigo-50 hover:bg-indigo-50 border-l-4 border-l-indigo-600 pl-3"
                    )}
                >
                    <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2 overflow-hidden">
                            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 text-slate-500">
                                <User className="h-4 w-4" />
                            </div>
                            <h3 className="font-medium text-sm text-slate-900 truncate">{session.profileName || session.waId}</h3>
                        </div>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap flex-shrink-0 ml-2">
                            {session.lastMessageAt ? formatDistanceToNow(new Date(session.lastMessageAt), { addSuffix: true }) : ''}
                        </span>
                    </div>
                    {/* Last message preview if available in session object, otherwise show type */}
                    <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-slate-500 truncate pl-10">
                            {session.message_type === 'text' ? 'Text message' : `sent a ${session.message_type}`}
                        </p>
                        {session.unreadCount && session.unreadCount > 0 ? (
                             <span className="flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-[10px] font-bold text-white bg-indigo-600 rounded-full">
                                {session.unreadCount}
                            </span>
                        ) : null}
                    </div>
                    
                </div>
                ))}
                
                {/* Loader for infinite scroll */}
                <div ref={loadMoreRef} className="h-4 w-full flex justify-center p-2">
                    {isFetchingNextPage && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
