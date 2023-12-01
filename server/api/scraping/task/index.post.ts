import { Types } from 'mongoose';
import { ScrapingTask } from '~/server/models/ScrapingTask.model';
import { ScrapingAccount } from '~/server/models/ScrapingAccount.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const accountScraping = body.scraping_account as string;
    const initialId = body.initial_id;
    const initialPage = body.initial_page;
    const billerId = body.biller_id;
    const counter = body.counter;
    const status = body.status;

    if (accountScraping === '') throw new Error('account harus di isi');
    if (initialId === '') throw new Error('initial id harus di isi');
    if (initialPage === '') throw new Error('initial page harus di isi');
    if (counter === '') throw new Error('counter harus di isi');
    if (status === '') throw new Error('status harus di isi');
    if (billerId === '') throw new Error('biller id harus di isi');

    const scripingAccountId = new Types.ObjectId(accountScraping);
    const scrapingAccount = await ScrapingAccount.findById(scripingAccountId);

    const { id, name } = getMetadata(event);

    const res = await ScrapingTask.create({
      scraping_account: {
        _id: accountScraping,
        name: scrapingAccount.name,
        type: scrapingAccount.type,
        email: scrapingAccount.email,
      },
      initial_id: initialId,
      initial_page: initialPage,
      biller_id: billerId,
      counter,
      status,
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
    const message = error?.message as string;
    if (
      message.includes(
        'input must be a 24 character hex string, 12 byte Uint8Array',
      )
    ) {
      error.message = 'invalid scraping account';
    }
    return error as ApiResponse<[], string>;
  }
});
