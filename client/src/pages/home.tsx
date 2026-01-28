import * as React from "react";
import { Link } from "wouter";
import {
  BarChart3,
  BookOpen,
  GraduationCap,
  Handshake,
  Laptop,
  LineChart,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type RoleKey = "student" | "staff" | "experience";

const roleConfig: Record<
  RoleKey,
  {
    title: string;
    subtitle: string;
    chips: string[];
    icon: React.ReactNode;
    href: string;
  }
> = {
  student: {
    title: "Student",
    subtitle: "Assessments, learning modules, progress, and support in one place.",
    chips: ["Skill evaluations", "Resource needs", "Progress tracking"],
    icon: <GraduationCap className="h-5 w-5" strokeWidth={2} />,
    href: "/role/student",
  },
  staff: {
    title: "Staff & Admin",
    subtitle: "Operations tools and analytics—built around visibility and outcomes.",
    chips: ["CRM", "Device mgmt", "KPI analytics"],
    icon: <Shield className="h-5 w-5" strokeWidth={2} />,
    href: "/role/staff",
  },
  experience: {
    title: "Mentor / Partner / Alumni",
    subtitle: "Engagement journeys, relationships, and workforce follow-through.",
    chips: ["Mentoring", "Partnerships", "Alumni journeys"],
    icon: <Handshake className="h-5 w-5" strokeWidth={2} />,
    href: "/role/experience",
  },
};

function TopBar() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div
          className="h-10 w-10 rounded-2xl bg-white shadow-sm ring-1 ring-border grid place-items-center"
          data-testid="img-logo"
        >
          <Sparkles className="h-5 w-5 text-foreground" strokeWidth={2.25} />
        </div>
        <div className="leading-tight">
          <div className="text-sm text-muted-foreground" data-testid="text-product-kicker">
            Better Youth
          </div>
          <div className="text-lg font-semibold tracking-tight" data-testid="text-product-title">
            Better Youth Hub
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Badge
          variant="secondary"
          className="rounded-full border border-border bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50"
          data-testid="badge-status"
        >
          Prototype
        </Badge>
        <Button
          variant="secondary"
          className="rounded-full bg-white/70 border border-border hover:bg-white"
          data-testid="button-learn-more"
        >
          How it works
        </Button>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="pt-10 md:pt-16">
      <div className="grid gap-10 md:grid-cols-[1.25fr_0.75fr] md:items-end">
        <div>
          <Badge
            className="rounded-full px-3 py-1 text-[12px] bg-white/70 text-foreground border border-border shadow-sm"
            variant="secondary"
            data-testid="badge-hero"
          >
            Role-based platform • learning + engagement + outcomes
          </Badge>

          <h1
            className="mt-4 font-serif text-4xl md:text-6xl leading-[1.03] tracking-[-0.02em]"
            data-testid="text-hero-title"
          >
            A hub that meets people where they are—
            <span className="text-foreground"> then guides the journey forward.</span>
          </h1>

          <p
            className="mt-4 max-w-2xl text-base md:text-lg text-muted-foreground"
            data-testid="text-hero-subtitle"
          >
            Switch between personas to preview permissions and workflows for staff/admin, students, and
            experience-journey users (mentors, partners, alumni). Everyone with learning responsibilities
            gets learning access.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="#roles">
              <Button
                className="rounded-full px-5 shadow-sm"
                data-testid="button-choose-role"
              >
                Choose a role
              </Button>
            </Link>
            <Link href="/role/student">
              <Button
                variant="secondary"
                className="rounded-full px-5 bg-white/70 border border-border hover:bg-white"
                data-testid="button-student-preview"
              >
                Preview student
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span data-testid="text-hero-note">Three tailored dashboards.</span>
            </div>
          </div>
        </div>

        <Card className="overflow-hidden border-border/70 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/55 shadow-md">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium" data-testid="text-snapshot-title">
                Snapshot
              </div>
              <Badge variant="secondary" className="rounded-full" data-testid="badge-snapshot">
                v0
              </Badge>
            </div>

            <div className="mt-4 grid gap-3">
              <div
                className="flex items-start gap-3 rounded-2xl border border-border bg-white/60 p-3"
                data-testid="card-snapshot-learning"
              >
                <div className="mt-0.5 rounded-xl bg-[hsl(var(--primary)/0.12)] p-2">
                  <BookOpen className="h-4 w-4 text-[hsl(var(--primary))]" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium" data-testid="text-snapshot-learning-title">
                    Learning
                  </div>
                  <div className="text-sm text-muted-foreground" data-testid="text-snapshot-learning-desc">
                    Modules, sessions, and progress tracking.
                  </div>
                </div>
              </div>

              <div
                className="flex items-start gap-3 rounded-2xl border border-border bg-white/60 p-3"
                data-testid="card-snapshot-tools"
              >
                <div className="mt-0.5 rounded-xl bg-[hsl(var(--accent)/0.12)] p-2">
                  <Laptop className="h-4 w-4 text-[hsl(var(--accent))]" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium" data-testid="text-snapshot-tools-title">
                    Tools
                  </div>
                  <div className="text-sm text-muted-foreground" data-testid="text-snapshot-tools-desc">
                    CRM and device management access.
                  </div>
                </div>
              </div>

              <div
                className="flex items-start gap-3 rounded-2xl border border-border bg-white/60 p-3"
                data-testid="card-snapshot-analytics"
              >
                <div className="mt-0.5 rounded-xl bg-[hsl(261_78%_62%/0.12)] p-2">
                  <LineChart className="h-4 w-4 text-[hsl(261_78%_62%)]" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium" data-testid="text-snapshot-analytics-title">
                    Outcomes
                  </div>
                  <div
                    className="text-sm text-muted-foreground"
                    data-testid="text-snapshot-analytics-desc"
                  >
                    KPIs from entry → alumni → workforce.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-border bg-white/50 p-3">
              <div className="text-xs text-muted-foreground" data-testid="text-snapshot-footer">
                This is a UI prototype (no saved data).
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function RoleCard({ roleKey }: { roleKey: RoleKey }) {
  const r = roleConfig[roleKey];
  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-3xl border-border/70 bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/55 shadow-sm transition-all",
        "hover:shadow-md hover:-translate-y-0.5"
      )}
      data-testid={`card-role-${roleKey}`}
    >
      <div className="absolute inset-0 opacity-70 by-shimmer" />
      <div className="absolute inset-0 by-noise" />

      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="grid h-10 w-10 place-items-center rounded-2xl border border-border bg-white/70"
              data-testid={`img-role-icon-${roleKey}`}
            >
              {r.icon}
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight" data-testid={`text-role-title-${roleKey}`}>
                {r.title}
              </div>
              <div className="text-sm text-muted-foreground" data-testid={`text-role-subtitle-${roleKey}`}>
                {r.subtitle}
              </div>
            </div>
          </div>

          <Link href={r.href}>
            <Button
              className="rounded-full"
              data-testid={`button-open-role-${roleKey}`}
            >
              Open
            </Button>
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {r.chips.map((c, idx) => (
            <Badge
              key={c}
              variant="secondary"
              className="rounded-full bg-white/70 border border-border"
              data-testid={`badge-role-${roleKey}-${idx}`}
            >
              {c}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}

function RolePicker() {
  return (
    <section id="roles" className="pt-10 md:pt-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl tracking-tight" data-testid="text-roles-title">
            Choose your view
          </h2>
          <p className="mt-2 text-sm md:text-base text-muted-foreground" data-testid="text-roles-subtitle">
            Role-based permissions shape what each person sees. This prototype previews the experience.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
          <BarChart3 className="h-4 w-4" />
          <span data-testid="text-roles-note">Dashboards & flows</span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <RoleCard roleKey="student" />
        <RoleCard roleKey="staff" />
        <RoleCard roleKey="experience" />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-muted-foreground" data-testid="text-footer-left">
          Better Youth Hub — role-based prototype
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Badge
            variant="secondary"
            className="rounded-full bg-white/70 border border-border"
            data-testid="badge-footer-pill"
          >
            Learning access included
          </Badge>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen by-noise">
      <div className="absolute inset-0 by-shimmer" />
      <div className="absolute inset-0 by-grid opacity-[0.55]" />

      <div className="relative mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="pt-6">
          <TopBar />
        </div>

        <Hero />
        <RolePicker />
        <Footer />
      </div>
    </div>
  );
}
