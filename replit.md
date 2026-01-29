# Better Youth Hub

## Overview

Better Youth Hub is a multi-persona platform designed for a youth development organization (Better Youth). It provides role-based interfaces for three primary user types: Students, Staff/Administrative Users, and Experience-Journey Users (mentors, alumni, partners). The platform supports learning management, student progress tracking, device management, CRM integration, and workforce outcome analytics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side routing with role-based path structure (`/role/student`, `/role/staff`, `/role/experience`)
- **State Management**: TanStack Query (React Query) for server state and API caching
- **UI Components**: Shadcn/ui component library built on Radix UI primitives with Tailwind CSS
- **Styling**: Tailwind CSS v4 with CSS variables for theming, custom design tokens matching Better Youth branding

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful JSON API under `/api` prefix
- **Build System**: Custom build script using esbuild for server bundling, Vite for client

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Key Entities**: Users, Students, Student Goals, Student Skills, Placements, Student Outcomes, Mentors, Support Requests, Devices, Device Allocations

### Authentication
- **Method**: Replit Auth with OpenID Connect
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **User Management**: Automatic user upsert on authentication with role extension table

### Code Organization
```
client/src/          # React frontend
  components/        # UI components including Shadcn/ui
  pages/             # Route components
  hooks/             # Custom React hooks
  lib/               # Utilities and API client
server/              # Express backend
  replit_integrations/auth/  # Authentication setup
shared/              # Shared code between client and server
  schema.ts          # Database schema definitions
  models/            # Type definitions
```

## External Dependencies

### Database
- PostgreSQL database (provisioned via Replit)
- Drizzle ORM for type-safe queries
- Drizzle-Zod for schema validation

### Authentication
- Replit Auth (OpenID Connect)
- Passport.js with OpenID Client strategy
- express-session with PostgreSQL session store

### Frontend Libraries
- Radix UI primitives for accessible components
- TanStack Query for data fetching
- Lucide React for icons
- React Hook Form with Zod validation

### Build Tools
- Vite for development and client bundling
- esbuild for server bundling
- TypeScript for type checking