import { ScrapingAccount } from '~/server/models/ScrapingAccount.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const { params } = event.context;
    const { email, password, _id, type } = await ScrapingAccount.findById({
      _id: params?.id,
    });

    if (type === 'jobstreet') {
      const token = await jobstreetLoginAccount(email, password, _id);
      if (token === '') {
        throw new Error('login gagal');
      }

      await ScrapingAccount.updateOne({ _id: params?.id }, { cookies: token });

      setInterval(async () => {
        const newToken = await jobstreetReloadAccount(_id);
        await ScrapingAccount.updateOne({ _id }, { cookies: newToken });
      }, 60000); // 6 menit
    }

    if (type === 'kupu') {
      const kupuToken = await kupuLoginAccount(_id);
    }

    return {
      data: [],
      message: 'login berhasil',
    } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
