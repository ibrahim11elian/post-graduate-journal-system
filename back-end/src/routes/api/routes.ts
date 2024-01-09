import { Router } from 'express';
import researcher from './researcher/handler/researcher';
import research from './research/handler/research';
import journal from './journal/handler/journal';
import judge from './judge/handler/judge';
import handleFormSubmission from './form_submit/handler/add-research';
import uploadFile from '../../middleware/upload-files';
import updateResearch from './form_submit/handler/update-research';
import judge_info from './judge_info/handler/judge_info';
import login from './user/login';
import update from './user/update';
import authentication from '../../middleware/authentication';

const route = Router();

route.get('/researcher/:identifier', researcher.getResearcher);
route.delete('/researcher/:id', researcher.deleteResearcher);

// ===========================================================

// Research Endpoints
route.get('/research/:identifier', research.getResearch);

// ===========================================================

// journal Endpoints
route.get('/journal/:identifier', journal.getJournal);

// ===========================================================

// judge Endpoints
route.get('/judge/:name', judge.getJudge);

// ===========================================================

// judgeInfo Endpoints
route.post('/judge-info', judge_info.create);
route.get('/judge-info', judge_info.index);
route.get('/judge-info/:spec', judge_info.getJudgeInfo);
route.put('/judge-info/:id', judge_info.updateJudgeInfo);
route.delete('/judge-info/:id', judge_info.deleteJudgeInfo);

// ===========================================================
// form submission handler
route.post('/research-record', uploadFile, handleFormSubmission);
route.put('/research-record', uploadFile, updateResearch);

// ===========================================================
// login handler
route.post('/login', login.login);
// update handler
route.put('/update', authentication, update);

export default route;
