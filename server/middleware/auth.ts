import jwt from 'jsonwebtoken';
import type { ApiResponse }  from '~/server/types/apiresponse.interface';

export default defineEventHandler(async (event) => {
  try{
    const url= getRequestURL(event);
    const forbidenPath = ['/api/user'];

    if(forbidenPath.includes(url.pathname)){
      const config = useRuntimeConfig();
      const { authorization } = getHeaders(event);

      if(!authorization) throw new Error('not authorize');
      const cleanToken = authorization.split(" ")

      const isValidToken = await jwt.verify(cleanToken[1], config.secretKey)
      if(!isValidToken) throw new Error('invalid token');
    }
  }catch(error){
    return error as ApiResponse<[],string>;
  }
})
