import bcrypt from "bcryptjs";

export async function encrypt(value: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hashSync(value, salt);
}

export async function verified(value: string, hash: string): Promise<boolean> {
  return bcrypt.compare(value, hash);
}
