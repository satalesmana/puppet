import jwt from 'jsonwebtoken';

export const getMetadata =(event:any)=>{
  const { authorization } = getHeaders(event);
  if(authorization){
    const cleanToken = authorization.split(" ")

    const { payload } = jwt.decode(cleanToken[1], { complete: true });

    return payload || null
  }
  return null
}
