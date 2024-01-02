export default defineEventHandler(async (event) => {
  try {
    const res = await useSendMail({
      to: 'lesmanasata@gmail.com',
      subject: 'tes aja',
      messages: 'adsf',
    });

    console.log('res', res);
  } catch (err) {
    console.log('err', err);
  }
});
