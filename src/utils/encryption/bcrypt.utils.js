import bcrypt from 'bcryptjs';

export const encryption = async (text) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(text, salt);
  return hash;
};
