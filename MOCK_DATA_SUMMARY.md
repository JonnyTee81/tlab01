# Mock Data Summary

This document provides an overview of the comprehensive mock financial data now available in the application.

## Data Location

All mock data is centralized in: [`lib/mock-data.ts`](lib/mock-data.ts)

## Data Structures

### Accounts (4 total)
- **Chase Checking**: $8,450.23
- **Ally High Yield Savings**: $25,340.89
- **Chase Freedom Unlimited**: -$1,240.56 (credit card balance)
- **Vanguard 401k**: $142,890.45

**Total Net Worth**: ~$175,440

### Categories

The mock data includes realistic category structure across multiple groups:

#### Income Categories (4)
- Salary
- Freelance
- Investment Income
- Bonus

#### Expense Groups (9)
1. **Housing** - Rent, Utilities, Internet, Home Insurance
2. **Transportation** - Gas, Auto Insurance, Car Maintenance, Public Transit, Uber/Lyft
3. **Food & Dining** - Groceries, Restaurants, Coffee Shops, Takeout
4. **Entertainment** - Streaming Services, Movies, Concerts/Events, Hobbies
5. **Shopping** - Clothing, Electronics, Home Goods, Personal Care
6. **Health & Fitness** - Gym Membership, Health Insurance, Medical, Pharmacy
7. **Savings** - Emergency Fund, Retirement 401k, Investment Account
8. **Bills & Utilities** - Phone, Subscriptions

### Transactions (100+ realistic transactions)

Mock data includes detailed transactions for December 2024:

#### Income Summary
- **Total Income**: $18,185
  - Salary (2 paychecks): $12,900
  - Freelance: $1,500
  - Year-End Bonus: $3,500
  - Investment Income: $285

#### Expense Summary by Category
- **Housing**: ~$2,950
  - Rent: $2,500
  - Utilities: $213
  - Internet: $80
  - Home Insurance: $156

- **Transportation**: ~$580
  - Gas: $208
  - Auto Insurance: $152
  - Car Maintenance: $65
  - Public Transit: $98
  - Uber/Lyft: $55

- **Food & Dining**: ~$1,172
  - Groceries: $646
  - Restaurants: $392
  - Coffee Shops: $47
  - Takeout: $127

- **Entertainment**: ~$406
  - Streaming Services: $50
  - Movies: $39
  - Concerts/Events: $125
  - Hobbies: $210

- **Shopping**: ~$578
  - Clothing: $246
  - Electronics: $180
  - Home Goods: $152
  - Personal Care: $100

- **Health & Fitness**: ~$530
  - Gym Membership: $80
  - Health Insurance: $345
  - Medical: $45
  - Pharmacy: $61

- **Savings**: ~$3,700
  - Emergency Fund: $800
  - Retirement 401k: $2,400
  - Investment Account: $500

- **Bills & Utilities**: ~$144
  - Phone: $72
  - Subscriptions: $72

**Total Expenses**: ~$10,060
**Net Savings**: ~$8,125

## Visualizations Using This Data

### Dashboard Components

1. **Sankey Diagram** ([`components/sankey-diagram.tsx`](components/sankey-diagram.tsx))
   - Dynamically generates from transaction data
   - Shows income sources → expense groups → categories
   - Interactive tooltips with amounts

2. **Spending Breakdown** ([`components/spending-breakdown-chart.tsx`](components/spending-breakdown-chart.tsx))
   - Pie chart of expenses by category group
   - Calculated from real transaction totals

3. **Net Worth Trend** ([`components/net-worth-trend-chart.tsx`](components/net-worth-trend-chart.tsx))
   - Area chart showing 12-month trend
   - Generated data shows realistic growth pattern

4. **Monthly Comparison** ([`components/monthly-comparison-chart.tsx`](components/monthly-comparison-chart.tsx))
   - Bar chart comparing income vs expenses
   - Shows last 4 months with variation

5. **Account Summary**
   - Lists all 4 accounts with balances
   - Calculates total net worth

6. **Metric Cards**
   - Total Income, Expenses, Net Savings
   - Budget usage percentage

## Helper Functions

The mock data file includes utility functions:

```typescript
// Calculate totals by category
calculateCategoryTotals(transactions: Transaction[]): Record<string, number>

// Calculate totals by category group
calculateGroupTotals(transactions: Transaction[]): Record<string, number>

// Get income vs expense summary
getIncomeExpenseSummary(transactions: Transaction[]): {
  totalIncome: number
  totalExpenses: number
  netSavings: number
}
```

## Usage Examples

### In Components

```typescript
import { mockTransactions, getIncomeExpenseSummary } from "@/lib/mock-data";

const summary = getIncomeExpenseSummary(mockTransactions);
// summary.totalIncome = 18185
// summary.totalExpenses = 10060
// summary.netSavings = 8125
```

### Filtering by Type

```typescript
const incomeTransactions = mockTransactions.filter((t) => t.type === "income");
const expenseTransactions = mockTransactions.filter((t) => t.type === "expense");
```

### Grouping by Category

```typescript
const groupTotals = calculateGroupTotals(expenseTransactions);
// groupTotals = {
//   "Housing": 2950,
//   "Transportation": 580,
//   "Food & Dining": 1172,
//   ...
// }
```

## Next Steps for Real Data

To transition from mock data to real Tiller data:

1. **Google Sheets API Integration**
   - Connect to user's Tiller sheet
   - Fetch from Transactions, Categories, Accounts tabs

2. **Data Transformation**
   - Map Tiller columns to our Transaction interface
   - Parse dates and amounts correctly

3. **Caching Strategy**
   - Store fetched data in Supabase
   - Refresh on user request or schedule

4. **Time Period Filtering**
   - Implement actual date filtering for Sankey
   - Support custom date ranges

## Design Iteration Ready

With this comprehensive mock data, you can now:
- ✅ See realistic cash flows in the Sankey diagram
- ✅ View actual spending patterns across categories
- ✅ Experiment with different chart types
- ✅ Test responsive layouts with real data volumes
- ✅ Iterate on colors, gradients, and styling
- ✅ Refine the dashboard layout and card arrangements

Run `npm run dev` to see all visualizations populated with this data!
