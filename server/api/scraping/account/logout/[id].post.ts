import { ScrapingAccount } from '~/server/models/ScrapingAccount.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const { params } = event.context;

    await ScrapingAccount.updateOne({ _id: params?.id }, { cookies: null });
    await stopSession(params?.id);

    return {
      data: [],
      message: 'Logout berhasil',
    } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
