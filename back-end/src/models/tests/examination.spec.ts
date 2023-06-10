import { Examination, EXAMINATION } from '../examination';
import { Research, RESEARCH } from '../research';
import { Researcher, RESEARCHER } from '../researcher';

const examination = new Examination();
const research = new Research();
const researcher = new Researcher();

describe('Examination Model', () => {
  let createdResearch: RESEARCH | null;
  let createdResearcher: RESEARCHER | null;
  let createdExamination: EXAMINATION | null;

  beforeAll(async () => {
    // Create a researcher for testing
    const newResearcher: RESEARCHER = {
      researcher_name: 'Test Researcher',
      rank: 'captain',
      workplace: 'workplace',
      email: '2022-01-01',
      phone: 2379874,
    };
    createdResearcher = await researcher.create(newResearcher);
    // Create a research for testing
    const newResearch: RESEARCH = {
      research_title: 'Sample Research',
      research_pdf: 'sample.pdf',
      research_summary: 'This is a sample research.',
      research_date: '2023-05-13',
      researcher_id: createdResearcher?.id as number,
    };
    createdResearch = await research.create(newResearch);
  });

  afterAll(async () => {
    // Delete the examination
    if (createdExamination) {
      await examination.delete(createdExamination.id);
    }

    // Delete the research
    if (createdResearch) {
      await research.delete(createdResearch.id);
    }

    // Delete the researcher
    if (createdResearcher) {
      await research.delete(createdResearcher.id);
    }
  });

  it('should create a new examination', async () => {
    const newExamination: EXAMINATION = {
      outgoing_letter: 1234,
      incoming_letter: 5678,
      result: 'Pass',
      research_id: createdResearch?.id as number,
    };

    createdExamination = await examination.create(newExamination);

    expect(createdExamination).toBeDefined();
    expect(createdExamination?.outgoing_letter).toBe(
      newExamination.outgoing_letter
    );
  });

  it('should retrieve all examinations', async () => {
    const examinations = await examination.index();

    expect(Array.isArray(examinations)).toBe(true);
  });

  it('should retrieve a specific examination', async () => {
    const examinationData = await examination.show(createdExamination?.id);

    expect(examinationData).toBeDefined();
    expect(examinationData?.id).toBe(createdExamination?.id);
  });

  it('should update an examination', async () => {
    const updatedData = { result: 'Fail' };

    const updatedExamination = await examination.update(
      createdExamination?.id,
      updatedData
    );

    expect(updatedExamination).toBeDefined();
    expect(updatedExamination.result).toBe(updatedData.result);
  });

  it('should delete an examination', async () => {
    const result = await examination.delete(createdExamination?.id);

    expect(result).toBe(
      `examination deleted with id: ${createdExamination?.id}`
    );
  });
});
