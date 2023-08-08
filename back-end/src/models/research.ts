import { db } from '../database';

export type RESEARCH = {
  id?: number;
  research_title: string;
  research_pdf: string;
  research_summary: string;
  research_date: string;
  researcher_id: number;
};

export class Research {
  async create(research: RESEARCH): Promise<RESEARCH | null> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO research (research_title,research_pdf,research_summary,research_date,researcher_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';

      const result = await conn.query(sql, [
        research.research_title,
        research.research_pdf,
        research.research_summary,
        research.research_date,
        research.researcher_id,
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to create research (${research.research_title}): ${error}`
      );
    }
  }

  async index(): Promise<RESEARCH[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM research';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to retrieve researches: ${error}`);
    }
  }

  async showById(id: RESEARCH['id']): Promise<RESEARCH[] | null> {
    const conn = await db.connect();
    try {
      const sql = 'SELECT * FROM research WHERE id = $1';

      const result = await conn.query(sql, [id]);

      return result.rows;
    } catch (error) {
      throw new Error(`unable to retrieve research: ${error}`);
    } finally {
      conn.release();
    }
  }

  async show(title: RESEARCH['research_title']): Promise<RESEARCH[] | null> {
    const conn = await db.connect();
    try {
      const sql = 'SELECT * FROM research WHERE research_title = $1';

      const result = await conn.query(sql, [title]);

      return result.rows;
    } catch (error) {
      throw new Error(`unable to retrieve research: ${error}`);
    } finally {
      conn.release();
    }
  }

  async showByResearcherId(researcherID: number): Promise<RESEARCH | null> {
    const conn = await db.connect();
    try {
      const sql = 'SELECT * FROM research WHERE researcher_id = $1';

      const result = await conn.query(sql, [researcherID]);

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to retrieve research: ${error}`);
    } finally {
      conn.release();
    }
  }

  async update(id: RESEARCH['id'], updatedColumns: object): Promise<RESEARCH> {
    try {
      const conn = await db.connect();
      const keys = Object.keys(updatedColumns);
      const values = Object.values(updatedColumns);
      const setExpressions = keys
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');

      const sql = `UPDATE research SET ${setExpressions} WHERE id = $1 RETURNING *`;

      const result = await conn.query(sql, [id, ...values]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to update research: ${error}`);
    }
  }

  async delete(id: RESEARCH['id']): Promise<string> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM research WHERE id = $1';

      await conn.query(sql, [id]);

      conn.release();

      return `research deleted with id: ${id}`;
    } catch (error) {
      throw new Error(`unable to delete research: ${error}`);
    }
  }
}
