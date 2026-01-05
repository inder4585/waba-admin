import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type ListNode } from '../../types';
import { MdList, MdEdit, MdDelete } from 'react-icons/md';

const ListNodeComponent = ({
  id,
  data,
  isConnectable,
}: NodeProps<ListNode>) => {
  const sectionsArray =
    data.payload.sections || (data as any).payload.list?.action?.sections || [];
  const mainTitle = (data as any).list?.body?.text || data.title || 'List Menu';
  const saveAsVar = (data as any).saveAs || 'selected_option';

  return (
    <div className="shadow-lg rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 min-w-[280px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-3 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          <MdList className="w-5 h-5 drop-shadow-sm" />
          <div className="font-bold text-sm tracking-wide">List Options</div>
        </div>
        <div className="flex gap-1">
            <button onClick={() => data.onEdit && data.onEdit(id)} className="nodrag text-white/70 hover:text-white p-1 transition-colors"><MdEdit /></button>
            <button onClick={() => data.onDelete && data.onDelete(id)} className="nodrag text-white/70 hover:text-white p-1 transition-colors"><MdDelete /></button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">{mainTitle}</div>

        <div className="space-y-4">
          {sectionsArray.map((section: any, sIdx: number) => (
            <div
              key={sIdx}
              className="space-y-2"
            >
              <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider pl-1">
                {section.title}
              </div>
              <div className="flex flex-col gap-2">
                {section.rows.map((row: any, rIdx: number) => (
                  <div
                    key={row.id || `${sIdx}-${rIdx}`}
                    className="relative group w-full"
                  >
                    <div className="bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 w-full px-3 py-2 rounded-lg text-xs font-semibold border border-indigo-100 dark:border-indigo-900/30 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex items-center justify-between">
                      <span className="truncate">{row.title}</span>
                    </div>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={`row-${row.id || `${sIdx}-${rIdx}`}`}
                      isConnectable={isConnectable}
                      className="w-3 h-3 bg-indigo-500 border-2 border-white dark:border-slate-800 !-right-1.5 top-1/2 -translate-y-1/2 hover:scale-125 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          
           {!sectionsArray.length && (
            <div className="text-xs text-gray-400 dark:text-gray-500 text-center py-2 italic border border-dashed border-gray-200 dark:border-slate-700 rounded-lg">
              No sections configured
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-dashed border-gray-200 dark:border-slate-700">
           <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400 dark:text-gray-500 font-semibold">Save Selection:</span>
              <span className="font-mono text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-1.5 py-0.5 rounded border border-indigo-100 dark:border-indigo-900/50">
                  [[{saveAsVar}]]
              </span>
           </div>
        </div>
      </div>
      
       <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-400 border-2 border-white dark:border-slate-800 !-left-1.5 transition-colors hover:bg-indigo-500"
      />

       {/* On Error Handle */}
      <div className="absolute -right-3 bottom-0">
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

export default memo(ListNodeComponent);
