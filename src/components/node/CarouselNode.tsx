import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type CarouselNode } from '../../types';
import { MdViewCarousel, MdDelete, MdEdit } from 'react-icons/md';

const CarouselNodeComponent = ({
  id,
  data,
  isConnectable,
}: NodeProps<CarouselNode>) => {
  const cards = data.payload?.interactive?.action?.cards || [];
  const cardCount = cards.length;
  const firstCardTitle = cards[0]?.body?.text || 'No cards';

  return (
    <div className="shadow-lg rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 min-w-[260px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-3 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          <MdViewCarousel className="w-5 h-5 drop-shadow-sm" />
          <div className="font-bold text-sm tracking-wide">Carousel</div>
        </div>
        <div className="flex gap-1">
            <button onClick={() => data.onEdit && data.onEdit(id)} className="nodrag text-white/70 hover:text-white p-1 transition-colors"><MdEdit /></button>
            <button onClick={() => data.onDelete && data.onDelete(id)} className="nodrag text-white/70 hover:text-white p-1 transition-colors"><MdDelete /></button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed font-medium bg-gray-50 dark:bg-slate-900/50 p-3 rounded-lg border border-gray-100 dark:border-slate-700">
          <div className="mb-2 text-xs font-semibold text-gray-500 uppercase flex justify-between">
            <span>Cards</span>
            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-200">{cardCount}</span>
          </div>
          
          <div className="text-xs truncate italic text-gray-600 dark:text-gray-400">
             {data.payload?.interactive?.body?.text || 'No body text'}
           </div>
           
           {cardCount > 0 && (
               <div className="mt-2 text-xs bg-white dark:bg-slate-800 p-2 rounded border border-gray-100 dark:border-slate-700 shadow-sm">
                   <div className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Card 1 Preview</div>
                   <div className="text-gray-500 truncate">{firstCardTitle}</div>
               </div>
           )}
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-400 border-2 border-white dark:border-slate-800 !-left-1.5 transition-colors "
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-purple-500 border-2 border-white dark:border-slate-800 !-right-1.5 transition-colors "
      />
    </div>
  );
};

export default memo(CarouselNodeComponent);
