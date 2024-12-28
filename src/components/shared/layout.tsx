import { Link, Outlet } from "react-router";
import { cn } from "@/lib/utils";

import {
  BinaryIcon,
  HardDriveDownloadIcon,
  HomeIcon,
  PhoneIcon,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const navMenuItems = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Contact", href: "/contact", icon: PhoneIcon },
  {
    name: "Counter",
    href: "/counter",
    icon: BinaryIcon,
  },
  {
    name: "Data Fetching",
    href: "/data-fetch-example",
    icon: HardDriveDownloadIcon,
  },
];

export function Layout() {
  const year = new Date().getFullYear();

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl space-y-4 p-4 flex flex-col min-h-screen">
        {/* Question: why the navigation menu is not centered? */}
        <NavigationMenu>
          <NavigationMenuList>
            {navMenuItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink asChild>
                  {
                    <Link
                      to={item.href}
                      className={cn(navigationMenuTriggerStyle(), "gap-2")}
                    >
                      <span>
                        <item.icon size={14} />
                      </span>
                      {item.name}
                    </Link>
                  }
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex-[1]">
          <Outlet />
        </div>
        <footer>
          <p className="text-center p-2 pt-0">© {year}</p>
        </footer>
      </div>
    </div>
  );
}
