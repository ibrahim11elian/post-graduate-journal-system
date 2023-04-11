// import { Journal, JOURNAL } from '../journal';
// import { Research } from '../research';
// import { Researcher, RESEARCHER } from '../researcher';
// import { db } from '../../database';

// describe('Journal', () => {
//     const researcher = new Researcher();
//     let researcherId: number;
//     const testResearcher: RESEARCHER = {
//       researcher_name: 'Test Researcher',
//       rank: 'captain',
//       workplace: 'workplace',
//       email: '2022-01-01',
//       phone: 2379874,
//     };
//     const testResearch = {
//       researchTitle: 'Test Research',
//       researchPdf: 'test-research.pdf',
//       researchSummary: 'A summary of the test research',
//       researchDate: '2022-01-01',
//     };
//     const testJournal = {
//       journalEdition: 1,
//       editionDate: new Date('2022-02-01'),
//     };
//     beforeEach(async () => {
//       // Truncate the research and journal tables before each test
//       await db.query('TRUNCATE TABLE journal CASCADE');
//       await db.query('TRUNCATE TABLE research CASCADE');
//     });
//     beforeAll(async () => {
//       try {
//         const createdResearcher = await researcher.create(testResearcher);
//         researcherId = createdResearcher?.id as number;
//       } catch (error) {
//         console.log(error);
//       }
//     });
//     afterAll(async () => {
//       // Release the database connection pool after all tests have run
//       await db.end();
//     });
//     describe('create', () => {
//       it('should create a new journal record in the database', async () => {
//         // Create a test research record in the database
//         const research = new Research();
//         console.log(researcherId);
//         const createdResearch = await research.create({
//           ...testResearch,
//           researcherId: researcherId,
//         });
//         // Create a new journal record linked to the test research record
//         const journal = new Journal();
//         const createdJournal = await journal.create({
//           ...testJournal,
//           researchId: createdResearch?.id as number,
//         });
//         if (!createdJournal) {
//           throw new Error('Failed to create test research');
//         }
//         expect(createdJournal).toEqual(
//           jasmine.objectContaining({
//             id: createdJournal.id,
//             journalEdition: testJournal.journalEdition,
//             editionDate: testJournal.editionDate,
//             researchId: createdResearch?.id as number,
//           })
//         );
//       });
//     });
//     describe('index', () => {
//       it('should return all journal records in the database', async () => {
//         // Create test research and journal records in the database
//         const research = new Research();
//         const researcher = new Researcher();
//         const createdResearcher = await researcher.create(testResearcher);
//         const createdResearch = await research.create({
//           ...testResearch,
//           researcherId: createdResearcher?.id as number,
//         });
//         const journal = new Journal();
//         await journal.create({
//           ...testJournal,
//           researchId: createdResearch?.id as number,
//         });
//         // Retrieve all journal records from the database
//         const retrievedJournals = await journal.index();
//         expect(retrievedJournals.length).toEqual(1);
//         expect(retrievedJournals[0]).toEqual(
//           jasmine.objectContaining({
//             id: retrievedJournals[0].id,
//             journalEdition: testJournal.journalEdition,
//             editionDate: testJournal.editionDate,
//             researchId: createdResearch?.id as number,
//           })
//         );
//       });
//     });
//     describe('show', () => {
//       it('should return a specific journal record from the database', async () => {
//         // Create a test research and journal record in the database
//         const research = new Research();
//         const researcher = new Researcher();
//         const createdResearcher = await researcher.create(testResearcher);
//         const createdResearch = await research.create({
//           ...testResearch,
//           researcherId: createdResearcher?.id as number,
//         });
//         const journal = new Journal();
//         const createdJournal = await journal.create({
//           ...testJournal,
//           researchId: createdResearch?.id as number,
//         });
//         const retrievedJournal = await journal.show(createdJournal?.id);
//         if (!retrievedJournal) {
//           throw new Error('Failed to create test research');
//         }
//         expect(retrievedJournal).toEqual(
//           jasmine.objectContaining({
//             id: retrievedJournal.id,
//             journalEdition: testJournal.journalEdition,
//             editionDate: testJournal.editionDate,
//             researchId: createdResearch?.id as number,
//           })
//         );
//       });
//     });
//     describe('update', () => {
//       it('should update a specific journal record in the database', async () => {
//         // Create a test research record in the database
//         const research = new Research();
//         const researcher = new Researcher();
//         const createdResearcher = await researcher.create(testResearcher);
//         const createdResearch = await research.create({
//           ...testResearch,
//           researcherId: createdResearcher?.id as number,
//         });
//         // Create a test journal record in the database
//         const journal = new Journal();
//         const testJournal: JOURNAL = {
//           journalEdition: 1,
//           editionDate: new Date('2022-01-01'),
//           researchId: createdResearch?.id as number,
//         };
//         const createdJournal = await journal.create(testJournal);
//         // Update the journal record with new values
//         const updatedJournal = await journal.update(
//           createdJournal?.id as number,
//           {
//             journalEdition: 2,
//             editionDate: new Date('2022-02-01'),
//           }
//         );
//         expect(updatedJournal).toEqual(
//           jasmine.objectContaining({
//             id: createdJournal?.id,
//             journalEdition: 2,
//             editionDate: new Date('2022-02-01'),
//             researchId: createdResearch?.id as number,
//           })
//         );
//       });
//     });
//     describe('delete', () => {
//       it('should delete a specific journal record from the database', async () => {
//         // Create a test research record in the database
//         const research = new Research();
//         const researcher = new Researcher();
//         const createdResearcher = await researcher.create(testResearcher);
//         const createdResearch = await research.create({
//           ...testResearch,
//           researcherId: createdResearcher?.id as number,
//         });
//         // Create a test journal record in the database
//         const journal = new Journal();
//         const createdJournal = await journal.create({
//           ...testJournal,
//           researchId: createdResearch?.id as number,
//         });
//         // Delete the journal record from the database
//         await journal.delete(createdJournal?.id);
//         // Check that the journal record has been deleted from the database
//         const retrievedJournal = await journal.show(createdJournal?.id);
//         expect(retrievedJournal).toBeNull();
//       });
//     });
// });
