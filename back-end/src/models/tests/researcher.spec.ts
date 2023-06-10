import { Researcher, RESEARCHER } from '../researcher';

describe('Researcher Model', () => {
  let researcher: Researcher;

  const testResearcher = {
    researcher_name: 'John Doe',
    rank: 'Professor',
    workplace: 'University of Test',
    email: 'johndoe@test.com',
    phone: 1234567890,
    cv: 'http://johndoe.com/cv.pdf',
  };

  beforeEach(() => {
    researcher = new Researcher();
  });

  describe('create method', () => {
    it('should create a new researcher record in the database', async () => {
      const createdResearcher = await researcher.create(testResearcher);
      expect(createdResearcher?.id).toBeTruthy;
    });

    it('should throw an error if the researcher record cannot be created', async () => {
      await expect(researcher.create(testResearcher)).toThrowError;
    });
  });

  describe('index method', () => {
    it('should retrieve all researcher records from the database', async () => {
      const researchers = await researcher.index();

      expect(researchers).toBeDefined();
      expect(researchers.length).toBeGreaterThan(0);
    });
  });

  describe('show method', () => {
    it('should retrieve a researcher record by name from the database', async () => {
      const createdResearcher = await researcher.create(testResearcher);

      const retrievedResearcher = await researcher.show(
        createdResearcher?.researcher_name || ''
      );

      expect(retrievedResearcher).toBeDefined();
      expect(retrievedResearcher?.length).toBeGreaterThan(0);
      expect(retrievedResearcher).toContain(
        jasmine.objectContaining(createdResearcher || {})
      );
    });

    it('should throw an error if the researcher record cannot be retrieved', async () => {
      await expect(researcher.show('blablabla')).toThrowError;
    });
  });

  describe('update method', () => {
    let researcher: Researcher;
    let createdResearcher: RESEARCHER | null;

    beforeEach(async () => {
      researcher = new Researcher();
      createdResearcher = await researcher.create(testResearcher);
    });

    it('should update the researcher with new values', async () => {
      const updatedResearcher = await researcher.update(createdResearcher?.id, {
        researcher_name: 'New Name',
        rank: 'Professor',
        workplace: 'New Workplace',
        email: 'newemail@example.com',
        phone: 1234567890,
        cv: 'http://newcv.com',
      });

      expect(updatedResearcher).toBeDefined();
      expect(updatedResearcher.id).toEqual(createdResearcher?.id);
      expect(updatedResearcher.researcher_name).toEqual('New Name');
      expect(updatedResearcher.rank).toEqual('Professor');
      expect(updatedResearcher.workplace).toEqual('New Workplace');
      expect(updatedResearcher.email).toEqual('newemail@example.com');
      expect(updatedResearcher.cv).toEqual('http://newcv.com');
    });

    it('should throw an error if researcher does not exist', async () => {
      await expect(
        researcher.update(-1, {
          researcher_name: 'New Name',
          rank: 'Professor',
          workplace: 'New Workplace',
          email: 'newemail@example.com',
          phone: '1234567890',
          cv: 'http://newcv.com',
        })
      ).toThrowError;
    });
  });

  describe('delete', () => {
    let createdResearcherId: number | undefined;

    beforeAll(async () => {
      // Create a test researcher record in the database to delete
      const researcher = new Researcher();
      const createdResearcher = await researcher.create(testResearcher);
      createdResearcherId = createdResearcher?.id;
    });

    it('should delete a researcher record from the database', async () => {
      const researcher = new Researcher();
      const result = await researcher.delete(createdResearcherId);
      expect(result).toBe(`researcher deleted with id: ${createdResearcherId}`);
    });

    it('should throw an error if the researcher does not exist', async () => {
      const researcher = new Researcher();
      try {
        await researcher.delete(-1); // A non-existent ID
      } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
          expect(error.message).toBe(`unable to delete researcher: ${error}`);
        } else {
          throw error;
        }
      }
    });
  });
});
