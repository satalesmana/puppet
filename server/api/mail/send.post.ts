import { MailMessages } from '~/server/models/MailMessages.model';
import { ScrapingJobstreetPelamar } from '~/server/models/ScrapingPelamarJobstreet.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const mode = body.mode;
    const mailTo = body.to;
    const message = body.message;
    const subject = body.subject;
    const task = body.task;
    let res: any = null;
    const { id, name } = getMetadata(event);
    const createdBy = { name, email: id };

    if (mode === 'task') {
      const pelamars = await ScrapingJobstreetPelamar.find({
        'scraping_task._id': task._id,
      });

      pelamars.forEach(async (pelamar) => {
        await MailMessages.create({
          to: pelamar.email,
          message,
          subject,
          task,
          status: 'pending',
          created_by: createdBy,
        });
      });
    }

    if (mode === 'manual') {
      res = await useSendMail({
        to: mailTo,
        subject,
        messages: message,
      });

      await MailMessages.create({
        to: mailTo,
        message,
        subject,
        task: {},
        status: 'done',
        created_by: createdBy,
      });
    }

    return {
      data: res,
      message: `data hasbeen saved`,
    } as ApiResponse<[], string>;
  } catch (err) {
    console.log('err', err);
  }
});
