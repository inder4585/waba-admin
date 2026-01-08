import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type CTAButtonNode } from '../../types';
import {
  MdOutlineTouchApp,
  MdEdit,
  MdDelete,
  MdOpenInNew,
  MdCall,
  MdPermMedia,
} from 'react-icons/md';

const CTAButtonNodeComponent = ({
  id,
  data,
  isConnectable,
}: NodeProps<CTAButtonNode>) => {
  const buttonsArray = data.payload?.buttons || [];
  const mainText = data.payload?.text || '';
  const headerText = data.payload?.headerText;
  const mediaUrl = data.payload?.mediaUrl;
  const mediaType = data.payload?.mediaType || 'image';
  const footerText = data.payload?.footerText;
  console.log('data.payload', data.payload);
  return (
    <div className="shadow-lg rounded-2xl bg-white border border-gray-100 min-w-[280px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 px-4 py-3 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          <MdOutlineTouchApp className="w-5 h-5 drop-shadow-sm" />
          <div className="font-bold text-sm tracking-wide">Call to Action</div>
        </div>
      </div>

      <div className="p-5 space-y-4">
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
            <div className="text-[10px] font-bold text-gray-400 uppercase border-b border-gray-50 pb-2">
              {headerText}
            </div>
          )}
          <div className="absolute top-2 right-2 bg-black/40 text-white text-[8px] px-1.5 py-0.5 rounded backdrop-blur-sm font-bold uppercase tracking-widest">
            {mediaType}
          </div>
        </div>

        <div className="text-sm text-gray-700 leading-relaxed font-medium">
          {mainText}
        </div>

        {footerText && (
          <div className="text-[10px] text-gray-400 italic">{footerText}</div>
        )}

        <div className="flex flex-col gap-3">
          {buttonsArray.map((btn, index) => (
            <div
              key={btn.id || index}
              className="relative group"
            >
              <div className="bg-amber-50 text-amber-700 px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between border border-amber-100 group-hover:bg-amber-100 transition-all">
                <div className="flex items-center gap-2">
                  {btn.type === 'url' ? (
                    <MdOpenInNew className="w-4 h-4" />
                  ) : (
                    <MdCall className="w-4 h-4" />
                  )}
                  <span className="uppercase tracking-wide">{btn.title}</span>
                </div>
                <span className="text-[8px] bg-white px-1.5 py-0.5 rounded shadow-sm text-amber-500 font-mono italic">
                  {btn.type}
                </span>
              </div>
              <Handle
                type="source"
                position={Position.Right}
                id={`btn-${btn.id || index}`}
                isConnectable={isConnectable}
                className="w-3 h-3 bg-amber-400 border-2 border-white !-right-1.5 hover:scale-125 transition-transform"
              />
            </div>
          ))}
          {!buttonsArray.length && (
            <div className="text-[10px] text-gray-300 text-center py-2 font-bold uppercase tracking-widest border border-dashed border-gray-100 rounded-lg italic text-amber-300/50">
              No CTA buttons
            </div>
          )}
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-400 border-2 border-white !-left-1.5 transition-colors hover:bg-orange-500"
      />
    </div>
  );
};

export default memo(CTAButtonNodeComponent);
