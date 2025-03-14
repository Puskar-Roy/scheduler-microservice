import jwt from 'jsonwebtoken';
import config from '../config/config';
import { randomInt } from 'crypto';
import rateLimit from 'express-rate-limit';
import { CorsOptions } from 'cors';


const whitelist = ["http://localhost:8000"];


export const createToken = (_id: string) => {
  if (!_id) return;

  const secret: string = config.JWT_SECRET as string;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in config');
  }

  return jwt.sign({ _id }, secret, { expiresIn: '3d' });
};

export const generateOTP = (): string => {
  const otp = randomInt(100000, 1000000);
  return otp.toString();
};


export const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});


export const corsOptions: CorsOptions = {
  origin: function (origin: string | undefined, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};