import { Journal, JOURNAL } from '../../../../models/journal';
import { Request, Response } from 'express';

const journal = new Journal();

// Create a journal
async function create(req: Request, res: Response) {
  try {
    const newJournal = await journal.create(req.body as JOURNAL);

    res.status(201).json({ status: 'success', data: newJournal });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Get all journals
async function index(req: Request, res: Response) {
  try {
    const journals = await journal.index();
    res.status(200).json({ status: 'success', data: journals });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Get a specific journal by ID
async function getJournal(req: Request, res: Response) {
  const id = parseInt(req.params.identifier);

  try {
    const journalData = await journal.show(id);

    if (!journalData) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Journal not found' });
    }

    res.status(200).json({ status: 'success', data: journalData });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Update a journal
async function updateJournal(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  const updatedData = req.body;

  try {
    // Check if the journal exists
    const existingJournal = await journal.show(id);

    if (!existingJournal) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Journal not found' });
    }

    // Update the journal
    const updatedJournal = await journal.update(id, updatedData);
    console.log(updatedJournal);

    res.status(200).json({ status: 'success', data: updatedJournal });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Delete a journal by ID
async function deleteJournal(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  try {
    const existingJournal = await journal.show(id);

    if (!existingJournal) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Journal not found' });
    }

    await journal.delete(id);

    res.status(200).json({
      status: 'success',
      message: `Journal with ID ${id} has been deleted`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

export default {
  create,
  index,
  updateJournal,
  getJournal,
  deleteJournal,
};
