import mongoose from 'mongoose';
import { Student } from './student.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const queryObject = { ...query }; // copy the query
  // manual way to search
  // {$email: {$regex: query.searchTerm, $options: i}}
  // {$presentAddress: {$regex: query.searchTerm, $options: i}}
  // {$'name.firstName': {$regex: query.searchTerm, $options: i}}
  // // searching
  // // dynamic way to search
  // // if nothing is provided in as search term then it will be empty string
  // const studentSearchableField = ['email', 'name.firstName', 'presentAddress'];
  // let searchTerm = '';
  // // but if the search term is given then assign the query dynamically to the search term
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchQuery = Student.find({
  //   $or: studentSearchableField.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });
  // // filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach((item) => delete queryObject[item]);
  // console.log({ query }, { queryObject });
  // const filterQuery = searchQuery
  //   .find(queryObject)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     // populate the grand child as well because
  //     // academic department refer to academic faculty
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });
  // // sorting
  // let sort = '-createdAt'; // by default it is descending order
  // if (query?.sort) {
  //   sort = query?.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);
  // //pagination
  // let page = 1;
  // // limiting
  // let limit = 1;
  // let skip = 0;
  // if (query?.limit) {
  //   limit = Number(query?.limit);
  // }
  // if (query?.page) {
  //   page = Number(query?.page);
  //   skip = (page - 1) * limit;
  // }
  // const paginateQuery = sortQuery.skip(skip);
  // const limitQuery = paginateQuery.limit(limit);
  // // fields limiting
  // let fields = '-__v';
  // if (query?.fields) {
  //   fields = (query?.fields as string).split(',').join(' ');
  // }
  // const fieldQuery = await limitQuery.select(fields);
  // return fieldQuery;

  // ======================================
  // Using Class
  //=====================================

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        // populate the grand child as well because
        // academic department refer to academic faculty
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;

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
