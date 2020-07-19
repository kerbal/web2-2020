export const receiveMoneyEmail = (transaction, balance) => {
  return {
    subject: `Piggy Bank - You received ${transaction.amount} from ${transaction.source_account_name}`,
    content: [
      `## You received ${transaction.amount} from ${transaction.source_account_name}`,
      '',
      '**Detail**',
      '',
      '**Source account**',
      `- Bank name: ${transaction.source_bank_name}`,
      `- Account number: ${transaction.source_account_number}`,
      `- Account name: ${transaction.source_account_name}`,
      `- **Amount**: ${transaction.amount}`,
      `- Note: ${transaction.note}`,
      '',
      '**Destination account**',
      `- Account number: ${transaction.destination_account_number}`,
      `- Account name: ${transaction.destination_account_name}`,
      `- Remaining balance: ${balance}`,
      '',
      '----------',
      '**PIGGY BANK**',
    ].join('\n'),
  };
};

export const spendMoneyEmail = (transaction, balance) => {
  return {
    subject: `Piggy Bank - You spent ${transaction.amount}`,
    content: [
      `## You spent ${transaction.amount}`,
      '',
      '**Detail**',
      '',
      '**Source account**',
      `- Bank name: ${transaction.source_bank_name}`,
      `- Account number: ${transaction.source_account_number}`,
      `- Account name: ${transaction.source_account_name}`,
      `- **Amount**: ${transaction.amount}`,
      `- Remaining balance: ${balance}`,
      `- Note: ${transaction.note}`,
      '',
      '**Destination account**',
      `- Account number: ${transaction.destination_account_number}`,
      `- Account name: ${transaction.destination_account_name}`,
      '',
      '----------',
      '**PIGGY BANK**',
    ].join('\n'),
  };
};
