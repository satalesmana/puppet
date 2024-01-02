import nodemailer from 'nodemailer/lib/nodemailer';
const transporter = nodemailer.createTransport({
  host: 'mail.pt-gkm.co.id',
  port: 465,
  secure: true,
  auth: {
    user: 'system@pt-gkm.co.id',
    pass: 'Welcome123#@!',
  },
});

export const useSendMail = async ({ to, subject, messages }: any) => {
  try {
    const res = await transporter.sendMail({
      from: '"Recruitment System 👻" <system@pt-gkm.co.id>', // sender address
      to,
      subject,
      text: messages,
      html: messages,
    });
    return res;
  } catch (error) {
    throw error?.messate;
  }
};
