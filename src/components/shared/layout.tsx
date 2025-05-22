import { Link, Outlet } from "react-router";

import {
  BinaryIcon,
  CodeIcon,
  DownloadIcon,
  HomeIcon,
  PhoneIcon,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const navMenuItems = [
  { name: "Home", to: "/", icon: HomeIcon, intent: "link" },
  { name: "Contact", to: "/contact", icon: PhoneIcon, intent: "link" },
  { name: "Counter", to: "/counter", icon: BinaryIcon, intent: "link" },
  { name: "Fetcher", to: "/fetcher", icon: DownloadIcon, intent: "link" },
  {
    name: "GitHub",
    href: "https://github.com/syarifhsb/momentum",
    icon: CodeIcon,
    intent: "anchor",
  },
];

export function Layout() {
  const year = new Date().getFullYear();

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl space-y-4 p-4 flex flex-col min-h-screen">
        <NavigationMenu className="flex justify-center w-full">
          <NavigationMenuList className="flex gap-4">
            {navMenuItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuTrigger>
                  {item.intent === "link" && item.to && (
                    <Link
                      to={item.to}
                      className="inline-flex gap-2 items-center"
                    >
                      <item.icon size={14} />
                      {item.name}
                    </Link>
                  )}
                  {item.intent === "anchor" && item.href && (
                    <a
                      href={item.href}
                      className="inline-flex gap-2 items-center"
                      target="_blank"
                    >
                      <item.icon size={14} />
                      {item.name}
                    </a>
                  )}
                </NavigationMenuTrigger>
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
