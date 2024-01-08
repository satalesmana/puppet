import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const cookies = body?.cookies || null;

    if (cookies === '' || cookies === null) {
      throw new Error('invalid cookies / token, please login first');
    }

    const res = await getJobProviderList({ cookies });

    return { data: res, message: '' } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
