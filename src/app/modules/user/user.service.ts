import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password not given use default password
  userData.password = password || (config.default_password as string);

  // set user role
  userData.role = 'student';

  // set manually generated id
  userData.id = '2030100001';

  // create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(userData).length) {
    // set id, _id as user
    studentData.id = newUser.id; // embedding id 
    studentData.user = newUser._id; // referencing _id of student model

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
