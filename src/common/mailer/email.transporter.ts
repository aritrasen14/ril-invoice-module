import { createTransport } from 'nodemailer';

export const transporter = createTransport({
  service: 'Outlook365',
  auth: {
    user: process.env.EMAIL_USERID,
    pass: process.env.EMAIL_PWD,
  },
});
