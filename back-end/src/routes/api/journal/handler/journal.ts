import { Journal, JOURNAL } from '../../../../models/journal';
import { Request, Response } from 'express';
import { Researcher } from '../../../../models/researcher';
import { Research } from '../../../../models/research';
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

// Create a journal
async function create(req: Request, res: Response) {
  try {
    const newJournal = await journal.create(req.body as JOURNAL);

    res.status(201).json({ status: 'success', data: newJournal });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Get all journals
async function index(req: Request, res: Response) {
  try {
    const journals = await journal.index();
    res.status(200).json({ status: 'success', data: journals });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Get a specific journal by Edition
async function getJournal(req: Request, res: Response) {
  const edition = parseInt(req.params.identifier);

  try {
    let final_copy: string;
    // Start the transaction
    await db.query('BEGIN');
    const journalData = await journal.showByEdition(edition);

    if (!journalData || journalData.length === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Journal not found' });
    }

    const researchPromises = journalData?.map(async (i) => {
      const researchData = await research.showById(i?.research_id);

      const researcherData = await researcher.showById(
        researchData?.researcher_id
      );

      const examinationData = await examination.showByResearchId(
        researchData?.id as number
      );
      const sciExaminationData = await sciExamination.showByResearchId(
        researchData?.id as number
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
        research: { ...researchData, final_copy },
        journal: { ...i },
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

// Update a journal
async function updateJournal(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  const updatedData = req.body;

  try {
    // Check if the journal exists
    const existingJournal = await journal.show(id);

    if (!existingJournal) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Journal not found' });
    }

    // Update the journal
    const updatedJournal = await journal.update(id, updatedData);

    res.status(200).json({ status: 'success', data: updatedJournal });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Delete a journal by ID
async function deleteJournal(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  try {
    const existingJournal = await journal.show(id);

    if (!existingJournal) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Journal not found' });
    }

    await journal.delete(id);

    res.status(200).json({
      status: 'success',
      message: `Journal with ID ${id} has been deleted`,
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
  updateJournal,
  getJournal,
  deleteJournal,
};
