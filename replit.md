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
- **Replit Development**: Gmail API via Replit connector (automatic OAuth)
- **Railway Production**: Gmail API via OAuth 2.0 credentials (bypasses SMTP port blocking)
- OTP verification codes for passwordless authentication
- Customer notification system
- Template-based email formatting
- Required credentials: GMAIL_USER, GMAIL_OAUTH_CLIENT_ID, GMAIL_OAUTH_CLIENT_SECRET, GMAIL_OAUTH_REFRESH_TOKEN

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
- **Namecheap API**: Domain registration and DNS management
- **DigitalOcean Proxy** (Optional): Static IP proxy for Namecheap API whitelisting ($4/month)

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

- **November 12, 2025**: Completed universal image and background editing system across all client acquisition templates (1-12)
  - Created EditableImage and EditableBackground components for stable image editing
  - All 76 media elements (74 images + 2 hero backgrounds) now use explicit data-content-id attributes
  - Background images (CSS background-image) fully editable with gradient overlay and style prop support
  - Updated EditModeOverlay to detect data-content-type="image" and data-content-type="background"
  - Fixed EditModeOverlay to filter out auto-generated IDs inside background containers (prevents click cycling)
  - Fixed Templates 4 and 8 hero backgrounds: converted from inline styles to EditableBackground component
  - All templates (1-12) converted: T1(11), T2(10), T3(11), T4(9), T5(7), T6(12), T7(2), T8(3), T9(2), T10(8), T11(6), T12(2)
  - Prevents auto-generated ID changes that broke edit persistence
  - Architect approved PASS verdict - ready for Railway production deployment
  - Architecture: Component-driven approach ensures maintainability across all 15 templates

- **November 12, 2025**: Completed Templates 13-15 dynamic content refactoring for visual editing
  - Created shared EditModeOverlay component with auto-generated content-id fallback for reusability
  - Template13: 20 explicit dynamic fields (hero, stats, testimonials, contact) - architect approved
  - Template14: 19 explicit dynamic fields (header, hero, agent profile, contact) - architect approved
  - Template15: 18 explicit dynamic fields (header, hero, stats, contact) - architect approved
  - All agent recruitment templates (13-15) now support visual editing via TemplatePreview editor
  - Fixed Template13 slug matching bug ("Template13" vs "template-13") for proper editor loading
  - Each template uses getValue() helper with proper fallback chain (flexibleContent → content → default)
  - All templates scoped via rootRef for isolated overlay targeting
  - Verified working on 2bitsofinsurance.com (Template13)

- **November 12, 2025**: Fixed Railway production email service with Gmail API OAuth
  - Railway blocks SMTP ports (587/465), causing connection timeouts
  - Implemented Gmail API REST endpoint using OAuth 2.0 (uses HTTPS port 443)
  - Created getGmailClientFromOAuth() function for production environments
  - Replit uses Gmail connector, Railway uses OAuth credentials
  - Email service now works in both development and production
  - Required Railway environment variables: GMAIL_USER, GMAIL_OAUTH_CLIENT_ID, GMAIL_OAUTH_CLIENT_SECRET, GMAIL_OAUTH_REFRESH_TOKEN

- **November 11-12, 2025**: Unified database architecture
  - Eliminated dual-database setup (dev/prod sync issues)
  - Replit now uses Railway production database directly (DATABASE_URL)
  - Single source of truth for all data (templates, users, websites)
  - Fixed Template 13 discrepancies between environments

- **November 9, 2025**: Implemented Cloudflare integration for custom domain SSL/HTTPS support
  - Created cloudflareService.ts for zone and DNS management via Cloudflare API
  - Added idempotent DNS record creation (handles duplicates gracefully)
  - Integrated custom domain routing: visitors to customer domains see their website, not the platform
  - Added public website viewer that detects domain and displays correct template/content
  - Database schema updated with cloudflare_zone_id and cloudflare_nameservers fields
  - Multi-tenant architecture: one Replit deployment serves unlimited customer domains
  - Automatic SSL certificates via Cloudflare's free tier
  - Requires CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID environment variables
  - Full documentation in CLOUDFLARE_SETUP.md

- **November 8, 2025**: Created DigitalOcean proxy solution for Namecheap static IP requirement
  - Built lightweight Node.js proxy server for deployment on DigitalOcean ($4/month droplet)
  - Updated domainService.ts to support optional proxy endpoint via NAMECHEAP_PROXY_URL environment variable
  - Created complete deployment documentation in digitalocean-proxy/ folder
  - Solves Replit's dynamic IP issue that breaks Namecheap API whitelist
  - Proxy provides permanent static IP for Namecheap API access
  - Includes PM2 process management configuration for auto-restart and reliability

- **November 8, 2025**: Implemented FREE domain system with smart pricing
  - Only .com and .net domains allowed (backend TLD validation added)
  - Domains ≤$18 Namecheap cost = FREE for customers (absorbed by business)
  - Premium domains >$18 = Namecheap cost + 40% markup via Stripe checkout
  - Users must own active website subscription before searching/purchasing domains
  - Removed dangerous pricing fallbacks that defaulted to FREE on errors
  - All domain endpoints require active subscription verification
  - UI shows clear "FREE" badges for eligible domains and "Premium" badges with pricing

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