import jwt from 'jsonwebtoken';
import { config } from '../config/app.config';

export const generateAccessToken = (
  userId: string,
  sessionId: string,
  userRole: string,
  userPoste: string
) =>
  jwt.sign(
    { userId: userId, sessionId: sessionId, userRole: userRole , userPoste: userPoste},
        config.JWT_ACCESS_SECRET as string,
    {
      expiresIn: "1d",
      audience: ['user'],
    },
  );

export const generateAllTokens = (
  userId: string,
  sessionId: string,
  userRole: string,
  userPoste: string
) => {
  const Token = generateAccessToken(userId, sessionId, userRole, userPoste);
  return Token;
};

export const verifyJwtToken = (token: string, secret: string) => {
  try {
    const payload: any = jwt.verify(token, secret);
    return { payload };
  } catch (err: any) {
    return {
      error: err.message,
    };
  }
};