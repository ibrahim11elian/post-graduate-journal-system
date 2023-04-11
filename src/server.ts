import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// creating express app instance
export const app: express.Application = express();

// using CORS to let the client talk to server without security interruption
app.use(cors());

// for parsing
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// home direct to readme file
app.get('/', (req: express.Request, res: express.Response) => {
  res.send("<h1>i'm working</h1>");
});

// just for test

// import { Researcher } from './models/researcher';
// const x = new Researcher();
// const user: object = {
//   researcher_name: 'ahmed',
//   rank: 'عميد',
//   workplace: 'كلية الدراسات العليا',
//   email: 'ahmed@gmail.com',
//   phone: '01234567890',
//   cv: 'odjfsssa',
// };

// app.get('/add', (req: express.Request, res: express.Response) => {
//   const z = x.create({
//     researcher_name: 'ahmed',
//     rank: 'عميد',
//     workplace: 'كلية الدراسات العليا',
//     email: 'ahmed@gmail.com',
//     phone: 1234567890,
//     cv: 'odjfsssa',
//   });

//   z.then((s) => res.send(s));
// });

// import { Research } from './models/research';
// const x = new Research();
// app.get('/add', (req: express.Request, res: express.Response) => {
//   const z = x.create({
//     researchTitle: 'ahmed',
//     researchDate: '10/02/2020',
//     researchPdf: 'كلية الدراسات العليا',
//     researchSummary: 'ahmed@gmail.com',
//     researcherId: 1,
//   });

//   z.then((s) => res.send(s));
// });

// start server
app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});
