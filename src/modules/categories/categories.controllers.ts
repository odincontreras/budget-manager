import { NextFunction, Request, Response } from "express";
import * as categoriesServices from "./categories.services";

export async function createCategory(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const data = req.body;

    const category = await categoriesServices.createCategory(data);

    return res.status(201).json(category);
  } catch (error) {
    next(error);
  }
}

export async function getCategories(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const categories = await categoriesServices.getCategories();

    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { id } = req.params;

    await categoriesServices.deleteCategory(Number(id));

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedCategory = await categoriesServices.updateCategory(
      Number(id),
      data,
    );

    return res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
}
