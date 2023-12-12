import {
  Category,
  Currency,
  Expense,
  Income,
  User,
  UserCurrency,
} from "@prisma/client";

export type UserWithoutId = Omit<User, "id">;

export type CurrencyWithoutId = Omit<Currency, "id">;

export type ExpenseWithoutId = Omit<Expense, "id">;

export type CategoryWithoutId = Omit<Category, "id">;

export type UserCurrencyWithoutId = Omit<UserCurrency, "id">;

export type IncomeWithoutId = Omit<Income, "id">;
