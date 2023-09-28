import { Judge, JUDGE } from '../../../../models/judge';
import { Request, Response } from 'express';
import { Researcher } from '../../../../models/researcher';
import { Research } from '../../../../models/research';
import { Journal } from '../../../../models/journal';
import { Examination } from '../../../../models/examination';
import { SciExamination } from '../../../../models/sciExamination';
import { ExamenDetails } from '../../../../models/examen_details';
import { db } from '../../../../database';

const researcher = new Researcher();
const research = new Research();
const journal = new Journal();
const examination = new Examination();
const sciExamination = new SciExamination();
const judge = new Judge();
const examenDetails = new ExamenDetails();

// Create a judge
async function create(req: Request, res: Response) {
  try {
    const newJudge = await judge.create(req.body as JUDGE);

    res.status(201).json({ status: 'success', data: newJudge });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Get all judges
async function index(req: Request, res: Response) {
  try {
    const judges = await judge.index();
    res.status(200).json({ status: 'success', data: judges });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Get a specific judge by name
async function getJudge(req: Request, res: Response) {
  const name = req.params.name;

  try {
    let final_copy: string;
    // Start the transaction
    await db.query('BEGIN');
    const judgeData = await judge.showByName(name);

    if (!judgeData || judgeData.length === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Judge not found' });
    }

    const researchPromises = judgeData?.map(async (i) => {
      const examenDetailsData = await examenDetails.showByJudgeId(
        i?.id as number
      );

      let sciId = 0;
      const judgeExaminationPromises = examenDetailsData?.map(async (e) => {
        const judgeData = await judge.show(e.judge_id);
        sciId = e.sci_examination_id;

        return {
          judge_Name: judgeData?.judge_name,
          judge_degree: judgeData?.judge_degree,
          examination_details: e,
        };
      });
      const judgeExamination = await Promise.all(
        judgeExaminationPromises || []
      );

      const sciExaminationData = await sciExamination.show(sciId);
      final_copy = sciExaminationData?.final_copy as string;

      const researchData = await research.showById(
        sciExaminationData?.research_id
      );

      const researcherData = await researcher.showById(
        researchData?.researcher_id
      );

      const examinationData = await examination.showByResearchId(
        researchData?.id as number
      );

      const journalData = await journal.showByResearchId(
        researchData?.id as number
      );

      return {
        researcher: researcherData,
        research: { ...researchData, final_copy },
        journal: { ...journalData },
        examination: examinationData,
        judgeExamination: [...judgeExamination],
      };
    });

    const data = await Promise.all(researchPromises || []);

    if (data.length === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Research not found' });
    }

    // If all insertions succeed, commit the transaction
    await db.query('COMMIT');

    res.status(200).json({ status: 'success', data: data });
  } catch (error) {
    // If any insertion fails, rollback the transaction
    await db.query('ROLLBACK');
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Update a judge
async function updateJudge(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  const updatedData = req.body;

  try {
    // Check if the judge exists
    const existingJudge = await judge.show(id);

    if (!existingJudge) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Judge not found' });
    }

    // Update the judge
    const updatedJudge = await judge.update(id, updatedData);

    res.status(200).json({ status: 'success', data: updatedJudge });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Delete a judge by ID
async function deleteJudge(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  try {
    const existingJudge = await judge.show(id);

    if (!existingJudge) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Judge not found' });
    }

    await judge.delete(id);

    res.status(200).json({
      status: 'success',
      message: `Judge with ID ${id} has been deleted`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

export default {
  create,
  index,
  updateJudge,
  getJudge,
  deleteJudge,
};
