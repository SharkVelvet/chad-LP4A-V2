# Professional Landing Pages for Insurance Agents

## Overview
Professional Landing Pages for Insurance Agents is a full-stack web application designed for insurance professionals to create and manage their online presence. The platform offers a streamlined process for selecting and customizing website templates, managing content, and setting up subscription-based websites. It integrates payment processing and email automation to provide a comprehensive solution for agents looking to establish a professional digital footprint. The project aims to empower insurance agents with easy-to-use tools to build effective landing pages, facilitating client acquisition and agent recruitment.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **State Management**: TanStack Query (React Query)
- **UI Components**: Radix UI with shadcn/ui design system
- **Styling**: Tailwind CSS with custom theming
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **Database ORM**: Drizzle with PostgreSQL
- **Authentication**: Passport.js (local strategy, express-session)
- **Session Storage**: PostgreSQL-backed sessions (connect-pg-simple)

### Database
- **Primary Database**: PostgreSQL (Neon serverless)
- **Schema Management**: Drizzle Kit for migrations
- **Key Tables**: `locations`, `users`, `templates`, `websites`, `website_content`, `form_submissions`

### Core Features
- **Authentication & Authorization**: Password-protected access, role-based permissions (employee/admin), session-based authentication.
- **Template System**: Pre-built, customizable, and responsive website templates with live preview.
- **Payment Processing**: Stripe integration for subscription billing, customer management, and secure payment forms.
- **Content Management**: Dynamic website content editing, business information collection, domain preference, and media asset management.
- **Email Automation**: Gmail API integration (via Replit connector or OAuth 2.0 for production) for OTP verification and customer notifications.
- **Domain Management**: 
  - **Name.com API**: Domain registration (.com and .net domains)
  - **Cloudflare DNS**: DNS management (proxied A records for SSL/TLS)
  - **Caddy Reverse Proxy**: Deployed on DigitalOcean at 134.199.194.110 that:
    - Handles Host header rewriting (Replit requirement)
    - Accepts UNLIMITED custom domains (no whitelist limits)
    - Automatic SSL certificate provisioning via Let's Encrypt on-demand TLS
    - API-based allowlist management at port 3001
    - Eliminates need for Cloudflare Workers or Railway domain limits
  - **Full DNS Automation**: Single-button auto-configuration that:
    - Automatically registers domain with Name.com
    - Automatically creates Cloudflare zone
    - Automatically configures DNS A records (@ and www) pointing to Caddy proxy IP
    - Automatically adds domain to Caddy allowlist for SSL provisioning
    - Automatically sets nameservers to Cloudflare
    - Zero manual steps required - completely automated
  - **FREE Domain System**: .com and .net domains included free with subscription
  - **Traffic Flow**: Custom Domain → Cloudflare (DNS/proxy) → Caddy Proxy (SSL + Host rewrite) → Replit App
- **Deployment**: 
  - **Main App**: Deployed on Replit at `landing-pages-for-agents-v-2-sharkvelvet.replit.app`
  - **Caddy Proxy**: Caddy server deployed on DigitalOcean (134.199.194.110) with management API on port 3001
- **User Management**: Manual user creation for super admins with optional free website provisioning.
- **Visual Editing**: Universal image and background editing system, and dynamic content refactoring for visual editing across various templates.

## External Dependencies

### Core Services
- **Neon Database**: PostgreSQL hosting.
- **Stripe**: Payment processing and subscription management.
- **Gmail API**: Email delivery for OTP and notifications.
- **Name.com API**: Domain registration (.com and .net).
- **Cloudflare API**: DNS management and proxying.
- **DigitalOcean**: Hosts Caddy reverse proxy at 134.199.194.110 for unlimited domain support and automatic SSL.

### Development & UI Libraries
- **Vite**: Build tooling.
- **Drizzle**: Database ORM.
- **TypeScript**: Language.
- **Radix UI**: Accessible UI components.
- **Tailwind CSS**: Styling framework.
- **Lucide React**: Icon library.