import { Researcher } from '../../../../models/researcher';
import { Research } from '../../../../models/research';
import { Journal } from '../../../../models/journal';
import { Examination } from '../../../../models/examination';
import { SciExamination } from '../../../../models/sciExamination';
import { Judge } from '../../../../models/judge';
import {
  ExamenDetails,
  EXAMEN_DETAILS,
} from '../../../../models/examen_details';
import { Request, Response } from 'express';
import { db } from '../../../../database';

async function updateResearch(req: Request, res: Response) {
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
    researcher_id,
    research_id,
    journal_id,
    examination_id,
    judge_id,
    examination_details_id,
  } = formPayload;
  try {
    // Start the transaction
    await db.query('BEGIN');

    let updatedResearcher: {
      researcher_name?: unknown;
      workplace?: unknown;
      rank?: unknown;
      email?: unknown;
      phone?: unknown;
      cv?: unknown;
      photo?: unknown;
    } = {};

    if (cv) {
      updatedResearcher.cv = cv;
    }
    if (photo) {
      updatedResearcher.photo = photo;
    }

    // Include other properties
    updatedResearcher = {
      ...updatedResearcher,
      researcher_name,
      workplace,
      rank,
      email,
      phone,
    };

    const researcherModel = new Researcher();
    const researcher = await researcherModel.update(
      researcher_id,
      updatedResearcher
    );

    let updatedResearch: {
      research_date?: unknown;
      research_title?: unknown;
      research_pdf?: unknown;
      research_summary?: unknown;
      research_summary_ar?: unknown;
    } = {};

    if (research_pdf) {
      updatedResearch.research_pdf = research_pdf;
    }
    if (research_summary) {
      updatedResearch.research_summary = research_summary;
    }
    if (research_summary_ar) {
      updatedResearch.research_summary_ar = research_summary_ar;
    }

    updatedResearch = {
      ...updatedResearch,
      research_date,
      research_title,
    };

    const researchModel = new Research();
    const research = await researchModel.update(research_id, updatedResearch);

    const journalModel = new Journal();
    const journal = await journalModel.update(journal_id, {
      journal_edition,
      edition_date,
    });

    const examinationModel = new Examination();
    const examination = await examinationModel.update(examination_id, {
      outgoing_letter,
      outgoing_date,
      incoming_letter,
      incoming_date,
      result,
    });

    const sciExaminationModel = new SciExamination();
    const sciExamination = await sciExaminationModel.showByResearchId(
      research_id
    );
    let sciExamination_id = sciExamination?.id as number;
    if (!sciExamination) {
      const sciExamination = await sciExaminationModel.create(research_id);
      sciExamination_id = sciExamination?.id as number;
    } else {
      if (final_copy) {
        await sciExaminationModel.update(sciExamination_id, {
          final_copy,
        });
      }
    }

    const judgeModel = new Judge();

    const examenDetailsModel = new ExamenDetails();
    const judgeExamination = [];

    for (const i in judge_namee) {
      const judge_name = judge_namee[i];
      const judge_degree = degree[i];
      const oldJudge = await judgeModel.show(judge_id[i]);
      if (oldJudge) {
        await judgeModel.update(judge_id[i], {
          judge_name,
          degree: judge_degree,
        });

        const exDetails = {
          judge_letter: judge_letter[i],
          letter_date: letter_date[i],
          result: exmn_result[i],
          edit_date: edit_date[i],
          edit_letter: edit_letter[i],
        };

        const examenDetails = await examenDetailsModel.update(
          examination_details_id[i],
          { ...exDetails }
        );
        judgeExamination.push({
          judge_Name: judge_name,
          judge_degree: judge_degree,
          examination_details: { ...examenDetails },
        });
      } else {
        const newJudge = await judgeModel.create({
          judge_name,
          judge_degree: judge_degree,
        });
        const judge_id = newJudge?.id as number;
        const exDetails: EXAMEN_DETAILS = {
          judge_letter: judge_letter[i],
          letter_date: letter_date[i],
          result: exmn_result[i],
          edit_date: edit_date[i],
          edit_letter: edit_letter[i],
          judge_id: judge_id,
          sci_examination_id: sciExamination_id as number,
        };
        const examenDetails = await examenDetailsModel.create(exDetails);
        judgeExamination.push({
          judge_Name: judge_name,
          judge_degree: judge_degree,
          examination_details: { ...examenDetails },
        });
      }
    }

    // If all insertions succeed, commit the transaction
    await db.query('COMMIT');

    res.status(200).json({
      status: 'success',
      message: 'Form submitted successfully',
      data: {
        researcher,
        research: {
          ...research,
          final_copy: final_copy || sciExamination?.final_copy,
        },
        journal,
        examination,
        judgeExamination,
      },
    });
  } catch (error) {
    console.log(error);

    // If any insertion fails, rollback the transaction
    await db.query('ROLLBACK');
    res
      .status(500)
      .json({ status: 'error', message: 'Failed to update research' });
  }
}

export default updateResearch;
