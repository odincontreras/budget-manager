import { NextFunction, Request, Response } from "express";
import * as usersServices from "./users.services";

export async function deleteOne(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { id } = req.params;

    await usersServices.deleteUser(Number(id));

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export async function createUserCurrencies(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { userId, currencyId } = req.params;
    const data = req.body;

    data.userId = Number(userId);
    data.currencyId = Number(currencyId);

    const userCurrencies = await usersServices.createUserCurrencies(
      data,
      Number(userId),
    );

    return res.status(201).json(userCurrencies);
  } catch (error) {
    next(error);
  }
}

export async function getUserCurrencies(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { userId } = req.params;

    const userCurrencies = await usersServices.getUserCurrencies(
      Number(userId),
    );

    return res.status(200).json(userCurrencies);
  } catch (error) {
    next(error);
  }
}

export async function createUserIncome(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { userId } = req.params;
    const data = req.body;

    const userIncome = await usersServices.createUserIncome(
      Number(userId),
      data,
    );

    return res.status(201).json(userIncome);
  } catch (error) {
    next(error);
  }
}

export async function updateUserIncome(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { userId, incomeId } = req.params;
    const data = req.body;

    const updatedIncome = await usersServices.updateUserIncome(
      Number(userId),
      Number(incomeId),
      data,
    );

    return res.status(200).json(updatedIncome);
  } catch (error) {
    next(error);
  }
}

export async function getUserIncomes(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { userId } = req.params;

    const userIncomes = await usersServices.getUserIncomes(Number(userId));

    return res.status(200).json(userIncomes);
  } catch (error) {
    next(error);
  }
}

export async function getUserIncomesTotal(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { userId } = req.params;

    const userIncomesTotal = await usersServices.getUserIncomesTotal(
      Number(userId),
    );

    return res.status(200).json(userIncomesTotal);
  } catch (error) {
    next(error);
  }
}

export async function deleteUserIncome(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { userId, incomeId } = req.params;

    await usersServices.deleteUserIncome(Number(userId), Number(incomeId));

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export async function createUserExpense(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { userId } = req.params;
    const data = req.body;

    const userExpense = await usersServices.createUserExpense(
      Number(userId),
      data,
    );

    return res.status(201).json(userExpense);
  } catch (error) {
    next(error);
  }
}

export async function getUserExpenses(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { userId } = req.params;
    const userExpenses = await usersServices.getUserExpenses(Number(userId));

    return res.status(200).json(userExpenses);
  } catch (error) {
    next(error);
  }
}

export async function getUserExpensesTotal(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { userId } = req.params;
    const userExpensesTotal = await usersServices.getUserExpensesTotal(
      Number(userId),
    );

    return res.status(200).json(userExpensesTotal);
  } catch (error) {
    next(error);
  }
}

export async function deleteUserExpense(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { userId, expenseId } = req.params;

    await usersServices.deleteUserExpense(Number(userId), Number(expenseId));

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export async function updateUserExpense(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { userId, expenseId } = req.params;
    const data = req.body;

    const updatedExpense = await usersServices.updateUserExpense(
      Number(userId),
      Number(expenseId),
      data,
    );

    return res.status(200).json(updatedExpense);
  } catch (error) {
    next(error);
  }
}

export async function updateUserProfile(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { userId } = req.params;
    const { name, lastName, currencies } = req.body;

    const updatedUser = await usersServices.updateUserProfile({
      currencies,
      name,
      lastName,
      userId: Number(userId),
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
}
