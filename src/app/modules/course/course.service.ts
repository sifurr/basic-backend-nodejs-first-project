/* eslint-disable no-console */
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);

  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate({
      path: 'prerequisiteCourses.course',
      populate: {
        path: 'prerequisiteCourses.course',
        populate: {
          path: 'prerequisiteCourses.course',
        },
      },
    }),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;

  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'prerequisiteCourses.course',
  );

  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  // separate the basic course info and prerequisiteCourse to edit them separately

  const { prerequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // edit and update basic course info
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update the course');
    }

    // check if there are any pre requisite courses to delete
    if (prerequisiteCourses && prerequisiteCourses.length > 0) {
      const deletedPrerequisites = prerequisiteCourses
        .filter((item) => item.course && item.isDeleted)
        .map((item) => item.course);

      const deletedPrerequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            prerequisiteCourses: { course: { $in: deletedPrerequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedPrerequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to update the course',
        );
      }

      // check if there are any pre requisite courses to add
      const newPrerequisites = prerequisiteCourses.filter(
        (item) => item.course && !item.isDeleted,
      );

      const newPrerequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { prerequisiteCourses: { $each: newPrerequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newPrerequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to update the course',
        );
      }

      const result = await Course.findById(id).populate(
        'prerequisiteCourses.course',
      );

      return result;
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update the course');
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
};
