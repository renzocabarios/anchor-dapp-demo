import { Schema, model } from "mongoose";

const option = {
  timestamps: true,
};

export interface IUserModel {
  _id?: string | any;
  firstName: string;
  lastName: string;
  deleted?: Boolean;
}

const schema = new Schema<IUserModel>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  option
);

export default model("Users", schema);
