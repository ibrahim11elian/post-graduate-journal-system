import { Research, RESEARCH } from '../../../../models/research';
import { Request, Response } from 'express';
import { Researcher } from '../../../../models/researcher';
import { Journal } from '../../../../models/journal';
import { Examination } from '../../../../models/examination';
import { SciExamination } from '../../../../models/sciExamination';
import { Judge } from '../../../../models/judge';
import { ExamenDetails } from '../../../../models/examen_details';
import { db } from '../../../../database';

const researcher = new Researcher();
const research = new Research();
const journal = new Journal();
const examination = new Examination();
const sciExamination = new SciExamination();
const judge = new Judge();
const examenDetails = new ExamenDetails();

// Create a research
async function create(req: Request, res: Response) {
  try {
    const newResearch = await research.create(req.body as RESEARCH);
    res.status(201).json({ status: 'success', data: newResearch });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Get all researches
async function index(req: Request, res: Response) {
  try {
    const researches = await research.index();
    res.status(200).json({ status: 'success', data: researches });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Get a specific research by title or id
async function getResearch(req: Request, res: Response) {
  const identifier = req.params.identifier;

  try {
    let final_copy: string;
    // Start the transaction
    await db.query('BEGIN');
    let researchData: RESEARCH[] | null;

    if (isNaN(Number(identifier))) {
      researchData = await research.show(identifier);

      const researchPromises = researchData?.map(async (i) => {
        const researcherData = await researcher.showById(
          i.researcher_id as number
        );

        const journalData = await journal.showByResearchId(i?.id as number);

        const examinationData = await examination.showByResearchId(
          i?.id as number
        );
        const sciExaminationData = await sciExamination.showByResearchId(
          i?.id as number
        );
        final_copy = sciExaminationData?.final_copy as string;
        const examenDetailsData = await examenDetails.showByExamenId(
          sciExaminationData?.id as number
        );

        const judgeExaminationPromises = examenDetailsData?.map(async (e) => {
          const judgeData = await judge.show(e.judge_id);

          return {
            judge_Name: judgeData?.judge_name,
            judge_degree: judgeData?.judge_degree,
            examination_details: e,
          };
        });
        const judgeExamination = await Promise.all(
          judgeExaminationPromises || []
        );

        return {
          researcher: researcherData,
          research: { ...i, final_copy },
          journal: journalData,
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
    } else {
      const id = parseInt(identifier);
      researchData = await research.showById(id);
      if (!researchData || researchData.length === 0) {
        return res
          .status(404)
          .json({ status: 'error', message: 'Research not found' });
      }
      // If all insertions succeed, commit the transaction
      await db.query('COMMIT');
      res.status(200).json({ status: 'success', data: researchData[0] });
    }
  } catch (error) {
    // If any insertion fails, rollback the transaction
    await db.query('ROLLBACK');
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Update a research
async function updateResearch(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  try {
    // Check if the research exists
    const existingResearch = await research.showById(id);

    if (!existingResearch) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Research not found' });
    }

    // Update the research
    const updatedResearch = await research.update(id, updatedData);

    res.status(200).json({ status: 'success', data: updatedResearch });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Delete a research by ID
async function deleteResearch(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  try {
    const existingResearch = await research.showById(id);

    if (!existingResearch) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Research not found' });
    }

    await research.delete(id);

    res.status(200).json({
      status: 'success',
      message: `Research with ID ${id} has been deleted`,
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
  updateResearch,
  getResearch,
  deleteResearch,
};
