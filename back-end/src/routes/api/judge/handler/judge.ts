import { Judge, JUDGE } from '../../../../models/judge';
import { Request, Response } from 'express';

const judge = new Judge();

// Create a judge
async function create(req: Request, res: Response) {
  try {
    const newJudge = await judge.create(req.body as JUDGE);

    res.status(201).json({ status: 'success', data: newJudge });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Get all judges
async function index(req: Request, res: Response) {
  try {
    const judges = await judge.index();
    res.status(200).json({ status: 'success', data: judges });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Get a specific judge by ID
async function getJudge(req: Request, res: Response) {
  const id = parseInt(req.params.identifier);

  try {
    const judgeData = await judge.show(id);

    if (!judgeData) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Judge not found' });
    }

    res.status(200).json({ status: 'success', data: judgeData });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Update a judge
async function updateJudge(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  const updatedData = req.body;

  try {
    // Check if the judge exists
    const existingJudge = await judge.show(id);

    if (!existingJudge) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Judge not found' });
    }

    // Update the judge
    const updatedJudge = await judge.update(id, updatedData);

    res.status(200).json({ status: 'success', data: updatedJudge });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Delete a judge by ID
async function deleteJudge(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  try {
    const existingJudge = await judge.show(id);

    if (!existingJudge) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Judge not found' });
    }

    await judge.delete(id);

    res.status(200).json({
      status: 'success',
      message: `Judge with ID ${id} has been deleted`,
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
  updateJudge,
  getJudge,
  deleteJudge,
};
