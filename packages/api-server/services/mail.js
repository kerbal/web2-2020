import emailer from 'nodemailer';
import { markdown } from 'nodemailer-markdown';

const config = {
  host: 'smtp-mail.outlook.com',
  secureConnection: false,
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
      transporter.close();
      throw err;
    }
    transporter.close();
  }
}
