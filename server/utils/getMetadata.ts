import jwt from 'jsonwebtoken';

export const getMetadata = (event: any) => {
  const { authorization } = getHeaders(event);
  if (authorization) {
    const cleanToken = authorization.split(' ');

    const { payload } =
      cleanToken[1] != null
        ? jwt.decode(cleanToken[1], { complete: true })
        : null;

    return payload;
  }
  return null;
};
