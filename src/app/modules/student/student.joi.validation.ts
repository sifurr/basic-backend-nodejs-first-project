// import Joi from 'joi';

// const userNameValidationSchema = Joi.object({
//   firstName: Joi.string()
//     .trim()
//     .min(1)
//     .max(20)
//     .required()
//     .messages({
//       'string.empty': 'First name is required',
//       'string.min': "First name can't be less than 1 character",
//       'string.max': "First name can't be more than 20 characters",
//     }),
//   middleName: Joi.string().trim().optional(),
//   lastName: Joi.string()
//     .trim()
//     .required()
//     .pattern(/^[a-zA-Z]+$/)
//     .messages({
//       'string.empty': 'Last name is required',
//       'string.pattern.base': '{#value} is not valid',
//     }),
// });

// const guardianValidationSchema = Joi.object({
//   fatherName: Joi.string().trim().required().messages({
//     'string.empty': "Father's name is required",
//   }),
//   fatherOccupation: Joi.string().trim().required().messages({
//     'string.empty': "Father's occupation is required",
//   }),
//   fatherContactNo: Joi.string().trim().required().messages({
//     'string.empty': "Father's contact number is required",
//   }),
//   motherName: Joi.string().trim().required().messages({
//     'string.empty': "Mother's name is required",
//   }),
//   motherOccupation: Joi.string().trim().required().messages({
//     'string.empty': "Mother's occupation is required",
//   }),
//   motherContactNumber: Joi.string().trim().required().messages({
//     'string.empty': "Mother's contact number is required",
//   }),
// });

// const localGuardianValidationSchema = Joi.object({
//   name: Joi.string().trim().required().messages({
//     'string.empty': "Local guardian's name is required",
//   }),
//   contactNo: Joi.string().trim().required().messages({
//     'string.empty': "Local guardian's contact number is required",
//   }),
//   occupation: Joi.string().trim().required().messages({
//     'string.empty': "Local guardian's occupation is required",
//   }),
//   address: Joi.string().trim().required().messages({
//     'string.empty': "Local guardian's address is required",
//   }),
// });

// const studentValidationSchema = Joi.object({
//   id: Joi.string().required().messages({
//     'string.empty': 'Student ID is required',
//   }),
//   name: userNameValidationSchema.required().messages({
//     'any.required': 'Student name is required',
//   }),
//   gender: Joi.string().valid('male', 'female', 'other').required().messages({
//     'any.only': '{#value} is not valid',
//     'any.required': 'Gender is required',
//   }),
//   dateOfBirth: Joi.string().optional(),
//   email: Joi.string().email().required().messages({
//     'string.empty': 'Email is required',
//     'string.email': '{#value} is not a correct email',
//   }),
//   contactNo: Joi.string().required().messages({
//     'string.empty': 'Contact number is required',
//   }),
//   emergencyContactNo: Joi.string().required().messages({
//     'string.empty': 'Emergency contact number is required',
//   }),
//   bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').optional(),
//   presentAddress: Joi.string().required().messages({
//     'string.empty': 'Present address is required',
//   }),
//   permanentAddress: Joi.string().required().messages({
//     'string.empty': 'Permanent address is required',
//   }),
//   guardian: guardianValidationSchema.required().messages({
//     'any.required': 'Guardian information is required',
//   }),
//   localGuardian: localGuardianValidationSchema.required().messages({
//     'any.required': 'Local guardian information is required',
//   }),
//   profileImg: Joi.string().optional(),
//   isActive: Joi.string().valid('active', 'blocked').default('active'),
// });

// export default studentValidationSchema;
