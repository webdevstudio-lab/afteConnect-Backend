import { CookieOptions, Response } from 'express';
import { config } from '../config/app.config';

type CookiePayloadType = {
  res: Response;
  token: any;
};

const defaults: CookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === 'production' ? true : false,
  sameSite: config.NODE_ENV === 'production' ? 'strict' : 'lax',
};

const TokentOptions = {
  ...defaults,
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
};


export const setAuthCookies = ({
  res,
  token,
}: CookiePayloadType) => {
  res.cookie('_Afteconnet_Token', token, TokentOptions);
};
