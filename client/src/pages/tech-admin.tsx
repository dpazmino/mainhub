import * as React from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Book,
  Cloud,
  Code,
  Copy,
  Database,
  Download,
  ExternalLink,
  FileText,
  GitBranch,
  Globe,
  HardDrive,
  Layers,
  LayoutGrid,
  Play,
  Rocket,
  Server,
  Settings,
  Sparkles,
  Terminal,
  Users,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const appData = [
  {
    id: "better-youth-hub",
    name: "Better Youth Hub",
    replitUrl: "https://replit.com/@davidpazmino1/attached-assets",
    liveUrl: "https://attached-assets-davidpazmino1.replit.app/",
    description: "Main hub with role-based dashboards for students, staff, and mentors",
    techStack: ["React", "TypeScript", "Express", "PostgreSQL", "Drizzle ORM"],
    features: ["Role-based access", "Student tracking", "Device management", "Support requests"],
  },
  {
    id: "youth-connect",
    name: "Youth Connect",
    replitUrl: "https://replit.com/@davidpazmino1/youth-connect",
    liveUrl: "https://youth-connect.replit.app/",
    description: "Onboarding and engagement platform for new participants",
    techStack: ["React", "TypeScript", "Express", "PostgreSQL"],
    features: ["Onboarding flow", "Profile creation", "Resource connection"],
  },
  {
    id: "azure-connect",
    name: "Azure Connect",
    replitUrl: "https://replit.com/@davidpazmino1/azure-connect",
    liveUrl: "https://azure-connect.replit.app/",
    description: "Azure cloud integration and services portal",
    techStack: ["React", "TypeScript", "Express", "Azure SDK"],
    features: ["Azure integration", "Cloud services", "Resource management"],
  },
  {
    id: "unity-code-academy",
    name: "Unity Code Academy",
    replitUrl: "https://replit.com/@davidpazmino1/unity-code-academy",
    liveUrl: "https://unity-code-academy.replit.app/",
    description: "Gamified learning platform with XP, levels, and badges",
    techStack: ["React", "TypeScript", "Express", "PostgreSQL"],
    features: ["XP system", "Badges", "Learning modules", "Progress tracking"],
  },
];

function Header() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full" data-testid="button-back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-primary/10 grid place-items-center">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Better Youth</div>
            <div className="text-lg font-semibold">Tech Admin Documentation</div>
          </div>
        </div>
      </div>
      <Badge variant="secondary" className="rounded-full w-fit" data-testid="badge-version">
        Version 1.0
      </Badge>
    </div>
  );
}

function TableOfContents() {
  const sections = [
    { id: "what-is-replit", label: "What is Replit?", icon: Cloud },
    { id: "system-overview", label: "System Overview", icon: LayoutGrid },
    { id: "architecture", label: "Architecture Diagrams", icon: Layers },
    { id: "deployment", label: "Deployment Guide", icon: Rocket },
    { id: "runbooks", label: "Runbooks", icon: Book },
    { id: "data-models", label: "Data Models", icon: Database },
  ];

  return (
    <Card className="sticky top-6 p-4 hidden lg:block">
      <div className="text-sm font-semibold mb-3">On This Page</div>
      <nav className="space-y-1">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground py-1.5 px-2 rounded-md hover:bg-muted transition-colors"
            data-testid={`nav-${section.id}`}
          >
            <section.icon className="h-4 w-4" />
            {section.label}
          </a>
        ))}
      </nav>
    </Card>
  );
}

function WhatIsReplit() {
  return (
    <section id="what-is-replit" className="scroll-mt-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-xl bg-blue-500/10 grid place-items-center">
          <Cloud className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold">What is Replit?</h2>
      </div>

      <Card className="p-6">
        <p className="text-muted-foreground mb-4">
          Replit is a cloud-based development platform that lets you write, run, and host applications 
          directly in your web browser. Think of it as a complete computer for building software that 
          lives in the cloud.
        </p>

        <div className="grid gap-4 md:grid-cols-2 mt-6">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 font-medium mb-2">
              <Code className="h-4 w-4 text-primary" />
              Code Editor
            </div>
            <p className="text-sm text-muted-foreground">
              Write and edit code directly in your browser. No software installation needed.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 font-medium mb-2">
              <Play className="h-4 w-4 text-green-600" />
              Instant Preview
            </div>
            <p className="text-sm text-muted-foreground">
              See your changes immediately. The app runs live as you make changes.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 font-medium mb-2">
              <Database className="h-4 w-4 text-purple-600" />
              Built-in Database
            </div>
            <p className="text-sm text-muted-foreground">
              PostgreSQL database included. No separate database setup required.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 font-medium mb-2">
              <Globe className="h-4 w-4 text-orange-600" />
              One-Click Deploy
            </div>
            <p className="text-sm text-muted-foreground">
              Publish your app to the internet with one click. Get a live URL instantly.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="font-medium text-blue-900 mb-2">Key Terms</div>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="font-medium text-blue-800">Repl</dt>
              <dd className="text-blue-700">A project container. Each app is a "Repl" that contains all code and settings.</dd>
            </div>
            <div>
              <dt className="font-medium text-blue-800">Fork</dt>
              <dd className="text-blue-700">Create your own copy of someone else's Repl to modify.</dd>
            </div>
            <div>
              <dt className="font-medium text-blue-800">Publish/Deploy</dt>
              <dd className="text-blue-700">Make your app live and accessible on the internet.</dd>
            </div>
            <div>
              <dt className="font-medium text-blue-800">Secrets</dt>
              <dd className="text-blue-700">Secure storage for passwords, API keys, and sensitive data.</dd>
            </div>
          </dl>
        </div>
      </Card>
    </section>
  );
}

function SystemOverview() {
  return (
    <section id="system-overview" className="scroll-mt-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-xl bg-green-500/10 grid place-items-center">
          <LayoutGrid className="h-5 w-5 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold">System Overview</h2>
      </div>

      <Card className="p-6">
        <p className="text-muted-foreground mb-6">
          The Better Youth platform consists of four interconnected web applications, each serving 
          a specific purpose. They share common technology and can communicate with each other.
        </p>

        <div className="grid gap-4">
          {appData.map((app) => (
            <div key={app.id} className="rounded-lg border p-4" data-testid={`app-overview-${app.id}`}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="font-semibold text-lg">{app.name}</div>
                  <p className="text-sm text-muted-foreground mt-1">{app.description}</p>
                </div>
                <div className="flex gap-2">
                  <a href={app.liveUrl} target="_blank" rel="noopener noreferrer" data-testid={`button-live-${app.id}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Globe className="h-3 w-3" />
                      Live
                    </Button>
                  </a>
                  <a href={app.replitUrl} target="_blank" rel="noopener noreferrer" data-testid={`button-code-${app.id}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Code className="h-3 w-3" />
                      Code
                    </Button>
                  </a>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {app.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {app.features.map((feature) => (
                  <span key={feature} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

function ArchitectureDiagrams() {
  return (
    <section id="architecture" className="scroll-mt-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-xl bg-purple-500/10 grid place-items-center">
          <Layers className="h-5 w-5 text-purple-600" />
        </div>
        <h2 className="text-2xl font-semibold">Architecture Diagrams</h2>
      </div>

      <Tabs defaultValue="overall" className="w-full">
        <TabsList className="w-full flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="overall" data-testid="tab-arch-overall">Overall System</TabsTrigger>
          <TabsTrigger value="better-youth-hub" data-testid="tab-arch-byh">Better Youth Hub</TabsTrigger>
          <TabsTrigger value="youth-connect" data-testid="tab-arch-yc">Youth Connect</TabsTrigger>
          <TabsTrigger value="azure-connect" data-testid="tab-arch-ac">Azure Connect</TabsTrigger>
          <TabsTrigger value="unity-code-academy" data-testid="tab-arch-uca">Unity Code Academy</TabsTrigger>
        </TabsList>

        <TabsContent value="overall" className="mt-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">System Architecture Overview</h3>
            <div className="bg-slate-50 rounded-lg p-6 font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre text-xs sm:text-sm">{`
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BETTER YOUTH ECOSYSTEM                          │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────────┐
                              │   End Users     │
                              │ (Students/Staff)│
                              └────────┬────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                              REPLIT HOSTING                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │                         Load Balancer / CDN                              │ │
│  └──────────────┬──────────────┬──────────────┬──────────────┬─────────────┘ │
│                 │              │              │              │               │
│     ┌───────────▼──┐  ┌────────▼───┐  ┌──────▼────┐  ┌──────▼──────┐       │
│     │ Better Youth │  │   Youth    │  │   Azure   │  │ Unity Code  │       │
│     │     Hub      │  │  Connect   │  │  Connect  │  │   Academy   │       │
│     │  Port 5000   │  │ Port 5000  │  │ Port 5000 │  │  Port 5000  │       │
│     └──────┬───────┘  └──────┬─────┘  └─────┬─────┘  └──────┬──────┘       │
│            │                 │              │               │               │
│     ┌──────▼───────────────────────────────────────────────▼──────┐        │
│     │                     PostgreSQL Databases                     │        │
│     │         (Each app has its own isolated database)             │        │
│     └──────────────────────────────────────────────────────────────┘        │
└──────────────────────────────────────────────────────────────────────────────┘

LEGEND:
  ┌───┐
  │   │ = Application/Service
  └───┘
    │
    ▼  = Data flow direction
`}</pre>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="better-youth-hub" className="mt-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Better Youth Hub - Application Architecture</h3>
            <div className="bg-slate-50 rounded-lg p-6 font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre text-xs sm:text-sm">{`
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BETTER YOUTH HUB ARCHITECTURE                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (React + TypeScript)                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                              PAGES                                       ││
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  ││
│  │  │  Home Page   │  │ Student Role │  │  Staff Role  │  │ Mentor Role │  ││
│  │  │   (home.tsx) │  │  Dashboard   │  │  Dashboard   │  │  Dashboard  │  ││
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └─────────────┘  ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                           COMPONENTS                                     ││
│  │  Sidebar | Cards | Forms | Modals | Tables | Charts | Buttons           ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                        STATE MANAGEMENT                                  ││
│  │            TanStack Query (React Query) for API Caching                  ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       │ HTTP/REST API
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BACKEND (Express.js + TypeScript)               │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                              API ROUTES                                  ││
│  │  /api/students | /api/goals | /api/skills | /api/devices | /api/support ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                         AUTHENTICATION                                   ││
│  │                    Replit Auth (OpenID Connect)                          ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                            STORAGE LAYER                                 ││
│  │                     Drizzle ORM (Type-safe queries)                      ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       │ SQL Queries
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              PostgreSQL DATABASE                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ students │ │  goals   │ │  skills  │ │ devices  │ │ support  │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
└─────────────────────────────────────────────────────────────────────────────┘
`}</pre>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="youth-connect" className="mt-4">
          <Card className="p-6" data-testid="diagram-youth-connect">
            <h3 className="font-semibold mb-4">Youth Connect - Onboarding Architecture</h3>
            <div className="bg-slate-50 rounded-lg p-6 font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre text-xs sm:text-sm">{`
┌─────────────────────────────────────────────────────────────────────────────┐
│                       YOUTH CONNECT ARCHITECTURE                             │
│                    (Onboarding & Engagement Platform)                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              ONBOARDING FLOW                                 │
│                                                                              │
│  Step 1          Step 2          Step 3          Step 4          Step 5    │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐   │
│  │ Welcome │───▶│ Profile │───▶│ Needs   │───▶│ Goals   │───▶│ Connect │   │
│  │  Intro  │    │  Setup  │    │ Assess  │    │ Setting │    │ Match   │   │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘   │
│                                                                              │
│  What happens at each step:                                                  │
│  • Welcome: Introduction to Better Youth program                             │
│  • Profile: Basic info, contact, emergency contact                           │
│  • Needs: Housing, food, transportation assessment                           │
│  • Goals: Career interests, education goals, timeline                        │
│  • Connect: Match with mentors, resources, programs                          │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                            DATA COLLECTED                                    │
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │  Personal Info   │  │  Resource Needs  │  │  Program Match   │          │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤          │
│  │ • Name           │  │ • Housing status │  │ • Interests      │          │
│  │ • Age            │  │ • Food security  │  │ • Available time │          │
│  │ • Contact info   │  │ • Transport      │  │ • Learning style │          │
│  │ • School info    │  │ • Healthcare     │  │ • Career goals   │          │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘          │
└─────────────────────────────────────────────────────────────────────────────┘
`}</pre>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="azure-connect" className="mt-4">
          <Card className="p-6" data-testid="diagram-azure-connect">
            <h3 className="font-semibold mb-4">Azure Connect - Cloud Services Architecture</h3>
            <div className="bg-slate-50 rounded-lg p-6 font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre text-xs sm:text-sm">{`
┌─────────────────────────────────────────────────────────────────────────────┐
│                        AZURE CONNECT ARCHITECTURE                            │
│                    (Cloud Integration & Services Portal)                     │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER INTERFACE                                  │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │  Dashboard   │  │  Resources   │  │   Storage    │  │   Reports    │    │
│  │   Overview   │  │  Management  │  │   Browser    │  │  & Analytics │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            BACKEND API LAYER                                 │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                         Express.js + TypeScript                          ││
│  │                                                                          ││
│  │   /api/resources    /api/storage    /api/users    /api/reports          ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        AZURE CLOUD SERVICES                                  │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │    Azure     │  │    Azure     │  │    Azure     │  │    Azure     │    │
│  │   Storage    │  │   Identity   │  │  Functions   │  │   Cosmos DB  │    │
│  │  (Blob/File) │  │    (Auth)    │  │ (Serverless) │  │  (Database)  │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  Purpose: Provides cloud infrastructure for file storage, authentication,   │
│  serverless compute, and database services for the Better Youth ecosystem.  │
└─────────────────────────────────────────────────────────────────────────────┘
`}</pre>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="unity-code-academy" className="mt-4">
          <Card className="p-6" data-testid="diagram-unity-code-academy">
            <h3 className="font-semibold mb-4">Unity Code Academy - Gamification Architecture</h3>
            <div className="bg-slate-50 rounded-lg p-6 font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre text-xs sm:text-sm">{`
┌─────────────────────────────────────────────────────────────────────────────┐
│                      UNITY CODE ACADEMY ARCHITECTURE                         │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              GAMIFICATION ENGINE                             │
│                                                                              │
│  ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐       │
│  │   XP System     │     │  Level System   │     │  Badge System   │       │
│  │                 │     │                 │     │                 │       │
│  │ • Earn XP from  │────▶│ • XP thresholds │────▶│ • Achievement   │       │
│  │   activities    │     │ • Level 1-100   │     │   unlocks       │       │
│  │ • Bonus XP      │     │ • Rank titles   │     │ • Special badges│       │
│  └─────────────────┘     └─────────────────┘     └─────────────────┘       │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                         LEARNING MODULES                                 ││
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐                ││
│  │  │  Video   │  │  Quiz    │  │ Project  │  │ Challenge│                ││
│  │  │ Lessons  │  │ Modules  │  │  Based   │  │  Tasks   │                ││
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘                ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       │ API Integration
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          BETTER YOUTH HUB INTEGRATION                        │
│                                                                              │
│  GET /api/external/unity-students/{studentId}                               │
│  Returns: { level, totalXp, badges, weeklyProgress, completedModules }      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
`}</pre>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}

function DeploymentGuide() {
  const [copiedCommand, setCopiedCommand] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(id);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <section id="deployment" className="scroll-mt-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-xl bg-orange-500/10 grid place-items-center">
          <Rocket className="h-5 w-5 text-orange-600" />
        </div>
        <h2 className="text-2xl font-semibold">Deployment Guide</h2>
      </div>

      <Tabs defaultValue="replit" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="replit" className="gap-2">
            <Cloud className="h-4 w-4" />
            Deploy on Replit
          </TabsTrigger>
          <TabsTrigger value="self-host" className="gap-2">
            <Server className="h-4 w-4" />
            Self-Host
          </TabsTrigger>
        </TabsList>

        <TabsContent value="replit" className="mt-4 space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Step 1: Create Your Own Copy (Fork)</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-sm font-medium shrink-0">1</div>
                <div>
                  <p className="font-medium">Go to the app's Replit page</p>
                  <p className="text-sm text-muted-foreground mt-1">Click on any of the "Code" buttons in the System Overview section above.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-sm font-medium shrink-0">2</div>
                <div>
                  <p className="font-medium">Click the "Fork" button</p>
                  <p className="text-sm text-muted-foreground mt-1">Located in the top-right corner. This creates your own copy that you can modify.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-sm font-medium shrink-0">3</div>
                <div>
                  <p className="font-medium">Wait for the fork to complete</p>
                  <p className="text-sm text-muted-foreground mt-1">Replit will copy all files and set up a new database for you automatically.</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Step 2: Publish Your App</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-green-600 text-white grid place-items-center text-sm font-medium shrink-0">1</div>
                <div>
                  <p className="font-medium">Click the "Publish" button</p>
                  <p className="text-sm text-muted-foreground mt-1">Found in the top-right area of the Replit interface.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-green-600 text-white grid place-items-center text-sm font-medium shrink-0">2</div>
                <div>
                  <p className="font-medium">Choose deployment type</p>
                  <p className="text-sm text-muted-foreground mt-1">Select "Autoscale" for most apps. This handles traffic automatically.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-green-600 text-white grid place-items-center text-sm font-medium shrink-0">3</div>
                <div>
                  <p className="font-medium">Get your live URL</p>
                  <p className="text-sm text-muted-foreground mt-1">Your app will be available at yourapp.replit.app within minutes.</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Step 3: Connect Your Custom Domain (Optional)</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-purple-600 text-white grid place-items-center text-sm font-medium shrink-0">1</div>
                <div>
                  <p className="font-medium">Go to Deployments tab</p>
                  <p className="text-sm text-muted-foreground mt-1">After publishing, click on the "Deployments" tab in the left sidebar.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-purple-600 text-white grid place-items-center text-sm font-medium shrink-0">2</div>
                <div>
                  <p className="font-medium">Click "Link Custom Domain"</p>
                  <p className="text-sm text-muted-foreground mt-1">Enter your domain name (e.g., app.yourdomain.com).</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-purple-600 text-white grid place-items-center text-sm font-medium shrink-0">3</div>
                <div>
                  <p className="font-medium">Add DNS records</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Replit will show you the DNS records to add at your domain registrar (GoDaddy, Namecheap, etc.):
                  </p>
                  <ul className="mt-2 text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li><strong>A Record:</strong> Points to Replit's servers</li>
                    <li><strong>TXT Record:</strong> Verifies you own the domain</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-purple-600 text-white grid place-items-center text-sm font-medium shrink-0">4</div>
                <div>
                  <p className="font-medium">Wait for verification</p>
                  <p className="text-sm text-muted-foreground mt-1">DNS changes can take 15 minutes to 24 hours to take effect.</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="self-host" className="mt-4 space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Server Requirements</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-2 font-medium">
                  <Server className="h-4 w-4" />
                  Node.js 18+
                </div>
                <p className="text-sm text-muted-foreground mt-1">JavaScript runtime to run the application</p>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-2 font-medium">
                  <Database className="h-4 w-4" />
                  PostgreSQL 14+
                </div>
                <p className="text-sm text-muted-foreground mt-1">Database for storing application data</p>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-2 font-medium">
                  <HardDrive className="h-4 w-4" />
                  2GB RAM minimum
                </div>
                <p className="text-sm text-muted-foreground mt-1">Memory for running the application</p>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-2 font-medium">
                  <Globe className="h-4 w-4" />
                  SSL Certificate
                </div>
                <p className="text-sm text-muted-foreground mt-1">For secure HTTPS connections</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Step 1: Download the Code</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                From the Replit project page, click the three-dot menu (⋮) in the file panel and select "Download as ZIP".
              </p>
              <div className="rounded-lg bg-muted p-4">
                <div className="text-sm font-medium mb-2">Alternative: Clone with Git</div>
                <div 
                  className="flex items-center gap-2 bg-black/5 rounded px-3 py-2 cursor-pointer hover:bg-black/10"
                  onClick={() => copyToClipboard('git clone https://github.com/your-repo/app-name.git', 'git-clone')}
                >
                  {copiedCommand === 'git-clone' ? (
                    <span className="text-green-600 text-xs">Copied!</span>
                  ) : (
                    <Copy className="h-3 w-3 text-muted-foreground" />
                  )}
                  <code className="text-sm font-mono">git clone https://github.com/your-repo/app-name.git</code>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Step 2: Set Up Environment Variables</h3>
            <p className="text-muted-foreground mb-4">
              Create a .env file in the root directory with these variables:
            </p>
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre>{`# Database connection
DATABASE_URL=postgresql://user:password@host:5432/database

# Session secret (generate a random string)
SESSION_SECRET=your-secret-key-here

# Application settings
NODE_ENV=production
PORT=5000`}</pre>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Step 3: Install & Run</h3>
            <div className="space-y-3">
              <div 
                className="flex items-center gap-2 bg-slate-900 text-slate-100 rounded px-4 py-3 cursor-pointer hover:bg-slate-800"
                onClick={() => copyToClipboard('npm install', 'npm-install')}
              >
                {copiedCommand === 'npm-install' ? (
                  <span className="text-green-400 text-xs w-16">Copied!</span>
                ) : (
                  <Copy className="h-4 w-4 text-slate-400 w-16" />
                )}
                <code className="font-mono">npm install</code>
                <span className="text-slate-500 ml-auto text-sm">Install dependencies</span>
              </div>
              <div 
                className="flex items-center gap-2 bg-slate-900 text-slate-100 rounded px-4 py-3 cursor-pointer hover:bg-slate-800"
                onClick={() => copyToClipboard('npm run build', 'npm-build')}
              >
                {copiedCommand === 'npm-build' ? (
                  <span className="text-green-400 text-xs w-16">Copied!</span>
                ) : (
                  <Copy className="h-4 w-4 text-slate-400 w-16" />
                )}
                <code className="font-mono">npm run build</code>
                <span className="text-slate-500 ml-auto text-sm">Build for production</span>
              </div>
              <div 
                className="flex items-center gap-2 bg-slate-900 text-slate-100 rounded px-4 py-3 cursor-pointer hover:bg-slate-800"
                onClick={() => copyToClipboard('npm start', 'npm-start')}
              >
                {copiedCommand === 'npm-start' ? (
                  <span className="text-green-400 text-xs w-16">Copied!</span>
                ) : (
                  <Copy className="h-4 w-4 text-slate-400 w-16" />
                )}
                <code className="font-mono">npm start</code>
                <span className="text-slate-500 ml-auto text-sm">Start the server</span>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}

function Runbooks() {
  return (
    <section id="runbooks" className="scroll-mt-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-xl bg-red-500/10 grid place-items-center">
          <Book className="h-5 w-5 text-red-600" />
        </div>
        <h2 className="text-2xl font-semibold">Runbooks</h2>
      </div>

      <p className="text-muted-foreground mb-4">
        Step-by-step procedures for common operational tasks.
      </p>

      <Tabs defaultValue="seed-database" className="w-full">
        <TabsList className="w-full flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="seed-database">Seed Database</TabsTrigger>
          <TabsTrigger value="add-student">Add Student</TabsTrigger>
          <TabsTrigger value="backup">Backup Data</TabsTrigger>
          <TabsTrigger value="troubleshoot">Troubleshooting</TabsTrigger>
        </TabsList>

        <TabsContent value="seed-database" className="mt-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Runbook: Seed Production Database</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Populate the database with initial data from CSV files.
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4">
                <div className="font-medium text-yellow-800">⚠️ Warning</div>
                <p className="text-sm text-yellow-700 mt-1">
                  This will add data to your database. Run only once on initial setup.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="shrink-0">Step 1</Badge>
                  <div>
                    <p className="font-medium">Ensure the app is published and running</p>
                    <p className="text-sm text-muted-foreground">Verify you can access the live URL.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="shrink-0">Step 2</Badge>
                  <div>
                    <p className="font-medium">Run the seed endpoint</p>
                    <p className="text-sm text-muted-foreground mb-2">Execute this command in a terminal:</p>
                    <div className="bg-slate-900 text-slate-100 rounded px-3 py-2 font-mono text-sm">
                      curl -X POST https://YOUR-APP-URL/api/admin/seed-database
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="shrink-0">Step 3</Badge>
                  <div>
                    <p className="font-medium">Verify success</p>
                    <p className="text-sm text-muted-foreground">
                      You should see: {"{"}"success": true, "message": "Database seeded successfully"{"}"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="add-student" className="mt-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Runbook: Add New Student</h3>
            <p className="text-sm text-muted-foreground mb-4">
              How to add a new student to the system.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge className="shrink-0">Step 1</Badge>
                <div>
                  <p className="font-medium">Log in as Staff</p>
                  <p className="text-sm text-muted-foreground">Navigate to the Staff dashboard.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="shrink-0">Step 2</Badge>
                <div>
                  <p className="font-medium">Go to Student Management</p>
                  <p className="text-sm text-muted-foreground">Click "Students" in the sidebar.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="shrink-0">Step 3</Badge>
                <div>
                  <p className="font-medium">Click "Add Student"</p>
                  <p className="text-sm text-muted-foreground">Fill in the required information.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="shrink-0">Step 4</Badge>
                <div>
                  <p className="font-medium">Submit and verify</p>
                  <p className="text-sm text-muted-foreground">The new student should appear in the list.</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="mt-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Runbook: Backup Database</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Export a backup of your PostgreSQL database.
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
                <div className="font-medium text-blue-800">ℹ️ Replit Backups</div>
                <p className="text-sm text-blue-700 mt-1">
                  Replit automatically creates checkpoints. You can also manually export data.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="shrink-0">Option 1</Badge>
                  <div>
                    <p className="font-medium">Use Replit Checkpoints</p>
                    <p className="text-sm text-muted-foreground">
                      Checkpoints include database state. View them in the Version History panel.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="shrink-0">Option 2</Badge>
                  <div>
                    <p className="font-medium">Export via Shell (Self-hosted)</p>
                    <p className="text-sm text-muted-foreground mb-2">Run this command:</p>
                    <div className="bg-slate-900 text-slate-100 rounded px-3 py-2 font-mono text-sm">
                      pg_dump $DATABASE_URL {">"} backup.sql
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="troubleshoot" className="mt-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Runbook: Common Issues</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Solutions to frequently encountered problems.
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="font-medium">App shows "Not Found"</div>
                <ul className="mt-2 text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>Check if the app is published (not just running in development)</li>
                  <li>Verify the URL is correct</li>
                  <li>Wait a few minutes after publishing for DNS propagation</li>
                </ul>
              </div>

              <div className="rounded-lg border p-4">
                <div className="font-medium">Database connection error</div>
                <ul className="mt-2 text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>Check DATABASE_URL environment variable is set</li>
                  <li>Verify PostgreSQL service is running</li>
                  <li>Ensure database credentials are correct</li>
                </ul>
              </div>

              <div className="rounded-lg border p-4">
                <div className="font-medium">Login not working</div>
                <ul className="mt-2 text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>Replit Auth only works on published apps</li>
                  <li>Clear browser cookies and try again</li>
                  <li>Check if SESSION_SECRET is configured</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}

function DataModels() {
  return (
    <section id="data-models" className="scroll-mt-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-xl bg-indigo-500/10 grid place-items-center">
          <Database className="h-5 w-5 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-semibold">Data Models (Class Diagrams)</h2>
      </div>

      <Tabs defaultValue="better-youth-hub" className="w-full">
        <TabsList className="w-full flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="better-youth-hub" data-testid="tab-dm-byh">Better Youth Hub</TabsTrigger>
          <TabsTrigger value="youth-connect" data-testid="tab-dm-yc">Youth Connect</TabsTrigger>
          <TabsTrigger value="azure-connect" data-testid="tab-dm-ac">Azure Connect</TabsTrigger>
          <TabsTrigger value="unity-code-academy" data-testid="tab-dm-uca">Unity Code Academy</TabsTrigger>
        </TabsList>

        <TabsContent value="better-youth-hub" className="mt-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Better Youth Hub - Database Schema</h3>
            <div className="bg-slate-50 rounded-lg p-6 font-mono text-xs sm:text-sm overflow-x-auto">
              <pre className="whitespace-pre">{`
┌─────────────────────────────────────────────────────────────────────────────┐
│                        BETTER YOUTH HUB DATA MODEL                           │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐       ┌──────────────────────┐
│       USERS          │       │      STUDENTS        │
├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │       │ id (PK)              │
│ username             │◄──────│ userId (FK)          │
│ email                │       │ ageRange             │
│ firstName            │       │ enrollmentDate       │
│ lastName             │       │ email                │
│ profileImageUrl      │       │ phone                │
│ createdAt            │       │ gradeLevel           │
│ updatedAt            │       │ schoolType           │
└──────────────────────┘       │ emergencyContact     │
                               │ hasIep               │
                               │ primaryLanguage      │
                               │ transportationNeeds  │
                               │ photoConsent         │
                               │ status               │
                               └──────────┬───────────┘
                                          │
          ┌───────────────────────────────┼───────────────────────────────┐
          │                               │                               │
          ▼                               ▼                               ▼
┌──────────────────────┐       ┌──────────────────────┐       ┌──────────────────────┐
│    STUDENT_GOALS     │       │    STUDENT_SKILLS    │       │     PLACEMENTS       │
├──────────────────────┤       ├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │       │ id (PK)              │       │ id (PK)              │
│ studentId (FK)       │       │ studentId (FK)       │       │ studentId (FK)       │
│ goalType             │       │ skillCategory        │       │ organizationName     │
│ description          │       │ skillName            │       │ role                 │
│ targetDate           │       │ currentLevel         │       │ startDate            │
│ status               │       │ targetLevel          │       │ endDate              │
│ progress             │       │ lastAssessed         │       │ status               │
│ mentorNotes          │       │ certifications       │       │ supervisorName       │
│ createdAt            │       └──────────────────────┘       │ hoursCompleted       │
└──────────────────────┘                                      │ payRate              │
                                                              │ notes                │
                                                              └──────────────────────┘

┌──────────────────────┐       ┌──────────────────────┐       ┌──────────────────────┐
│       DEVICES        │       │  DEVICE_ALLOCATIONS  │       │   SUPPORT_REQUESTS   │
├──────────────────────┤       ├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │◄──────│ deviceId (FK)        │       │ id (PK)              │
│ assetTag             │       │ studentId (FK)  ─────┼───────│ studentId (FK)       │
│ deviceType           │       │ allocatedDate        │       │ serviceCategory      │
│ manufacturer         │       │ returnDate           │       │ serviceName          │
│ model                │       │ condition            │       │ description          │
│ serialNumber         │       │ notes                │       │ urgency              │
│ purchaseDate         │       │ status               │       │ status               │
│ warrantyExpiry       │       └──────────────────────┘       │ assignedTo           │
│ status               │                                      │ resolution           │
│ condition            │                                      │ createdAt            │
│ notes                │                                      │ resolvedAt           │
└──────────────────────┘                                      └──────────────────────┘

┌──────────────────────┐       ┌──────────────────────┐
│       MENTORS        │       │   STUDENT_OUTCOMES   │
├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │       │ id (PK)              │
│ userId (FK)          │       │ studentId (FK)       │
│ firstName            │       │ outcomeType          │
│ lastName             │       │ organization         │
│ email                │       │ title                │
│ phone                │       │ startDate            │
│ organization         │       │ endDate              │
│ expertise            │       │ salary               │
│ availability         │       │ notes                │
│ status               │       │ verifiedBy           │
│ bio                  │       │ verifiedDate         │
└──────────────────────┘       └──────────────────────┘

LEGEND:
  PK = Primary Key (unique identifier)
  FK = Foreign Key (links to another table)
  ◄── = Relationship (one-to-many)
`}</pre>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="youth-connect" className="mt-4">
          <Card className="p-6" data-testid="datamodel-youth-connect">
            <h3 className="font-semibold mb-4">Youth Connect - Data Model</h3>
            <div className="bg-slate-50 rounded-lg p-6 font-mono text-xs sm:text-sm overflow-x-auto">
              <pre className="whitespace-pre">{`
┌─────────────────────────────────────────────────────────────────────────────┐
│                        YOUTH CONNECT DATA MODEL                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐       ┌──────────────────────┐
│    ONBOARDING_USER   │       │   NEEDS_ASSESSMENT   │
├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │       │ id (PK)              │
│ firstName            │◄──────│ userId (FK)          │
│ lastName             │       │ housingStatus        │
│ email                │       │ foodSecure           │
│ phone                │       │ transportAccess      │
│ dateOfBirth          │       │ healthcareAccess     │
│ currentStep          │       │ mentalHealthNeeds    │
│ completedAt          │       │ educationStatus      │
│ createdAt            │       │ employmentStatus     │
└──────────┬───────────┘       │ priorityLevel        │
           │                   │ assessedAt           │
           │                   └──────────────────────┘
           │
           ▼
┌──────────────────────┐       ┌──────────────────────┐
│     USER_GOALS       │       │   RESOURCE_MATCHES   │
├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │       │ id (PK)              │
│ userId (FK)          │       │ userId (FK)          │
│ goalCategory         │       │ resourceType         │
│ description          │       │ resourceName         │
│ timeline             │       │ matchScore           │
│ priority             │       │ status               │
│ status               │       │ contactedAt          │
│ createdAt            │       │ enrolledAt           │
└──────────────────────┘       └──────────────────────┘

LEGEND:
  PK = Primary Key
  FK = Foreign Key
`}</pre>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="azure-connect" className="mt-4">
          <Card className="p-6" data-testid="datamodel-azure-connect">
            <h3 className="font-semibold mb-4">Azure Connect - Data Model</h3>
            <div className="bg-slate-50 rounded-lg p-6 font-mono text-xs sm:text-sm overflow-x-auto">
              <pre className="whitespace-pre">{`
┌─────────────────────────────────────────────────────────────────────────────┐
│                        AZURE CONNECT DATA MODEL                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐       ┌──────────────────────┐
│        USERS         │       │      RESOURCES       │
├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │       │ id (PK)              │
│ azureId              │       │ name                 │
│ email                │       │ type                 │
│ displayName          │       │ region               │
│ role                 │       │ status               │
│ department           │       │ createdBy (FK)       │
│ lastLogin            │       │ createdAt            │
│ createdAt            │       │ costPerMonth         │
└──────────┬───────────┘       └──────────────────────┘
           │
           ▼
┌──────────────────────┐       ┌──────────────────────┐
│    STORAGE_FILES     │       │    ACTIVITY_LOGS     │
├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │       │ id (PK)              │
│ userId (FK)          │       │ userId (FK)          │
│ fileName             │       │ action               │
│ fileType             │       │ resourceId           │
│ fileSize             │       │ timestamp            │
│ blobUrl              │       │ ipAddress            │
│ container            │       │ details              │
│ uploadedAt           │       └──────────────────────┘
└──────────────────────┘

LEGEND:
  PK = Primary Key
  FK = Foreign Key
`}</pre>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="unity-code-academy" className="mt-4">
          <Card className="p-6" data-testid="datamodel-unity-code-academy">
            <h3 className="font-semibold mb-4">Unity Code Academy - Gamification Data Model</h3>
            <div className="bg-slate-50 rounded-lg p-6 font-mono text-xs sm:text-sm overflow-x-auto">
              <pre className="whitespace-pre">{`
┌─────────────────────────────────────────────────────────────────────────────┐
│                     UNITY CODE ACADEMY DATA MODEL                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐       ┌──────────────────────┐
│    STUDENT_PROFILE   │       │    LEARNING_MODULES  │
├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │       │ id (PK)              │
│ studentId            │       │ title                │
│ level                │       │ description          │
│ totalXp              │       │ category             │
│ currentStreak        │       │ difficulty           │
│ longestStreak        │       │ xpReward             │
│ lastActivityDate     │       │ duration             │
│ rank                 │       │ prerequisites        │
│ avatarUrl            │       │ content              │
└──────────┬───────────┘       └──────────┬───────────┘
           │                              │
           │    ┌─────────────────────────┘
           │    │
           ▼    ▼
┌──────────────────────┐       ┌──────────────────────┐
│  MODULE_COMPLETIONS  │       │       BADGES         │
├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │       │ id (PK)              │
│ studentId (FK)       │       │ name                 │
│ moduleId (FK)        │       │ description          │
│ completedAt          │       │ iconUrl              │
│ score                │       │ requirement          │
│ xpEarned             │       │ category             │
│ timeSpent            │       │ rarity               │
└──────────────────────┘       └──────────┬───────────┘
                                          │
                                          ▼
                               ┌──────────────────────┐
                               │   BADGE_UNLOCKS      │
                               ├──────────────────────┤
                               │ id (PK)              │
                               │ studentId (FK)       │
                               │ badgeId (FK)         │
                               │ unlockedAt           │
                               │ featured             │
                               └──────────────────────┘

┌──────────────────────┐       ┌──────────────────────┐
│   WEEKLY_PROGRESS    │       │     ACHIEVEMENTS     │
├──────────────────────┤       ├──────────────────────┤
│ id (PK)              │       │ id (PK)              │
│ studentId (FK)       │       │ studentId (FK)       │
│ weekStart            │       │ type                 │
│ xpEarned             │       │ title                │
│ modulesCompleted     │       │ description          │
│ timeSpent            │       │ earnedAt             │
│ streak               │       │ points               │
└──────────────────────┘       └──────────────────────┘

API RESPONSE STRUCTURE:
┌─────────────────────────────────────────────────────────────┐
│ GET /api/external/unity-students/{studentId}                │
├─────────────────────────────────────────────────────────────┤
│ {                                                           │
│   "level": 5,                                               │
│   "totalXp": 2450,                                          │
│   "badges": ["Quick Learner", "First Project"],             │
│   "weeklyProgress": { "xp": 150, "modules": 3 },            │
│   "completedModules": ["intro-js", "html-basics"]           │
│ }                                                           │
└─────────────────────────────────────────────────────────────┘
`}</pre>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default function TechAdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Header />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_250px]">
          <main className="space-y-12">
            <WhatIsReplit />
            <SystemOverview />
            <ArchitectureDiagrams />
            <DeploymentGuide />
            <Runbooks />
            <DataModels />
          </main>

          <aside>
            <TableOfContents />
          </aside>
        </div>
      </div>
    </div>
  );
}
