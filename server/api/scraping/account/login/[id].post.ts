import { ScrapingAccount } from '~/server/models/ScrapingAccount.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const { params } = event.context;
    const { email, password, _id } = await ScrapingAccount.findById({
      _id: params?.id,
    });

    const token = await jobstreetLoginAccount(email, password, _id);
    if (token === '') {
      throw new Error('login gagal');
    }

    await ScrapingAccount.updateOne({ _id: params?.id }, { cookies: token });

    setInterval(async () => {
      const newToken = await jobstreetReloadAccount(_id);
      await ScrapingAccount.updateOne({ _id }, { cookies: newToken });
    }, 60000); // 6 menit

    return {
      data: [],
      message: 'login berhasil',
    } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
