import { ScrapingAccount } from '~/server/models/ScrapingAccount.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';
import { Types } from 'mongoose';

export default defineEventHandler(async (event) => {
  const body = await readFormData(event);
  const { params } = event.context;

  try{
    const file = body.get('session');

    if (!file || typeof file === 'string') {
      throw new Error('session.json file not found in request');
    }

    const fileText = await file.text();
    const sessionData = JSON.parse(fileText);
    const sessionId = params?.id as string

     const res = await ScrapingAccount.findOne({_id: new Types.ObjectId(sessionId)});

    console.log('params', params)
    console.log('sessionData', sessionData)
    console.log('res', res)


  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
