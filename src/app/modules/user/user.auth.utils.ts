import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { user_email: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};