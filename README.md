This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# App Details

## Vendor Due diligence

**The Issue:** Small and Medium-sized Businesses (SMBs) often skip in-depth due diligence when bringing on new vendors. This lack of attention leaves them vulnerable to severe risks, such as fraud, compliance violations, and operational disruption.

**The Opportunity:** The majority of enterprise-class due diligence platforms (e.g., LexisNexis, D&B) are too costly or cumbersome for the average SMB. There is an obvious need for a low-cost, streamlined solution.

**What to Build:**

- Lightweight, user-friendly vendor scoring algorithm based on top risk indicators.
- Automated “red flag” alert system utilizing public data (e.g., bankruptcy filings, sanctions lists).
- Vendor profiles are consolidated, and a thorough onboarding history dashboard is provided.

**Data Point:** According to The World Bank, about 1 out of every 3 companies globally each year experience serious fraud coming from third-party suppliers, citing the global necessity of improved due diligence.

### What Users Do:

1. **Sign up** → Add vendors (manual or CSV import)
2. **Review risk scores** → Act on alerts
3. **Make decisions** → Approve/reject vendors
4. **Export reports** → For compliance/audits

## What Happens Automatically:

### When Vendor Added:

- Queue background risk assessment job
- Run 5 parallel checks:
    1. **Sanctions screening** (OFAC, UN, EU lists)
    2. **Bankruptcy** filings
    3. **Business registry** verification
    4. **Domain analysis** (age, SSL, legitimacy)
    5. **Negative news** screening
- Calculate risk score (0-100)
- Generate alerts if high risk (61+)
- Send notifications

### Scoring:

- Sanctions match: +90 pts → CRITICAL
- Bankruptcy: +60 pts
- Dissolved business: +50 pts
- Negative news: +30 pts
- No website/new domain: +20 pts
- Can't verify: +40 pts

**Result:** Low (0-30), Medium (31-60), High (61+)

### Ongoing Monitoring:

- **Daily**: Sanctions checks
- **Weekly**: News screening
- **Monthly**: Full re-assessment
- Alerts sent when new issues found

## Cost Optimization:

- **Cache everything**: Scores, API responses, dashboard metrics
- Store results, don't recalculate
- Batch operations

- Use local cached sanctions lists

## Architecture:

- **Next.js** → UI + orchestration
- **Python on Vercel** → Risk checks (separate functions per check type)
- **Supabase** → Database + auth + storage
- **Vercel Crons** → Scheduled jobs

## Start Building Order:

1. Auth + user setup
2. Add vendor form → database
3. One simple risk check (sanctions)
4. Dashboard with vendor list
5. Add remaining checks incrementally
6. Alerts system
7. Background monitoring

**Key principle**: User adds vendor → everything else happens automatically in background → user just reviews results.