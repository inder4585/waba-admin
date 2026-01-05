import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type CTAButtonNode } from '../../types';
import { MdOutlineTouchApp, MdEdit, MdDelete, MdOpenInNew, MdCall } from 'react-icons/md';

const CTAButtonNodeComponent = ({ id, data, isConnectable }: NodeProps<CTAButtonNode>) => {
  const buttonsArray = data.payload?.buttons || [];
  const mainText = data.payload?.text || 'Check out our website!';
  const headerText = data.payload?.headerText;
  const footerText = data.payload?.footerText;

  return (
    <div className="shadow-lg rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 min-w-[280px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 px-4 py-3 flex items-center justify-between rounded-t-2xl">
         <div className="flex items-center gap-2 text-white">
            <MdOutlineTouchApp className="w-5 h-5 drop-shadow-sm" />
            <div className="font-bold text-sm tracking-wide">Call to Action</div>
         </div>
         <div className="flex gap-1">
            <button onClick={() => data.onEdit && data.onEdit(id)} className="nodrag text-white/70 hover:text-white p-1 transition-colors"><MdEdit /></button>
            <button onClick={() => data.onDelete && data.onDelete(id)} className="nodrag text-white/70 hover:text-white p-1 transition-colors"><MdDelete /></button>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Header Preview */}
        {headerText && (
            <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase border-b border-gray-50 dark:border-slate-700 pb-2">
                {headerText}
            </div>
        )}

        {/* Body Text */}
        <div className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
            {mainText}
        </div>

        {/* Footer Text */}
        {footerText && (
             <div className="text-[10px] text-gray-400 dark:text-gray-500 italic">
                {footerText}
            </div>
        )}

        {/* CTA Buttons List */}
        <div className="flex flex-col gap-3">
            {buttonsArray.map((btn, index) => (
                <div key={btn.id || index} className="relative group">
                    <div className="bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400 px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between border border-amber-100 dark:border-amber-800/30 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/20 transition-all">
                        <div className="flex items-center gap-2">
                            {btn.type === 'url' ? <MdOpenInNew className="w-4 h-4" /> : <MdCall className="w-4 h-4" />}
                            <span className="uppercase tracking-wide">{btn.title}</span>
                        </div>
                        <span className="text-[8px] bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded shadow-sm text-amber-500 font-mono italic">
                            {btn.type}
                        </span>
                    </div>
                    {/* CTA buttons usually don't have next nodes in some flows, 
                        but we can add a handle if needed for tracking clicks */}
                     <Handle
                        type="source"
                        position={Position.Right}
                        id={`btn-${btn.id || index}`}
                        isConnectable={isConnectable}
                        className="w-3 h-3 bg-amber-400 border-2 border-white dark:border-slate-800 !-right-1.5 hover:scale-125 transition-transform"
                    />
                </div>
            ))}
            {!buttonsArray.length && (
                <div className="text-[10px] text-gray-300 dark:text-gray-600 text-center py-2 font-bold uppercase tracking-widest border border-dashed border-gray-100 dark:border-slate-700 rounded-lg italic text-amber-300/50">
                    No CTA buttons
                </div>
            )}
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-400 border-2 border-white dark:border-slate-800 !-left-1.5 transition-colors hover:bg-orange-500"
      />
    </div>
  );
};

export default memo(CTAButtonNodeComponent);
