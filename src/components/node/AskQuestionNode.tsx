import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type AskQuestionNode } from '../../types';
import { MdQuestionAnswer } from 'react-icons/md';

const AskQuestionNodeComponent = ({
  id,
  data,
  isConnectable,
}: NodeProps<AskQuestionNode>) => {
  return (
    <div className="shadow-lg rounded-2xl bg-white  border border-gray-100 min-w-[260px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          <MdQuestionAnswer className="w-5 h-5 drop-shadow-sm" />
          <div className="font-bold text-sm tracking-wide">Ask Question</div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="text-sm text-gray-800 font-medium mb-1 line-clamp-2">
          {data?.payload?.question || 'Question?'}
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg border border-dashed border-gray-200">
          <span className="font-bold uppercase tracking-wider text-[10px]">
            Store in:
          </span>
          <span className="font-mono text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
            {data?.payload?.saveAs || 'variable'}
          </span>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-400 border-2 border-white !-left-1.5 transition-colors hover:bg-amber-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-amber-500 border-2 border-white !-right-1.5 transition-colors hover:scale-125"
      />
    </div>
  );
};

export default memo(AskQuestionNodeComponent);
