import { Router } from "express";
import * as categoriesControllers from "./categories.controllers";
import isAuth from "../../middlewares/isAuth";

const router = Router();

router
  .route("/")
  .all(isAuth)
  .post(categoriesControllers.createCategory)
  .get(categoriesControllers.getCategories);

router
  .route("/:id")
  .all(isAuth)
  .delete(categoriesControllers.deleteCategory)
  .patch(categoriesControllers.updateCategory);

export default router;
