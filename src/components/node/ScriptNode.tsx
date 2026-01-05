import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type ScriptNode } from '../../types';
import { MdCode, MdEdit, MdDelete } from 'react-icons/md';

const ScriptNodeComponent = ({
  id,
  data,
  isConnectable,
}: NodeProps<ScriptNode>) => {
  return (
    <div className="shadow-lg rounded-2xl bg-[#1e1e1e] dark:bg-[#0f0f0f] border border-gray-800 dark:border-slate-800 min-w-[300px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02] group">
      {/* Header */}
      <div className="bg-[#2d2d2d] dark:bg-[#1a1a1a] px-4 py-3 flex items-center justify-between border-b border-gray-800 dark:border-slate-800 rounded-t-2xl">
        <div className="flex items-center gap-2 text-cyan-400">
          <MdCode className="w-5 h-5 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
          <div className="font-bold text-sm tracking-wide font-mono">
            execute_script.js
          </div>
        </div>
        <div className="flex gap-1">
            <button onClick={() => data.onEdit && data.onEdit(id)} className="nodrag text-gray-500 hover:text-white p-1 transition-colors"><MdEdit /></button>
            <button onClick={() => data.onDelete && data.onDelete(id)} className="nodrag text-gray-500 hover:text-white p-1 transition-colors"><MdDelete /></button>
        </div>
      </div>

      <div className="p-0">
        {/* Code Preview */}
        <div className="bg-[#1e1e1e] dark:bg-[#0f0f0f] p-5 text-xs font-mono text-gray-300 relative overflow-hidden group-hover:bg-[#252525] dark:group-hover:bg-[#161616] transition-colors">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50"></div>
          <div className="space-y-1 max-h-[120px] overflow-y-auto scrollbar-hide opacity-80">
            {data.script ? (
              <pre className="whitespace-pre-wrap">{data.script}</pre>
            ) : (
              <>
                <div className="text-purple-400">
                  let <span className="text-gray-300">input = </span>
                  context.userInput;
                </div>
                <div className="text-gray-500 italic">// Process data here</div>
                <div className="text-purple-400">
                  return{' '}
                  <span className="text-gray-300">input.toUpperCase();</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Execution Paths */}
        <div className="p-4 bg-[#252525] dark:bg-[#1a1a1a] flex flex-col gap-3">
          {/* Success Path */}
          <div className="relative">
            <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-between hover:bg-emerald-500/20 transition-colors">
              <span>On Success</span>
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
            </div>
            <Handle
              type="source"
              position={Position.Right}
              id="success"
              isConnectable={isConnectable}
              className="w-3 h-3 bg-emerald-500 border-2 border-[#252525] dark:border-[#1a1a1a] !-right-1.5 hover:scale-125 transition-transform"
            />
          </div>

          {/* Error Path */}
          <div className="relative">
            <div className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-between hover:bg-rose-500/20 transition-colors">
              <span>On Error</span>
              <div className="w-1.5 h-1.5 bg-rose-400 rounded-full opacity-50"></div>
            </div>
            <Handle
              type="source"
              position={Position.Right}
              id="error"
              isConnectable={isConnectable}
              className="w-3 h-3 bg-rose-500 border-2 border-[#252525] dark:border-[#1a1a1a] !-right-1.5 hover:scale-125 transition-transform"
            />
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-600 border-2 border-[#1e1e1e] dark:border-[#0f0f0f] !-left-1.5 hover:bg-cyan-400 transition-colors"
      />
    </div>
  );
};

export default memo(ScriptNodeComponent);
