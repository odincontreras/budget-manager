import { Router } from "express";
import * as usersControllers from "./users.controllers";
import isAuth from "../../middlewares/isAuth";

const router = Router();

router.route("/:id").all(isAuth).delete(usersControllers.deleteOne);

router
  .route("/:userId/profile")
  .all(isAuth)
  .patch(usersControllers.updateUserProfile);

router
  .route("/:userId/currencies")
  .all(isAuth)
  .get(usersControllers.getUserCurrencies)
  .post(usersControllers.createUserCurrencies);

router
  .route("/:userId/incomes")
  .all(isAuth)
  .post(usersControllers.createUserIncome)
  .get(usersControllers.getUserIncomes);

router
  .route("/:userId/incomes/total")
  .all(isAuth)
  .get(usersControllers.getUserIncomesTotal);

router
  .route("/:userId/incomes/:incomeId")
  .all(isAuth)
  .delete(usersControllers.deleteUserIncome);

router
  .route("/:userId/expenses")
  .all(isAuth)
  .post(usersControllers.createUserExpense)
  .get(usersControllers.getUserExpenses);

router
  .route("/:userId/expenses/total")
  .all(isAuth)
  .get(usersControllers.getUserExpensesTotal);

router
  .route("/:userId/expenses/:expenseId")
  .all(isAuth)
  .delete(usersControllers.deleteUserExpense);

export default router;
