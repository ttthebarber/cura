# Cura - Vendor Due Diligence Platform Setup Guide

## 🚀 Quick Start

### 1. Supabase Setup

1. **Create Supabase Project**
   - Go to [https://supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and anon key

2. **Run Database Schema**
   - In your Supabase dashboard, go to SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Execute the SQL to create all tables and policies

3. **Configure Environment Variables**
   - Copy `.env.local` and update with your Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

## 📁 Project Structure

```
cura/
├── app/
│   ├── (auth)/                 # Authentication pages
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/            # Protected dashboard pages
│   │   ├── dashboard/page.tsx  # Main dashboard
│   │   ├── vendors/            # Vendor management
│   │   ├── alerts/page.tsx     # Alerts management
│   │   ├── settings/page.tsx   # User settings
│   │   └── layout.tsx
│   ├── api/
│   │   └── vendors/
│   │       └── assess/route.ts # Risk assessment API
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── api/
│   └── risk-checks/
│       └── sanctions.py        # Python sanctions screening
├── components/
│   ├── auth/                   # Authentication components
│   ├── dashboard/             # Dashboard components
│   ├── vendors/               # Vendor-related components
│   ├── alerts/                # Alert components
│   └── ui/                    # shadcn/ui components
├── lib/
│   ├── supabase/              # Supabase client configuration
│   └── utils.ts
├── types/
│   ├── database.ts            # Supabase types
│   └── vendor.ts              # Vendor types
├── middleware.ts              # Auth middleware
├── vercel.json                # Vercel configuration
├── requirements.txt           # Python dependencies
└── supabase-schema.sql        # Database schema
```

## 🔧 Features Implemented

### ✅ Authentication
- Supabase Auth integration
- Login/Signup pages with validation
- Protected routes with middleware
- User session management

### ✅ Vendor Management
- Add vendor form with validation
- Vendor list with filtering
- Detailed vendor view
- Risk score visualization

### ✅ Risk Assessment
- Python sanctions screening function
- Automated risk scoring (0-100)
- Risk level classification (low/medium/high)
- Background assessment processing

### ✅ Dashboard
- Statistics cards (total vendors, pending, high risk, approved)
- Recent alerts widget
- Risk distribution chart
- Real-time data updates

### ✅ Alerts System
- Automated alert generation for high-risk vendors
- Alert severity levels (low/medium/high/critical)
- Alert management interface
- Unread alert tracking

### ✅ Settings
- User account management
- Notification preferences
- Security settings
- Data export options

## 🎯 Risk Scoring System

The platform uses a comprehensive scoring system:

- **Sanctions Match**: +90 points (CRITICAL)
- **Bankruptcy**: +60 points
- **Dissolved Business**: +50 points
- **Negative News**: +30 points
- **No Website/New Domain**: +20 points
- **Cannot Verify**: +40 points

**Risk Levels:**
- **Low**: 0-30 points
- **Medium**: 31-60 points
- **High**: 61+ points

## 🔄 Next Steps

The foundation is complete! To continue building:

1. **Add Remaining Risk Checks**:
   - Bankruptcy filings check
   - Business registry verification
   - Domain analysis
   - Negative news screening

2. **Background Monitoring**:
   - Daily sanctions checks
   - Weekly news screening
   - Monthly full re-assessment

3. **Enhanced Features**:
   - CSV import functionality
   - Report export
   - Email notifications
   - Advanced filtering

4. **Production Deployment**:
   - Deploy to Vercel
   - Set up production Supabase
   - Configure custom domain
   - Set up monitoring

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📚 Key Technologies

- **Frontend**: Next.js 16, React 19, TypeScript
- **UI**: shadcn/ui, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Risk Checks**: Python serverless functions
- **Deployment**: Vercel
- **Charts**: Recharts

## 🔐 Security Features

- Row Level Security (RLS) policies
- User data isolation
- Secure API routes
- Input validation with Zod
- CSRF protection

---

**Ready to start!** 🎉

Your vendor due diligence platform is now ready for development and testing. The core infrastructure is in place, and you can begin adding vendors and testing the risk assessment workflow.
