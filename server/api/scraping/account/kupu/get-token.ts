import { ScrapingAccount } from '~/server/models/ScrapingAccount.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const id = body._id;
    const otp = body.otp;

    const token = await kupuSendOTP(id, otp);
    if (token === '') {
      throw new Error('login gagal');
    }

    await ScrapingAccount.updateOne({ _id: id }, { cookies: token });

    return {
      data: [],
      message: 'login berhasil',
    } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
