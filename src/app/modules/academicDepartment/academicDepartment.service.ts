import { AcademicDepartment } from './academicDepartment.model';
import { TAcademicDepartment } from './academicDepartment.interface';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  // same department name checking can be done from model layer using pre middleware at model layer,
  // it can also be done here from service layer
  // const isDepartmentExists = await AcademicDepartment.findOne({
  //   name: payload.name,
  // });
  // if (isDepartmentExists) {
  //   throw new Error(`${isDepartmentExists.name} already exists`);
  // }

  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};

const updateAcademicDepartmentInDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentInDB,
};
