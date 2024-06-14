import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().max(20).min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().max(20).min(1).optional(),
  middleName: z.string().optional().optional(),
  lastName: z.string().min(1).optional(),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNumber: z.string().min(1),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().min(1).optional(),
  fatherOccupation: z.string().min(1).optional(),
  fatherContactNo: z.string().min(1).optional(),
  motherName: z.string().min(1).optional(),
  motherOccupation: z.string().min(1).optional(),
  motherContactNumber: z.string().min(1).optional(),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1),
  contactNo: z.string().min(1),
  occupation: z.string().min(1),
  address: z.string().min(1),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().min(1).optional(),
  contactNo: z.string().min(1).optional(),
  occupation: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(1),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email('{VALUE} is not correct email').min(1),
      contactNo: z.string().min(1),
      emergencyContactNo: z.string().min(1),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(1).optional(),
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email('{VALUE} is not correct email').min(1).optional(),
      contactNo: z.string().min(1).optional(),
      emergencyContactNo: z.string().min(1).optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1).optional(),
      permanentAddress: z.string().min(1).optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema
};
