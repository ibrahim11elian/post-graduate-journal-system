import { Router } from 'express';
import researcher from './researcher/handler/researcher';
import research from './research/handler/research';
import journal from './journal/handler/journal';
import examination from './examination/handler/examination';
import judge from './judge/handler/judge';
import sciExamination from './sciExamination/handler/sciExamination';
import examen_details from './examen_details/handler/examen_details';
import handleFormSubmission from './form_submit/handler/add-research';
import uploadFile from '../../middleware/upload-files';
import updateResearch from './form_submit/handler/update-research';
import judge_info from './judge_info/handler/judge_info';

const route = Router();

route.post('/researcher', uploadFile, researcher.create);
route.get('/researcher', researcher.index);
route.get('/researcher/:identifier', researcher.getResearcher);
route.put('/researcher/:id', researcher.updateResearcher);
route.delete('/researcher/:id', researcher.deleteResearcher);

// ===========================================================

// Research Endpoints
route.post('/research', research.create);
route.get('/research', research.index);
route.get('/research/:identifier', research.getResearch);
route.put('/research/:id', research.updateResearch);
route.delete('/research/:id', research.deleteResearch);

// ===========================================================

// journal Endpoints
route.post('/journal', journal.create);
route.get('/journal', journal.index);
route.get('/journal/:identifier', journal.getJournal);
route.put('/journal/:id', journal.updateJournal);
route.delete('/journal/:id', journal.deleteJournal);

// ===========================================================

// examination Endpoints
route.post('/examination', examination.create);
route.get('/examination', examination.index);
route.get('/examination/:identifier', examination.getExamination);
route.put('/examination/:id', examination.updateExamination);
route.delete('/examination/:id', examination.deleteExamination);

// ===========================================================

// judge Endpoints
route.post('/judge', judge.create);
route.get('/judge', judge.index);
route.get('/judge/:name', judge.getJudge);
route.put('/judge/:id', judge.updateJudge);
route.delete('/judge/:id', judge.deleteJudge);

// ===========================================================

// judgeInfo Endpoints
route.post('/judge-info', judge_info.create);
route.get('/judge-info', judge_info.index);
route.get('/judge-info/:spec', judge_info.getJudgeInfo);
route.put('/judge-info/:id', judge_info.updateJudgeInfo);
route.delete('/judge-info/:id', judge_info.deleteJudgeInfo);

// ===========================================================

// sciExamination Endpoints
route.post('/sci-examination', sciExamination.create);
route.get('/sci-examination', sciExamination.index);
route.get('/sci-examination/:identifier', sciExamination.getSciExamination);
route.delete('/sci-examination/:id', sciExamination.deleteSciExamination);

// ===========================================================

// examen_details Endpoints
route.post('/examen-details', examen_details.create);
route.get('/examen-details', examen_details.index);
route.get('/examen-details/:identifier', examen_details.getExamenDetail);
route.put('/examen-details/:id', examen_details.updateExamenDetail);
route.delete('/examen-details/:id', examen_details.deleteExamenDetail);

// ===========================================================
// form submission handler
route.post('/research-record', uploadFile, handleFormSubmission);
route.put('/research-record', uploadFile, updateResearch);

export default route;
