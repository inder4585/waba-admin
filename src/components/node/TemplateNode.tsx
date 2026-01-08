import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type TemplateNode } from '../../types';
import { MdOutlineDashboardCustomize } from 'react-icons/md';

const TemplateNodeComponent = ({
  data,
  isConnectable,
}: NodeProps<TemplateNode>) => {
  const templateName = data.payload?.templateName || 'New Template';
  const language = data.payload?.language || 'en_US';

  return (
    <div className="shadow-lg rounded-2xl bg-white border border-gray-100 min-w-[280px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          <MdOutlineDashboardCustomize className="w-5 h-5 drop-shadow-sm" />
          <div className="font-bold text-sm tracking-wide">
            WhatsApp Template
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-gray-400">
          <span>
            Name:{' '}
            <span className="text-emerald-600 font-mono">{templateName}</span>
          </span>
          <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">
            {language}
          </span>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 shadow-inner relative">
          <div className="space-y-2 opacity-60">
            <div className="h-2 w-3/4 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-2 w-full bg-slate-200 rounded animate-pulse"></div>
            <div className="h-2 w-1/2 bg-slate-200 rounded animate-pulse"></div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <div className="bg-white border border-slate-200 text-slate-400 text-[10px] font-bold py-2 rounded-lg text-center shadow-sm">
              VIEW BUTTONS
            </div>
          </div>

          <div className="absolute -right-5 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            <Handle
              type="source"
              position={Position.Right}
              id="next"
              isConnectable={isConnectable}
              className="w-3 h-3 bg-emerald-400 border-2 border-white hover:scale-125 transition-transform"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-dashed border-gray-100 flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span className="text-[10px] text-gray-400 font-semibold italic">
            Template Approved
          </span>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-400 border-2 border-white !-left-1.5 transition-colors hover:bg-emerald-500"
      />
    </div>
  );
};

export default memo(TemplateNodeComponent);
