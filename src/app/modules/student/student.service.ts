import mongoose from 'mongoose';
import { Student } from './student.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      // populate the grand child as well because
      // academic department refer to academic faculty
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  const result = await Student.findOne({ id }) // here I have used findOne because I've used my own generated id, not the mongo _id
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      // populate the grand child as well because
      // academic department refer to academic faculty
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // const deletedStudent = await Student.updateOne({ id }, { isDeleted: true });
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
  }
};

const updateStudentInDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }

  // console.log(modifiedUpdateData);

  const updatedStudent = await Student.findOneAndUpdate(
    { id },
    modifiedUpdateData,
    {
      new: true,
      runValidators: true,
    },
  );
  return updatedStudent;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentInDB,
  deleteSingleStudentFromDB,
};
