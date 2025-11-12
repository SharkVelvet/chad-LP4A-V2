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
- **Domain Management**: Cloudflare integration for custom domain SSL/HTTPS, DNS management, and multi-tenant architecture support. Namecheap API integration for domain search and purchase, including a "FREE" domain system for eligible domains.
- **Deployment**: Replit integration for development, Vite/ESBuild for production builds, Node.js production server, and environment variable configuration.
- **User Management**: Manual user creation for super admins with optional free website provisioning.
- **Visual Editing**: Universal image and background editing system, and dynamic content refactoring for visual editing across various templates.

## External Dependencies

### Core Services
- **Neon Database**: PostgreSQL hosting.
- **Stripe**: Payment processing and subscription management.
- **Gmail API**: Email delivery for OTP and notifications.
- **Namecheap API**: Domain registration and DNS management.
- **Cloudflare API**: DNS and SSL management for custom domains.
- **DigitalOcean**: Optional proxy for Namecheap API static IP whitelisting.

### Development & UI Libraries
- **Vite**: Build tooling.
- **Drizzle**: Database ORM.
- **TypeScript**: Language.
- **Radix UI**: Accessible UI components.
- **Tailwind CSS**: Styling framework.
- **Lucide React**: Icon library.