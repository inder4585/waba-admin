import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type MediaButtonNode } from '../../types';
import { MdPermMedia } from 'react-icons/md';

const MediaButtonNodeComponent = ({
  id,
  data,
  isConnectable,
}: NodeProps<MediaButtonNode>) => {
  const buttonsArray = data.payload?.buttons || [];
  const mainText = data.payload?.text || 'Hello! Check this out.';
  const mediaUrl = data.payload?.mediaUrl;
  const mediaType = data.payload?.mediaType || 'image';
  const saveAsVar = data.payload?.saveAs || 'user_selection';

  return (
    <div className="shadow-lg rounded-2xl bg-white border border-gray-100 min-w-[280px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-4 py-3 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          <MdPermMedia className="w-5 h-5 drop-shadow-sm" />
          <div className="font-bold text-sm tracking-wide">Media & Buttons</div>
        </div>
      </div>

      <div className="p-0">
        <div className="bg-gray-100 h-32 flex items-center justify-center relative overflow-hidden border-b border-gray-50">
          {mediaUrl ? (
            mediaType === 'image' ? (
              <img
                src={mediaUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400 text-xs font-bold uppercase">
                {mediaType} PREVIEW
              </div>
            )
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-300">
              <MdPermMedia className="w-8 h-8 opacity-20" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">
                No Media Selected
              </span>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-black/40 text-white text-[8px] px-1.5 py-0.5 rounded backdrop-blur-sm font-bold uppercase tracking-widest">
            {mediaType}
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="text-sm text-gray-700 leading-relaxed font-medium">
            {mainText}
          </div>

          <div className="flex flex-col gap-3">
            {buttonsArray.map((btn, index) => (
              <div
                key={btn.id || index}
                className="relative group"
              >
                <div className="bg-white text-rose-600 px-4 py-2.5 rounded-xl text-xs font-bold text-center border-2 border-rose-50 shadow-sm hover:border-rose-200 transition-all uppercase tracking-wide">
                  {btn.title}
                </div>
                <Handle
                  type="source"
                  position={Position.Right}
                  id={`btn-${btn.id || index}`}
                  isConnectable={isConnectable}
                  className="w-3 h-3 bg-rose-400 border-2 border-white !-right-1.5 hover:scale-125 transition-transform"
                />
              </div>
            ))}
            {!buttonsArray.length && (
              <div className="text-[10px] text-gray-300 text-center py-2 font-bold uppercase tracking-widest border border-dashed border-gray-100 rounded-lg italic">
                No buttons added
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-dashed border-gray-100 space-y-2">
            <div className="flex items-center gap-2">
              <div className="text-[10px] text-gray-400 font-bold uppercase">
                Store Selection in:
              </div>
              <div className="text-[10px] text-blue-600 font-mono font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                [[{saveAsVar}]]
              </div>
            </div>
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-400 border-2 border-white !-left-1.5 transition-colors hover:bg-rose-500"
      />
    </div>
  );
};

export default memo(MediaButtonNodeComponent);
