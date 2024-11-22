import { AdjustmentsHorizontalIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface PromptControlsProps {
    onImageClick: () => void;
    onAdvancedClick: () => void;
    onSubmit: () => void;
    isLoading: boolean;
}

export const PromptControls: React.FC<PromptControlsProps> = ({
    onImageClick,
    onAdvancedClick,
    onSubmit,
    isLoading,
}) => (
    <>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className="order-0" asChild>
                    <Button variant="ghost" size="icon" onClick={onImageClick} className="h-8 w-8">
                        <PhotoIcon className="h-5 w-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>Upload images</TooltipContent>
            </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className="order-2" asChild>
                    <Button variant="ghost" size="icon" onClick={onAdvancedClick} className="h-8 w-8">
                        <AdjustmentsHorizontalIcon className="h-5 w-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>Advanced settings</TooltipContent>
            </Tooltip>
        </TooltipProvider>

        <Button
            variant="ghost"
            onClick={onSubmit}
            disabled={isLoading}
            className="h-full pl-1 md:hidden order-3"
        >
            <SendHorizontal className="w-4 h-4" />
        </Button>
    </>
);