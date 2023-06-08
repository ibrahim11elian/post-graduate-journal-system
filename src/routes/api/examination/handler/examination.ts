import { Examination, EXAMINATION } from '../../../../models/examination';
import { Request, Response } from 'express';

const examination = new Examination();

// Create a examination
async function create(req: Request, res: Response) {
  try {
    const newExamination = await examination.create(req.body as EXAMINATION);

    res.status(201).json({ status: 'success', data: newExamination });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Get all examinations
async function index(req: Request, res: Response) {
  try {
    const examinations = await examination.index();
    res.status(200).json({ status: 'success', data: examinations });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Get a specific examination by ID
async function getExamination(req: Request, res: Response) {
  const id = parseInt(req.params.identifier);

  try {
    const examinationData = await examination.show(id);

    if (!examinationData) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Examination not found' });
    }

    res.status(200).json({ status: 'success', data: examinationData });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Update a examination
async function updateExamination(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  const updatedData = req.body;

  try {
    // Check if the examination exists
    const existingExamination = await examination.show(id);

    if (!existingExamination) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Examination not found' });
    }

    // Update the examination
    const updatedExamination = await examination.update(id, updatedData);

    res.status(200).json({ status: 'success', data: updatedExamination });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Delete a examination by ID
async function deleteExamination(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  try {
    const existingExamination = await examination.show(id);

    if (!existingExamination) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Examination not found' });
    }

    await examination.delete(id);

    res.status(200).json({
      status: 'success',
      message: `Examination with ID ${id} has been deleted`,
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
  updateExamination,
  getExamination,
  deleteExamination,
};
