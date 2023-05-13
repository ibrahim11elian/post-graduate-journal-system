import request from 'supertest';
import { app } from '../../../../server';

describe('Research API', () => {
  let researcherId: number;
  let researchId: number;

  // Create a researcher before running the tests
  beforeAll(async () => {
    const response = await request(app).post('/api/researcher').send({
      researcher_name: 'John Doe',
      rank: 'Senior Researcher',
      workplace: 'ABC University',
      email: 'johndoe@example.com',
      phone: '1234567890',
      cv: 'Lorem ipsum dolor sit amet',
    });
    researcherId = response.body.data.id;
  });

  // Clean up the created researcher after running the tests
  afterAll(async () => {
    await request(app).delete(`/api/researcher/${researcherId}`);
  });

  // Test the creation of a research
  it('should create a new research', async () => {
    const response = await request(app).post('/api/research').send({
      research_title: 'Test Research',
      research_pdf: 'test.pdf',
      research_summary: 'This is a test research',
      research_date: '2023-05-13',
      researcher_id: researcherId,
    });

    researchId = response.body.data.id;
    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
  });

  // Test the retrieval of all researches
  it('should get all researches', async () => {
    const response = await request(app).get('/api/research');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toBeInstanceOf(Array);
  });

  // Test the retrieval of a specific research
  it('should get a specific research', async () => {
    const response = await request(app).get(`/api/research/${researchId}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data[0].id).toBe(researchId);
  });

  // Test the update of a research
  it('should update a research', async () => {
    const response = await request(app)
      .put(`/api/research/${researchId}`)
      .send({
        research_summary: 'Updated research summary',
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.id).toBe(researchId);
    expect(response.body.data.research_summary).toBe(
      'Updated research summary'
    );
  });

  // Test the deletion of a research
  it('should delete a research', async () => {
    const response = await request(app).delete(`/api/research/${researchId}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toContain(
      `Research with ID ${researchId} has been deleted`
    );
  });
});
