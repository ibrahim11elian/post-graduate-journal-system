import { db } from '../database';
import bcrypt from 'bcrypt';

export type USER = {
  id?: number;
  user_name: string;
  pass_hash: string;
};

export class User {
  async create(user: USER): Promise<User | null> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO user_table (user_name,pass_hash) VALUES ($1, $2) RETURNING *';

      const user_r = await this.show(user.user_name);
      if (user_r) {
        throw new Error(
          `unable to create user (${user.user_name}) it's already exists`
        );
      } else {
        const hashed_pass = await bcrypt.hash(user.pass_hash, 10);
        console.log(hashed_pass);

        const result = await conn.query(sql, [user.user_name, hashed_pass]);

        conn.release();

        return result.rows[0];
      }
    } catch (error) {
      throw new Error(`unable to create user (${user.user_name}): ${error}`);
    }
  }

  async index(): Promise<USER[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM user_table';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to retrieve Users: ${error}`);
    }
  }

  async show(name: USER['user_name']): Promise<USER | null> {
    const conn = await db.connect();

    try {
      const sql = `SELECT * FROM user_table WHERE user_name = $1;`;

      const result = await conn.query(sql, [name]);

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to retrieve User: ${error}`);
    } finally {
      conn.release();
    }
  }

  //   most of this function made by chatGPT
  async update(id: USER['id'], updatedColumns: object): Promise<USER> {
    try {
      const conn = await db.connect();
      const keys = Object.keys(updatedColumns);
      const values = Object.values(updatedColumns);
      const setExpressions = keys
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');

      const sql = `UPDATE user_table SET ${setExpressions} WHERE id = $1 RETURNING *`;

      const result = await conn.query(sql, [id, ...values]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to update User: ${error}`);
    }
  }

  async delete(id: USER['id']): Promise<string> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM user_table WHERE id = $1';

      await conn.query(sql, [id]);

      conn.release();

      return `user deleted with id: ${id}`;
    } catch (error) {
      throw new Error(`unable to delete user: ${error}`);
    }
  }
}
