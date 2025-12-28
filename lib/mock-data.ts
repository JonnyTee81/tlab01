// Mock transaction data for Finance Flow dashboard
// Based on Tiller Google Sheets structure

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  categoryGroup: string;
  amount: number;
  account: string;
  type: "income" | "expense";
}

export interface Account {
  id: string;
  name: string;
  type: "checking" | "savings" | "credit" | "investment";
  balance: number;
  institution: string;
}

export interface Category {
  name: string;
  group: string;
  type: "income" | "expense";
  budget?: number;
}

// Account data
export const mockAccounts: Account[] = [
  {
    id: "acc_1",
    name: "Chase Checking",
    type: "checking",
    balance: 8450.23,
    institution: "Chase",
  },
  {
    id: "acc_2",
    name: "Ally High Yield Savings",
    type: "savings",
    balance: 25340.89,
    institution: "Ally Bank",
  },
  {
    id: "acc_3",
    name: "Chase Freedom Unlimited",
    type: "credit",
    balance: -1240.56,
    institution: "Chase",
  },
  {
    id: "acc_4",
    name: "Vanguard 401k",
    type: "investment",
    balance: 142890.45,
    institution: "Vanguard",
  },
];

// Category structure
export const mockCategories: Category[] = [
  // Income categories
  { name: "Salary", group: "Income", type: "income" },
  { name: "Freelance", group: "Income", type: "income" },
  { name: "Investment Income", group: "Income", type: "income" },
  { name: "Bonus", group: "Income", type: "income" },

  // Housing expenses
  { name: "Rent", group: "Housing", type: "expense", budget: 2500 },
  { name: "Utilities", group: "Housing", type: "expense", budget: 250 },
  { name: "Internet", group: "Housing", type: "expense", budget: 80 },
  { name: "Home Insurance", group: "Housing", type: "expense", budget: 150 },

  // Transportation
  { name: "Gas", group: "Transportation", type: "expense", budget: 200 },
  { name: "Auto Insurance", group: "Transportation", type: "expense", budget: 150 },
  { name: "Car Maintenance", group: "Transportation", type: "expense", budget: 100 },
  { name: "Public Transit", group: "Transportation", type: "expense", budget: 100 },
  { name: "Uber/Lyft", group: "Transportation", type: "expense", budget: 80 },

  // Food & Dining
  { name: "Groceries", group: "Food & Dining", type: "expense", budget: 600 },
  { name: "Restaurants", group: "Food & Dining", type: "expense", budget: 400 },
  { name: "Coffee Shops", group: "Food & Dining", type: "expense", budget: 100 },
  { name: "Takeout", group: "Food & Dining", type: "expense", budget: 200 },

  // Entertainment
  { name: "Streaming Services", group: "Entertainment", type: "expense", budget: 50 },
  { name: "Movies", group: "Entertainment", type: "expense", budget: 40 },
  { name: "Concerts/Events", group: "Entertainment", type: "expense", budget: 100 },
  { name: "Hobbies", group: "Entertainment", type: "expense", budget: 150 },

  // Shopping
  { name: "Clothing", group: "Shopping", type: "expense", budget: 200 },
  { name: "Electronics", group: "Shopping", type: "expense", budget: 150 },
  { name: "Home Goods", group: "Shopping", type: "expense", budget: 100 },
  { name: "Personal Care", group: "Shopping", type: "expense", budget: 80 },

  // Health & Fitness
  { name: "Gym Membership", group: "Health & Fitness", type: "expense", budget: 80 },
  { name: "Health Insurance", group: "Health & Fitness", type: "expense", budget: 350 },
  { name: "Medical", group: "Health & Fitness", type: "expense", budget: 100 },
  { name: "Pharmacy", group: "Health & Fitness", type: "expense", budget: 50 },

  // Savings & Investments
  { name: "Emergency Fund", group: "Savings", type: "expense", budget: 800 },
  { name: "Retirement 401k", group: "Savings", type: "expense", budget: 1200 },
  { name: "Investment Account", group: "Savings", type: "expense", budget: 500 },

  // Bills & Utilities
  { name: "Phone", group: "Bills & Utilities", type: "expense", budget: 70 },
  { name: "Subscriptions", group: "Bills & Utilities", type: "expense", budget: 40 },
];

// Generate transactions for the current month
export const mockTransactions: Transaction[] = [
  // Income transactions
  {
    id: "txn_001",
    date: "2024-12-01",
    description: "Paycheck - ACME Corp",
    category: "Salary",
    categoryGroup: "Income",
    amount: 6450.0,
    account: "Chase Checking",
    type: "income",
  },
  {
    id: "txn_002",
    date: "2024-12-05",
    description: "Freelance Project - Client A",
    category: "Freelance",
    categoryGroup: "Income",
    amount: 1500.0,
    account: "Chase Checking",
    type: "income",
  },
  {
    id: "txn_003",
    date: "2024-12-10",
    description: "Dividend Payment - Vanguard",
    category: "Investment Income",
    categoryGroup: "Income",
    amount: 285.0,
    account: "Vanguard 401k",
    type: "income",
  },
  {
    id: "txn_004",
    date: "2024-12-15",
    description: "Paycheck - ACME Corp",
    category: "Salary",
    categoryGroup: "Income",
    amount: 6450.0,
    account: "Chase Checking",
    type: "income",
  },
  {
    id: "txn_005",
    date: "2024-12-20",
    description: "Year-End Bonus",
    category: "Bonus",
    categoryGroup: "Income",
    amount: 3500.0,
    account: "Chase Checking",
    type: "income",
  },

  // Housing expenses
  {
    id: "txn_100",
    date: "2024-12-01",
    description: "Rent Payment - Skyline Apartments",
    category: "Rent",
    categoryGroup: "Housing",
    amount: -2500.0,
    account: "Chase Checking",
    type: "expense",
  },
  {
    id: "txn_101",
    date: "2024-12-03",
    description: "Electric Bill - PG&E",
    category: "Utilities",
    categoryGroup: "Housing",
    amount: -145.23,
    account: "Chase Checking",
    type: "expense",
  },
  {
    id: "txn_102",
    date: "2024-12-05",
    description: "Water Bill",
    category: "Utilities",
    categoryGroup: "Housing",
    amount: -68.45,
    account: "Chase Checking",
    type: "expense",
  },
  {
    id: "txn_103",
    date: "2024-12-08",
    description: "Comcast Internet",
    category: "Internet",
    categoryGroup: "Housing",
    amount: -79.99,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_104",
    date: "2024-12-15",
    description: "Home Insurance",
    category: "Home Insurance",
    categoryGroup: "Housing",
    amount: -156.0,
    account: "Chase Checking",
    type: "expense",
  },

  // Transportation expenses
  {
    id: "txn_200",
    date: "2024-12-02",
    description: "Shell Gas Station",
    category: "Gas",
    categoryGroup: "Transportation",
    amount: -52.34,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_201",
    date: "2024-12-07",
    description: "Chevron Gas",
    category: "Gas",
    categoryGroup: "Transportation",
    amount: -48.92,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_202",
    date: "2024-12-12",
    description: "Mobil Gas Station",
    category: "Gas",
    categoryGroup: "Transportation",
    amount: -55.67,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_203",
    date: "2024-12-18",
    description: "Shell Gas Station",
    category: "Gas",
    categoryGroup: "Transportation",
    amount: -51.23,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_204",
    date: "2024-12-01",
    description: "Auto Insurance - Geico",
    category: "Auto Insurance",
    categoryGroup: "Transportation",
    amount: -152.0,
    account: "Chase Checking",
    type: "expense",
  },
  {
    id: "txn_205",
    date: "2024-12-10",
    description: "Oil Change - Jiffy Lube",
    category: "Car Maintenance",
    categoryGroup: "Transportation",
    amount: -65.0,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_206",
    date: "2024-12-04",
    description: "BART Monthly Pass",
    category: "Public Transit",
    categoryGroup: "Transportation",
    amount: -98.0,
    account: "Chase Checking",
    type: "expense",
  },
  {
    id: "txn_207",
    date: "2024-12-14",
    description: "Uber Trip",
    category: "Uber/Lyft",
    categoryGroup: "Transportation",
    amount: -23.45,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_208",
    date: "2024-12-20",
    description: "Lyft Trip",
    category: "Uber/Lyft",
    categoryGroup: "Transportation",
    amount: -31.87,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },

  // Food & Dining expenses
  {
    id: "txn_300",
    date: "2024-12-02",
    description: "Whole Foods",
    category: "Groceries",
    categoryGroup: "Food & Dining",
    amount: -125.67,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_301",
    date: "2024-12-06",
    description: "Trader Joe's",
    category: "Groceries",
    categoryGroup: "Food & Dining",
    amount: -87.34,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_302",
    date: "2024-12-09",
    description: "Safeway",
    category: "Groceries",
    categoryGroup: "Food & Dining",
    amount: -145.89,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_303",
    date: "2024-12-13",
    description: "Whole Foods",
    category: "Groceries",
    categoryGroup: "Food & Dining",
    amount: -98.45,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_304",
    date: "2024-12-17",
    description: "Trader Joe's",
    category: "Groceries",
    categoryGroup: "Food & Dining",
    amount: -76.23,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_305",
    date: "2024-12-21",
    description: "Safeway",
    category: "Groceries",
    categoryGroup: "Food & Dining",
    amount: -112.56,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_310",
    date: "2024-12-03",
    description: "Chipotle",
    category: "Restaurants",
    categoryGroup: "Food & Dining",
    amount: -15.67,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_311",
    date: "2024-12-05",
    description: "The Cheesecake Factory",
    category: "Restaurants",
    categoryGroup: "Food & Dining",
    amount: -78.45,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_312",
    date: "2024-12-08",
    description: "Olive Garden",
    category: "Restaurants",
    categoryGroup: "Food & Dining",
    amount: -52.34,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_313",
    date: "2024-12-11",
    description: "Panera Bread",
    category: "Restaurants",
    categoryGroup: "Food & Dining",
    amount: -18.92,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_314",
    date: "2024-12-14",
    description: "Sushi Palace",
    category: "Restaurants",
    categoryGroup: "Food & Dining",
    amount: -65.23,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_315",
    date: "2024-12-18",
    description: "Local Bistro",
    category: "Restaurants",
    categoryGroup: "Food & Dining",
    amount: -89.56,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_316",
    date: "2024-12-22",
    description: "Italian Kitchen",
    category: "Restaurants",
    categoryGroup: "Food & Dining",
    amount: -72.45,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_320",
    date: "2024-12-04",
    description: "Starbucks",
    category: "Coffee Shops",
    categoryGroup: "Food & Dining",
    amount: -6.75,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_321",
    date: "2024-12-07",
    description: "Blue Bottle Coffee",
    category: "Coffee Shops",
    categoryGroup: "Food & Dining",
    amount: -8.25,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_322",
    date: "2024-12-10",
    description: "Starbucks",
    category: "Coffee Shops",
    categoryGroup: "Food & Dining",
    amount: -7.45,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_323",
    date: "2024-12-13",
    description: "Local Coffee House",
    category: "Coffee Shops",
    categoryGroup: "Food & Dining",
    amount: -9.80,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_324",
    date: "2024-12-16",
    description: "Starbucks",
    category: "Coffee Shops",
    categoryGroup: "Food & Dining",
    amount: -6.95,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_325",
    date: "2024-12-19",
    description: "Peet's Coffee",
    category: "Coffee Shops",
    categoryGroup: "Food & Dining",
    amount: -7.50,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_330",
    date: "2024-12-06",
    description: "DoorDash - Thai Food",
    category: "Takeout",
    categoryGroup: "Food & Dining",
    amount: -42.35,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_331",
    date: "2024-12-12",
    description: "Uber Eats - Pizza",
    category: "Takeout",
    categoryGroup: "Food & Dining",
    amount: -38.67,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_332",
    date: "2024-12-19",
    description: "GrubHub - Chinese",
    category: "Takeout",
    categoryGroup: "Food & Dining",
    amount: -45.89,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },

  // Entertainment expenses
  {
    id: "txn_400",
    date: "2024-12-01",
    description: "Netflix",
    category: "Streaming Services",
    categoryGroup: "Entertainment",
    amount: -15.99,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_401",
    date: "2024-12-01",
    description: "Spotify Premium",
    category: "Streaming Services",
    categoryGroup: "Entertainment",
    amount: -10.99,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_402",
    date: "2024-12-01",
    description: "Disney+",
    category: "Streaming Services",
    categoryGroup: "Entertainment",
    amount: -7.99,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_403",
    date: "2024-12-01",
    description: "HBO Max",
    category: "Streaming Services",
    categoryGroup: "Entertainment",
    amount: -14.99,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_404",
    date: "2024-12-08",
    description: "AMC Theaters",
    category: "Movies",
    categoryGroup: "Entertainment",
    amount: -38.50,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_405",
    date: "2024-12-15",
    description: "Concert Tickets - LiveNation",
    category: "Concerts/Events",
    categoryGroup: "Entertainment",
    amount: -125.0,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_406",
    date: "2024-12-10",
    description: "Art Supplies - Michael's",
    category: "Hobbies",
    categoryGroup: "Entertainment",
    amount: -67.89,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_407",
    date: "2024-12-18",
    description: "REI - Hiking Gear",
    category: "Hobbies",
    categoryGroup: "Entertainment",
    amount: -142.56,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },

  // Shopping expenses
  {
    id: "txn_500",
    date: "2024-12-05",
    description: "Nordstrom",
    category: "Clothing",
    categoryGroup: "Shopping",
    amount: -156.78,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_501",
    date: "2024-12-12",
    description: "Gap",
    category: "Clothing",
    categoryGroup: "Shopping",
    amount: -89.45,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_502",
    date: "2024-12-09",
    description: "Best Buy - Headphones",
    category: "Electronics",
    categoryGroup: "Shopping",
    amount: -179.99,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_503",
    date: "2024-12-11",
    description: "Target",
    category: "Home Goods",
    categoryGroup: "Shopping",
    amount: -87.34,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_504",
    date: "2024-12-16",
    description: "Bed Bath & Beyond",
    category: "Home Goods",
    categoryGroup: "Shopping",
    amount: -65.23,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_505",
    date: "2024-12-07",
    description: "Ulta Beauty",
    category: "Personal Care",
    categoryGroup: "Shopping",
    amount: -54.67,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_506",
    date: "2024-12-19",
    description: "Haircut - Salon",
    category: "Personal Care",
    categoryGroup: "Shopping",
    amount: -45.0,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },

  // Health & Fitness expenses
  {
    id: "txn_600",
    date: "2024-12-01",
    description: "Planet Fitness",
    category: "Gym Membership",
    categoryGroup: "Health & Fitness",
    amount: -79.99,
    account: "Chase Checking",
    type: "expense",
  },
  {
    id: "txn_601",
    date: "2024-12-01",
    description: "Blue Cross Health Insurance",
    category: "Health Insurance",
    categoryGroup: "Health & Fitness",
    amount: -345.0,
    account: "Chase Checking",
    type: "expense",
  },
  {
    id: "txn_602",
    date: "2024-12-08",
    description: "Dr. Smith - Checkup",
    category: "Medical",
    categoryGroup: "Health & Fitness",
    amount: -45.0,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_603",
    date: "2024-12-14",
    description: "CVS Pharmacy",
    category: "Pharmacy",
    categoryGroup: "Health & Fitness",
    amount: -32.45,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_604",
    date: "2024-12-21",
    description: "Walgreens",
    category: "Pharmacy",
    categoryGroup: "Health & Fitness",
    amount: -28.67,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },

  // Savings & Investments
  {
    id: "txn_700",
    date: "2024-12-01",
    description: "Transfer to Emergency Fund",
    category: "Emergency Fund",
    categoryGroup: "Savings",
    amount: -800.0,
    account: "Ally High Yield Savings",
    type: "expense",
  },
  {
    id: "txn_701",
    date: "2024-12-01",
    description: "401k Contribution",
    category: "Retirement 401k",
    categoryGroup: "Savings",
    amount: -1200.0,
    account: "Vanguard 401k",
    type: "expense",
  },
  {
    id: "txn_702",
    date: "2024-12-15",
    description: "401k Contribution",
    category: "Retirement 401k",
    categoryGroup: "Savings",
    amount: -1200.0,
    account: "Vanguard 401k",
    type: "expense",
  },
  {
    id: "txn_703",
    date: "2024-12-05",
    description: "Vanguard Index Fund",
    category: "Investment Account",
    categoryGroup: "Savings",
    amount: -500.0,
    account: "Vanguard 401k",
    type: "expense",
  },

  // Bills & Utilities
  {
    id: "txn_800",
    date: "2024-12-01",
    description: "Verizon Wireless",
    category: "Phone",
    categoryGroup: "Bills & Utilities",
    amount: -72.45,
    account: "Chase Checking",
    type: "expense",
  },
  {
    id: "txn_801",
    date: "2024-12-01",
    description: "Adobe Creative Cloud",
    category: "Subscriptions",
    categoryGroup: "Bills & Utilities",
    amount: -54.99,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
  {
    id: "txn_802",
    date: "2024-12-01",
    description: "The New York Times",
    category: "Subscriptions",
    categoryGroup: "Bills & Utilities",
    amount: -17.0,
    account: "Chase Freedom Unlimited",
    type: "expense",
  },
];

// Helper function to calculate totals by category
export function calculateCategoryTotals(transactions: Transaction[]) {
  const totals: Record<string, number> = {};

  transactions.forEach((txn) => {
    if (!totals[txn.category]) {
      totals[txn.category] = 0;
    }
    totals[txn.category] += Math.abs(txn.amount);
  });

  return totals;
}

// Helper function to calculate totals by category group
export function calculateGroupTotals(transactions: Transaction[]) {
  const totals: Record<string, number> = {};

  transactions.forEach((txn) => {
    if (!totals[txn.categoryGroup]) {
      totals[txn.categoryGroup] = 0;
    }
    totals[txn.categoryGroup] += Math.abs(txn.amount);
  });

  return totals;
}

// Helper function to get income vs expenses
export function getIncomeExpenseSummary(transactions: Transaction[]) {
  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach((txn) => {
    if (txn.type === "income") {
      totalIncome += txn.amount;
    } else {
      totalExpenses += Math.abs(txn.amount);
    }
  });

  return {
    totalIncome,
    totalExpenses,
    netSavings: totalIncome - totalExpenses,
  };
}
