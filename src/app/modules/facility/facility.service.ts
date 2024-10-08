import httpStatus from 'http-status';
import { TFacility } from './facility.interface';
import { Facility } from './facility.model';
import AppError from '../../error/AppError';

const createFacilityIntoDB = async (payload: TFacility) => {
  if (await Facility.isFacilityExists(payload.name)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Facility already exists!');
  }

  const result = await Facility.create(payload);
  const final = await Facility.findById(result._id).select(
    '-createdAt -updatedAt -__v',
  );

  return final;
};

const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacility>,
) => {
  // if (!await Facility.isFacilityExistsForDelete(id)) {
  //     throw new AppError(httpStatus.BAD_REQUEST,'Facility does not exists!');
  //   }

  const result = await Facility.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    fields: '-createdAt -updatedAt -__v',
  });
  return result;
};

const deleteFacilityFromDB = async (id: string) => {
  // if (!await Facility.isFacilityExistsForDelete(id)) {
  //     throw new AppError(httpStatus.BAD_REQUEST,'Facility does not exists!');
  //   }

  const deletedFacility = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, fields: '-createdAt -updatedAt -__v' },
  );

  if (!deletedFacility) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Facility');
  }

  return deletedFacility;
};

const getAllFacilityFromDB = async (pagination : {page:string,size:string}) => {
  const pages=parseInt(pagination.page) 
  const sizes=parseInt(pagination.size) 
  const skip=pages*sizes
  console.log(skip,sizes)
  const result = await Facility.find().select('-createdAt -updatedAt -__v');
  return result;
};

const getSingleFacilityFromDB = async (name: string) => {
  console.log(name);
  const result = await Facility.find({ name: name }).select(
    '-createdAt -updatedAt -__v',
  );
  return result;
};

export const FacilityServices = {
  createFacilityIntoDB,
  updateFacilityIntoDB,
  deleteFacilityFromDB,
  getAllFacilityFromDB,
  getSingleFacilityFromDB,
};
