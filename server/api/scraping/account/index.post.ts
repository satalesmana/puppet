import { ScrapingAccount } from '~/server/models/ScrapingAccount.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const account = body.name;
    const email = body.email;
    const password = body.password;
    const type = body.type;
    const phone = body.phone;

    if (account === '') throw new Error('name harus di isi');
    if (type === '') throw new Error('type harus di isi');
    if (type === 'kupu') {
      if (phone === '') throw new Error('type harus di isi');

      const cekPhone = await ScrapingAccount.findOne({ phone, type });
      if (cekPhone) throw new Error('phone already exist');
    } else {
      if (email === '') throw new Error('email harus di isi');
      if (password === '') throw new Error('password harus di isi');

      const cekMail = await ScrapingAccount.findOne({ email, type });
      if (cekMail) throw new Error('email already exist');
    }

    const { id, name } = getMetadata(event);

    const res = await ScrapingAccount.create({
      name: account,
      email,
      password,
      type,
      phone,
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
