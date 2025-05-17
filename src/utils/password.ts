import bcrypt from "bcrypt";

export async function saltAndHashPassword(plainPassword: string): Promise<string> {
  const salt = 12;
  const hash = await bcrypt.hash(plainPassword, salt);
  return hash;
}

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
