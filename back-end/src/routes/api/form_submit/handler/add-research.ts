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
  const { researcher_name, workplace, rank, email, phone, cv, photo } =
    formPayload;
  const {
    research_date,
    research_title,
    research_pdf,
    research_summary,
    research_summary_ar,
  } = formPayload;

  const { journal_edition, edition_date } = formPayload;
  const {
    outgoing_letter,
    outgoing_date,
    incoming_letter,
    incoming_date,
    result,
  } = formPayload;
  const {
    judge_namee,
    degree,
    judge_letter,
    letter_date,
    edit_letter,
    edit_date,
    final_copy,
    exmn_result,
  } = formPayload;
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
      photo,
    });

    const researcher_id: number = researcher?.id as number;

    const researchModel = new Research();
    const research = await researchModel.create({
      research_date,
      research_title,
      research_pdf,
      research_summary,
      research_summary_ar,
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
      outgoing_date,
      incoming_letter,
      incoming_date,
      result,
      research_id,
    });

    const sciExaminationModel = new SciExamination();
    const sciExamination = await sciExaminationModel.create({
      research_id,
      final_copy,
    });
    const sciExamination_id: number = sciExamination?.id as number;

    const judgeModel = new Judge();

    const examenDetailsModel = new ExamenDetails();
    const judgeExamination = [];

    for (const i in judge_namee) {
      const judge_name = judge_namee[i];
      const judge_degree = degree[i];
      const judge = await judgeModel.create({ judge_name, judge_degree });
      const judge_id: number = judge?.id as number;

      const exDetails = {
        judge_letter: judge_letter[i],
        letter_date: letter_date[i],
        result: exmn_result[i],
        edit_date: edit_date[i],
        edit_letter: edit_letter[i],
        judge_id: judge_id,
        sci_examination_id: sciExamination_id,
      };
      const examenDetails = await examenDetailsModel.create(exDetails);
      judgeExamination.push({
        judge_Name: judge_name,
        judge_degree: judge_degree,
        examination_details: { ...examenDetails },
      });
    }

    // If all insertions succeed, commit the transaction
    await db.query('COMMIT');

    res.status(201).json({
      status: 'success',
      message: 'Form submitted successfully',
      data: {
        researcher,
        research: { ...research, final_copy },
        journal,
        examination,
        judgeExamination,
      },
    });
  } catch (error) {
    console.log(error);

    // If any insertion fails, rollback the transaction
    await db.query('ROLLBACK');
    res.status(500).json({ status: 'error', message: 'Failed to submit form' });
  }
}

export default handleFormSubmission;
