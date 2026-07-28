import { useSendMail } from '../../utils/mailer/sendMail';
import { MailMessages, MailStatus } from '../../models/MailMessages.model';

export default defineEventHandler(async () => {
  try {
    const mailMessages = await MailMessages.find({ status: MailStatus[0] });

    for (const item of mailMessages) {
      // create log-like output by console
      console.log(`${item.task.code}: sending mail to ${item.to}`);

      await useSendMail({
        to: item.to,
        subject: item.subject,
        messages: item.message,
      });

      await MailMessages.updateOne({ _id: item._id }, { status: MailStatus[1] });

      // small pause if needed
      // useSleep(); // optional
    }

    return { started: true };
  } catch (err: any) {
    return { error: err?.message || 'failed to send' };
  }
});
