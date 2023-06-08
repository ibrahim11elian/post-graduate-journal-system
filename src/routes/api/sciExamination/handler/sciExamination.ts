import {
  SciExamination,
  SCIEXAMINATION,
} from '../../../../models/sciExamination';
import { Request, Response } from 'express';

const sciExamination = new SciExamination();

// Create a sci examination
async function create(req: Request, res: Response) {
  try {
    const newSciExamination = await sciExamination.create(
      req.body as SCIEXAMINATION
    );

    res.status(201).json({ status: 'success', data: newSciExamination });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Get all sci examinations
async function index(req: Request, res: Response) {
  try {
    const sciExaminations = await sciExamination.index();
    res.status(200).json({ status: 'success', data: sciExaminations });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Get a specific sci examination by ID
async function getSciExamination(req: Request, res: Response) {
  const id = parseInt(req.params.identifier);

  try {
    const sciExaminationData = await sciExamination.show(id);

    if (!sciExaminationData) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Sci examination not found' });
    }

    res.status(200).json({ status: 'success', data: sciExaminationData });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Delete a sci examination by ID
async function deleteSciExamination(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  try {
    const existingSciExamination = await sciExamination.show(id);

    if (!existingSciExamination) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Sci examination not found' });
    }

    await sciExamination.delete(id);

    res.status(200).json({
      status: 'success',
      message: `Sci examination with ID ${id} has been deleted`,
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
  getSciExamination,
  deleteSciExamination,
};
