import { ScrapingTask } from '~/server/models/ScrapingTask.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const { params } = event.context;

    const { deletedCount } = await ScrapingTask.deleteOne({
      _id: params?.id,
      status: 'open',
    });
    if (deletedCount <= 0) throw new Error('delete failed');

    return { data: [], message: 'delete success' } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
