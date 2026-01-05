import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type WebhookNode } from '../../types';
import { MdHttp, MdEdit, MdDelete } from 'react-icons/md';

const WebhookNodeComponent = ({
  id,
  data,
  isConnectable,
}: NodeProps<WebhookNode>) => {
  return (
    <div className="shadow-lg rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 min-w-[280px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          <MdHttp className="w-6 h-6 drop-shadow-sm" />
          <div className="font-bold text-sm tracking-wide">Webhook Request</div>
        </div>
        <div className="flex gap-1">
            <button onClick={() => data.onEdit && data.onEdit(id)} className="nodrag text-white/70 hover:text-white p-1 transition-colors"><MdEdit /></button>
            <button onClick={() => data.onDelete && data.onDelete(id)} className="nodrag text-white/70 hover:text-white p-1 transition-colors"><MdDelete /></button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-900/50 p-2.5 rounded-lg border border-gray-100 dark:border-slate-700">
           <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-sm text-white ${
                data?.payload?.method === 'GET' ? 'bg-blue-500' : 'bg-green-600'
              }`}
            >
              {data?.payload?.method || 'POST'}
            </span>
            <div className="text-xs text-gray-600 dark:text-gray-300 font-mono truncate flex-1" title={data?.payload?.url}>
               {data?.payload?.url || 'https://api.example.com'}
            </div>
        </div>
        
        {data?.payload?.body && Object.keys(data.payload.body).length > 0 && (
             <div className="text-[10px] text-gray-400 font-mono bg-gray-900/5 p-2 rounded border border-dashed border-gray-200 dark:border-slate-700 dark:bg-black/20">
                {JSON.stringify(data.payload.body).slice(0, 50)}...
             </div>
        )}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-400 border-2 border-white dark:border-slate-800 !-left-1.5 transition-colors hover:bg-cyan-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-cyan-500 border-2 border-white dark:border-slate-800 !-right-1.5 transition-colors hover:scale-125"
      />
    </div>
  );
};

export default memo(WebhookNodeComponent);
