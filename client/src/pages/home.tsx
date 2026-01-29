import * as React from "react";
import { Link } from "wouter";
import {
  Cloud,
  Copy,
  Download,
  ExternalLink,
  GraduationCap,
  Handshake,
  Link2,
  Rocket,
  Shield,
  Sparkles,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const appRepos = [
  {
    name: "Better Youth Hub",
    replitUrl: "https://replit.com/@davidpazmino1/attached-assets",
    description: "Main hub with role-based dashboards",
  },
  {
    name: "Youth Connect",
    replitUrl: "https://replit.com/@davidpazmino1/youth-connect",
    description: "Onboarding and engagement platform",
  },
  {
    name: "Azure Connect",
    replitUrl: "https://replit.com/@davidpazmino1/azure-connect",
    description: "Azure integration and services",
  },
  {
    name: "Unity Code Academy",
    replitUrl: "https://replit.com/@davidpazmino1/unity-code-academy",
    description: "Gamified learning platform",
  },
];

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
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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

      <div className="flex flex-wrap items-center gap-2">
        <Badge
          variant="secondary"
          className="rounded-full border border-border bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50"
          data-testid="badge-status"
        >
          Prototype
        </Badge>
        <Button
          variant="secondary"
          className="rounded-full bg-white/70 border border-border hover:bg-white text-sm"
          data-testid="button-learn-more"
        >
          How it works
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              className="rounded-full bg-white/70 border border-border hover:bg-white gap-2 text-sm"
              data-testid="button-useful-links"
            >
              <Link2 className="h-4 w-4" />
              Useful Links
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-2" align="end">
            <div className="grid gap-1">
              <a
                href="https://unity-code-academy.replit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted transition-colors"
                data-testid="link-unity-code-academy"
              >
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <span>Unity Code Academy</span>
              </a>
              <a
                href="https://youth-connect.replit.app/onboarding"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted transition-colors"
                data-testid="link-youth-connect"
              >
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <span>Youth Connect Onboarding</span>
              </a>
              <a
                href="https://azure-connect.replit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted transition-colors"
                data-testid="link-azure-connect"
              >
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <span>Azure Connect</span>
              </a>
            </div>
          </PopoverContent>
        </Popover>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className="rounded-full bg-white/70 border border-border hover:bg-white gap-2 text-sm"
              data-testid="button-deploy-guide"
            >
              <Rocket className="h-4 w-4" />
              Deploy Guide
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Deploy These Apps
              </DialogTitle>
              <DialogDescription>
                Learn how to deploy Better Youth apps to your own domain or download the code for self-hosting.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="replit" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="replit" className="gap-2">
                  <Cloud className="h-4 w-4" />
                  Deploy on Replit
                </TabsTrigger>
                <TabsTrigger value="self-host" className="gap-2">
                  <Download className="h-4 w-4" />
                  Self-Host
                </TabsTrigger>
              </TabsList>
              <TabsContent value="replit" className="mt-4 space-y-4">
                <div className="rounded-lg border bg-muted/30 p-4">
                  <h4 className="font-semibold text-sm">Option 1: Fork and Deploy</h4>
                  <ol className="mt-3 space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    <li>Click on any app link below to open it in Replit</li>
                    <li>Click the <strong>"Fork"</strong> button to create your own copy</li>
                    <li>Make any customizations you need</li>
                    <li>Click <strong>"Publish"</strong> to deploy to a .replit.app domain</li>
                  </ol>
                </div>
                <div className="rounded-lg border bg-muted/30 p-4">
                  <h4 className="font-semibold text-sm">Option 2: Custom Domain</h4>
                  <ol className="mt-3 space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    <li>After publishing, go to the <strong>Deployments</strong> tab</li>
                    <li>Click <strong>"Link Custom Domain"</strong></li>
                    <li>Add the DNS records (A and TXT) to your domain registrar</li>
                    <li>Wait for DNS propagation (usually 15 min - 24 hrs)</li>
                  </ol>
                  <p className="mt-3 text-xs text-muted-foreground">
                    You can also purchase a domain directly through Replit for automatic configuration.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">App Repositories</h4>
                  {appRepos.map((app) => (
                    <a
                      key={app.name}
                      href={app.replitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                      data-testid={`link-repo-${app.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <div>
                        <div className="font-medium text-sm">{app.name}</div>
                        <div className="text-xs text-muted-foreground">{app.description}</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="self-host" className="mt-4 space-y-4">
                <div className="rounded-lg border bg-muted/30 p-4">
                  <h4 className="font-semibold text-sm">Download Code as ZIP</h4>
                  <ol className="mt-3 space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    <li>Open the app in Replit (links below)</li>
                    <li>Click the three-dot menu <strong>(⋮)</strong> in the file tree</li>
                    <li>Select <strong>"Download as ZIP"</strong></li>
                    <li>Extract the files on your server</li>
                  </ol>
                </div>
                <div className="rounded-lg border bg-muted/30 p-4">
                  <h4 className="font-semibold text-sm">Server Requirements</h4>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc list-inside">
                    <li>Node.js 18+ runtime</li>
                    <li>PostgreSQL database</li>
                    <li>Set environment variables (DATABASE_URL, etc.)</li>
                  </ul>
                </div>
                <div className="rounded-lg border bg-muted/30 p-4">
                  <h4 className="font-semibold text-sm">Deployment Commands</h4>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 rounded bg-black/5 px-3 py-2 font-mono text-xs">
                      <Copy className="h-3 w-3 text-muted-foreground shrink-0" />
                      <code>npm install</code>
                    </div>
                    <div className="flex items-center gap-2 rounded bg-black/5 px-3 py-2 font-mono text-xs">
                      <Copy className="h-3 w-3 text-muted-foreground shrink-0" />
                      <code>npm run build</code>
                    </div>
                    <div className="flex items-center gap-2 rounded bg-black/5 px-3 py-2 font-mono text-xs">
                      <Copy className="h-3 w-3 text-muted-foreground shrink-0" />
                      <code>npm start</code>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">App Repositories</h4>
                  {appRepos.map((app) => (
                    <a
                      key={app.name}
                      href={app.replitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                      data-testid={`link-download-${app.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <div>
                        <div className="font-medium text-sm">{app.name}</div>
                        <div className="text-xs text-muted-foreground">{app.description}</div>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
        <Link href="/account">
          <Button
            variant="secondary"
            className="rounded-full bg-white/70 border border-border hover:bg-white gap-2 text-sm"
            data-testid="button-account"
          >
            <User className="h-4 w-4" />
            Account
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="pt-8 md:pt-16">
      <div>
        <Badge
          className="rounded-full px-3 py-1 text-[11px] sm:text-[12px] bg-white/70 text-foreground border border-border shadow-sm"
          variant="secondary"
          data-testid="badge-hero"
        >
          Role-based platform • learning + engagement + outcomes
        </Badge>

        <h1
          className="mt-4 font-serif text-3xl sm:text-4xl md:text-6xl leading-[1.08] tracking-[-0.02em]"
          data-testid="text-hero-title"
        >
          A hub that meets people where they are—
          <span className="text-foreground"> then guides the journey forward.</span>
        </h1>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="pt-10 md:pt-14" data-testid="section-about">
      <div className="grid gap-6 md:gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl tracking-tight" data-testid="text-about-title">
            About Better Youth
          </h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground" data-testid="text-about-intro">
            Better Youth’s mission is to build creative confidence, bridge resource gaps, and prepare foster and
            system-impacted youth for sustained success in the creative economy.
          </p>

          <div className="mt-6 grid gap-3" data-testid="grid-about-pillars">
            <Card className="rounded-3xl border-border/70 bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/55 shadow-sm">
              <div className="p-5" data-testid="card-about-pillar-1">
                <div className="text-sm font-semibold" data-testid="text-about-pillar-1-title">
                  Omnidirectional mentoring
                </div>
                <div className="mt-2 text-sm text-muted-foreground" data-testid="text-about-pillar-1-desc">
                  Connection to industry mentors, peers, and community—support that grows with the journey.
                </div>
              </div>
            </Card>

            <Card className="rounded-3xl border-border/70 bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/55 shadow-sm">
              <div className="p-5" data-testid="card-about-pillar-2">
                <div className="text-sm font-semibold" data-testid="text-about-pillar-2-title">
                  Media arts training
                </div>
                <div className="mt-2 text-sm text-muted-foreground" data-testid="text-about-pillar-2-desc">
                  Hands-on creative and technical skill-building—designed to close access gaps and grow confidence.
                </div>
              </div>
            </Card>

            <Card className="rounded-3xl border-border/70 bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/55 shadow-sm">
              <div className="p-5" data-testid="card-about-pillar-3">
                <div className="text-sm font-semibold" data-testid="text-about-pillar-3-title">
                  Professional skills + social supports
                </div>
                <div className="mt-2 text-sm text-muted-foreground" data-testid="text-about-pillar-3-desc">
                  Employment readiness, resource navigation, and the practical supports that make progress stick.
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Card className="overflow-hidden rounded-3xl border-border/70 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/55 shadow-md">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium" data-testid="text-about-stats-title">
                Snapshot of impact
              </div>
              <Badge variant="secondary" className="rounded-full" data-testid="badge-about-stats">
                Since 2008
              </Badge>
            </div>

            <div className="mt-4 grid gap-3" data-testid="grid-about-stats">
              <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-about-stat-1">
                <div className="text-xs text-muted-foreground" data-testid="text-about-stat-1-label">
                  Agency partners
                </div>
                <div className="mt-1 text-2xl font-semibold" data-testid="text-about-stat-1-value">
                  30
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-about-stat-2">
                <div className="text-xs text-muted-foreground" data-testid="text-about-stat-2-label">
                  Mentoring hours
                </div>
                <div className="mt-1 text-2xl font-semibold" data-testid="text-about-stat-2-value">
                  15,000+
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-about-stat-3">
                <div className="text-xs text-muted-foreground" data-testid="text-about-stat-3-label">
                  Youth served
                </div>
                <div className="mt-1 text-2xl font-semibold" data-testid="text-about-stat-3-value">
                  12,000+
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-border bg-white/50 p-3 text-xs text-muted-foreground" data-testid="text-about-note">
              This About content is adapted from betteryouth.org for this prototype.
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function RoleSelection() {
  return (
    <section id="roles" className="pt-10 md:pt-14" data-testid="section-roles">
      <h2 className="font-serif text-2xl md:text-3xl tracking-tight" data-testid="text-roles-title">
        Choose Your Role
      </h2>
      <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl" data-testid="text-roles-subtitle">
        Select your role to access the personalized dashboard with features tailored to your needs.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="grid-roles">
        {(Object.keys(roleConfig) as RoleKey[]).map((key) => {
          const role = roleConfig[key];
          return (
            <Link key={key} href={role.href}>
              <Card
                className="group cursor-pointer rounded-3xl border-border/70 bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/55 shadow-sm hover:shadow-md hover:bg-white/90 transition-all duration-200"
                data-testid={`card-role-${key}`}
              >
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[hsl(var(--primary)/0.12)] p-2.5 group-hover:bg-[hsl(var(--primary)/0.18)] transition-colors">
                      {role.icon}
                    </div>
                    <div className="text-base font-semibold" data-testid={`text-role-${key}-title`}>
                      {role.title}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground" data-testid={`text-role-${key}-desc`}>
                    {role.subtitle}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {role.chips.map((chip, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="rounded-full bg-white/70 border border-border text-xs"
                        data-testid={`badge-role-${key}-chip-${i}`}
                      >
                        {chip}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
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
        <About />
        <RoleSelection />
        <Footer />
      </div>
    </div>
  );
}
