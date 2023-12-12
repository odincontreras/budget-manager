import { NextFunction, Request, Response } from "express";
import * as currenciesServices from "./currencies.services";

export async function createCurrency(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const data = req.body;

    const createdCurrency = await currenciesServices.createCurrency(data);

    return res.status(201).json(createdCurrency);
  } catch (error) {
    next(error);
  }
}

export async function getCurrencies(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const currencies = await currenciesServices.getCurrencies();

    return res.status(200).json(currencies);
  } catch (error) {
    next(error);
  }
}

export async function deleteCurrency(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { id } = req.params;

    await currenciesServices.deleteCurrency(Number(id));

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export async function updateCurrency(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedCurrency = await currenciesServices.updateCurrency(
      Number(id),
      data,
    );

    return res.status(200).json(updatedCurrency);
  } catch (error) {
    next(error);
  }
}
