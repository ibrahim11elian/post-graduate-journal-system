import { db } from '../database';

export type JUDGE = {
  id?: number;
  judge_name: string;
};

export class Judge {
  async create(judge: JUDGE): Promise<JUDGE | null> {
    try {
      const conn = await db.connect();
      const sql = 'INSERT INTO the_judge (judge_name) VALUES ($1) RETURNING *';

      const result = await conn.query(sql, [judge.judge_name]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to create judge (name: ${judge.judge_name}): ${error}`
      );
    }
  }

  async index(): Promise<JUDGE[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM the_judge';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to retrieve judges: ${error}`);
    }
  }

  async show(id: JUDGE['id']): Promise<JUDGE | null> {
    const conn = await db.connect();
    try {
      const sql = 'SELECT * FROM the_judge WHERE id = $1';

      const result = await conn.query(sql, [id]);

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to retrieve judge: ${error}`);
    } finally {
      conn.release();
    }
  }

  async update(id: JUDGE['id'], updatedColumns: object): Promise<JUDGE> {
    try {
      const conn = await db.connect();
      const keys = Object.keys(updatedColumns);
      const values = Object.values(updatedColumns);
      const setExpressions = keys
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');

      const sql = `UPDATE the_judge SET ${setExpressions} WHERE id = $1 RETURNING *`;

      const result = await conn.query(sql, [id, ...values]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to update judge: ${error}`);
    }
  }

  async delete(id: JUDGE['id']): Promise<string> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM the_judge WHERE id = $1';

      await conn.query(sql, [id]);

      conn.release();

      return `judge deleted with id: ${id}`;
    } catch (error) {
      throw new Error(`unable to delete judge: ${error}`);
    }
  }
}
