import emailer from 'nodemailer';
import { markdown } from 'nodemailer-markdown';

const config = {
  host: process.env.EMAIL_HOST || 'smtp-mail.outlook.com',
  secureConnection: false,
  secure: false,
  port: 587,
  auth: {
    user: process.env.EMAIL_ACC,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    ciphers:'SSLv3',
  },
};

export default class MailService {
  static async sendMail(destination, subject, markdownContent) {
    const transporter = emailer.createTransport(config);
    try {
      const option = {
        from: process.env.EMAIL_ACC,
        to: destination,
        subject,
        markdown: markdownContent,
      };
      transporter.use('compile', markdown());
      await transporter.sendMail(option);
    }
    catch (err)  {
      console.log(err);
      throw err;
    }
    finally {
      transporter.close();
    }
  }

  static async sendMailNewAccount({ fullname, email }, { type, balance, account_number, created_date }) {
    try {
      const content = [
        `# Hello ${fullname},`,
        '',
        `## You have successfully created a new ${type} account at Piggy bank.`,
        '',
        '### **Detail**',
        `- Account number: ${account_number}`,
        `- Account type: ${type}`,
        `- Balance: ${balance}`,
        `- Date created: ${created_date}`,
        '',
        '### If you did not request this, please contact to our support as fast as possible.',
        '----------',
        '**PIGGY BANK**',
      ].join('\n');
      await MailService.sendMail(email, `Piggy bank - New ${type} account created`, content);
      console.log('Mail successful');
    } catch(error) {
      console.log('sendMailNewAccount error: ', error.message);
    }
  }
}
