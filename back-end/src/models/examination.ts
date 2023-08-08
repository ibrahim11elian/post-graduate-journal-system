import { db } from '../database';

export type EXAMINATION = {
  id?: number;
  outgoing_letter: number;
  incoming_letter: number;
  result: string;
  research_id: number;
};

export class Examination {
  async create(examination: EXAMINATION): Promise<EXAMINATION | null> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO examination (outgoing_letter, incoming_letter, result, research_id) VALUES ($1, $2, $3, $4) RETURNING *';

      const result = await conn.query(sql, [
        examination.outgoing_letter,
        examination.incoming_letter,
        examination.result,
        examination.research_id,
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to create examination: ${error}`);
    }
  }

  async index(): Promise<EXAMINATION[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM examination';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to retrieve examinations: ${error}`);
    }
  }

  async show(id: EXAMINATION['id']): Promise<EXAMINATION | null> {
    const conn = await db.connect();
    try {
      const sql = 'SELECT * FROM examination WHERE id = $1';

      const result = await conn.query(sql, [id]);

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to retrieve examination: ${error}`);
    } finally {
      conn.release();
    }
  }

  async showByResearchId(id: number): Promise<EXAMINATION | null> {
    const conn = await db.connect();
    try {
      const sql = 'SELECT * FROM examination WHERE research_id = $1';

      const result = await conn.query(sql, [id]);

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to retrieve examination: ${error}`);
    } finally {
      conn.release();
    }
  }

  async update(
    id: EXAMINATION['id'],
    updatedColumns: object
  ): Promise<EXAMINATION> {
    try {
      const conn = await db.connect();
      const keys = Object.keys(updatedColumns);
      const values = Object.values(updatedColumns);
      const setExpressions = keys
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');

      const sql = `UPDATE examination SET ${setExpressions} WHERE id = $1 RETURNING *`;

      const result = await conn.query(sql, [id, ...values]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to update examination: ${error}`);
    }
  }

  async delete(id: EXAMINATION['id']): Promise<string> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM examination WHERE id = $1';

      await conn.query(sql, [id]);

      conn.release();

      return `examination deleted with id: ${id}`;
    } catch (error) {
      throw new Error(`unable to delete examination: ${error}`);
    }
  }
}
