import { Router } from "express";
import * as currenciesControllers from "./currencies.controllers";
import isAuth from "../../middlewares/isAuth";

const router = Router();

router
  .route("/")
  // .all(isAuth)
  .post(currenciesControllers.createCurrency)
  .get(currenciesControllers.getCurrencies);

router
  .route("/:id")
  .all(isAuth)
  .delete(currenciesControllers.deleteCurrency)
  .patch(currenciesControllers.updateCurrency);

export default router;
