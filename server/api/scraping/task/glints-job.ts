import type { ApiResponse } from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const cookies = body?.cookies || null;
    const accountId = body?.account_id || null;

    if (cookies === '' || cookies === null) {
      throw new Error('invalid cookies / token, please login first');
    }

    if (accountId === '' || accountId === null) {
      throw new Error('invalid account id');
    }

    const res = await fetch(`https://employers.glints.id/api/v2/companies/${accountId}/jobs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${cookies}`,
      },
    });
    const data = await res.json();

    return { data: data.jobs, message: '' } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
