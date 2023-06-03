import { ExamenDetails, EXAMEN_DETAILS } from '../examen_details';
import { Judge, JUDGE } from '../judge';
import { Research, RESEARCH } from '../research';
import { Researcher, RESEARCHER } from '../researcher';
import { SciExamination, SCIEXAMINATION } from '../sciExamination';

const examenDetails = new ExamenDetails();
const judge = new Judge();
const sciExamination = new SciExamination();
const research = new Research();
const researcher = new Researcher();

describe('ExamenDetails Model', () => {
  let createdExamenDetails: EXAMEN_DETAILS | null;
  let createdJudge: JUDGE | null;
  let createdSciExamination: SCIEXAMINATION | null;
  let createdResearcher: RESEARCHER | null;
  let createdResearch: RESEARCH | null;

  beforeAll(async () => {
    // Create a judge for testing
    const newJudge: JUDGE = {
      judge_name: 'Test Judge',
    };
    createdJudge = await judge.create(newJudge);

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

    // Create a sci examination for testing
    const newSciExamination: SCIEXAMINATION = {
      research_id: createdResearch?.id as number,
    };
    createdSciExamination = await sciExamination.create(newSciExamination);
  });

  afterAll(async () => {
    // Delete the examen details
    if (createdExamenDetails) {
      await examenDetails.delete(createdExamenDetails.id);
    }

    // Delete the judge
    if (createdJudge) {
      await judge.delete(createdJudge.id);
    }

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

  it('should create new examen details', async () => {
    const newExamenDetails: EXAMEN_DETAILS = {
      judge_letter: 1234,
      letter_date: new Date(),
      result: 'Pass',
      judge_id: createdJudge?.id as number,
      sciExamination_id: createdSciExamination?.id as number,
    };

    createdExamenDetails = await examenDetails.create(newExamenDetails);

    expect(createdExamenDetails).toBeDefined();
    expect(createdExamenDetails?.judge_letter).toBe(
      newExamenDetails.judge_letter
    );
  });

  it('should retrieve all examen details', async () => {
    const examenDetailsList = await examenDetails.index();

    expect(Array.isArray(examenDetailsList)).toBe(true);
  });

  it('should retrieve a specific examen details', async () => {
    const examenDetailsData = await examenDetails.show(
      createdExamenDetails?.id
    );

    expect(examenDetailsData).toBeDefined();
    expect(examenDetailsData?.id).toBe(createdExamenDetails?.id);
  });

  it('should update examen details', async () => {
    const updatedData = { result: 'Fail' };

    const updatedExamenDetails = await examenDetails.update(
      createdExamenDetails?.id,
      updatedData
    );

    expect(updatedExamenDetails).toBeDefined();
    expect(updatedExamenDetails.result).toBe(updatedData.result);
  });

  it('should delete examen details', async () => {
    const result = await examenDetails.delete(createdExamenDetails?.id);

    expect(result).toBe(
      `examen details deleted with id: ${createdExamenDetails?.id}`
    );
  });
});
