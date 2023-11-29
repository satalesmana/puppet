import { ScrapingAccount } from '~/server/models/ScrapingAccount.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const account = body.name;
    const email = body.email;
    const password = body.password;
    const type = body.type;

    if (account === '') throw new Error('name harus di isi');
    if (email === '') throw new Error('email harus di isi');
    if (password === '') throw new Error('password harus di isi');
    if (type === '') throw new Error('type harus di isi');

    const cekMail = await ScrapingAccount.findOne({ email });
    if (cekMail) throw new Error('email already exist');

    const { id, name } = getMetadata(event);

    const res = await ScrapingAccount.create({
      name: account,
      email,
      password,
      type,
      created_by: {
        name,
        email: id,
      },
    });

    return { data: res, message: 'data hasbeen saved' } as ApiResponse<
      [],
      string
    >;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
