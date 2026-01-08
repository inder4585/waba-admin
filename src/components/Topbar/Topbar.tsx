import { MdPlayArrow, MdSave } from 'react-icons/md';
import { Button } from '@/components/ui/button';

const Topbar = ({ onSave, name }: { onSave?: () => void; name: string }) => {
  return (
    <nav className="flex sticky top-0 z-20 items-center justify-between px-6 py-3 bg-white border-b border-gray-100 shadow-sm h-[60px]">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-slate-800 font-bold text-sm">{name}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* <Button variant="outline" size="sm" className="rounded-full h-8 text-xs font-semibold text-gray-600 border-gray-200 hover:bg-gray-50">
            <MdPlayArrow className="w-4 h-4 mr-1" /> Preview
        </Button> */}
        <Button
          size="sm"
          className="rounded-full h-8 text-xs font-bold bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-200"
          onClick={onSave}
        >
          <MdSave className="w-4 h-4 mr-1" /> Save Flow
        </Button>
        <div className="w-px h-6 bg-gray-200 mx-1"></div>
      </div>
    </nav>
  );
};

export default Topbar;
