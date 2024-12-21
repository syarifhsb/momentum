import { LucideIcon } from "lucide-react";
import { NavUser } from "./nav-user";
import { SidebarHead } from "./ui/sidebar";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { NewTaskContainer } from "./new-task-container";

export function NavHead({
  user,
  buttonItems,
}: {
  user: { name: string; email: string; avatar: string };
  buttonItems: {
    title: string;
    url: string;
    icons: LucideIcon;
    tooltip: string;
    tooltipShortcut: string;
  }[];
}) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  return (
    <SidebarHead>
      <NavUser user={user} />
      <ul className="flex flex-row gap-2 p-1">
        {buttonItems.map((item) => (
          <li key={item.title}>
            <TooltipProvider>
              <Tooltip>
                <Popover>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                      <Button
                        className="w-6 h-6"
                        variant="secondary"
                        size="icon"
                      >
                        <item.icons />
                      </Button>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex flex-row gap-2">
                      <p>{item.tooltip}</p>
                      <span className="px-1 py-0.5 text-xs text-muted-foreground font-mono outline outline-offset-1 outline-muted outline-1 rounded-sm">
                        {item.tooltipShortcut}
                      </span>
                    </div>
                  </TooltipContent>
                  <PopoverContent
                    style={{
                      position: "fixed",
                      top: `10px`,
                      left: `40px`,
                      maxWidth: "calc(100vw - 40px)",
                      maxHeight: "calc(100vh - 40px)",
                    }}
                    className="w-80 z-50"
                  >
                    <NewTaskContainer />
                  </PopoverContent>
                </Popover>
              </Tooltip>
            </TooltipProvider>
          </li>
        ))}
      </ul>
    </SidebarHead>
  );
}
