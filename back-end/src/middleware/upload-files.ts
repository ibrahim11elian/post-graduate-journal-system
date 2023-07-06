import { Response, Request, NextFunction } from 'express';
import path from 'path';
import { upload } from '../server';
import { File } from 'buffer';

export default function uploadFile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  upload.array('file')(req, res, (err: unknown) => {
    if (err) {
      res.status(400).json({ error: 'Failed to upload file' });
      return;
    }

    // req.body = JSON.parse(req.body);

    // Access the uploaded file from the request object
    // const file = req.file;
    console.log(req.files);
    res.send('tmamam');

    // Check if the file exists
    // if (!file) {
    //   res.status(400).json({ error: 'No file uploaded' });
    //   return;
    // } else {
    //   const fileExtension = path.extname(file.originalname);
    //   req.body.cv = path.join(
    //     process.cwd(),
    //     'cv',
    //     `${req.body.researcher_name}${fileExtension}`
    //   );

    //   next();
    // }
  });
}
