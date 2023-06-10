import { SciExamination, SCIEXAMINATION } from '../sciExamination';
import { Research, RESEARCH } from '../research';
import { Researcher, RESEARCHER } from '../researcher';

const sciExamination = new SciExamination();
const research = new Research();
const researcher = new Researcher();

describe('SciExamination Model', () => {
  let createdResearch: RESEARCH | null;
  let createdSciExamination: SCIEXAMINATION | null;
  let createdResearcher: RESEARCHER | null;

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
    // Delete the sci examination
    if (createdSciExamination) {
      await sciExamination.delete(createdSciExamination.id);
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

  it('should create a new sci examination', async () => {
    const newSciExamination: SCIEXAMINATION = {
      research_id: createdResearch?.id as number,
    };

    createdSciExamination = await sciExamination.create(newSciExamination);

    expect(createdSciExamination).toBeDefined();
    expect(createdSciExamination?.research_id).toBe(
      newSciExamination.research_id
    );
  });

  it('should retrieve all sci examinations', async () => {
    const examinations = await sciExamination.index();

    expect(Array.isArray(examinations)).toBe(true);
  });

  it('should retrieve a specific sci examination', async () => {
    const examinationData = await sciExamination.show(
      createdSciExamination?.id
    );

    expect(examinationData).toBeDefined();
    expect(examinationData?.id).toBe(createdSciExamination?.id);
  });

  it('should delete a sci examination', async () => {
    const result = await sciExamination.delete(createdSciExamination?.id);

    expect(result).toBe(
      `sci examination deleted with id: ${createdSciExamination?.id}`
    );
  });
});
