import {
  ScrapingAccount,
  allowType,
} from '~/server/models/ScrapingAccount.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { params } = event.context;
    const account = body.name;
    const email = body.email;
    const password = body.password;
    const type = body.type;
    const phone = body.phone;

    if (account === '') throw new Error('name harus di isi');
    // if (password === '') throw new Error('password harus di isi');
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
        phone,
      },
    );
    if (matchedCount <= 0) throw new Error('update failed');
    if (modifiedCount <= 0) throw new Error('data is uptodate');

    return { data: [], message: 'update success' } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
