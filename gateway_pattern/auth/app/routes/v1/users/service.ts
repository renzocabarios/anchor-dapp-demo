import model from "./model.js";
import { ClientSession, ObjectId } from "mongoose";
import { IAddUserDto } from "../../../types/index.js";

async function getAll() {
  return await model.find({ deleted: false });
}

async function getById(_id: any) {
  return await model.findOne({ deleted: false, _id });
}

async function add(_body: IAddUserDto, session: ClientSession) {
  return await model.create([_body], { session });
}

async function update(filter: any, _body: any, session: ClientSession) {
  return await model.findOneAndUpdate(filter, _body, { new: true, session });
}

async function removeOne(filter: any, session: ClientSession) {
  return await model.findOneAndUpdate(
    filter,
    { deleted: true },
    { new: true, session }
  );
}

export default { getById, getAll, add, update, removeOne };
