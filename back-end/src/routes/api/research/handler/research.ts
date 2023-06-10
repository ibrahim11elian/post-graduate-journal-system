import { Research, RESEARCH } from '../../../../models/research';
import { Request, Response } from 'express';

const research = new Research();

// Create a research
async function create(req: Request, res: Response) {
  try {
    const newResearch = await research.create(req.body as RESEARCH);
    res.status(201).json({ status: 'success', data: newResearch });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Get all researches
async function index(req: Request, res: Response) {
  try {
    const researches = await research.index();
    res.status(200).json({ status: 'success', data: researches });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Get a specific research by title or id
async function getResearch(req: Request, res: Response) {
  const identifier = req.params.identifier;

  try {
    let researchData: RESEARCH[] | null;

    if (isNaN(Number(identifier))) {
      researchData = await research.show(identifier);
    } else {
      const id = parseInt(identifier);
      researchData = await research.showById(id);
    }

    if (!researchData || researchData.length === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Research not found' });
    }

    res.status(200).json({ status: 'success', data: researchData });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Update a research
async function updateResearch(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  try {
    // Check if the research exists
    const existingResearch = await research.showById(id);

    if (!existingResearch) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Research not found' });
    }

    // Update the research
    const updatedResearch = await research.update(id, updatedData);

    res.status(200).json({ status: 'success', data: updatedResearch });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Delete a research by ID
async function deleteResearch(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  try {
    const existingResearch = await research.showById(id);

    if (!existingResearch) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Research not found' });
    }

    await research.delete(id);

    res.status(200).json({
      status: 'success',
      message: `Research with ID ${id} has been deleted`,
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
  updateResearch,
  getResearch,
  deleteResearch,
};
