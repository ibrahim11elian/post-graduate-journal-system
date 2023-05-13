import { db } from '../database';

export type JOURNAL = {
  id?: number;
  journal_edition: number;
  edition_date: Date;
  research_id: number;
};

export class Journal {
  async create(journal: JOURNAL): Promise<JOURNAL | null> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO journal (journal_edition, edition_date, research_id) VALUES ($1, $2, $3) RETURNING *';

      const result = await conn.query(sql, [
        journal.journal_edition,
        journal.edition_date,
        journal.research_id,
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to create journal (edition: ${journal.journal_edition}): ${error}`
      );
    }
  }

  async index(): Promise<JOURNAL[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM journal';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to retrieve journals: ${error}`);
    }
  }

  async show(id: JOURNAL['id']): Promise<JOURNAL | null> {
    const conn = await db.connect();
    try {
      const sql = 'SELECT * FROM journal WHERE id = $1';

      const result = await conn.query(sql, [id]);

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to retrieve journal: ${error}`);
    } finally {
      conn.release();
    }
  }

  async update(id: JOURNAL['id'], updatedColumns: object): Promise<JOURNAL> {
    try {
      const conn = await db.connect();
      const keys = Object.keys(updatedColumns);
      const values = Object.values(updatedColumns);
      const setExpressions = keys
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');

      const sql = `UPDATE journal SET ${setExpressions} WHERE id = $1 RETURNING *`;

      const result = await conn.query(sql, [id, ...values]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to update journal: ${error}`);
    }
  }

  async delete(id: JOURNAL['id']): Promise<string> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM journal WHERE id = $1';

      await conn.query(sql, [id]);

      conn.release();

      return `journal deleted with id: ${id}`;
    } catch (error) {
      throw new Error(`unable to delete journal: ${error}`);
    }
  }
}
