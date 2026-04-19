import {
  ScrapingAccount,
  allowType,
} from '~/server/models/ScrapingAccount.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const cookiesToken = body.cookies;
    const account_id = body.account_id;
    const id = body._id;

    if (cookiesToken === '' || cookiesToken === undefined || cookiesToken === null) throw new Error('Token harus di isi');
    if (account_id === '' || account_id === undefined || account_id === null) throw new Error('Account Id harus di isi');
    if (id === '' || id === undefined || id === null) throw new Error('Invalid Id');

    const { modifiedCount, matchedCount } = await ScrapingAccount.updateOne(
      { _id: id },
      {
        cookies: cookiesToken,
        account_id,
      },
    );

    if (matchedCount <= 0) throw new Error('update failed');
    if (modifiedCount <= 0) throw new Error('data is uptodate');

    return { data: [], message: 'update success' } as ApiResponse<[], string>;
  } catch (error) {
    console.log(error)
    return error as ApiResponse<[], string>;
  }
});
