import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

const EndNode = ({ isConnectable }: { isConnectable: boolean }) => {
  return (
    <div className="shadow-lg rounded-2xl bg-white border border-gray-100 min-w-[200px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-red-500 to-rose-600 px-4 py-3 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          <div className="font-bold text-sm tracking-wide">Flow End</div>
        </div>
      </div>

      <div className="p-4 bg-gray-50">
        <div className="text-xs text-gray-500 font-medium italic text-center">
          Flow terminates here
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-red-500 border-2 border-white !-left-1.5 transition-colors hover:scale-125"
      />
    </div>
  );
};

export default memo(EndNode);
