import bcrypt from 'bcryptjs';

export const encryption = async (text) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(text, salt);
  return hash;
};

export const compare = async (text, hash) => {
  return await bcrypt.compare(text, hash);
};
