import { db } from '../database';

export type SCIEXAMINATION = {
  id?: number;
  research_id: number;
};

export class SciExamination {
  async create(sciExamination: SCIEXAMINATION): Promise<SCIEXAMINATION | null> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO sci_examination (research_id) VALUES ($1) RETURNING *';

      const result = await conn.query(sql, [sciExamination.research_id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to create sci examination (researchId: ${sciExamination.research_id}): ${error}`
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
