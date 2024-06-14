import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentID } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';



const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // applying transaction instead of old system

  // first create a session for creating an isolated environment
  const session = await mongoose.startSession();

  try {
    // set manually generated id
    // userData.id = '2030100001';

    // set automatic generated id instead of manually generated id
    // userData.id = generateStudentID(admissionSemester);

    // now start the transaction
    session.startTransaction();
    if (!admissionSemester) {
      throw new Error('This is an error');
    }

    userData.id = await generateStudentID(admissionSemester);

    // create a user  (transaction - 1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create a user');
    }
    // set id, _id as user
    payload.id = newUser[0].id; // embedding id
    payload.user = newUser[0]._id; // referencing _id of student model

    // create a student  (transaction - 2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create a student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
  }
};

export const UserServices = {
  createStudentIntoDB,
};
