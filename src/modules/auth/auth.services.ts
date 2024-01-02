import { User } from "@prisma/client";
import { ERROR_PROPS } from "../../constants";
import { UserWithoutId } from "../../types";
import { encrypt, verified } from "../../utils/bcrypt";
import { generateUserToken } from "../../utils/jwt";
import prisma from "../../utils/prisma";
import throwError from "../../utils/throwError";

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      userCurrencies: true,
    },
  });

  if (!user) throwError(ERROR_PROPS.NOT_FOUND);

  const isPasswordValid = verified(password, user.password);

  if (!isPasswordValid) throwError(ERROR_PROPS.PASSWORD_INCORRECT);

  const token = generateUserToken(user.id, user.email);

  return { user, token };
}

export async function registerUser(newUser: UserWithoutId): Promise<User> {
  const alreadyExists = await prisma.user.findUnique({
    where: {
      email: newUser.email,
    },
  });

  if (alreadyExists != null) {
    throwError(ERROR_PROPS.FORBIDDEN, "User already exists");
  }

  const encryptedPassword = await encrypt(newUser.password);

  const user = await prisma.user.create({
    data: { ...newUser, password: encryptedPassword },
  });

  return user;
}

export async function getLoggedUser(userId: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      userCurrencies: true,
    },
  });

  if (!user) throwError(ERROR_PROPS.NOT_FOUND);

  return user;
}
