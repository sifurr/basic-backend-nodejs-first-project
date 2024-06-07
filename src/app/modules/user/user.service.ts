import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';


const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // set manually generated id
  // userData.id = '2030100001';

  // set automatic generated id instead of manually generated id
  // userData.id = generateStudentID(admissionSemester);

  userData.id = await generateStudentID(admissionSemester)

  // create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(userData).length) {
    // set id, _id as user
    payload.id = newUser.id; // embedding id
    payload.user = newUser._id; // referencing _id of student model

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
