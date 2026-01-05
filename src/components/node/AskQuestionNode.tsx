import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type AskQuestionNode } from '../../types';
import { MdQuestionAnswer, MdEdit, MdDelete } from 'react-icons/md';

const AskQuestionNodeComponent = ({
  id,
  data,
  isConnectable,
}: NodeProps<AskQuestionNode>) => {
  return (
    <div className="shadow-lg rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 min-w-[260px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          <MdQuestionAnswer className="w-5 h-5 drop-shadow-sm" />
          <div className="font-bold text-sm tracking-wide">Ask Question</div>
        </div>
        <div className="flex gap-1">
            <button onClick={() => data.onEdit && data.onEdit(id)} className="nodrag text-white/70 hover:text-white p-1 transition-colors"><MdEdit /></button>
            <button onClick={() => data.onDelete && data.onDelete(id)} className="nodrag text-white/70 hover:text-white p-1 transition-colors"><MdDelete /></button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="text-sm text-gray-800 dark:text-gray-100 font-medium mb-1 line-clamp-2">
           {data?.payload?.question || 'Question?'}
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-900/50 p-2 rounded-lg border border-dashed border-gray-200 dark:border-slate-700">
           <span className="font-bold uppercase tracking-wider text-[10px]">Store in:</span>
           <span className="font-mono text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded border border-amber-100 dark:border-amber-800/50">
             {data?.payload?.saveAs || 'variable'}
           </span>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-400 border-2 border-white dark:border-slate-800 !-left-1.5 transition-colors hover:bg-amber-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-amber-500 border-2 border-white dark:border-slate-800 !-right-1.5 transition-colors hover:scale-125"
      />
    </div>
  );
};

export default memo(AskQuestionNodeComponent);
