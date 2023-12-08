import { Router } from "express";

export interface IUserModel {
  _id?: string | any;
  firstName: string;
  lastName: string;
  deleted?: Boolean;
}

export interface IRoute {
  url: string;
  route: Router;
}

export type IRoutes = IRoute[];
