import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
   
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student are fetched successfully',
      data: result
    })
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: err.message || 'Something went wrong!',
    //   error: err,
    // });

    next(err);
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);   

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single student is fetched successfully',
      data: result
    })  
    
  } catch (err) {
    next(err);
  }
};

const deleteSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(studentId);   

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single student is deleted successfully',
      data: result
    })
  } catch (err) {
    next(err);
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
