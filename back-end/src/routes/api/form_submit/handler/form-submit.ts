import { Researcher } from '../../../../models/researcher';
import { Research } from '../../../../models/research';
import { Journal } from '../../../../models/journal';
import { Examination } from '../../../../models/examination';
import { SciExamination } from '../../../../models/sciExamination';
import { Judge } from '../../../../models/judge';
import { ExamenDetails } from '../../../../models/examen_details';
import { Request, Response } from 'express';
import { db } from '../../../../database';

async function handleFormSubmission(req: Request, res: Response) {
  const formPayload = req.body;
  const { researcher_name, workplace, rank, email, phone, cv } = formPayload;
  const { research_date, research_title, research_pdf, research_summary } =
    formPayload;

  const { journal_edition, edition_date } = formPayload;
  const { outgoing_letter, incoming_letter, result } = formPayload;
  const { judge_namee, judge_letter, letter_date, exmn_result } = formPayload;
  try {
    // Start the transaction
    await db.query('BEGIN');

    // Insert into the first table (Researcher)
    const researcherModel = new Researcher();
    const researcher = await researcherModel.create({
      researcher_name,
      workplace,
      rank,
      email,
      phone,
      cv,
    });

    const researcher_id: number = researcher?.id as number;

    const researchModel = new Research();
    const research = await researchModel.create({
      research_date,
      research_title,
      research_pdf,
      research_summary,
      researcher_id,
    });

    const research_id: number = research?.id as number;

    const journalModel = new Journal();
    const journal = await journalModel.create({
      journal_edition,
      edition_date,
      research_id,
    });

    const examinationModel = new Examination();
    const examination = await examinationModel.create({
      outgoing_letter,
      incoming_letter,
      result,
      research_id,
    });

    const sciExaminationModel = new SciExamination();
    const sciExamination = await sciExaminationModel.create({ research_id });
    const sciExamination_id: number = sciExamination?.id as number;

    const judgeModel = new Judge();

    const examenDetailsModel = new ExamenDetails();
    const researchExamination: { [key: string]: unknown } = {};
    for (const i in judge_namee) {
      const judge_name = judge_namee[i];
      const judge = await judgeModel.create({ judge_name });
      const judge_id: number = judge?.id as number;

      const exDetails = {
        judge_letter: judge_letter[i],
        letter_date: letter_date[i],
        result: exmn_result[i],
        judge_id: judge_id,
        sci_Examination_id: sciExamination_id,
      };
      const examenDetails = await examenDetailsModel.create(exDetails);
      researchExamination[`judge ${Number(i) + 1}`] = {
        judge_name: judge_name,
        ...examenDetails,
      };
    }

    // If all insertions succeed, commit the transaction
    await db.query('COMMIT');

    res.status(201).json({
      status: 'success',
      message: 'Form submitted successfully',
      data: { researcher, research, journal, examination, researchExamination },
    });
  } catch (error) {
    // If any insertion fails, rollback the transaction
    await db.query('ROLLBACK');
    res.status(500).json({ status: 'error', message: 'Failed to submit form' });
  }
}

export default handleFormSubmission;
