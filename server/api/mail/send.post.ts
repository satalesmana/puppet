export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const mode = body.mode;
    const mailTo = body.to;
    const message = body.message;
    const subject = body.subject;
    const task = body.task;
    let res: any = null;

    if (mode === 'manual') {
      res = await useSendMail({
        to: mailTo,
        subject,
        messages: message,
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
