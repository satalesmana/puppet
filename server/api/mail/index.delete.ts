import { MailMessages } from '~/server/models/MailMessages.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const deletedItem = body?.deleted || [];

    const { deletedCount } = await MailMessages.deleteMany({
      _id: deletedItem,
    });
    if (deletedCount <= 0) throw new Error('delete failed');

    return { data: [], message: 'delete success' } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
