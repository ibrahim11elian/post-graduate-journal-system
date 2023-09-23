import { db } from '../database';

export type JUDGEINFO = {
  id?: number;
  j_name?: string;
  degree?: string;
  spec?: string;
};

// The normalize('NFKD') method ensures that all Arabic characters are decomposed into their basic components, and the replace method removes any combining diacritical marks (like harakat) from the text.
function normalizeArabicText(text: string) {
  return text.normalize('NFKD').replace(/[\u064B-\u065F]/g, '');
}

export class JudgeInfo {
  async create(judge: JUDGEINFO): Promise<JUDGEINFO | null> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO judge_info (j_name,degree,spec) VALUES ($1, $2, $3) RETURNING *';

      const result = await conn.query(sql, [
        judge.j_name,
        judge.degree,
        judge.spec,
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to create judge (name: ${judge.j_name}): ${error}`
      );
    }
  }

  async index(): Promise<JUDGEINFO[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM judge_info';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to retrieve judges: ${error}`);
    }
  }

  async showById(id: JUDGEINFO['id']): Promise<JUDGEINFO | null> {
    const conn = await db.connect();
    try {
      const sql = 'SELECT * FROM judge_info WHERE id = $1';

      const result = await conn.query(sql, [id]);

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to retrieve judge: ${error}`);
    } finally {
      conn.release();
    }
  }

  async showByNameAndSpec(
    name: JUDGEINFO['j_name'],
    spec: JUDGEINFO['spec']
  ): Promise<JUDGEINFO | null> {
    const conn = await db.connect();

    const normalizedName = normalizeArabicText(name as string);
    try {
      const sql =
        'SELECT * FROM judge_info WHERE remove_spaces(unaccent(j_name)) = remove_spaces($1) AND spec = $2';

      const result = await conn.query(sql, [normalizedName, spec]);

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to retrieve judge: ${error}`);
    } finally {
      conn.release();
    }
  }

  async showBySpec(spec: JUDGEINFO['spec']): Promise<JUDGEINFO[] | null> {
    const conn = await db.connect();
    try {
      const sql = 'SELECT * FROM judge_info WHERE spec = $1';

      const result = await conn.query(sql, [spec]);

      return result.rows;
    } catch (error) {
      throw new Error(`unable to retrieve judge: ${error}`);
    } finally {
      conn.release();
    }
  }

  async update(
    id: JUDGEINFO['id'],
    updatedColumns: object
  ): Promise<JUDGEINFO> {
    try {
      const conn = await db.connect();
      const keys = Object.keys(updatedColumns);
      const values = Object.values(updatedColumns);
      const setExpressions = keys
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');

      const sql = `UPDATE judge_info SET ${setExpressions} WHERE id = $1 RETURNING *`;

      const result = await conn.query(sql, [id, ...values]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to update judge: ${error}`);
    }
  }

  async delete(id: JUDGEINFO['id']): Promise<string> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM judge_info WHERE id = $1';

      await conn.query(sql, [id]);

      conn.release();

      return `judge deleted with id: ${id}`;
    } catch (error) {
      throw new Error(`unable to delete judge: ${error}`);
    }
  }
}
