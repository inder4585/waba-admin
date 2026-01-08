'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { chatService } from "@/services/chatService";
import { ChatSession } from "@/types/chat";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { differenceInHours, format } from "date-fns";
import { ArrowLeft, Loader2, MoreVertical, Paperclip, Phone, Send, Smile, User, Video, Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { TemplateSelector } from "@/components/Chat/TemplateSelector";
import { toast } from "sonner";

interface ChatWindowProps {
  wabaNumber?: string;
  selectedSession: ChatSession;
  onBack?: () => void; // meaningful for mobile
}

export default function ChatWindow({ wabaNumber, selectedSession, onBack }: ChatWindowProps) {
  const [inputValue, setInputValue] = useState("");
  const { ref: loadMoreRef, isIntersecting } = useIntersectionObserver();
  const bottomRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  
  // Fetch Messages
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteQuery({
    queryKey: ['chatMessages', wabaNumber, selectedSession.waId],
    queryFn: async ({ pageParam = 1 }) => {
       if (!wabaNumber) return [];
       return chatService.getMessages(selectedSession.waId, wabaNumber, pageParam as number, 50);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 50 ? allPages.length + 1 : undefined;
    },
    enabled: !!wabaNumber && !!selectedSession.waId,
  });

  // Load more interaction
  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  const messages = data?.pages.flatMap(page => page) || [];

  // Live status logic
  const lastMessageDate = new Date(selectedSession.lastMessageAt);
  const isLive = differenceInHours(new Date(), lastMessageDate) < 24;

  // Mutations
  const sendTextMutation = useMutation({
    mutationFn: (text: string) => chatService.sendText({ 
        from: wabaNumber || '', 
        to: selectedSession.waId, 
        text 
    }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['chatMessages', wabaNumber, selectedSession.waId] });
        setInputValue("");
        // Optimistic update could be added here
    },
    onError: () => {
        toast.error("Failed to send message");
    }
  });

  const sendTemplateMutation = useMutation({
    mutationFn: (templateName: string) => chatService.sendTemplate({
        from: wabaNumber || '',
        to: selectedSession.waId,
        template_name: templateName
    }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['chatMessages', wabaNumber, selectedSession.waId] });
        toast.success("Template sent successfully");
    },
    onError: () => {
        toast.error("Failed to send template");
    }
  });

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendTextMutation.mutate(inputValue);
  };

  const handleSendTemplate = (templateName: string) => {
      if (!templateName) return;
      sendTemplateMutation.mutate(templateName);
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm z-10 shrink-0">
            <div className="flex items-center gap-3">
                {onBack && (
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={onBack}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                )}
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {selectedSession.profileName ? selectedSession.profileName.charAt(0).toUpperCase() : <User className="h-5 w-5"/>}
                </div>
                <div>
                    <h3 className="font-semibold text-slate-900">{selectedSession.profileName || selectedSession.waId}</h3>
                    <div className="flex items-center gap-1.5">
                        <span className={cn("h-2 w-2 rounded-full", isLive ? "bg-green-500" : "bg-slate-300")} />
                        <span className="text-xs text-slate-500">
                            {isLive ? 'Live Session (24h Window Active)' : 'Session Expired (24h Window Closed)'}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-1">
                 <Button variant="ghost" size="icon" className="text-slate-400">
                    <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-400">
                    <Video className="h-5 w-5" />
                </Button>
                 <Button variant="ghost" size="icon" className="text-slate-400">
                    <MoreVertical className="h-5 w-5" />
                </Button>
            </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col-reverse gap-4">
             {/* Bottom anchor logic if needed, but flex-col-reverse handles sticking to bottom (newest) */}
             <div ref={bottomRef} />

             {!wabaNumber ? (
                 <div className="flex-1 flex items-center justify-center text-slate-400">Error: No WABA Number</div>
             ) : isLoading ? (
                 <div className="flex-1 flex items-center justify-center">
                     <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                 </div>
             ) : isError ? (
                  <div className="flex-1 flex items-center justify-center text-red-500">Failed to load messages</div>
             ) : messages.length === 0 ? (
                 <div className="flex-1 flex items-center justify-center text-slate-400 flex-col gap-2">
                     <p>No messages yet.</p>
                     <p className="text-xs">Start the conversation!</p>
                 </div>
             ) : (
                 <>
                    {messages.map((msg) => {
                        const isOutbound = msg.direction === 'OUTBOUND';
                        return (
                            <div key={msg.messageId || Math.random()} className={cn("flex w-full mb-2", isOutbound ? "justify-end" : "justify-start")}>
                                <div className={cn(
                                    "max-w-[70%] sm:max-w-[60%] rounded-2xl px-4 py-3 shadow-sm text-sm relative group",
                                    isOutbound 
                                        ? "bg-indigo-600 text-white rounded-br-none" 
                                        : "bg-white border text-slate-800 rounded-bl-none"
                                )}>
                                    {/* Message Payload Rendering */}
                                    {msg.type === 'text' && <p className="whitespace-pre-wrap leading-relaxed">{msg.payload?.text?.body}</p>}
                                    {/* Add handling for other types here later */}
                                    {msg.type !== 'text' && <p className="italic opacity-80">Media type: {msg.type} (Rendering pending)</p>}

                                    <div className={cn("text-[10px] mt-1 flex items-center gap-1 opacity-70", isOutbound ? "justify-end text-indigo-100" : "text-slate-400")}>
                                        <span>{format(new Date(msg.createdAt), 'h:mm a')}</span>
                                        {isOutbound && (
                                            <span>
                                                {/* Status ticks could go here */}
                                                {msg.status === 'read' ? '✓✓' : '✓'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                     
                     {/* Load More Indicator (at "top" but logically end of list) */}
                     {hasNextPage && (
                         <div ref={loadMoreRef} className="flex justify-center py-4">
                             {isFetchingNextPage && <Loader2 className="h-5 w-5 animate-spin text-slate-400" />}
                         </div>
                     )}
                 </>
             )}
        </div>

        {/* Footer Input */}
        <div className="p-4 bg-white border-t z-10 shrink-0">
             {isLive ? (
                 <>
                    <form onSubmit={handleSendText} className="flex gap-2 items-center bg-slate-50 border rounded-full px-2 py-1.5 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                        <Button type="button" variant="ghost" size="icon" className="shrink-0 rounded-full">
                            <Smile className="h-5 w-5 text-slate-400 hover:text-indigo-600" />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" className="shrink-0 rounded-full">
                            <Paperclip className="h-5 w-5 text-slate-400 hover:text-indigo-600" />
                        </Button>
                        <Input 
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)} 
                            placeholder="Type a message..." 
                            className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 px-2"
                        />
                        <Button type="submit" size="icon" disabled={!inputValue.trim() || sendTextMutation.isPending} className={cn("rounded-full shrink-0 transition-all", inputValue.trim() ? "bg-indigo-600 hover:bg-indigo-700" : "bg-slate-300")}>
                            {sendTextMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        </Button>
                    </form>
                    <div className="text-center mt-2">
                        <p className="text-[10px] text-slate-400">
                            Use <span className="font-semibold">Shift + Enter</span> for new line
                        </p>
                    </div>
                 </>
             ) : (
                 <div className="flex flex-col gap-2 p-2 bg-amber-50 rounded-lg border border-amber-200">
                     <div className="flex items-center gap-2 text-amber-700 text-xs mb-1">
                         <Info className="h-4 w-4" />
                         <span className="font-medium">24h session window expired. Send a template to resume.</span>
                     </div>
                     <TemplateSelector 
                        onSelect={handleSendTemplate} 
                        isLoading={sendTemplateMutation.isPending}
                     />
                 </div>
             )}
        </div>
    </div>
  );
}
