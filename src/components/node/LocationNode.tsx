import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type LocationNode } from '../../types';
import { MdLocationOn, MdDelete, MdEdit } from 'react-icons/md';

const LocationNodeComponent = ({
  id,
  data,
  isConnectable,
}: NodeProps<LocationNode>) => {
  return (
    <div className="shadow-lg rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 min-w-[240px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-red-500 to-rose-600 px-4 py-3 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          <MdLocationOn className="w-5 h-5 drop-shadow-sm" />
          <div className="font-bold text-sm tracking-wide">Location</div>
        </div>
        <div className="flex gap-1">
            <button onClick={() => data.onEdit && data.onEdit(id)} className="nodrag text-white/70 hover:text-white p-1 transition-colors"><MdEdit /></button>
            <button onClick={() => data.onDelete && data.onDelete(id)} className="nodrag text-white/70 hover:text-white p-1 transition-colors"><MdDelete /></button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed font-medium bg-gray-50 dark:bg-slate-900/50 p-3 rounded-lg border border-gray-100 dark:border-slate-700">
           {(data.payload.latitude || data.payload.longitude) ? (
               <div className="space-y-1">
                   <div className="font-semibold text-xs text-gray-500 uppercase">Coordinates</div>
                   <div className="font-mono text-xs">{data.payload.latitude}, {data.payload.longitude}</div>
               </div>
           ) : (
               <span className="text-gray-400 italic">No coordinates set</span>
           )}
           
           {data.payload.name && (
               <div className="mt-2 pt-2 border-t border-gray-100 dark:border-slate-700">
                   <div className="font-bold text-xs">{data.payload.name}</div>
                   <div className="text-xs text-gray-500 truncate">{data.payload.address}</div>
               </div>
           )}
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-400 border-2 border-white dark:border-slate-800 !-left-1.5 transition-colors "
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-red-500 border-2 border-white dark:border-slate-800 !-right-1.5 transition-colors "
      />
    </div>
  );
};

export default memo(LocationNodeComponent);
