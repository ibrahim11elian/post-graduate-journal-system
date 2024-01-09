import { User } from '../../../models/user';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const user = new User();

async function login(req: Request, res: Response) {
  const user_name = req.body.user_name;

  const user_r = await user.show(user_name);

  if (user_r == null) {
    return res.status(400).send('can not find the user');
  }

  try {
    if (await bcrypt.compare(req.body.pass_hash, user_r.pass_hash)) {
      const user = { name: user_name };
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as Secret);
      res.status(200).send({ accessToken: token });
    } else {
      res.status(401).send('password is wrong!!!');
    }
  } catch (error) {
    res.status(500).send('error:' + error);
  }
}

export default { login };
