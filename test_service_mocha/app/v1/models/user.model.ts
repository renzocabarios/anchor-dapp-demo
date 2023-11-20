import { Schema, model } from "mongoose";
import { IUserModel } from "../../interfaces";
import { RESOURCES } from "../../constants";

const option = {
  timestamps: true,
};

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

export default model(RESOURCES.USERS, schema);
