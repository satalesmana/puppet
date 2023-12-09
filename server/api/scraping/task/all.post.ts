import { ScrapingTask } from '~/server/models/ScrapingTask.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const filter = body?.filter || {};

    const res = await ScrapingTask.find(filter);

    return { data: res, message: '' } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
