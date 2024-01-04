import prisma from "../../utils/prisma";
import { Prisma, User, UserCurrency } from "@prisma/client";
import {
  ExpenseWithoutId,
  IncomeWithoutId,
  UserCurrencyWithoutId,
} from "../../types";
import throwError from "../../utils/throwError";
import { ERROR_PROPS } from "../../constants";

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

export async function updateUserIncome(
  userId: number,
  incomeId: number,
  data: IncomeWithoutId,
) {
  const update = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      incomes: {
        update: {
          where: {
            id: incomeId,
          },
          data,
        },
      },
    },
    include: {
      incomes: {
        orderBy: {
          updatedAt: "desc",
        },
        take: 1,
      },
    },
  });

  return update;
}

export async function getUserIncomes(
  userId: number,
  query: Record<string, unknown>,
) {
  const where = query?.filters as Prisma.IncomeWhereInput;
  const orderBy = query?.orderBy as Prisma.IncomeOrderByWithRelationInput;
  const take = query?.take as number;
  const skip = query?.skip as number;

  const userIncomes = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      incomes: {
        where,
        orderBy,
        take,
        skip,
      },
      _count: {
        select: {
          incomes: true,
        },
      },
    },
  });

  return userIncomes;
}

export async function getUserIncomesTotal(
  userId: number,
  query: Record<string, unknown>,
) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      userCurrencies: true,
    },
  });

  if (!user) throwError(ERROR_PROPS.NOT_FOUND);

  const defaultCurrencyId = user.userCurrencies.find(
    (currency) => currency.isDefault,
  )?.currencyId;

  const userIncomesTotal = await prisma.income.aggregate({
    where: {
      userId,
      currencyId: defaultCurrencyId,
      ...query,
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

export async function getUserExpenses(
  userId: number,
  query: Record<string, unknown>,
) {
  const where = query?.filters as Prisma.ExpenseWhereInput;
  const orderBy = query?.orderBy as Prisma.ExpenseOrderByWithRelationInput;
  const take = query?.take as number;
  const skip = query?.skip as number;

  const userExpenses = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      expenses: {
        where,
        orderBy,
        take,
        skip,
      },
      _count: {
        select: {
          expenses: true,
        },
      },
    },
  });

  return userExpenses;
}

export async function getUserExpensesTotal(
  userId: number,
  query: Record<string, unknown>,
) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      userCurrencies: true,
    },
  });

  if (!user) throwError(ERROR_PROPS.NOT_FOUND);

  const defaultCurrencyId = user.userCurrencies.find(
    (currency) => currency.isDefault,
  )?.currencyId;

  const userExpensesTotal = await prisma.expense.aggregate({
    where: {
      userId,
      currencyId: defaultCurrencyId,
      ...query,
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
      data: currencies.map((currency) => ({ ...currency, userId })),
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
