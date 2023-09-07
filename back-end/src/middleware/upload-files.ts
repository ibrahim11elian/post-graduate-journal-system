import { Response, Request, NextFunction } from 'express';
import path from 'path';
import { upload } from '../server';

export default function uploadFile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'researchCopy', maxCount: 1 },
    { name: 'researchSummary', maxCount: 1 },
    { name: 'researchSummaryAr', maxCount: 1 },
    { name: 'researchFinalCopy', maxCount: 1 },
  ])(req, res, (err: unknown) => {
    if (err) {
      res.status(400).json({ error: 'Failed to upload file' });
      return;
    }

    req.body = JSON.parse(req.body.data);

    // Access the uploaded file from the request object
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Check if the file exists
    if (!Object.keys(files)) {
      res.status(400).json({ error: 'No files uploaded' });
      return;
    } else {
      if (files['cv']) {
        const cvFile = files['cv'][0];

        const cvFileExtension = path.extname(cvFile.originalname);
        req.body.cv = path.join(
          process.cwd(),
          'cv',
          `${req.body.researcher_name}${cvFileExtension}`
        );
      }

      if (files['researchCopy']) {
        const researchCopyFile = files['researchCopy'][0];

        const rsCopyFileExtension = path.extname(researchCopyFile.originalname);
        req.body.research_pdf = path.join(
          process.cwd(),
          'research-copies',
          `${req.body.researcher_name}-${req.body.research_title}${rsCopyFileExtension}`
        );
      }

      if (files['researchFinalCopy']) {
        const researchSummaryFile = files['researchFinalCopy'][0];

        const rsSummaryFileExtension = path.extname(
          researchSummaryFile.originalname
        );
        req.body.final_copy = path.join(
          process.cwd(),
          'research-copies',
          `${req.body.researcher_name}-${req.body.research_title}-final${rsSummaryFileExtension}`
        );
      }

      if (files['researchSummary']) {
        const researchSummaryFile = files['researchSummary'][0];

        const rsSummaryFileExtension = path.extname(
          researchSummaryFile.originalname
        );
        req.body.research_summary = path.join(
          process.cwd(),
          'research-summaries',
          `${req.body.researcher_name}-${req.body.research_title}${rsSummaryFileExtension}`
        );
      }

      if (files['researchSummaryAr']) {
        const researchSummaryFile = files['researchSummaryAr'][0];

        const rsSummaryFileExtension = path.extname(
          researchSummaryFile.originalname
        );
        req.body.research_summary_ar = path.join(
          process.cwd(),
          'research-summaries-ar',
          `${req.body.researcher_name}-${req.body.research_title}${rsSummaryFileExtension}`
        );
      }
      next();
    }
  });
}
