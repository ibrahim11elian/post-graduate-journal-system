import { db } from '../database';

export type EXAMEN_DETAILS = {
  id?: number;
  judge_letter?: number;
  letter_date?: Date;
  result?: string;
  edit_letter?: number;
  edit_date?: number;
  judge_id: number;
  sci_Examination_id: number;
};

export class ExamenDetails {
  async create(examenDetails: EXAMEN_DETAILS): Promise<EXAMEN_DETAILS | null> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO examn_details (judge_letter, letter_date, result,edit_letter, edit_date, judge_id, sci_examination_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

      const result = await conn.query(sql, [
        examenDetails.judge_letter || null,
        examenDetails.letter_date || null,
        examenDetails.result || null,
        examenDetails.edit_letter || null,
        examenDetails.edit_date || null,
        examenDetails.judge_id || null,
        examenDetails.sci_Examination_id,
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to create examen details: ${error}`);
    }
  }

  async index(): Promise<EXAMEN_DETAILS[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM examn_details';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to retrieve examen details: ${error}`);
    }
  }

  async show(id: EXAMEN_DETAILS['id']): Promise<EXAMEN_DETAILS | null> {
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

  async showByExamenId(id: number): Promise<EXAMEN_DETAILS[] | null> {
    const conn = await db.connect();
    try {
      const sql = 'SELECT * FROM examn_details WHERE sci_Examination_id = $1';

      const result = await conn.query(sql, [id]);

      return result.rows;
    } catch (error) {
      throw new Error(`unable to retrieve examn details: ${error}`);
    } finally {
      conn.release();
    }
  }

  async update(
    id: EXAMEN_DETAILS['id'],
    updatedColumns: object
  ): Promise<EXAMEN_DETAILS> {
    try {
      const conn = await db.connect();
      const keys = Object.keys(updatedColumns);

      const values = Object.values(updatedColumns);

      const setExpressions = keys
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');

      const sql = `UPDATE examn_details SET ${setExpressions} WHERE id = $1 RETURNING *`;

      const result = await conn.query(sql, [id, ...values]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to update examn details: ${error}`);
    }
  }

  async delete(id: EXAMEN_DETAILS['id']): Promise<string> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM examn_details WHERE id = $1';

      await conn.query(sql, [id]);

      conn.release();

      return `examen details deleted with id: ${id}`;
    } catch (error) {
      throw new Error(`unable to delete examen details: ${error}`);
    }
  }
}
