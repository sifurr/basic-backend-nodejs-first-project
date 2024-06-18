import { Schema, model } from 'mongoose';
import { TCourse, TPrerequisiteCourses } from './course.interface';

const prerequisiteCoursesSchema = new Schema<TPrerequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course"
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    unique: true,
    trim: true,
  },
  prefix: {
    type: String,
    required: [true, 'Prefix is required'],
    trim: true,
  },
  code: {
    type: Number,
    required: [true, 'Code is required'],
    trim: true,
  },
  credits: {
    type: Number,
    required: [true, 'Code is required'],
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  prerequisiteCourses: [prerequisiteCoursesSchema],
});

export const Course = model<TCourse>('Course', courseSchema);
