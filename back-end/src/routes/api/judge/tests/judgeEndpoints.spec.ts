import request from 'supertest';
import { app } from '../../../../server';
import { JUDGE } from '../../../../models/judge';

describe('Judge Endpoints', () => {
  let judgeId: number;

  it('should create a new judge', async () => {
    const newJudge: JUDGE = {
      judge_name: 'John Smith',
      judge_degree: 'captain',
    };

    const response = await request(app).post('/api/judge').send(newJudge);
    judgeId = response.body.data.id;
    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.data.judge_name).toBe(newJudge.judge_name);
  });

  it('should retrieve all judges', async () => {
    const response = await request(app).get('/api/judge');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('should retrieve a specific judge by ID', async () => {
    const response = await request(app).get(`/api/judge/${judgeId}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it('should update a judge', async () => {
    const updatedJudge: Partial<JUDGE> = {
      judge_name: 'Jane Smith',
    };

    const response = await request(app)
      .put(`/api/judge/${judgeId}`)
      .send(updatedJudge);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.judge_name).toBe(updatedJudge.judge_name);
  });

  it('should delete a judge', async () => {
    const response = await request(app).delete(`/api/judge/${judgeId}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe(
      `Judge with ID ${judgeId} has been deleted`
    );
  });
});
