import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "token";

export function generateUserToken(id: number, email: string) {
  return sign({ id, email }, JWT_SECRET, {
    expiresIn: "1d",
  });
}

export function verifyUserToken(token: string) {
  return verify(token, JWT_SECRET);
}
