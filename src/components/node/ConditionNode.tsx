import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type ConditionNode } from '../../types';
import { MdCallSplit, MdEdit, MdDelete } from 'react-icons/md';

const ConditionNodeComponent = ({
  id,
  data,
  isConnectable,
}: NodeProps<ConditionNode>) => {
  return (
    <div className="shadow-lg rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 min-w-[250px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          <MdCallSplit className="w-5 h-5 drop-shadow-sm" />
          <div className="font-bold text-sm tracking-wide">Condition</div>
        </div>
        <div className="flex gap-1">
            <button onClick={() => data.onEdit && data.onEdit(id)} className="nodrag text-white/70 hover:text-white p-1 transition-colors"><MdEdit /></button>
            <button onClick={() => data.onDelete && data.onDelete(id)} className="nodrag text-white/70 hover:text-white p-1 transition-colors"><MdDelete /></button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="text-xs text-center font-mono font-medium bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 p-3 rounded-xl border border-dashed border-orange-200 dark:border-orange-800/50">
          {data?.payload?.condition || 'if (variable == value)'}
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-400 border-2 border-white dark:border-slate-800 !-left-1.5 transition-colors hover:bg-orange-500"
      />

      <div className="absolute -right-3 top-16">
        <Handle
          type="source"
          position={Position.Right}
          id="true"
          isConnectable={isConnectable}
          className="w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-800 hover:scale-125 transition-transform"
        />
        <div className="absolute left-5 -top-1.5 text-[9px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded border border-green-100 dark:border-green-800/50">
          True
        </div>
      </div>

      <div className="absolute -right-3 top-28">
        <Handle
          type="source"
          position={Position.Right}
          id="false"
          isConnectable={isConnectable}
          className="w-3 h-3 bg-red-500 border-2 border-white dark:border-slate-800 hover:scale-125 transition-transform"
        />
        <div className="absolute left-5 -top-1.5 text-[9px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider bg-red-50 dark:bg-red-900/30 px-1.5 py-0.5 rounded border border-red-100 dark:border-red-800/50">
          False
        </div>
      </div>
    </div>
  );
};

export default memo(ConditionNodeComponent);
