# Product Requirements Document: Personal Finance Dashboard

## Overview
A web application that transforms Tiller Google Sheets data into interactive financial visualizations, featuring a Sankey diagram for cash flow analysis.

---

## Business Requirements

### Problem Statement
Users with Tiller-managed Google Sheets need an intuitive way to visualize their personal finance data, particularly cash flow patterns, without manual chart creation.

### Value Proposition
- **Automated Visualization**: Transform raw spreadsheet data into professional financial dashboards
- **Cash Flow Clarity**: Multi-level Sankey diagram showing income → expense group → category flows
- **Seamless Integration**: Direct Google Sheets connectivity with minimal setup

### Target Users
Personal finance enthusiasts and Tiller users who want visual insights into spending patterns and cash flow.

### MVP Scope
1. Marketing homepage with product showcase
2. Google Account authentication and sign-in
3. Dashboard configuration (Google Sheet selection)
4. Cash Flow Sankey diagram (3-4 levels: Income → Expense Groups → Categories → Sub-categories)
5. Extensible dashboard layout for future features

---

## Technical Requirements

### Tech Stack
- **Frontend**: Next.js 14+, TypeScript, Shadcn UI components
- **Authentication**: Google OAuth 2.0 (Google Sheets read-only access)
- **Database**: Supabase (user accounts, configurations)
- **Hosting**: Vercel
- **Data Visualization**: Recharts or D3.js for Sankey diagrams

### Data Structure (Tiller Google Sheets)
Required sheets for MVP:
- **Accounts**: Account information
- **Balance History**: Historical balances
- **Categories**: Expense/income categorization hierarchy
- **Transactions**: Raw transaction data

### Key Features

#### 1. Homepage
- Hero section with value proposition
- Feature highlights with visual examples
- "Sign Up with Google" CTA button
- Modern, sleek design (dark theme with teal/blue/purple accents)

#### 2. Authentication
- Google OAuth sign-in/sign-up flow
- Request Google Sheets read-only scope
- Create user account in Supabase on first login

#### 3. Dashboard Configuration
- Google Drive file picker integration
- Manual sheet selection from user's Drive
- Validate sheet structure (check for Accounts, Transactions, Categories, Balance History tabs)
- Store sheet ID and configuration (local storage for MVP, Supabase enhancement)

#### 4. Cash Flow Sankey Diagram
- **Time Period Selector**: Current Month (default), Last Month, Last 30 Days, Custom Range
- **Flow Levels**:
  - Level 1: Income sources (from Transactions)
  - Level 2: Expense groups (from Categories)
  - Level 3: Specific categories
  - Level 4: Sub-categories (optional)
- **Mock Data**: Use realistic sample data for initial development
- **Interactive**: Hover tooltips showing amounts and percentages

#### 5. Dashboard Layout
- Modular card-based design (inspired by uploaded screenshots)
- Placeholder sections for future features:
  - Net Worth Trend
  - Spending Breakdown (donut/pie chart)
  - Monthly Comparison
  - Account Summary
- Transparent, glassmorphic card styling with teal/blue gradient accents

### Design System
- **Color Palette**: 
  - Dark Mode (default): Deep dark navy/black base (#0a0a0f, #0f172a), neon/vibrant accents (teal #14b8a6, cyan #06b6d4, blue #3b82f6, purple #8b5cf6, pink #ec4899)
  - Light Mode: Clean white/light gray base, saturated but professional accent colors
  - **Design Phase**: Explore 2-3 color theme variations with different vibrant accent combinations
- **Typography**: Clean, modern sans-serif (Inter or similar)
- **Components**: Shadcn UI for consistency
- **Layout**: Responsive grid, mobile-friendly
- **Visual Style**: Semi-transparent cards, subtle gradients, clean data visualizations with vibrant, eye-catching colors
- **Theme Toggle**: Dark/light mode switcher in navigation (dark mode default)

---

## User Flows

### First-Time User
1. Land on homepage → See value proposition
2. Click "Sign Up with Google" → OAuth consent
3. Redirect to dashboard → Configuration prompt
4. Select Google Sheet from Drive → Validate structure
5. View dashboard with mock data → Explore Sankey diagram

### Returning User
1. Click "Sign In with Google" → OAuth
2. Load saved configuration (or reconfigure)
3. View dashboard with real/mock data

---

## Success Criteria (MVP)
- [ ] User can authenticate with Google Account
- [ ] User can select and connect a Google Sheet
- [ ] Cash Flow Sankey diagram renders with mock data
- [ ] Dashboard layout is responsive and visually polished
- [ ] Time period selector changes Sankey data range
- [ ] Configuration is saved (local storage minimum)

---

## Future Enhancements (Post-MVP)
- Real data integration from Google Sheets API
- Additional visualizations (net worth trends, spending breakdowns, budget tracking)
- Persistent configuration storage in Supabase
- Multiple sheet support
- Data refresh scheduling
- Export/share reports
- Print-optimized layouts and report generation
- Mobile app

---

## Development Phases

### Phase 0: Design Prototyping
- Generate 2-3 dashboard design prototypes with example diagrams
- Explore color theme variations (deep dark backgrounds with neon/vibrant accents)
- Test different visualization styles for Sankey and future chart types
- Finalize design system and component patterns
- **Note**: Start here before any code development

### Phase 1: Frontend Foundation
- Homepage design and layout
- Authentication UI and flow
- Dashboard shell with navigation
- Dark mode / Light mode toggle implementation (default: dark)

### Phase 2: Configuration & Mock Data
- Google Drive file picker integration
- Mock data generation
- Dashboard layout with placeholder cards

### Phase 3: Sankey Diagram
- Sankey visualization component
- Time period selector
- Interactive features (tooltips, filtering)

### Phase 4: Polish & Testing
- Responsive design refinements
- User testing and feedback
- Performance optimization
- Deployment to Vercel

---

**Document Version**: 1.0  
**Last Updated**: December 28, 2024  
**Next Review**: Post-MVP launch
