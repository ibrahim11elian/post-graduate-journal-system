import request from 'supertest';
import { app } from '../../../../server';
import { JOURNAL } from '../../../../models/journal';
import { Researcher, RESEARCHER } from '../../../../models/researcher';
import { Research, RESEARCH } from '../../../../models/research';

describe('Journal Endpoints', () => {
  const researcher = new Researcher();
  const research = new Research();
  let journalId: number;
  // Create a researcher instance
  let createdResearcher: RESEARCHER | null;

  beforeAll(async () => {
    const researcherData: RESEARCHER = {
      researcher_name: 'John Doe',
      rank: 'Senior Researcher',
      workplace: 'ABC University',
      email: 'john.doe@example.com',
      phone: 1234567890,
      cv: 'path/to/cv.pdf',
    };

    createdResearcher = await researcher.create(researcherData);
  });

  // Create a research instance
  let createdResearch: RESEARCH | null;

  beforeAll(async () => {
    const researchData: RESEARCH = {
      research_title: 'New Research',
      research_pdf: 'path/to/research.pdf',
      research_summary: 'Summary of the research',
      research_date: '2023-05-13',
      researcher_id: createdResearcher?.id as number,
    };

    createdResearch = await research.create(researchData);
  });

  it('should create a new journal', async () => {
    const newJournal: JOURNAL = {
      journal_edition: 1,
      edition_date: new Date(),
      research_id: createdResearch?.id as number,
    };

    const response = await request(app).post('/api/journal').send(newJournal);
    journalId = response.body.data.id;
    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.data.journal_edition).toBe(newJournal.journal_edition);
    expect(response.body.data.research_id).toBe(newJournal.research_id);
  });

  it('should retrieve all journals', async () => {
    const response = await request(app).get('/api/journal');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('should retrieve a specific journal by ID', async () => {
    const response = await request(app).get(`/api/journal/${journalId}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it('should update a journal', async () => {
    const updatedJournal: Partial<JOURNAL> = {
      journal_edition: 2,
    };

    const response = await request(app)
      .put(`/api/journal/${journalId}`)
      .send(updatedJournal);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.journal_edition).toBe(
      updatedJournal.journal_edition
    );
    expect(response.body.data.journal_edition).toBe(
      updatedJournal.journal_edition
    );
  });

  it('should delete a journal', async () => {
    const response = await request(app).delete(`/api/journal/${journalId}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe(
      `Journal with ID ${journalId} has been deleted`
    );
  });
});
