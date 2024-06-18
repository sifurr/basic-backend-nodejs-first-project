import { z } from 'zod';

const createPrerequisiteCoursesValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    isDeleted: z.boolean().optional(),
    prerequisiteCourses: z
      .array(createPrerequisiteCoursesValidationSchema)
      .optional(),
  }),
});

const updatePrerequisiteCoursesValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    isDeleted: z.boolean().optional(),
    prerequisiteCourses: z
      .array(updatePrerequisiteCoursesValidationSchema)
      .optional(),
  }),
});



export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
