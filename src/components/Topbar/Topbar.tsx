import { MdPlayArrow, MdSave } from "react-icons/md";
import { Button } from "@/components/ui/button";

const Topbar = ({ onSave }: { onSave?: () => void }) => {
  return (
    <nav className="flex sticky top-0 z-20 items-center justify-between px-6 py-3 bg-white border-b border-gray-100 shadow-sm h-[60px]">
      {/* LEFT: Title & Status */}
      <div className="flex items-center gap-4">
        {/* Logo or Back button could go here if Sidebar didn't have the title */}
        <div className="flex flex-col">
             <div className="flex items-center gap-2">
                <span className="text-slate-800 font-bold text-sm">Flow Name</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-100">
                    Draft • Editing
                </span>
             </div>
        </div>
      </div>

      {/* CENTER: Search / Quick Actions */}
      <div className="flex-1 max-w-md mx-4">
        <button className="w-full flex items-center justify-between px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-400 hover:border-gray-300 transition-colors">
            <span>Quick actions...</span>
            <span className="text-[10px] bg-white border border-gray-200 rounded px-1.5 py-0.5">⌘K</span>
        </button>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="rounded-full h-8 text-xs font-semibold text-gray-600 border-gray-200 hover:bg-gray-50">
            <MdPlayArrow className="w-4 h-4 mr-1" /> Preview
        </Button>
        <Button 
            size="sm" 
            className="rounded-full h-8 text-xs font-bold bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-200"
            onClick={onSave}
        >
            <MdSave className="w-4 h-4 mr-1" /> Save Flow
        </Button>
        <div className="w-px h-6 bg-gray-200 mx-1"></div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold text-xs shadow-sm ring-2 ring-white">
          I
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
