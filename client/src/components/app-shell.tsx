import * as React from "react";
import { Link, useLocation } from "wouter";
import {
  BadgeCheck,
  BookOpen,
  GraduationCap,
  Handshake,
  LayoutDashboard,
  Laptop,
  LineChart,
  Search,
  Settings2,
  Shield,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type RoleKey = "student" | "staff" | "experience";

function roleFromPath(pathname: string): RoleKey | null {
  if (pathname.startsWith("/role/student")) return "student";
  if (pathname.startsWith("/role/staff")) return "staff";
  if (pathname.startsWith("/role/experience")) return "experience";
  return null;
}

const roleMeta: Record<RoleKey, { label: string; icon: React.ReactNode; href: string }> = {
  student: { label: "Student", icon: <GraduationCap className="h-4 w-4" />, href: "/role/student" },
  staff: { label: "Staff & Admin", icon: <Shield className="h-4 w-4" />, href: "/role/staff" },
  experience: { label: "Mentor / Partner / Alumni", icon: <Handshake className="h-4 w-4" />, href: "/role/experience" },
};

const navByRole: Record<
  RoleKey,
  {
    label: string;
    items: { label: string; href: string; icon: React.ReactNode; testId: string }[];
  }[]
> = {
  student: [
    {
      label: "Overview",
      items: [
        {
          label: "Dashboard",
          href: "/role/student",
          icon: <LayoutDashboard className="h-4 w-4" />,
          testId: "link-nav-dashboard",
        },
        {
          label: "Learning",
          href: "/role/student?tab=learning",
          icon: <BookOpen className="h-4 w-4" />,
          testId: "link-nav-learning",
        },
        {
          label: "Engagement",
          href: "/role/student?tab=engagement",
          icon: <Users className="h-4 w-4" />,
          testId: "link-nav-engagement",
        },
      ],
    },
  ],
  staff: [
    {
      label: "Operations",
      items: [
        {
          label: "Dashboard",
          href: "/role/staff",
          icon: <LayoutDashboard className="h-4 w-4" />,
          testId: "link-nav-dashboard",
        },
        {
          label: "CRM",
          href: "/role/staff?tab=crm",
          icon: <Users className="h-4 w-4" />,
          testId: "link-nav-crm",
        },
        {
          label: "Devices",
          href: "/role/staff?tab=devices",
          icon: <Laptop className="h-4 w-4" />,
          testId: "link-nav-devices",
        },
        {
          label: "Lookup Student",
          href: "/role/staff?tab=lookup",
          icon: <Search className="h-4 w-4" />,
          testId: "link-nav-lookup",
        },
      ],
    },
    {
      label: "Insights",
      items: [
        {
          label: "Analytics",
          href: "/role/staff?tab=overview",
          icon: <LineChart className="h-4 w-4" />,
          testId: "link-nav-analytics",
        },
        {
          label: "Learning",
          href: "/role/staff?tab=learning",
          icon: <BookOpen className="h-4 w-4" />,
          testId: "link-nav-learning",
        },
      ],
    },
  ],
  experience: [
    {
      label: "Engagement",
      items: [
        {
          label: "Dashboard",
          href: "/role/experience",
          icon: <LayoutDashboard className="h-4 w-4" />,
          testId: "link-nav-dashboard",
        },
        {
          label: "Mentors",
          href: "/role/experience?tab=mentors",
          icon: <Handshake className="h-4 w-4" />,
          testId: "link-nav-mentors",
        },
        {
          label: "Alumni",
          href: "/role/experience?tab=alumni",
          icon: <BadgeCheck className="h-4 w-4" />,
          testId: "link-nav-alumni",
        },
        {
          label: "Partner space",
          href: "/role/experience?tab=partners",
          icon: <Settings2 className="h-4 w-4" />,
          testId: "link-nav-partners",
        },
      ],
    },
    {
      label: "Learning",
      items: [
        {
          label: "Learning access",
          href: "/role/experience?tab=learning",
          icon: <BookOpen className="h-4 w-4" />,
          testId: "link-nav-learning",
        },
      ],
    },
  ],
};

export function AppShell({
  children,
  hideShell,
}: {
  children: React.ReactNode;
  hideShell?: boolean;
}) {
  const [location] = useLocation();
  const role = hideShell ? null : roleFromPath(location);

  if (!role) {
    return <>{children}</>;
  }

  const activeRole = roleMeta[role];
  const navSections = navByRole[role];

  return (
    <div className="min-h-screen by-noise" data-testid="layout-app-shell">
      <div className="absolute inset-0 by-shimmer" />
      <div className="absolute inset-0 by-grid opacity-[0.55]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 md:px-8 py-6">
        <div className="grid gap-4 lg:grid-cols-[280px_1fr] lg:items-start">
          <aside className="lg:sticky lg:top-6" data-testid="sidebar-left">
            <Card className="rounded-3xl border-border/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-md">
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <Link href="/" className="flex items-center gap-3" data-testid="link-sidebar-home">
                    <div
                      className="grid h-10 w-10 place-items-center rounded-2xl border border-border bg-white shadow-sm"
                      data-testid="img-sidebar-logo"
                    >
                      <span className="font-serif text-lg">BY</span>
                    </div>
                    <div className="leading-tight">
                      <div className="text-xs text-muted-foreground" data-testid="text-sidebar-kicker">
                        Better Youth
                      </div>
                      <div className="text-sm font-semibold tracking-tight" data-testid="text-sidebar-title">
                        Better Youth Hub
                      </div>
                    </div>
                  </Link>
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-white/70 border border-border"
                    data-testid="badge-sidebar-prototype"
                  >
                    Prototype
                  </Badge>
                </div>

                <div className="mt-4 rounded-2xl border border-border bg-white/60 p-3" data-testid="card-sidebar-role">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground" data-testid="text-sidebar-role-label">
                        Viewing as
                      </div>
                      <div className="mt-1 flex items-center gap-2" data-testid="row-sidebar-role-active">
                        <span className="text-foreground">{activeRole.icon}</span>
                        <span className="text-sm font-medium truncate" data-testid="text-sidebar-role-value">
                          {activeRole.label}
                        </span>
                      </div>
                    </div>
                    <Button
                      asChild
                      variant="secondary"
                      className="rounded-full bg-white/70 border border-border hover:bg-white"
                      data-testid="button-sidebar-switch"
                    >
                      <Link href="/">Switch</Link>
                    </Button>
                  </div>
                </div>

                <nav className="mt-4 grid gap-4" data-testid="nav-sidebar">
                  {navSections.map((section) => (
                    <div key={section.label} className="grid gap-2" data-testid={`nav-section-${section.label}`}> 
                      <div
                        className="px-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
                        data-testid={`text-nav-section-${section.label}`}
                      >
                        {section.label}
                      </div>
                      <div className="grid gap-1">
                        {section.items.map((item) => {
                          // Compare full URL including query params for proper active state
                          const currentPath = location.split("?")[0];
                          const itemPath = item.href.split("?")[0];
                          const currentParams = new URLSearchParams(location.split("?")[1] || "");
                          const itemParams = new URLSearchParams(item.href.split("?")[1] || "");
                          const currentTab = currentParams.get("tab");
                          const itemTab = itemParams.get("tab");
                          // Active if paths match AND either both have same tab or neither has a tab
                          const isActive = currentPath === itemPath && currentTab === itemTab;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm transition-colors",
                                isActive
                                  ? "border-[hsl(var(--primary)/0.25)] bg-[hsl(var(--primary)/0.08)]"
                                  : "border-border bg-white/50 hover:bg-white"
                              )}
                              data-testid={item.testId}
                            >
                              <span className={cn(isActive ? "text-[hsl(var(--primary))]" : "text-muted-foreground")}>
                                {item.icon}
                              </span>
                              <span className="font-medium">{item.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </nav>

                <div
                  className="mt-4 rounded-2xl border border-border bg-white/50 p-3 text-xs text-muted-foreground"
                  data-testid="card-sidebar-note"
                >
                  Role-based permissions are previewed in this prototype.
                </div>
              </div>
            </Card>
          </aside>

          <main className="min-w-0" data-testid="main-content">
            <div className="rounded-3xl border border-border/60 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/45 shadow-sm">
              <div className="p-5 md:p-7">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
