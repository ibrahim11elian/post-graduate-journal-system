import request from 'supertest';
import { app } from '../../../../server';
import { SCIEXAMINATION } from '../../../../models/sciExamination';
import { Researcher, RESEARCHER } from '../../../../models/researcher';
import { Research, RESEARCH } from '../../../../models/research';

describe('SciExamination Endpoints', () => {
  const researcher = new Researcher();
  const research = new Research();
  let sciExaminationId: number;

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

  it('should create a new sci examination', async () => {
    const newSciExamination: SCIEXAMINATION = {
      research_id: createdResearch?.id as number,
    };

    const response = await request(app)
      .post('/api/sci-examination')
      .send(newSciExamination);

    sciExaminationId = response.body.data.id;

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.data.research_id).toBe(newSciExamination.research_id);
  });

  it('should retrieve all sci examinations', async () => {
    const response = await request(app).get('/api/sci-examination');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('should retrieve a specific sci examination by ID', async () => {
    const response = await request(app).get(
      `/api/sci-examination/${sciExaminationId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it('should delete a sci examination', async () => {
    const response = await request(app).delete(
      `/api/sci-examination/${sciExaminationId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe(
      `Sci examination with ID ${sciExaminationId} has been deleted`
    );
  });
});
