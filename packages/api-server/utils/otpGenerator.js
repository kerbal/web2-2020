import totpGenerator from 'totp-generator';
import uuid from 'uuid';

export const generateOTP = () => {
  const id = uuid();
  const value = totpGenerator(id);
  return ({
    id,
    value,
  });
};
