import { sidebarItems } from './dataItems';
import {
  MdStart,
  MdChat,
  MdQuestionAnswer,
  MdSmartButton,
  MdList,
  MdCallSplit,
  MdHttp,
  MdStop,
  MdOutlineDashboardCustomize,
  MdPermMedia,
  MdOutlineTouchApp,
  MdCode,
  MdImage,
  MdContactPhone,
  MdLocationPin,
  MdViewCarousel,
} from 'react-icons/md';
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';
const iconMap: any = {
  MdStart: <MdStart size={20} />,
  MdChat: <MdChat size={20} />,
  MdQuestionAnswer: <MdQuestionAnswer size={20} />,
  MdSmartButton: <MdSmartButton size={20} />,
  MdList: <MdList size={20} />,
  MdCallSplit: <MdCallSplit size={20} />,
  MdHttp: <MdHttp size={20} />,
  MdStop: <MdStop size={20} />,
  MdOutlineDashboardCustomize: <MdOutlineDashboardCustomize size={20} />,
  MdPermMedia: <MdPermMedia size={20} />,
  MdOutlineTouchApp: <MdOutlineTouchApp size={20} />,
  MdCode: <MdCode size={20} />,
  MdImage: <MdImage size={20} />,
  MdContacts: <MdContactPhone size={20} />,
  MdLocationOn: <MdLocationPin size={20} />,
  MdViewCarousel: <MdViewCarousel size={20} />,
};

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'flowStart':
        return 'bg-emerald-500 text-white';
      case 'text':
        return 'bg-violet-500 text-white';
      case 'askQuestion':
        return 'bg-orange-500 text-white';
      case 'button':
        return 'bg-pink-500 text-white';
      case 'template':
        return 'bg-blue-500 text-white';
      case 'media':
        return 'bg-indigo-500 text-white';
      case 'mediaButton':
        return 'bg-purple-500 text-white';
      case 'list':
        return 'bg-cyan-500 text-white';
      case 'location':
        return 'bg-red-500 text-white';
      case 'contacts':
        return 'bg-teal-500 text-white';
      case 'carousel':
        return 'bg-fuchsia-500 text-white';
      case 'end':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-blue-600 text-white';
    }
  };

  return (
    <div className="w-[280px] h-full border-r border-gray-100 bg-white flex flex-col shadow-sm z-10">
      <div className="p-6 pb-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg">
            <MdStart className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg text-slate-800 tracking-tight">
            Flow Builder
          </span>
        </div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 pl-1">
          Components
        </h3>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 pb-4 ">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li
              key={item.type}
              className="group flex items-center gap-3 p-3 rounded-xl cursor-grab hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 active:scale-95"
              draggable
              onDragStart={(event) => onDragStart(event, item.type)}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${getNodeColor(
                  item.type
                )} transition-transform group-hover:scale-110`}
              >
                {iconMap[item.icon]}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-700 text-sm group-hover:text-slate-900">
                  {item.label}
                </span>
                <span className="text-[10px] text-gray-400 group-hover:text-gray-500 line-clamp-1">
                  Drag to add
                </span>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="text-xs text-center text-gray-400">
          Drag items to canvas
        </div>
      </div>
    </div>
  );
}
