import { ClientSession } from "mongoose";
import { IUserModel } from "../../../interfaces";
import { userModel } from "../models";

export async function getAll() {
  return await userModel.find({ deleted: false });
}

export async function getById(_id: string) {
  return await userModel.findOne({ _id, deleted: false });
}

export async function create(
  body: Partial<IUserModel>,
  session: ClientSession
) {
  return await userModel.create([body], {
    session,
  });
}

export async function update(
  _id: string,
  body: Partial<IUserModel>,
  session: ClientSession
) {
  return await userModel.findOneAndUpdate({ _id, deleted: false }, body, {
    new: true,
    session,
  });
}

export async function deleteById(_id: string, session: ClientSession) {
  return await userModel.findOneAndUpdate(
    { _id, deleted: false },
    { deleted: true },
    {
      new: true,
      session,
    }
  );
}

export default { getAll, getById, create, update, deleteById };
