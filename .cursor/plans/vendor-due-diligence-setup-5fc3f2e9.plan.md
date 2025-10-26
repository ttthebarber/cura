<!-- 5fc3f2e9-742d-42a2-a8fa-ed820efe33ed e92a1520-fb59-4d36-90c1-47ec2e5941ec -->
# Vendor Due Diligence Platform - Initial Build

## Phase 1: Foundation & Supabase Setup

### 1.1 Supabase Project Setup

- Create new Supabase project at https://supabase.com
- Set up environment variables (`.env.local`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (for server-side operations)
- Install Supabase packages: `@supabase/supabase-js`, `@supabase/ssr`

### 1.2 Database Schema

Create tables in Supabase SQL Editor:

**users table** (handled by Supabase Auth automatically)

**vendors table:**

- id (uuid, primary key)
- user_id (uuid, foreign key to auth.users)
- name (text)
- email (text, optional)
- phone (text, optional)
- website (text, optional)
- address (text, optional)
- business_registration_number (text, optional)
- risk_score (integer, default 0)
- risk_level (text: 'low', 'medium', 'high')
- status (text: 'pending', 'approved', 'rejected')
- last_assessed_at (timestamp)
- created_at (timestamp)
- updated_at (timestamp)

**risk_assessments table:**

- id (uuid, primary key)
- vendor_id (uuid, foreign key to vendors)
- check_type (text: 'sanctions', 'bankruptcy', 'business_registry', 'domain', 'news')
- status (text: 'pending', 'completed', 'failed')
- score (integer)
- findings (jsonb)
- checked_at (timestamp)
- created_at (timestamp)

**alerts table:**

- id (uuid, primary key)
- vendor_id (uuid, foreign key to vendors)
- user_id (uuid, foreign key to auth.users)
- severity (text: 'low', 'medium', 'high', 'critical')
- title (text)
- message (text)
- is_read (boolean, default false)
- created_at (timestamp)

Enable Row Level Security (RLS) policies for all tables.

## Phase 2: Authentication

### 2.1 Supabase Auth Integration

- Create `lib/supabase/client.ts` for client-side Supabase client
- Create `lib/supabase/server.ts` for server-side Supabase client
- Create `lib/supabase/middleware.ts` for auth middleware

### 2.2 Auth Pages

- `/app/(auth)/login/page.tsx` - Email/password login
- `/app/(auth)/signup/page.tsx` - User registration
- `/app/(auth)/layout.tsx` - Auth layout (centered, public)

### 2.3 Auth Components

- `components/auth/login-form.tsx` - Login form with validation
- `components/auth/signup-form.tsx` - Signup form with validation

### 2.4 Protected Routes

- Create middleware to protect dashboard routes
- Redirect unauthenticated users to login

## Phase 3: Vendor Management

### 3.1 Dashboard Layout

- `/app/(dashboard)/layout.tsx` - Main dashboard layout with sidebar navigation
- `/app/(dashboard)/dashboard/page.tsx` - Dashboard home with vendor statistics
- Navigation items: Dashboard, Vendors, Alerts, Settings

### 3.2 Add Vendor Form

- `/app/(dashboard)/vendors/add/page.tsx` - Add vendor page
- `components/vendors/vendor-form.tsx` - Form component using React Hook Form + Zod
- Validation schema for vendor data
- Submit triggers background job queue

### 3.3 Vendor List & Details

- `/app/(dashboard)/vendors/page.tsx` - Vendors list with filtering/sorting
- `/app/(dashboard)/vendors/[id]/page.tsx` - Vendor detail page with risk breakdown
- `components/vendors/vendor-card.tsx` - Vendor summary card
- `components/vendors/vendor-table.tsx` - Data table with status badges

## Phase 4: Python Risk Check Infrastructure

### 4.1 Vercel Python Setup

- Create `/api/risk-checks/` directory structure
- Install Python dependencies: create `requirements.txt`
- Set up Vercel configuration for Python functions in `vercel.json`

### 4.2 Sanctions Screening (First Check)

- `/api/risk-checks/sanctions.py` - Python serverless function
- Use cached OFAC/UN/EU sanctions lists (store in Supabase Storage)
- Fuzzy name matching logic
- Return JSON response with score and findings
- Score: +90 if match found (CRITICAL)

### 4.3 Risk Check Orchestrator

- `/app/api/vendors/assess/route.ts` - Next.js API route
- Receives vendor data after form submission
- Queues sanctions check (call Python function)
- Updates `risk_assessments` table
- Calculates total risk score
- Updates vendor record with final score/level
- Generates alerts if high risk (61+)

### 4.4 Sanctions List Management

- Upload initial cached sanctions lists to Supabase Storage
- Create utility script to refresh lists monthly
- Lists: OFAC SDN, UN Sanctions, EU Sanctions

## Phase 5: Dashboard & Visualization

### 5.1 Dashboard Components

- `components/dashboard/stats-cards.tsx` - Total vendors, high-risk count, pending assessments
- `components/dashboard/recent-alerts.tsx` - Latest alerts widget
- `components/dashboard/risk-distribution-chart.tsx` - Chart showing risk levels (using recharts)

### 5.2 Vendor Detail Components

- `components/vendors/risk-score-badge.tsx` - Color-coded risk score display
- `components/vendors/assessment-timeline.tsx` - Timeline of risk checks
- `components/vendors/findings-list.tsx` - Detailed findings from each check

## Phase 6: Type Safety & API Layer

### 6.1 TypeScript Types

- `types/database.ts` - Supabase generated types
- `types/vendor.ts` - Vendor and risk assessment types
- `types/alert.ts` - Alert types

### 6.2 API Utilities

- `lib/api/vendors.ts` - Vendor CRUD operations
- `lib/api/assessments.ts` - Risk assessment queries
- `lib/api/alerts.ts` - Alert management

## Key Files to Create/Modify

**Configuration:**

- `.env.local` - Environment variables
- `vercel.json` - Python function config
- `requirements.txt` - Python dependencies

**Core Application:**

- `middleware.ts` - Auth middleware
- `app/(auth)/login/page.tsx`
- `app/(dashboard)/layout.tsx`
- `app/(dashboard)/vendors/add/page.tsx`
- `app/(dashboard)/vendors/[id]/page.tsx`

**API Routes:**

- `app/api/vendors/assess/route.ts`
- `api/risk-checks/sanctions.py`

**Supabase:**

- `lib/supabase/client.ts`
- `lib/supabase/server.ts`

## Notes

- Follow README build order: Auth → Vendor form → Sanctions check → Dashboard
- All risk checks run in background; user sees results asynchronously
- Cache API responses to minimize costs
- Use Supabase Realtime for live updates on assessment completion
- Remaining checks (bankruptcy, business registry, domain, news) will be added incrementally after core is working
- Background monitoring (daily/weekly/monthly) will be implemented in later phase using Vercel Crons

### To-dos

- [ ] Set up Supabase project, install packages, configure environment variables
- [ ] Create database tables (vendors, risk_assessments, alerts) with RLS policies
- [ ] Implement Supabase Auth with login/signup pages and middleware
- [ ] Build add vendor form with validation and database integration
- [ ] Create Python sanctions screening function and infrastructure
- [ ] Build risk assessment orchestrator API route
- [ ] Create dashboard layout with vendor list and detail pages
- [ ] Add statistics cards, charts, and risk score visualizations