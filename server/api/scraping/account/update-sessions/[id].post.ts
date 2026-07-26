import { ScrapingAccount } from '~/server/models/ScrapingAccount.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';
import { Types } from 'mongoose';

export default defineEventHandler(async (event) => {
  const body = await readFormData(event);
  const { params } = event.context;

  const  getCookieHeader=(session: any[], cookiesTaken:string[]) => {
    return session
      // .filter(cookie => cookiesTaken.includes(cookie.name))
      .map(cookie => `${cookie.name}=${cookie.value}`)
      .join('; ')
  }

  try{
    const file = body.get('session');

    if (!file || typeof file === 'string') {
      throw new Error('session.json file not found in request');
    }

    const fileText = await file.text();
    const sessionData = JSON.parse(fileText);
    const sessionId = params?.id as string
    const res = await ScrapingAccount.findOne({_id: new Types.ObjectId(sessionId)});
    const updateData:any = {
      cookies: null,
      account_id: null
    }

    if(res.type==='glints'){
      const glintsEmployersApp = JSON.parse(sessionData.localStorage.glintsEmployersApp)

      updateData.cookies = glintsEmployersApp.session.token;
      updateData.account_id = glintsEmployersApp.session.data.company.id;
    }

    if(res.type==='indeed'){
      const cookiesTaken = ['__Secure-PassportAuthProxy-BearerToken', 'PPID', '__Secure-PassportAuthProxy-OauthExpires', '__Secure-PassportAuthProxy-OauthHMAC', '__Secure-PassportAuthProxy-RefreshToken','__cf_bm']
      updateData.cookies = getCookieHeader(sessionData.cookies, cookiesTaken) as string
    }

    await ScrapingAccount.updateOne({ _id: params?.id }, updateData)

    return { data: [], message: 'update success' } as ApiResponse<[], string>;
  } catch (error) {
    return error as ApiResponse<[], string>;
  }
});
