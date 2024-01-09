import { db } from '../../../../database';
import { Researcher, RESEARCHER } from '../../../../models/researcher';
import { Research } from '../../../../models/research';
import { Journal } from '../../../../models/journal';
import { Examination } from '../../../../models/examination';
import { SciExamination } from '../../../../models/sciExamination';
import { Judge } from '../../../../models/judge';
import { ExamenDetails } from '../../../../models/examen_details';
import { Request, Response } from 'express';

const researcher = new Researcher();
const research = new Research();
const journal = new Journal();
const examination = new Examination();
const sciExamination = new SciExamination();
const judge = new Judge();
const examenDetails = new ExamenDetails();

// Get a specific researcher by name or id
async function getResearcher(req: Request, res: Response) {
  const identifier = req.params.identifier;

  try {
    let final_copy: string;
    // Start the transaction
    await db.query('BEGIN');
    let researcherData: RESEARCHER[] | null;

    if (isNaN(Number(identifier))) {
      researcherData = await researcher.show(identifier);

      const researchPromises = researcherData?.map(async (i) => {
        const researchData = await research.showByResearcherId(i.id as number);

        const journalData = await journal.showByResearchId(
          researchData?.id as number
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
          researcher: i,
          research: { ...researchData, final_copy },
          journal: journalData,
          examination: examinationData,
          judgeExamination: [...judgeExamination],
        };
      });

      const data = await Promise.all(researchPromises || []);

      if (data.length === 0) {
        return res
          .status(404)
          .json({ status: 'error', message: 'Researcher not found' });
      }

      // If all insertions succeed, commit the transaction
      await db.query('COMMIT');

      res.status(200).json({ status: 'success', data: data });
    } else {
      const id = parseInt(identifier);
      researcherData = await researcher.showById(id);
      if (!researcherData || researcherData.length === 0) {
        return res
          .status(404)
          .json({ status: 'error', message: 'Researcher not found' });
      }
      // If all insertions succeed, commit the transaction
      await db.query('COMMIT');
      res.status(200).json({ status: 'success', data: researcherData[0] });
    }
  } catch (error) {
    // If any insertion fails, rollback the transaction
    await db.query('ROLLBACK');
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Delete a researcher by ID
async function deleteResearcher(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const judgeId = req.body.judgeId;

  try {
    await db.query('BEGIN');
    const existingResearcher = await researcher.showById(id);

    if (!existingResearcher) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Researcher not found' });
    }

    await researcher.delete(id);

    if (judgeId) {
      // Use Promise.all to wait for all deletions to complete
      await Promise.all(
        judgeId.map(async (e: number) => {
          await judge.delete(e);
        })
      );
    }

    // If all insertions succeed, commit the transaction
    await db.query('COMMIT');
    res.status(200).json({
      status: 'success',
      message: `Researcher with ID ${id} has been deleted`,
    });
  } catch (error) {
    // If any insertion fails, rollback the transaction
    await db.query('ROLLBACK');
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

export default {
  getResearcher,
  deleteResearcher,
};
