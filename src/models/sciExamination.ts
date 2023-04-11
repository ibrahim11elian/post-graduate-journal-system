import { db } from '../database';

export type SCIEXAMINATION = {
  id?: number;
  researchId: number;
};

export class SciExamination {
  async create(sciExamination: SCIEXAMINATION): Promise<SCIEXAMINATION | null> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO sci_examination (research_id) VALUES ($1) RETURNING *';

      const result = await conn.query(sql, [sciExamination.researchId]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to create sci examination (researchId: ${sciExamination.researchId}): ${error}`
      );
    }
  }

  async index(): Promise<SCIEXAMINATION[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM sci_examination';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to retrieve sci examinations: ${error}`);
    }
  }

  async show(id: SCIEXAMINATION['id']): Promise<SCIEXAMINATION | null> {
    const conn = await db.connect();
    try {
      const sql = 'SELECT * FROM sci_examination WHERE id = $1';

      const result = await conn.query(sql, [id]);

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to retrieve sci examination: ${error}`);
    } finally {
      conn.release();
    }
  }

  async update(
    id: SCIEXAMINATION['id'],
    updatedColumns: object
  ): Promise<SCIEXAMINATION> {
    try {
      const conn = await db.connect();
      const keys = Object.keys(updatedColumns);
      const values = Object.values(updatedColumns);
      const setExpressions = keys
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');

      const sql = `UPDATE sci_examination SET ${setExpressions} WHERE id = $1`;

      const result = await conn.query(sql, [id, ...values]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to update sci examination: ${error}`);
    }
  }

  async delete(id: SCIEXAMINATION['id']): Promise<string> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM sci_examination WHERE id = $1';

      await conn.query(sql, [id]);

      conn.release();

      return `sci examination deleted with id: ${id}`;
    } catch (error) {
      throw new Error(`unable to delete sci examination: ${error}`);
    }
  }
}
