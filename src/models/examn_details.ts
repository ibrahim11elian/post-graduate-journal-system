import { db } from '../database';

export type EXAMN_DETAILS = {
  id?: number;
  judgeLetter: number;
  letterDate: Date;
  result: string;
  judgeId: number;
  sciExaminationId: number;
};

export class ExamnDetails {
  async create(examnDetails: EXAMN_DETAILS): Promise<EXAMN_DETAILS | null> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO examn_details (judge_letter, letter_date, result, judge_id, sci_examination_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';

      const result = await conn.query(sql, [
        examnDetails.judgeLetter,
        examnDetails.letterDate,
        examnDetails.result,
        examnDetails.judgeId,
        examnDetails.sciExaminationId,
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to create examn details: ${error}`);
    }
  }

  async index(): Promise<EXAMN_DETAILS[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM examn_details';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to retrieve examn details: ${error}`);
    }
  }

  async show(id: EXAMN_DETAILS['id']): Promise<EXAMN_DETAILS | null> {
    const conn = await db.connect();
    try {
      const sql = 'SELECT * FROM examn_details WHERE id = $1';

      const result = await conn.query(sql, [id]);

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to retrieve examn details: ${error}`);
    } finally {
      conn.release();
    }
  }

  async update(
    id: EXAMN_DETAILS['id'],
    updatedColumns: object
  ): Promise<EXAMN_DETAILS> {
    try {
      const conn = await db.connect();
      const keys = Object.keys(updatedColumns);
      const values = Object.values(updatedColumns);
      const setExpressions = keys
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');

      const sql = `UPDATE examn_details SET ${setExpressions} WHERE id = $1`;

      const result = await conn.query(sql, [id, ...values]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to update examn details: ${error}`);
    }
  }

  async delete(id: EXAMN_DETAILS['id']): Promise<string> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM examn_details WHERE id = $1';

      await conn.query(sql, [id]);

      conn.release();

      return `examn details deleted with id: ${id}`;
    } catch (error) {
      throw new Error(`unable to delete examn details: ${error}`);
    }
  }
}
