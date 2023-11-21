import { USER, User } from '../../../models/user';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const user = new User();

async function update(req: Request, res: Response) {
  const user_name = req.body.user_name;
  const new_user_name = req.body.new_user_name;
  const new_password = req.body.new_password;
  const user_r = await user.show(user_name);

  if (user_r == null) {
    return res.status(400).send('can not find the user');
  }
  let updatedUser: USER;
  try {
    if (await bcrypt.compare(req.body.pass_hash, user_r.pass_hash)) {
      const new_hashed_pass = await bcrypt.hash(new_password, 10);
      if (new_user_name) {
        const taken_user = await user.show(new_user_name);
        if (taken_user) {
          return res.status(403).send('username is taken');
        } else {
          updatedUser = await user.update(user_r.id, {
            user_name: new_user_name,
            pass_hash: new_hashed_pass,
          });
        }
      } else {
        updatedUser = await user.update(user_r.id, {
          pass_hash: new_hashed_pass,
        });
      }

      const username = { name: updatedUser.user_name };
      const token = jwt.sign(
        username,
        process.env.ACCESS_TOKEN_SECRET as Secret
      );
      res.status(200).send({ accessToken: token });
    } else {
      res.status(401).send('password is wrong!!!');
    }
  } catch (error) {
    res.status(5000).send('error:' + error);
  }
}

export default update;
