import FlowBuilder from '@/components/React_FLow';
import SidebarComponent from '@/components/Sidebar/Sidebar';
import Topbar from '@/components/Topbar/Topbar';

const Index = () => {
  return (
    <div className="flex h-screen w-screen bg-slate-50 overflow-hidden font-sans">
      <SidebarComponent />
      <div className="flex-1 h-full relative flex flex-col bg-amber-400">
        <FlowBuilder />
      </div>
    </div>
  );
};

export default Index;
