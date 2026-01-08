'use client';
import { Button } from '@/components/ui/button';
import { Expand } from '@/components/svg';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function FullScreenToggle() {
  const toggleFullScreen = () => {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullScreen ||
      docEl.msRequestFullscreen;
    const cancelFullScreen =
      doc.exitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.webkitExitFullscreen ||
      doc.msExitFullscreen;

    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      requestFullScreen.call(docEl);
    } else {
      cancelFullScreen.call(doc);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={toggleFullScreen}
            variant="ghost"
            size="icon"
            className="relative md:h-9 md:w-9 h-8 w-8 hover:bg-default-100
         data-[state=open]:bg-default-100
           hover:text-primary text-default-500  rounded-full "
          >
            <Expand className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipArrow className="fill-primary" />
          <p>Full Screen</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default FullScreenToggle;
