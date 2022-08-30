export interface UserDataCtx {
  userInfo: UserInfo;
  expenseList: ExpenseList[];
  updateUserInfo: (userInfo: UserInfo) => void;
  addExpense: (expense: ExpenseItem) => void;
  removeExpense: (selectedExp: SelectedExpense) => void;
  updateExpense: (selectedExp: SelectedExpense) => void;
}

export interface UserInfo {
  name: string;
  role: string;
  income: number;
  balance: number;
}

export interface ExpenseList {
  expList: ExpenseItem[];
  balance: number;
  income: number;
  spent: number;
  month: string;
}

export interface ExpenseItem {
  name: string;
  amount: number;
  paymentMode: "CASH" | "CREDIT_CARD" | "BANK" | null;
  isIncome: boolean;
  date: string;
}

export interface SelectedExpense {
  mainIdx: number;
  index: number;
  item: ExpenseItem;
}
