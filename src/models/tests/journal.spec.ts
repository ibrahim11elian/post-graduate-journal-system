import { Journal } from '../journal';
import { Research } from '../research';
import { Researcher, RESEARCHER } from '../researcher';

describe('Journal', () => {
  const researcher = new Researcher();
  const research = new Research();
  const journal = new Journal();
  let researcherId: number;
  let researchId: number;
  let journalId: number;

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
    research_date: '2022-01-01',
  };
  const testJournal = {
    journal_edition: 1,
    edition_date: new Date('2022-02-01'),
  };

  beforeAll(async () => {
    try {
      const createdResearcher = await researcher.create(testResearcher);
      researcherId = createdResearcher?.id as number;
    } catch (error) {
      console.log(error);
    }
  });

  beforeAll(async () => {
    const createdResearch = await research.create({
      ...testResearch,
      researcher_id: researcherId,
    });
    researchId = createdResearch?.id as number;
  });

  describe('create', () => {
    it('should create a new journal record in the database', async () => {
      // Create a new journal record linked to the test research record
      const createdJournal = await journal.create({
        ...testJournal,
        research_id: researchId,
      });

      journalId = createdJournal?.id as number;
      expect(createdJournal).toBeTruthy;
    });
  });

  describe('index', () => {
    it('should return all journal records in the database', async () => {
      // Retrieve all journal records from the database
      const retrievedJournals = await journal.index();
      expect(retrievedJournals).toBeInstanceOf(Array);
    });
  });

  describe('show', () => {
    it('should return a specific journal record from the database', async () => {
      const retrievedJournal = await journal.show(journalId);

      expect(retrievedJournal?.id).toEqual(journalId);
    });
  });

  describe('update', () => {
    it('should update a specific journal record in the database', async () => {
      // Update the journal record with new values
      const updatedJournal = await journal.update(journalId, {
        journal_edition: 2,
        edition_date: new Date('2022-02-01'),
      });

      expect(updatedJournal.journal_edition).toEqual(2);
    });
  });

  describe('delete', () => {
    it('should delete a specific journal record from the database', async () => {
      // Delete the journal record from the database
      const result = await journal.delete(journalId);
      expect(result).toEqual(`journal deleted with id: ${journalId}`);
    });
  });
});
