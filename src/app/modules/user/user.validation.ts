import { z } from 'zod';

const userValidationSchema = z.object({ 
  password: z
    .string({invalid_type_error: "Password must be string"})
    .max(12, { message: "Password can't be more than 12 characters" })
    .optional(),  
  role: z.enum(['admin', 'student', 'faculty']),
  status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  isDeleted: z.boolean().default(false).optional(),
});

export default userValidationSchema;
