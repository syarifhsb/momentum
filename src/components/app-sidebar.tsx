import * as React from "react";
import {
  Blocks,
  Calendar,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  SquarePen,
  Trash2,
} from "lucide-react";

import { NavUrgents } from "@/components/nav-urgents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHead,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { NavUser } from "./nav-user";
import { NavHead } from "./nav-head";

// This is sample data.
const data = {
  user: {
    name: "syarifhsb",
    email: "syarifhasibuan.dev@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navNewTaskButton: [
    {
      title: "New Task",
      url: "#",
      icons: SquarePen,
      tooltip: "Create a new task",
      tooltipShortcut: "c",
    },
  ],
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Home",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      badge: "10",
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Templates",
      url: "#",
      icon: Blocks,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
  urgentItems: [
    { name: "Urgent 1", url: "#", emoji: "❗" },
    { name: "Urgent 2", url: "#", emoji: "❗" },
  ],
  workspaces: [
    {
      name: "Personal Life Management",
      emoji: "🏠",
      pages: [
        {
          name: "Daily Journal & Reflection",
          url: "#",
          emoji: "📔",
        },
        {
          name: "Health & Wellness Tracker",
          url: "#",
          emoji: "🍏",
        },
        {
          name: "Personal Growth & Learning Goals",
          url: "#",
          emoji: "🌟",
        },
      ],
    },
    {
      name: "Professional Development",
      emoji: "💼",
      pages: [
        {
          name: "Career Objectives & Milestones",
          url: "#",
          emoji: "🎯",
        },
        {
          name: "Skill Acquisition & Training Log",
          url: "#",
          emoji: "🧠",
        },
        {
          name: "Networking Contacts & Events",
          url: "#",
          emoji: "🤝",
        },
      ],
    },
    {
      name: "Creative Projects",
      emoji: "🎨",
      pages: [
        {
          name: "Writing Ideas & Story Outlines",
          url: "#",
          emoji: "✍️",
        },
        {
          name: "Art & Design Portfolio",
          url: "#",
          emoji: "🖼️",
        },
        {
          name: "Music Composition & Practice Log",
          url: "#",
          emoji: "🎵",
        },
      ],
    },
    {
      name: "Home Management",
      emoji: "🏡",
      pages: [
        {
          name: "Household Budget & Expense Tracking",
          url: "#",
          emoji: "💰",
        },
        {
          name: "Home Maintenance Schedule & Tasks",
          url: "#",
          emoji: "🔧",
        },
        {
          name: "Family Calendar & Event Planning",
          url: "#",
          emoji: "📅",
        },
      ],
    },
    {
      name: "Travel & Adventure",
      emoji: "🧳",
      pages: [
        {
          name: "Trip Planning & Itineraries",
          url: "#",
          emoji: "🗺️",
        },
        {
          name: "Travel Bucket List & Inspiration",
          url: "#",
          emoji: "🌎",
        },
        {
          name: "Travel Journal & Photo Gallery",
          url: "#",
          emoji: "📸",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <NavHead user={data.user} buttonItems={data.navNewTaskButton} />
        {/* <SidebarHead> */}
        {/* <NavUser user={data.user} />
          <ul className="flex flex-row gap-2 p-1">
            <li key={data.navNewTaskButton.title}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="w-6 h-6" variant="secondary" size="icon">
                    <data.navNewTaskButton.icons />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 z-50">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">
                        Popup Content
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        This is an example of a popup using the Popover
                        component.
                      </p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </li>
          </ul> */}
        {/* </SidebarHead> */}
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavUrgents urgentItems={data.urgentItems} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
