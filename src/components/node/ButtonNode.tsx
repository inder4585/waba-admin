import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type ButtonNode } from '../../types';
import { MdSmartButton, MdEdit, MdDelete } from 'react-icons/md';

const ButtonNodeComponent = ({
  id,
  data,
  isConnectable,
}: NodeProps<ButtonNode>) => {
  const buttonsArray =
    data?.payload.buttons ||
    (data as any).payload.button?.action?.buttons?.map((b: any) => ({
      id: b.reply.id,
      title: b.reply.title,
    })) ||
    [];

  const mainText =
    (data as any).button?.body?.text || data.text || 'Please choose an option:';
  const saveAsVar = (data as any).saveAs || 'selected_option';

  return (
    <div className="shadow-lg rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 min-w-[260px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 px-4 py-3 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          <MdSmartButton className="w-5 h-5 drop-shadow-sm" />
          <div className="font-bold text-sm tracking-wide">Interactive Buttons</div>
        </div>
        <div className="flex gap-1">
            <button onClick={() => data.onEdit && data.onEdit(id)} className="nodrag text-white/70 hover:text-white p-1 transition-colors"><MdEdit /></button>
            <button onClick={() => data.onDelete && data.onDelete(id)} className="nodrag text-white/70 hover:text-white p-1 transition-colors"><MdDelete /></button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Main Text */}
        <div className="text-sm text-gray-700 dark:text-gray-200 font-medium leading-relaxed">
           {mainText}
        </div>

        {/* Buttons List */}
        <div className="flex flex-col gap-2 relative">
          {buttonsArray.map((btn, index) => (
            <div
              key={btn.id || index}
              className="relative group w-full"
            >
              <div className="bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 w-full px-3 py-2.5 rounded-xl text-center text-xs font-bold border border-rose-100 dark:border-rose-900/30 shadow-sm hover:shadow-md hover:border-rose-300 dark:hover:border-rose-700 transition-all cursor-pointer">
                {btn.title ? btn.title.toUpperCase() : 'BUTTON'}
              </div>
              <Handle
                type="source"
                position={Position.Right}
                id={`btn-${btn.id || index}`}
                isConnectable={isConnectable}
                className="w-3 h-3 bg-rose-500 border-2 border-white dark:border-slate-800 !-right-1.5 top-1/2 -translate-y-1/2 hover:scale-125 transition-transform"
              />
            </div>
          ))}
          {!buttonsArray.length && (
            <div className="text-xs text-gray-400 dark:text-gray-500 text-center py-2 italic border border-dashed border-gray-200 dark:border-slate-700 rounded-lg">
              No buttons configured
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-dashed border-gray-200 dark:border-slate-700">
           <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400 dark:text-gray-500 font-semibold">Save Response:</span>
              <span className="font-mono text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 px-1.5 py-0.5 rounded border border-rose-100 dark:border-rose-900/50">
                  [[{saveAsVar}]]
              </span>
           </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-400 border-2 border-white dark:border-slate-800 !-left-1.5 transition-colors hover:bg-rose-500"
      />
      
       {/* On Error Handle - positioned differently to not overlap */}
      <div className="absolute -right-3 bottom-4">
        <Handle
            type="source"
            position={Position.Right}
            id="error"
            isConnectable={isConnectable}
            className="w-2.5 h-2.5 bg-red-400 border-2 border-white dark:border-slate-800"
        />
        <span className="absolute right-4 -top-1.5 text-[8px] text-red-400 uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">Error</span>
      </div>
    </div>
  );
};

export default memo(ButtonNodeComponent);
