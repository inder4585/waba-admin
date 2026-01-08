import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type MediaNode } from '../../types';
import {
  MdImage,
  MdEdit,
  MdDelete,
  MdVideocam,
  MdInsertDriveFile,
} from 'react-icons/md';

const MediaNodeComponent = ({
  id,
  data,
  isConnectable,
}: NodeProps<MediaNode>) => {
  const mediaUrl = data.payload?.mediaUrl;
  const mediaType = data.payload?.mediaType || 'image';
  const caption = data.payload?.caption || '';

  const renderIcon = () => {
    switch (mediaType) {
      case 'video':
        return <MdVideocam className="w-5 h-5 drop-shadow-sm" />;
      case 'document':
        return <MdInsertDriveFile className="w-5 h-5 drop-shadow-sm" />;
      default:
        return <MdImage className="w-5 h-5 drop-shadow-sm" />;
    }
  };

  return (
    <div className="shadow-lg rounded-2xl bg-white border border-gray-100 min-w-[260px] max-w-[280px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      {/* Header */}
      <div className="bg-gradient-to-r from-fuchsia-500 to-purple-600 px-4 py-3 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          {renderIcon()}
          <div className="font-bold text-sm tracking-wide capitalize">
            {mediaType} Message
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => data.onEdit && data.onEdit(id)}
            className="nodrag text-white/70 hover:text-white p-1 transition-colors"
          >
            <MdEdit />
          </button>
          <button
            onClick={() => data.onDelete && data.onDelete(id)}
            className="nodrag text-white/70 hover:text-white p-1 transition-colors"
          >
            <MdDelete />
          </button>
        </div>
      </div>

      <div className="p-0">
        <div className="bg-gray-100 h-36 flex items-center justify-center relative overflow-hidden border-b border-gray-50">
          {mediaUrl ? (
            mediaType === 'image' ? (
              <img
                src={mediaUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-500">
                {renderIcon()}
                <div className="text-[10px] font-bold uppercase tracking-wider max-w-[80%] text-center truncate px-2">
                  {mediaUrl}
                </div>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-300">
              <MdImage className="w-8 h-8 opacity-20" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">
                No Media Selected
              </span>
            </div>
          )}
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[8px] px-1.5 py-0.5 rounded backdrop-blur-sm font-bold uppercase tracking-widest">
            {mediaType}
          </div>
        </div>

        <div className="p-4 space-y-3">
          {caption ? (
            <div className="text-sm text-gray-700 leading-relaxed font-medium bg-gray-50 p-2 rounded-lg border border-gray-100">
              {caption}
            </div>
          ) : (
            <div className="text-xs text-gray-400 italic text-center py-1 border border-dashed border-gray-100 rounded-lg">
              No caption provided
            </div>
          )}
        </div>

        <div className="px-4 pb-2">
          <div className="pt-2 border-t border-dashed border-gray-100 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full"></span>
            <span className="text-[9px] text-gray-400 font-semibold uppercase">
              Media Attachment
            </span>
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-400 border-2 border-white !-left-1.5 transition-colors hover:bg-fuchsia-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="next"
        isConnectable={isConnectable}
        className="w-3 h-3 bg-fuchsia-400 border-2 border-white !-right-1.5 transition-colors hover:scale-125"
      />
    </div>
  );
};

export default memo(MediaNodeComponent);
