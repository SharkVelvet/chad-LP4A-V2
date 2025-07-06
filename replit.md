# Plan|right Website Builder

## Overview

Plan|right is a full-stack web application for creating and managing professional splash pages and websites. The system provides a streamlined onboarding process for customers to select templates, customize content, and set up subscription-based websites. Built with React, Express, and PostgreSQL, it integrates with Stripe for payment processing and includes email automation for customer communications.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **UI Components**: Radix UI with shadcn/ui design system
- **Styling**: Tailwind CSS with custom theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **Database ORM**: Drizzle with PostgreSQL
- **Authentication**: Passport.js with local strategy and express-session
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple

### Database Architecture
- **Primary Database**: PostgreSQL (Neon serverless)
- **Schema Management**: Drizzle Kit for migrations
- **Key Tables**:
  - `locations` - Business locations/franchises
  - `users` - System users with role-based access
  - `templates` - Website templates catalog
  - `websites` - Customer website instances
  - `website_content` - Customizable content for websites
  - `form_submissions` - Contact form submissions

## Key Components

### Authentication & Authorization
- Password-protected access for template selection flow
- User authentication for admin dashboard access
- Role-based permissions (employee/admin roles)
- Session-based authentication with secure cookies

### Template System
- Pre-built website templates with preview functionality
- Template categorization and filtering
- Live preview system with customizable content
- Responsive design support

### Payment Processing
- Stripe integration for subscription billing
- Customer creation and subscription management
- Secure payment form with Stripe Elements
- Automated receipt and confirmation emails

### Content Management
- Dynamic website content editing
- Business information collection (name, contact, etc.)
- Domain preference collection
- Image and media asset management

### Email Automation
- Customer notification system
- Receipt generation and delivery
- SMTP configuration for email delivery
- Template-based email formatting

## Data Flow

1. **Customer Onboarding**:
   - Password validation → Template selection → Content customization → Pricing agreement → Payment processing → Success confirmation

2. **Website Creation**:
   - Template selection → Content collection → Domain preferences → Subscription setup → Website deployment

3. **Admin Management**:
   - User authentication → Dashboard access → Website management → Content editing → Form submission handling

## External Dependencies

### Core Services
- **Neon Database**: PostgreSQL hosting with serverless architecture
- **Stripe**: Payment processing and subscription management
- **SMTP Service**: Email delivery (configurable provider)

### Development Tools
- **Vite**: Build tooling and development server
- **Drizzle**: Database ORM and schema management
- **TypeScript**: Type safety and development experience

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Icon library

## Deployment Strategy

### Development Environment
- Replit integration with live reload
- Environment variables for service configuration
- PostgreSQL module provisioning
- Port 5000 for local development

### Production Build
- Vite build process for client-side assets
- ESBuild bundling for server-side code
- Static asset serving from dist/public
- Node.js production server

### Environment Configuration
- Stripe API keys (public/secret)
- Database connection URL
- SMTP credentials
- Session secrets

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- **July 6, 2025**: Applied deployment fixes for Replit Deployments
  - Fixed server host binding to listen on all interfaces (0.0.0.0)
  - Added production environment detection and NODE_ENV handling
  - Improved error handling for server startup failures
  - Added graceful shutdown handling for SIGTERM/SIGINT
  - Enhanced port configuration for deployment compatibility

## Changelog

Changelog:
- June 26, 2025. Initial setup
- July 6, 2025. Deployment configuration fixes applied