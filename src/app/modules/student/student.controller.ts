import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are fetched successfully',
    data: result,
  });
});

// usage of higher order function
const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single student is fetched successfully',
    data: result,
  });
});

const deleteSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single student is deleted successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentInDB(id, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A student is updateStudent successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteSingleStudent,
};
