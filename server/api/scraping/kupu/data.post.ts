import { ScrapingPelamarKupu } from '~/server/models/ScrapingPelamarKupu.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const filter = body?.filter || {};

    const res = await ScrapingPelamarKupu.find(filter);

    return { data: res, message: '' } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
