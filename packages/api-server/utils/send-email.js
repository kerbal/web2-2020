const nodemailer = require('nodemailer');

const sendEmail = async function(to, subject, text) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ACC,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  return transporter.sendMail({
    from: process.env.USER_EMAIL,
    to,
    subject,
    text,
  });
};

export { sendEmail };
