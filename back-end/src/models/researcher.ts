import { db } from '../database';

export type RESEARCHER = {
  id?: number;
  researcher_name: string;
  rank: string;
  workplace: string;
  email: string;
  phone: number;
  cv?: string;
  photo?: string;
};

// The normalize('NFKD') method ensures that all Arabic characters are decomposed into their basic components, and the replace method removes any combining diacritical marks (like harakat) from the text.
function normalizeArabicText(text: string) {
  return text.normalize('NFKD').replace(/[\u064B-\u065F]/g, '');
}

function addDoubleAmpersand(inputText: string) {
  const words = inputText.split(' ');
  let resultText = '';

  for (let i = 0; i < words.length; i++) {
    resultText += words[i];

    if (i < words.length - 1) {
      resultText += ' & ';
    }
  }

  return resultText;
}

export class Researcher {
  async create(researcher: RESEARCHER): Promise<RESEARCHER | null> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO researcher (researcher_name,rank,workplace,email,phone,cv,photo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

      const result = await conn.query(sql, [
        researcher.researcher_name,
        researcher.rank,
        researcher.workplace,
        researcher.email,
        researcher.phone,
        researcher.cv,
        researcher.photo,
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to create researcher (${researcher.researcher_name}): ${error}`
      );
    }
  }

  async index(): Promise<RESEARCHER[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM researcher';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to retrieve researchers: ${error}`);
    }
  }

  async showById(id: RESEARCHER['id']): Promise<RESEARCHER[] | null> {
    const conn = await db.connect();
    try {
      const sql = 'SELECT * FROM researcher WHERE id = $1';

      const result = await conn.query(sql, [id]);

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to retrieve researcher: ${error}`);
    } finally {
      conn.release();
    }
  }

  async show(
    name: RESEARCHER['researcher_name']
  ): Promise<RESEARCHER[] | null> {
    const conn = await db.connect();
    const normalizedQuery = addDoubleAmpersand(normalizeArabicText(name));

    try {
      const sql = `SELECT * FROM researcher WHERE to_tsvector('arabic', unaccent(researcher_name)) @@ to_tsquery('arabic', unaccent($1));`;

      const result = await conn.query(sql, [normalizedQuery]);

      return result.rows;
    } catch (error) {
      throw new Error(`unable to retrieve researcher: ${error}`);
    } finally {
      conn.release();
    }
  }

  //   most of this function made by chatGPT
  async update(
    id: RESEARCHER['id'],
    updatedColumns: object
  ): Promise<RESEARCHER> {
    try {
      const conn = await db.connect();
      const keys = Object.keys(updatedColumns);
      const values = Object.values(updatedColumns);
      const setExpressions = keys
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');

      const sql = `UPDATE researcher SET ${setExpressions} WHERE id = $1 RETURNING *`;

      const result = await conn.query(sql, [id, ...values]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to update researcher: ${error}`);
    }
  }

  async delete(id: RESEARCHER['id']): Promise<string> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM researcher WHERE id = $1';

      await conn.query(sql, [id]);

      conn.release();

      return `researcher deleted with id: ${id}`;
    } catch (error) {
      throw new Error(`unable to delete researcher: ${error}`);
    }
  }
}
