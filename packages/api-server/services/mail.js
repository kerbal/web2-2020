import emailer from 'nodemailer';
import { markdown } from 'nodemailer-markdown';
import newAccountMailContent from '../assets/mail-content/new-account';
const config = {
  host: process.env.EMAIL_HOST || 'smtp-mail.outlook.com',
  secureConnection: false,
  secure: false,
  port: 587,
  auth: {
    user: process.env.EMAIL_ACC,
    password: process.env.EMAIL_PASSWORD,
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
      return true;
    }
    catch (err)  {
      console.log(err);
      return false;
    }
    finally {
      transporter.close();
    }
  }

  static async sendMailNewAccount({ fullname, email }, { type, balance, account_number, created_date }) {
    try {
      const content = {
        fullname, type, balance, account_number, created_date,
      };
      await MailService.sendMail(email, `Piggy bank - New ${type} account created`, newAccountMailContent(content));
      console.log('Mail successful');
    } catch(error) {
      console.log('sendMailNewAccount error: ', error.message);
    }
  }
}
