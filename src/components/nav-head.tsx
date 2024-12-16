import { LucideIcon } from "lucide-react";
import { NavUser } from "./nav-user";
import { SidebarHead } from "./ui/sidebar";
import { Button } from "./ui/button";

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
  }[];
}) {
  return (
    <SidebarHead>
      <NavUser user={user} />
      <ul className="flex flex-row gap-2 p-1">
        {buttonItems.map((item) => (
          <li key={item.title}>
            <Button className="w-6 h-6" variant="secondary" size="icon">
              <item.icons />
            </Button>
          </li>
        ))}
      </ul>
    </SidebarHead>
  );
}
