import {
  ScrapingAccount,
  allowType,
} from '~/server/models/ScrapingAccount.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const body = await readFormData(event);
    const { params } = event.context;
    const account = body.get('name');
    const email = body.get('email');
    const password = body.get('password');
    const type = body.get('type') as string;

    if (account === '') throw new Error('name harus di isi');
    if (password === '') throw new Error('password harus di isi');
    if (type === '') throw new Error('type harus di isi');
    if (email === '') throw new Error('email harus di isi');

    if (!allowType.includes(type)) {
      throw new Error('invalid type');
    }

    const { modifiedCount, matchedCount } = await ScrapingAccount.updateOne(
      { _id: params?.id },
      {
        name: account,
        email,
        password,
        type,
      },
    );
    if (matchedCount <= 0) throw new Error('update failed');
    if (modifiedCount <= 0) throw new Error('data is uptodate');

    return { data: [], message: 'update success' } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
