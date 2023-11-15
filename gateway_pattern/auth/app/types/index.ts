import { RESOURCE } from "../constants";

export interface IMemoryModel {
  _id?: string | any;
  front: string;
  back: string;
  due: Date;
  deleted?: Boolean;
}

export interface IUserModel {
  _id?: string | any;
  firstName: string;
  lastName: string;
  deleted?: Boolean;
}

export interface IAddUserDto {
  firstName: string;
  lastName: string;
  type?: string;
  deleted?: Boolean;
}
