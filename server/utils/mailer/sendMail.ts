import nodemailer from 'nodemailer/lib/nodemailer';
const transporter = nodemailer.createTransport({
  host: 'mail.system-recruitment.online',
  port: 465,
  secure: true,
  auth: {
    user: 'hrd@system-recruitment.online',
    pass: 'Wan261100',
  },
});

export const useSendMail = async ({ to, subject, messages }: any) => {
  try {
    const res = await transporter.sendMail({
      from: '"Recruitment System 👻" <hrd@system-recruitment.online>', // sender address
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
