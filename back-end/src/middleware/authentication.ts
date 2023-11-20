import { Response, Request, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

export default function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing' });
  }

  try {
    jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET as Secret);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}
