import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type TextNode } from '../../types';
import { MdChat, MdDelete, MdEdit } from 'react-icons/md';

const TextNodeComponent = ({
  id,
  data,
  isConnectable,
}: NodeProps<TextNode>) => {
  return (
    <div className="shadow-lg rounded-2xl bg-white  border border-gray-100 min-w-[240px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          <MdChat className="w-5 h-5 drop-shadow-sm" />
          <div className="font-bold text-sm tracking-wide">Text Message</div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="text-sm text-gray-700  leading-relaxed font-medium bg-gray-50  p-3 rounded-lg border border-gray-100 max-h-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 ">
          {data?.payload?.text || 'No text set'}
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-400 border-2 border-white  !-left-1.5 transition-colors "
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-500 border-2 border-white  !-right-1.5 transition-colors "
      />
    </div>
  );
};

export default memo(TextNodeComponent);
