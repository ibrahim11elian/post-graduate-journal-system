import {
  ExamenDetails,
  EXAMEN_DETAILS,
} from '../../../../models/examen_details';
import { Request, Response } from 'express';

const examenDetails = new ExamenDetails();

// Create an examen detail
async function create(req: Request, res: Response) {
  try {
    const newExamenDetail = await examenDetails.create(
      req.body as EXAMEN_DETAILS
    );

    res.status(201).json({ status: 'success', data: newExamenDetail });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Get all examen details
async function index(req: Request, res: Response) {
  try {
    const examenDetailsList = await examenDetails.index();
    res.status(200).json({ status: 'success', data: examenDetailsList });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Get a specific examen detail by ID
async function getExamenDetail(req: Request, res: Response) {
  const id = parseInt(req.params.identifier);

  try {
    const examenDetail = await examenDetails.show(id);

    if (!examenDetail) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Examen detail not found' });
    }

    res.status(200).json({ status: 'success', data: examenDetail });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Update an examen detail
async function updateExamenDetail(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  const updatedData = req.body;

  try {
    // Check if the examen detail exists
    const existingExamenDetail = await examenDetails.show(id);

    if (!existingExamenDetail) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Examen detail not found' });
    }

    // Update the examen detail
    const updatedExamenDetail = await examenDetails.update(id, updatedData);

    res.status(200).json({ status: 'success', data: updatedExamenDetail });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: (error as Error).message });
  }
}

// Delete an examen detail by ID
async function deleteExamenDetail(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  try {
    const existingExamenDetail = await examenDetails.show(id);

    if (!existingExamenDetail) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Examen detail not found' });
    }

    await examenDetails.delete(id);

    res.status(200).json({
      status: 'success',
      message: `Examen detail with ID ${id} has been deleted`,
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
  updateExamenDetail,
  getExamenDetail,
  deleteExamenDetail,
};
