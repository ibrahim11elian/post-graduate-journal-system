import request from 'supertest';
import { app } from '../../../../server';
import { EXAMINATION } from '../../../../models/examination';
import { Researcher, RESEARCHER } from '../../../../models/researcher';
import { Research, RESEARCH } from '../../../../models/research';

describe('Examination Endpoints', () => {
  const researcher = new Researcher();
  const research = new Research();
  let examinationId: number;
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

  it('should create a new examination', async () => {
    const newExamination: EXAMINATION = {
      outgoing_letter: 123,
      incoming_letter: 456,
      result: 'pass',
      research_id: createdResearch?.id as number,
    };

    const response = await request(app)
      .post('/api/examination')
      .send(newExamination);
    examinationId = response.body.data.id;
    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.data.outgoing_letter).toBe(
      newExamination.outgoing_letter
    );
    expect(response.body.data.research_id).toBe(newExamination.research_id);
  });

  it('should retrieve all examinations', async () => {
    const response = await request(app).get('/api/examination');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('should retrieve a specific examination by ID', async () => {
    const response = await request(app).get(
      `/api/examination/${examinationId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it('should update a examination', async () => {
    const updatedExamination: Partial<EXAMINATION> = {
      incoming_letter: 789,
    };

    const response = await request(app)
      .put(`/api/examination/${examinationId}`)
      .send(updatedExamination);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.incoming_letter).toBe(
      updatedExamination.incoming_letter
    );
  });

  it('should delete a examination', async () => {
    const response = await request(app).delete(
      `/api/examination/${examinationId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe(
      `Examination with ID ${examinationId} has been deleted`
    );
  });
});
