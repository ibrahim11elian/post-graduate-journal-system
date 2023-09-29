import request from 'supertest';
import { app } from '../../../../server';
import { EXAMEN_DETAILS } from '../../../../models/examen_details';
import { Researcher, RESEARCHER } from '../../../../models/researcher';
import { Research, RESEARCH } from '../../../../models/research';
import { JUDGE, Judge } from '../../../../models/judge';
import {
  SCIEXAMINATION,
  SciExamination,
} from '../../../../models/sciExamination';

describe('Examen Details Endpoints', () => {
  const researcher = new Researcher();
  const research = new Research();
  const judge = new Judge();
  const sciExamination = new SciExamination();

  let examenDetailId: number;
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

  //   Create a sciExamination instance
  let createdSciExamination: SCIEXAMINATION | null;

  beforeAll(async () => {
    const sciExaminationData: SCIEXAMINATION = {
      research_id: createdResearch?.id as number,
    };

    createdSciExamination = await sciExamination.create(sciExaminationData);
  });

  // Create a judge instance
  let createdJudge: JUDGE | null;

  beforeAll(async () => {
    const judgeData: JUDGE = {
      judge_name: 'test name',
      judge_degree: 'captain',
    };

    createdJudge = await judge.create(judgeData);
  });

  it('should create a new examen detail', async () => {
    const newExamenDetail: EXAMEN_DETAILS = {
      judge_letter: 1,
      letter_date: new Date(),
      result: 'Pass',
      edit_date: 122324,
      edit_letter: 232,
      judge_id: createdJudge?.id as number,
      sci_examination_id: createdSciExamination?.id as number,
    };

    const response = await request(app)
      .post('/api/examen-details')
      .send(newExamenDetail);

    examenDetailId = response.body.data.id;
    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.data.judge_letter).toBe(newExamenDetail.judge_letter);
    expect(response.body.data.result).toBe(newExamenDetail.result);
  });

  it('should retrieve all examen details', async () => {
    const response = await request(app).get('/api/examen-details');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('should retrieve a specific examen detail by ID', async () => {
    const response = await request(app).get(
      `/api/examen-details/${examenDetailId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it('should update an examen detail', async () => {
    const updatedExamenDetail: Partial<EXAMEN_DETAILS> = {
      judge_letter: 2,
    };

    const response = await request(app)
      .put(`/api/examen-details/${examenDetailId}`)
      .send(updatedExamenDetail);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.judge_letter).toBe(
      updatedExamenDetail.judge_letter
    );
  });

  it('should delete an examen detail', async () => {
    const response = await request(app).delete(
      `/api/examen-details/${examenDetailId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe(
      `Examen detail with ID ${examenDetailId} has been deleted`
    );
  });
});
