# Professional Landing Pages for Insurance Agents

## Overview

Professional Landing Pages for Insurance Agents is a full-stack web application for creating and managing professional splash pages and websites. The system provides a streamlined onboarding process for customers to select templates, customize content, and set up subscription-based websites. Built with React, Express, and PostgreSQL, it integrates with Stripe for payment processing and includes email automation for customer communications.

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

- **August 21, 2025**: Enhanced Template 9 with life and health insurance focus and improved testimonials section
  - Made agent photo 25% larger for better visual impact (384x384px circle)
  - Changed all quote-related buttons to "Contact Us" with smooth scroll to contact section
  - Removed quick quote form from contact section and centered contact information
  - Added 3-column testimonials section between CTA and contact sections with authentic client stories
  - Updated template preview image to show actual "Protecting families across America" screenshot
  - Fixed static file serving issues for images with spaces in filenames by creating web-friendly copies

- **August 18, 2025**: Successfully implemented animated template showcase with authentic insurance agent website screenshots
  - Fixed static file serving issues by creating filename-friendly copies of uploaded images
  - Resolved URL encoding problems with spaces in filenames that caused broken image links
  - Added custom template card styling with rounded corners, shadows, and hover effects
  - Implemented smooth 60-second animation timing with seamless infinite scroll across three rows
  - Used authentic Cameron Smith insurance agent website showing professional profile and credentials
  - Applied alternating directional animations (left-to-right, right-to-left patterns)

- **August 18, 2025**: Restructured entire site architecture from single-purpose to dual-purpose application
  - Converted homepage to simple "fork in the road" choice interface between two focused paths
  - Created new "Get Clients" page (/get-clients) focused 100% on client acquisition
  - Created new "Recruit Agents" page (/recruit-agents) focused 100% on agent recruitment
  - Updated header navigation to include "Get Clients" and "Recruit Agents" menu items
  - Maintained consistent purple branding (#6458AF) across main application interface
  - Applied focused messaging and benefits for each distinct user journey
  - Updated all page titles and SEO for new dual-purpose structure

- **August 5, 2025**: Updated browser tab titles across all pages
  - Changed from "Plan|right" to "Professional Landing Pages for Insurance Agents"
  - Added proper page titles for homepage, blog listing, and individual blog posts  
  - Updated dashboard branding to match new title format
  - Ensured consistent branding throughout the application

- **August 5, 2025**: Completed comprehensive blog system with SEO optimization
  - Added 5 professional blog posts with ~1200 words each targeting insurance agents
  - Implemented "Read Me This" audio reading feature with enhanced voice selection
  - Added complete SEO implementation with meta tags, Open Graph, and keyword optimization
  - Created blog listing page (/blog) and individual post pages (/blog/:slug)
  - Applied purple branding (#6458AF) to all blog components and "Read More" buttons
  - Fixed React Hooks ordering issues and content loading errors
  - Added state-specific off-screen keywords for local SEO targeting

- **July 27, 2025**: Updated branding and removed lead capture functionality
  - Applied consistent purple branding (#6458AF) across all components
  - Made pricing page checkboxes larger and purple
  - Removed testimonials section from homepage
  - Removed form submission routes from server/routes.ts
  - Removed form submission storage methods from server/storage.ts
  - Removed form submissions tab from dashboard
  - Updated homepage messaging to focus on professional website creation instead of lead generation
  - Changed service branding and messaging throughout the application

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