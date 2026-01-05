import { dummyChatSessions } from "@/data/dummyWabaData";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ChatSessionListProps {
  sessions: typeof dummyChatSessions;
  selectedSessionId: string | null;
  onSelectSession: (id: string) => void;
}

export default function ChatSessionList({ sessions, selectedSessionId, onSelectSession }: ChatSessionListProps) {
  return (
    <div className="w-80 border-r h-full flex flex-col bg-white">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input placeholder="Search chats..." className="pl-8" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {sessions.map((session) => (
          <div
            key={session.id}
            onClick={() => onSelectSession(session.id)}
            className={cn(
              "p-4 border-b cursor-pointer hover:bg-slate-50 transition-colors",
              selectedSessionId === session.id && "bg-indigo-50 hover:bg-indigo-50"
            )}
          >
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-sm text-slate-900">{session.contactName}</h3>
              <span className="text-[10px] text-slate-400">{session.timestamp}</span>
            </div>
            <p className="text-xs text-slate-500 truncate">{session.lastMessage}</p>
            {session.unreadCount > 0 && (
                 <div className="mt-2 flex justify-end">
                    <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-indigo-600 rounded-full">
                        {session.unreadCount}
                    </span>
                 </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
