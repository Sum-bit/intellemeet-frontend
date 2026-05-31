// File: src/components/layout/Sidebar.tsx

import {
  BarChart3,
  ChevronRight,
  LayoutDashboard,
  User,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

interface NavigationItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
}

const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Workspace",
    href: "/workspace",
    icon: Users,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
];

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "hidden h-[calc(100vh-4rem)] w-72 shrink-0 border-r border-border bg-background lg:flex lg:flex-col",
        className
      )}
    >
      <div className="border-b border-border p-6">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
            Active Meeting
          </p>

          <h3 className="font-semibold">
            Weekly Product Sync
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            INT-48291
          </p>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </div>

                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isActive
                          ? "translate-x-0"
                          : "opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                      )}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-border p-4">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-sm font-medium">
            Enterprise Plan
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            AI summaries, recordings, analytics and unlimited workspaces enabled.
          </p>
        </div>
      </div>
    </aside>
  );
}