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

// start server
app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});
