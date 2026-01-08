import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type ButtonNode } from '../../types';
import { MdSmartButton } from 'react-icons/md';
import { uuid } from '@/utils';

const ButtonNodeComponent = ({
  id,
  data,
  isConnectable,
}: NodeProps<ButtonNode>) => {
  console.log('data?.payload', data?.payload);
  const buttonsArray =
    (data as any).payload.buttons?.map((b: string) => ({
      id: uuid(),
      title: b,
    })) || [];

  const mainText =
    (data as any).button?.body?.text || data.text || 'Please choose an option:';
  const saveAsVar = (data as any).saveAs || 'selected_option';

  return (
    <div className="shadow-lg rounded-2xl bg-white border border-gray-100 min-w-[260px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 px-4 py-3 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          <MdSmartButton className="w-5 h-5 drop-shadow-sm" />
          <div className="font-bold text-sm tracking-wide">
            Interactive Buttons
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="text-sm text-gray-700 font-medium leading-relaxed">
          {mainText}
        </div>

        <div className="flex flex-col gap-2 relative">
          {buttonsArray.map((btn: { id: string; title: string }) => (
            <div
              key={btn.id}
              className="relative group w-full"
            >
              <div className="bg-white text-rose-600 w-full px-3 py-2.5 rounded-xl text-center text-xs font-bold border border-rose-100 shadow-sm hover:shadow-md hover:border-rose-300 transition-all cursor-pointer">
                {btn.title ? btn.title.toUpperCase() : 'BUTTON'}
              </div>
              <Handle
                type="source"
                position={Position.Right}
                id={`btn-${btn.id}`}
                isConnectable={isConnectable}
                className="w-3 h-3 bg-rose-500 border-2 border-white !-right-1.5 top-1/2 -translate-y-1/2 hover:scale-125 transition-transform"
              />
            </div>
          ))}
          {!buttonsArray.length && (
            <div className="text-xs text-gray-400 text-center py-2 italic border border-dashed border-gray-200 rounded-lg">
              No buttons configured
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-dashed border-gray-200">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400 font-semibold">Save Response:</span>
            <span className="font-mono text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">
              [[{saveAsVar}]]
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ButtonNodeComponent);
