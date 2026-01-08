import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

const FlowStartNode = ({ isConnectable }: { isConnectable: boolean }) => {
  return (
    <div className="shadow-lg rounded-2xl bg-white  border border-gray-100 min-w-[240px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-3 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          <div className="font-bold text-sm tracking-wide">Flow Start</div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 ">
        <div className="text-xs text-gray-500 font-medium italic text-center">
          Entry point of the flow
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-emerald-500 border-2 border-white  !-right-1.5 transition-colors "
      />
    </div>
  );
};

export default memo(FlowStartNode);
