import { Judge, JUDGE } from '../judge';

const judge = new Judge();

describe('Judge Model', () => {
  let createdJudge: JUDGE | null;

  afterAll(async () => {
    // Delete the judge
    if (createdJudge) {
      await judge.delete(createdJudge.id);
    }
  });

  it('should create a new judge', async () => {
    const newJudge: JUDGE = {
      judge_name: 'Test Judge',
      judge_degree: 'captain',
    };

    createdJudge = await judge.create(newJudge);

    expect(createdJudge).toBeDefined();
    expect(createdJudge?.judge_name).toBe(newJudge.judge_name);
  });

  it('should retrieve all judges', async () => {
    const judges = await judge.index();

    expect(Array.isArray(judges)).toBe(true);
  });

  it('should retrieve a specific judge', async () => {
    const judgeData = await judge.show(createdJudge?.id);

    expect(judgeData).toBeDefined();
    expect(judgeData?.id).toBe(createdJudge?.id);
  });

  it('should update a judge', async () => {
    const updatedData = { judge_name: 'Updated Judge' };

    const updatedJudge = await judge.update(createdJudge?.id, updatedData);

    expect(updatedJudge).toBeDefined();
    expect(updatedJudge.judge_name).toBe(updatedData.judge_name);
  });

  it('should delete a judge', async () => {
    const result = await judge.delete(createdJudge?.id);

    expect(result).toBe(`judge deleted with id: ${createdJudge?.id}`);
  });
});
