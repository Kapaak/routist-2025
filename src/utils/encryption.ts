import bcrypt from "bcryptjs";

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  const isValid = await bcrypt.compare(password, hashedPassword);

  return isValid;
};

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
};
