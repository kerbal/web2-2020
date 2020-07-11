export const generateAccountNumber = (customerId, accountId, length = 16) => {
  const prefix = customerId.toString().padEnd(4, '0');
  const postfix = accountId.toString().padStart(4, '0');
  const randomNumber = Math.random().toFixed(length).substr(2, length - prefix.length - postfix.length);
  return prefix + randomNumber + postfix;
};
