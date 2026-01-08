import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type ContactsNode } from '../../types';
import { MdContacts } from 'react-icons/md';

const ContactsNodeComponent = ({
  id,
  data,
  isConnectable,
}: NodeProps<ContactsNode>) => {
  const contactCount = data.payload?.contacts?.length || 0;
  const firstContactName =
    data.payload?.contacts?.[0]?.name?.formatted_name || 'Unnamed Contact';

  return (
    <div className="shadow-lg rounded-2xl bg-white border border-gray-100 min-w-[240px] overflow-visible transition-all hover:shadow-xl hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 px-4 py-3 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-white">
          <MdContacts className="w-5 h-5 drop-shadow-sm" />
          <div className="font-bold text-sm tracking-wide">Contacts</div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="text-sm text-gray-700 leading-relaxed font-medium bg-gray-50 p-3 rounded-lg border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase">
              Count
            </span>
            <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {contactCount}
            </span>
          </div>

          {contactCount > 0 ? (
            <div className="text-xs truncate">
              <span className="text-gray-400 mr-1">First:</span>
              {firstContactName}
            </div>
          ) : (
            <span className="text-gray-400 italic text-xs">
              No contacts added
            </span>
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
        className="w-3 h-3 bg-teal-500 border-2 border-white !-right-1.5 transition-colors "
      />
    </div>
  );
};

export default memo(ContactsNodeComponent);
