import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentsRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { CourseRoutes } from '../modules/course/course.route';

const router = Router();

// router.use('/users', UserRoutes);
// router.use('/students', StudentRoutes);

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentsRoutes,
  },

  {
    path: '/courses',
    route: CourseRoutes,
  },



];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
