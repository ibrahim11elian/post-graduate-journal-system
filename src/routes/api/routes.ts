import { Router } from 'express';
import researcher from './researcher/handler/researcher';
import research from './research/handler/research';
import journal from './journal/handler/journal';

const route = Router();

route.post('/researcher', researcher.create);
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

export default route;
