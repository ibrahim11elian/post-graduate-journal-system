import { db } from '../database';

export type JUDGE = {
  id?: number;
  judge_name?: string;
  judge_degree?: string;
};

// The normalize('NFKD') method ensures that all Arabic characters are decomposed into their basic components, and the replace method removes any combining diacritical marks (like harakat) from the text.
function normalizeArabicText(text: string) {
  return text.normalize('NFKD').replace(/[\u064B-\u065F]/g, '');
}

export class Judge {
  async create(judge: JUDGE): Promise<JUDGE | null> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO the_judge (judge_name,degree) VALUES ($1, $2) RETURNING *';

      const result = await conn.query(sql, [
        judge.judge_name,
        judge.judge_degree,
      ]);

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
      const sql =
        'SELECT id, judge_name, degree AS judge_degree FROM the_judge WHERE id = $1';

      const result = await conn.query(sql, [id]);

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to retrieve judge: ${error}`);
    } finally {
      conn.release();
    }
  }

  async showByName(name: JUDGE['judge_name']): Promise<JUDGE[] | null> {
    const conn = await db.connect();
    const normalizedQuery = normalizeArabicText(name as string);

    try {
      const sql =
        'SELECT id, judge_name, degree AS judge_degree FROM the_judge WHERE remove_spaces(unaccent(judge_name)) LIKE remove_spaces($1)';

      const result = await conn.query(sql, [`%${normalizedQuery}%`]);

      return result.rows;
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
