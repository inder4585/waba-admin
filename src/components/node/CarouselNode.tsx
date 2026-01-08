import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type CarouselNode } from '../../types';
import { MdViewCarousel } from 'react-icons/md';

const CarouselNodeComponent = ({
  id,
  data,
  isConnectable,
}: NodeProps<CarouselNode>) => {
  const cards = data.payload?.interactive?.action?.cards || [];
  const cardCount = cards.length;
  const firstCardTitle = cards[0]?.body?.text || 'No cards';

  return (
    <div className="shadow-lg rounded-2xl bg-white border border-gray-100 min-w-[260px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-3 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          <MdViewCarousel className="w-5 h-5 drop-shadow-sm" />
          <div className="font-bold text-sm tracking-wide">Carousel</div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="text-sm text-gray-700 leading-relaxed font-medium bg-gray-50 p-3 rounded-lg border border-gray-100">
          <div className="mb-2 text-xs font-semibold text-gray-500 uppercase flex justify-between">
            <span>Cards</span>
            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {cardCount}
            </span>
          </div>

          <div className="text-xs truncate italic text-gray-600">
            {data.payload?.interactive?.body?.text || 'No body text'}
          </div>

          {cardCount > 0 && (
            <div className="mt-2 text-xs bg-white p-2 rounded border border-gray-100 shadow-sm">
              <div className="font-semibold text-gray-800 mb-1">
                Card 1 Preview
              </div>
              <div className="text-gray-500 truncate">{firstCardTitle}</div>
            </div>
          )}
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-400 border-2 border-white !-left-1.5 transition-colors "
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-purple-500 border-2 border-white !-right-1.5 transition-colors "
      />
    </div>
  );
};

export default memo(CarouselNodeComponent);
