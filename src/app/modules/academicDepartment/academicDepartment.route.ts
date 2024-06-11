import express from 'express';
import { AcademicDepartmentsControllers } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(AcademicDepartmentValidation.createAcademicValidationSchema),
  AcademicDepartmentsControllers.createAcademicDepartment,
);

router.get(
  '/:departmentID',
  AcademicDepartmentsControllers.getSingleAcademicDepartment,
);
router.get('/', AcademicDepartmentsControllers.getAllAcademicDepartments);
router.patch(
  '/:departmentID',
  validateRequest(AcademicDepartmentValidation.updateAcademicValidationSchema),
  AcademicDepartmentsControllers.updateAcademicDepartment,
);

export const AcademicDepartmentsRoutes = router;
