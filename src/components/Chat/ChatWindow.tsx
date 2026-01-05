import { dummyMessages } from "@/data/dummyWabaData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Smile, Paperclip } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ChatWindowProps {
  sessionId: string;
  initialMessages: typeof dummyMessages;
}

export default function ChatWindow({ sessionId, initialMessages }: ChatWindowProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter messages for this session
  const sessionMessages = messages.filter(m => m.sessionId === sessionId);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [sessionMessages]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
        id: Date.now().toString(),
        sessionId,
        sender: 'agent',
        text: inputValue,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {sessionMessages.map((msg) => {
            const isAgent = msg.sender === 'agent';
            return (
                <div key={msg.id} className={cn("flex", isAgent ? "justify-end" : "justify-start")}>
                    <div className={cn(
                        "max-w-[70%] rounded-2xl p-3 text-sm",
                        isAgent ? "bg-indigo-600 text-white rounded-br-none" : "bg-white border text-slate-800 rounded-bl-none"
                    )}>
                        <p>{msg.text}</p>
                        <p className={cn("text-[10px] mt-1 text-right", isAgent ? "text-indigo-200" : "text-slate-400")}>{msg.timestamp}</p>
                    </div>
                </div>
            );
        })}
      </div>
      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSend} className="flex gap-2">
            <Button type="button" variant="ghost" size="icon" className="shrink-0">
                <Smile className="h-5 w-5 text-slate-400" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="shrink-0">
                <Paperclip className="h-5 w-5 text-slate-400" />
            </Button>
            <Input 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                placeholder="Type a message..." 
                className="flex-1"
            />
            <Button type="submit" className="shrink-0 bg-indigo-600 hover:bg-indigo-700">
                <Send className="h-4 w-4" />
            </Button>
        </form>
      </div>
    </div>
  );
}
