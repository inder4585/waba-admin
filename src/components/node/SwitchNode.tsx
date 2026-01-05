import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type SwitchNode } from '../../types';
import { MdCallSplit, MdEdit, MdDelete } from 'react-icons/md';

const SwitchNodeComponent = ({
  id,
  data,
  isConnectable,
}: NodeProps<SwitchNode>) => {
  const cases = data?.payload.cases || (data as any).switch?.cases || [];
  const switchVariable =
    (data as any)?.payload.switch?.variable || data.variable || 'userData';
  console.log('switchNode,', cases);

  return (
    <div className="shadow-lg rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 min-w-[260px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-3 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          <MdCallSplit className="w-5 h-5 drop-shadow-sm" />
          <div className="font-bold text-sm tracking-wide">Switch Case</div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Switch on variable */}
        <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-3 border border-gray-100 dark:border-slate-700">
          <div className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase mb-1">
            Evaluate Variable
          </div>
          <div className="text-sm text-indigo-600 dark:text-indigo-400 font-mono font-bold">
            [[{switchVariable}]]
          </div>
        </div>

        {/* Cases */}
        <div className="flex flex-col gap-3 relative">
          {cases.map((c) => (
            <div
              key={c.id}
              className="relative flex items-center gap-2 group"
            >
              <div className="flex-1 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 px-4 py-2.5 rounded-xl text-xs font-semibold border border-gray-200 dark:border-slate-600 shadow-sm group-hover:border-purple-300 dark:group-hover:border-purple-500 transition-all flex justify-between items-center">
                <span className="text-gray-400 dark:text-gray-500 mr-2 italic font-normal text-[10px]">
                  {c?.operator}
                </span>
                <span className="truncate">{c.value}</span>
              </div>
              <Handle
                type="source"
                position={Position.Right}
                id={`case-${c.id}`}
                isConnectable={isConnectable}
                className="w-3 h-3 bg-purple-400 border-2 border-white dark:border-slate-800 !-right-1.5 hover:scale-125 transition-transform"
              />
            </div>
          ))}

          {/* Default Case */}
          <div className="relative flex items-center gap-2 group">
            <div className="flex-1 bg-gray-50 dark:bg-slate-700/50 text-gray-500 dark:text-gray-400 px-4 py-2.5 rounded-xl text-xs font-semibold border border-dashed border-gray-300 dark:border-slate-600 shadow-sm group-hover:border-gray-400 dark:group-hover:border-slate-500 transition-all">
              Default Case (else)
            </div>
            <Handle
              type="source"
              position={Position.Right}
              id="default"
              isConnectable={isConnectable}
              className="w-3 h-3 bg-gray-400 border-2 border-white dark:border-slate-800 !-right-1.5 hover:scale-125 transition-transform"
            />
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-400 border-2 border-white dark:border-slate-800 !-left-1.5 transition-colors hover:bg-purple-500"
      />
    </div>
  );
};

export default memo(SwitchNodeComponent);
