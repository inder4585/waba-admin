import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type ConditionNode } from '../../types';
import { MdCallSplit } from 'react-icons/md';

const ConditionNodeComponent = ({
  id,
  data,
  isConnectable,
}: NodeProps<ConditionNode>) => {
  return (
    <div className="shadow-lg rounded-2xl bg-white border border-gray-100 min-w-[250px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          <MdCallSplit className="w-5 h-5 drop-shadow-sm" />
          <div className="font-bold text-sm tracking-wide">Condition</div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="text-xs text-center font-mono font-medium bg-orange-50 text-orange-800 p-3 rounded-xl border border-dashed border-orange-200">
          {data?.payload?.condition || 'if (variable == value)'}
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-400 border-2 border-white !-left-1.5 transition-colors hover:bg-orange-500"
      />

      <div className="absolute -right-3 top-16">
        <Handle
          type="source"
          position={Position.Right}
          id="true"
          isConnectable={isConnectable}
          className="w-3 h-3 bg-green-500 border-2 border-white hover:scale-125 transition-transform"
        />
        <div className="absolute left-5 -top-1.5 text-[9px] font-bold text-green-600 uppercase tracking-wider bg-green-50 px-1.5 py-0.5 rounded border border-green-100">
          True
        </div>
      </div>

      <div className="absolute -right-3 top-28">
        <Handle
          type="source"
          position={Position.Right}
          id="false"
          isConnectable={isConnectable}
          className="w-3 h-3 bg-red-500 border-2 border-white hover:scale-125 transition-transform"
        />
        <div className="absolute left-5 -top-1.5 text-[9px] font-bold text-red-600 uppercase tracking-wider bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
          False
        </div>
      </div>
    </div>
  );
};

export default memo(ConditionNodeComponent);
