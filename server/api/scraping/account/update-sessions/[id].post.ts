import { ScrapingAccount } from '~/server/models/ScrapingAccount.model';
import type { ApiResponse } from '~/server/types/apiresponse.interface';
import { Types } from 'mongoose';

export default defineEventHandler(async (event) => {
  try{
    const body = await readBody(event);
    const { params } = event.context;

    const  getCookieHeader=(session: any[], cookiesTaken:string[]) => {
      return session
        // .filter(cookie => cookiesTaken.includes(cookie.name))
        .map(cookie => `${cookie.name}=${cookie.value}`)
        .join('; ')
    }

    const updateData:any = { cookies: null, account_id: null }

    if(body.session){
      const sessionData = body.session;

      const sessionId = params?.id as string
      const res = await ScrapingAccount.findOne({_id: new Types.ObjectId(sessionId)});

      if (!res) {
        throw createError({
          statusCode: 404,
          statusMessage: "Invalid fetch data account",
        });
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

      if(res.type==='jobstreet'){
        const authKey = Object.keys(sessionData.localStorage).find(
          key =>
            key.includes('@@auth0spajs@@') &&
            key.includes('https://seek/api/talent')
        )

        if(authKey){
          const data = JSON.parse(sessionData.localStorage[authKey])
          updateData.cookies = data.body?.access_token ?? null;
        }
      }

      await ScrapingAccount.updateOne({ _id: params?.id }, updateData)
    }

    if(!updateData.cookies){
      throw new Error('No data session updated, check your session data and account type')
    }

    return { data: [], message: 'update success' } as ApiResponse<[], string>;
  } catch (error) {
    // return error as ApiResponse<[], string>;
    console.log('[update-session]', JSON.stringify(error) )
    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : "Unknown error",
    });
  }
});
