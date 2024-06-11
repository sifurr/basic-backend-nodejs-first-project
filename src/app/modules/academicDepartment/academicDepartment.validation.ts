import { z } from 'zod';

const createAcademicValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Department name has to be string',
      required_error: 'Department name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic faculty name has to be string',
      required_error: 'Faculty name is required',
    }),
  }),
});

const updateAcademicValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Department name has to be string',
        required_error: 'Department name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic faculty name has to be string',
        required_error: 'Faculty name is required',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicValidationSchema,
  updateAcademicValidationSchema,
};
