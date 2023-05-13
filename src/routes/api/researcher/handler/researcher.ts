import { Researcher, RESEARCHER } from '../../../../models/researcher';
import { Request, Response } from 'express';

const researcher = new Researcher();

// Create a researcher
async function create(req: Request, res: Response) {
  try {
    const newResearcher = await researcher.create(req.body as RESEARCHER);
    res.status(201).json({ status: 'success', data: newResearcher });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Get all researchers
async function index(req: Request, res: Response) {
  try {
    const researchers = await researcher.index();
    res.status(200).json({ status: 'success', data: researchers });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Get a specific researcher by name or id
async function getResearcher(req: Request, res: Response) {
  const identifier = req.params.identifier;

  try {
    let researcherData: RESEARCHER[] | null;

    if (isNaN(Number(identifier))) {
      researcherData = await researcher.show(identifier);
    } else {
      const id = parseInt(identifier);
      researcherData = await researcher.showById(id);
    }

    if (!researcherData || researcherData.length === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Researcher not found' });
    }

    res.status(200).json({ status: 'success', data: researcherData });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Update a researcher
async function updateResearcher(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  const updatedData = req.body;

  try {
    // Check if the researcher exists
    const existingResearcher = await researcher.showById(id);

    if (!existingResearcher) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Researcher not found' });
    }

    // Update the researcher
    const updatedResearcher = await researcher.update(id, updatedData);
    res.status(200).json({ status: 'success', data: updatedResearcher });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Delete a researcher by ID
async function deleteResearcher(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  try {
    const existingResearcher = await researcher.showById(id);

    if (!existingResearcher) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Researcher not found' });
    }

    await researcher.delete(id);

    res.status(200).json({
      status: 'success',
      message: `Researcher with ID ${id} has been deleted`,
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
  updateResearcher,
  getResearcher,
  deleteResearcher,
};
