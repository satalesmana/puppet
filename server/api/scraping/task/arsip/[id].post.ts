import { ScrapingTask } from '~/server/models/ScrapingTask.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const { params } = event.context;

    await ScrapingTask.updateOne({ _id: params?.id }, { status: 'arsip' });

    return {
      data: [],
      message: `data berhasil di arsipkan ${params?.id}`,
    } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
