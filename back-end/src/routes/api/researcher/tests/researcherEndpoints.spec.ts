import { app } from '../../../../server';
import request from 'supertest';

describe('Researcher API Endpoints', () => {
  // Test data for creating a researcher
  const newResearcher = {
    researcher_name: 'John Doe',
    rank: 'Senior Researcher',
    workplace: 'University XYZ',
    email: 'john.doe@example.com',
    phone: 1234567890,
    cv: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  };

  // Store the ID of the created researcher for later tests
  let createdResearcherId: number;

  // Test case for creating a researcher
  it('should create a new researcher', async () => {
    const response = await request(app)
      .post('/api/researcher')
      .send(newResearcher)
      .expect(201);

    // Store the created researcher ID
    createdResearcherId = response.body.data.id;
  });

  // Test case for retrieving a specific researcher by ID
  it('should retrieve a specific researcher by ID', async () => {
    const response = await request(app)
      .get(`/api/researcher/${createdResearcherId}`)
      .expect(200);

    expect(response.body.data.id).toBeTruthy;
  });

  // Test case for retrieving a specific researcher by name
  it('should retrieve a specific researcher by name', async () => {
    const response = await request(app)
      .get(`/api/researcher/${newResearcher.researcher_name}`)
      .expect(200);

    expect(response.status).toBe(200);
  });

  // Test case for updating a researcher
  it('should update a researcher', async () => {
    const updatedData = {
      researcher_name: 'John Smith',
      rank: 'Principal Researcher',
    };

    const response = await request(app)
      .put(`/api/researcher/${createdResearcherId}`)
      .send(updatedData)
      .expect(200);

    expect(response.body.data.researcher_name).toBeTruthy;
  });

  // Test case for deleting a researcher
  it('should delete a researcher', async () => {
    await request(app)
      .delete(`/api/researcher/${createdResearcherId}`)
      .expect(200);
  });
});
