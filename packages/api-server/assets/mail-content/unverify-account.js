export const verifyAccountFail = ({ fullname }) =>
  [
    `# Hello ${fullname},`,
    '',
    '## Your account verification failed . ',
    '',
    '### If you did not request this, please contact to our support as fast as possible.',
    '----------',
    '**PIGGY BANK**',
  ].join('\n');
