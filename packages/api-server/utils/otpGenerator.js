import totpGenerator from 'totp-generator';
import { v4 } from 'uuid';

export const generateOTP = () => {
  const id = v4();
  const value = totpGenerator(new Date().getTime());
  return ({
    id,
    value,
  });
};
