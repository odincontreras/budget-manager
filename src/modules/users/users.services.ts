import prisma from "../../utils/prisma";
import { User, UserCurrency } from "@prisma/client";
import {
  ExpenseWithoutId,
  IncomeWithoutId,
  UserCurrencyWithoutId,
} from "../../types";

export async function deleteUser(id: number): Promise<void> {
  await prisma.user.delete({
    where: {
      id,
    },
  });
}

export async function createUserCurrencies(
  data: UserCurrencyWithoutId[],
  userId: number,
): Promise<UserCurrency[]> {
  await prisma.userCurrency.createMany({
    data,
    skipDuplicates: true,
  });

  const userCurrencies = await prisma.userCurrency.findMany({
    where: {
      userId,
    },
  });

  return userCurrencies;
}

export async function getUserCurrencies(userId: number) {
  const userCurrencies = await prisma.userCurrency.findMany({
    where: {
      userId,
    },
    include: {
      currency: true,
    },
  });

  return userCurrencies;
}

export async function createUserIncome(
  userId: number,
  data: IncomeWithoutId,
): Promise<User> {
  const newUserIncome = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      incomes: {
        create: data,
      },
    },
    include: {
      incomes: {
        take: 1,
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return newUserIncome;
}

export async function getUserIncomes(userId: number) {
  const userIncomes = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      incomes: {
        orderBy: {
          date: "asc",
        },
      },
    },
  });

  return userIncomes;
}

export async function getUserIncomesTotal(userId: number) {
  const userIncomesTotal = await prisma.income.aggregate({
    where: {
      userId,
    },
    _sum: {
      amount: true,
    },
  });

  return userIncomesTotal._sum;
}

export async function deleteUserIncome(userId: number, incomeId: number) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      incomes: {
        delete: {
          id: incomeId,
        },
      },
    },
  });
}

export async function createUserExpense(
  userId: number,
  data: ExpenseWithoutId,
): Promise<User> {
  const newUserExpense = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      expenses: {
        create: data,
      },
    },
    include: {
      expenses: {
        take: 1,
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return newUserExpense;
}

export async function getUserExpenses(userId: number) {
  const userExpenses = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      expenses: {
        orderBy: {
          date: "asc",
        },
      },
    },
  });

  return userExpenses;
}

export async function getUserExpensesTotal(userId: number) {
  const userExpensesTotal = await prisma.expense.aggregate({
    where: {
      userId,
    },
    _sum: {
      amount: true,
    },
  });

  return userExpensesTotal._sum;
}

export async function deleteUserExpense(userId: number, expenseId: number) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      expenses: {
        delete: {
          id: expenseId,
        },
      },
    },
  });
}

export async function updateUserExpense(
  userId: number,
  expenseId: number,
  data: Partial<ExpenseWithoutId>,
) {
  const update = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      expenses: {
        update: {
          where: {
            id: expenseId,
          },
          data,
        },
      },
    },
    include: {
      expenses: {
        orderBy: {
          updatedAt: "desc",
        },
        take: 1,
      },
    },
  });

  return update;
}

export async function updateUserProfile({
  name,
  lastName,
  currencies,
  userId,
}: {
  name: string;
  lastName: string;
  currencies: UserCurrency[];
  userId: number;
}) {
  if (currencies?.length) {
    await prisma.userCurrency.deleteMany({
      where: {
        userId,
      },
    });

    await prisma.userCurrency.createMany({
      data: currencies,
    });
  }

  const update = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      lastName,
    },
    include: {
      userCurrencies: true,
    },
  });

  return update;
}
