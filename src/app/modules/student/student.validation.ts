import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().max(20).min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNumber: z.string().min(1),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1),
  contactNo: z.string().min(1),
  occupation: z.string().min(1),
  address: z.string().min(1),
});

const studentValidationSchema = z.object({
  id: z.string().min(1),
  password: z.string().min(1),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email('{VALUE} is not correct email').min(1),
  contactNo: z.string().min(1),
  emergencyContactNo: z.string().min(1),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isDeleted: z.boolean().default(false)
});

export default studentValidationSchema;
