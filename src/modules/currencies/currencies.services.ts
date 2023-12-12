import prisma from "../../utils/prisma";
import { CurrencyWithoutId } from "../../types";

export const createCurrency = async (newCurrency: CurrencyWithoutId) => {
  const currency = await prisma.currency.create({
    data: newCurrency,
  });

  return currency;
};

export const getCurrencies = async () => {
  const currencies = await prisma.currency.findMany();

  return currencies;
};

export const deleteCurrency = async (id: number) => {
  await prisma.currency.delete({
    where: {
      id,
    },
  });
};

export const updateCurrency = async (id: number, update: CurrencyWithoutId) => {
  const currencyUpdate = await prisma.currency.update({
    where: {
      id,
    },
    data: update,
  });

  return currencyUpdate;
};
