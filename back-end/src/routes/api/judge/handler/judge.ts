import { Judge } from '../../../../models/judge';
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

async function getJudge(req: Request, res: Response) {
  const name = req.params.name;

  try {
    let final_copy: string;
    // Start the transaction
    await db.query('BEGIN');
    const judgeinfo = await judge.showByName(name);

    if (!judgeinfo || judgeinfo.length === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Judge not found' });
    }

    const judgeExDetails = judgeinfo.map(async (i) => {
      return await examenDetails.showByJudgeId(i?.id as number);
    });
    const judgeExaminationDetails = await Promise.all(judgeExDetails || []);
    const sciId = judgeExaminationDetails?.map((e) => {
      return e?.sci_examination_id;
    });

    const researchPromises = sciId?.map(async (i) => {
      const sciExaminationData = await sciExamination.show(i);
      final_copy = sciExaminationData?.final_copy as string;

      const examenDetailsData = await examenDetails.showByExamenId(i as number);

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

export default {
  getJudge,
};
