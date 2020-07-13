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
      const content = `
      # Hello ${fullname},
      ## Thank you for creating a new ${type} account at Piggy bank 
      ## The account have been successfully created. 

      More about your account below:
      Account number: ${account_number}
      Account type: ${type}
      Balance: ${balance}
      Date issued ${created_date}

      If you did not request this, please contact to our support as fast as possible.
      The Piggy Support Team, 
      `;
      await MailService.sendMail(email, `Piggy bank: new ${type} created`, content);
      console.log('Mail successful');
    } catch(error) {
      console.log('sendMailNewAccount error: ', error.message);
    }
  }
}
