import { Research } from '../research';
import { db } from '../../database';
import { RESEARCHER, Researcher } from '../researcher';

describe('Research', () => {
  const researcher = new Researcher();
  let researcherId: number;

  const testResearcher: RESEARCHER = {
    researcher_name: 'Test Researcher',
    rank: 'captain',
    workplace: 'workplace',
    email: '2022-01-01',
    phone: 2379874,
  };
  const testResearch = {
    research_title: 'Test Research',
    research_pdf: 'test-research.pdf',
    research_summary: 'A summary of the test research',
    research_date: '11/05/2013',
  };

  beforeEach(async () => {
    // Truncate the research table before each test
    await db.query('TRUNCATE TABLE research CASCADE');
  });

  beforeAll(async () => {
    try {
      const createdResearcher = await researcher.create(testResearcher);
      researcherId = createdResearcher?.id as number;
    } catch (error) {
      console.log(error);
    }
  });

  afterAll(async () => {
    // Truncate the researcher table after each test
    await db.query('TRUNCATE TABLE researcher CASCADE');
  });

  describe('create', () => {
    it('should insert a new research record into the database', async () => {
      const research = new Research();
      const createdResearch = await research.create({
        ...testResearch,
        researcher_id: researcherId,
      });

      expect(createdResearch).toBeTruthy();
    });
  });

  describe('index', () => {
    it('should return an array of all research records in the database', async () => {
      // Create some test research records in the database
      const research = new Research();
      await research.create({
        ...testResearch,
        researcher_id: researcherId,
      });
      await research.create({
        ...{
          ...testResearch,
          researcher_id: researcherId,
        },
        research_title: 'Another Test Research',
        research_pdf: 'another-test-research.pdf',
        research_summary: 'A summary of another test research',
      });

      const allResearch = await research.index();

      expect(allResearch.length).toBe(2);
    });
  });

  describe('show', () => {
    it('should return a specific research record from the database', async () => {
      // Create a test research record in the database
      const research = new Research();
      const createdResearch = await research.create({
        ...testResearch,
        researcher_id: researcherId,
      });

      if (createdResearch) {
        const retrievedResearch = await research.show(
          testResearch.research_title
        );

        expect(retrievedResearch).toEqual([createdResearch]);
      } else {
        fail('Failed to create test research record.');
      }
    });
  });

  describe('update', () => {
    it('should update a specific research record in the database', async () => {
      // Create a test research record in the database
      const research = new Research();
      const createdResearch = await research.create({
        ...testResearch,
        researcher_id: researcherId,
      });

      if (!createdResearch) {
        throw new Error('Failed to create test research');
      }

      // Update the research record with new values
      const updatedResearch = await research.update(createdResearch.id, {
        research_title: 'Updated Test Research',
        research_pdf: 'updated-test-research.pdf',
        research_summary: 'An updated summary of the test research',
      });

      expect(updatedResearch).toEqual(
        jasmine.objectContaining({
          id: createdResearch.id,
          research_title: 'Updated Test Research',
          research_pdf: 'updated-test-research.pdf',
          research_summary: 'An updated summary of the test research',
        })
      );
    });
  });

  describe('delete', () => {
    it('should delete a specific research record from the database', async () => {
      // Create a test research record in the database
      const research = new Research();
      const createdResearch = await research.create({
        ...testResearch,
        researcher_id: researcherId,
      });

      if (!createdResearch) {
        throw new Error('Failed to create test research');
      }

      await research.delete(createdResearch.id);

      const allResearch = await research.index();

      expect(allResearch.length).toBe(0);
    });
  });
});
