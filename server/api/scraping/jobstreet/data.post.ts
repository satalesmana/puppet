import { ScrapingJobstreetPelamar } from '~/server/models/ScrapingPelamarJobstreet.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const filter = body?.filter || {};

    const res = await ScrapingJobstreetPelamar.find(filter);

    return { data: res, message: '' } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
