import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import route from './routes/api/routes';
import multer, { Multer } from 'multer';
import path from 'path';
import { folderBuilder } from './folder-builder';

dotenv.config();

// creating the files folders to store the uploaded files
folderBuilder();

// creating express app instance
export const app: express.Application = express();

// using CORS to let the client talk to server without security interruption
app.use(cors());

// for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const storage = multer.diskStorage({
  // Determine the destination folder based on the file type

  destination: function (req, file, cb) {
    let destinationFolder = '';
    if (file.fieldname === 'cv') {
      destinationFolder = path.join(__dirname, '..', 'cv'); // Specify the destination folder for uploaded files relative to the root of the project
    } else if (file.fieldname === 'researchCopy') {
      destinationFolder = path.join(__dirname, '..', 'research-copies');
    } else if (file.fieldname === 'researchSummary') {
      destinationFolder = path.join(__dirname, '..', 'research-summaries');
    }
    cb(null, destinationFolder);
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const data = JSON.parse(req.body.data);
    if (file.fieldname === 'cv') {
      cb(null, `${data.researcher_name}${fileExtension}`); // Use the original researcher name for storing the uploaded file
    } else {
      cb(
        null,
        `${data.researcher_name}-${data.research_title}${fileExtension}`
      ); // Use the original researcher name for storing the uploaded file
    }
  },
});

// Create a multer instance with the configured storage
export const upload: Multer = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },
});

app.use(
  '/researches',
  express.static(path.join(__dirname, '../research-copies'))
);
app.use(
  '/summaries',
  express.static(path.join(__dirname, '../research-summaries'))
);
app.use('/cv', express.static(path.join(__dirname, '../cv')));

// routes
app.use('/api', route);

// home direct to readme file
app.get('/', (req: express.Request, res: express.Response) => {
  res.send("<h1>i'm working</h1>");
});

// start server
app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});
