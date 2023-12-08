import { userService } from "../services";
import { startSession, ClientSession } from "mongoose";
import { Request, Response } from "express";

export const getAll = async (_req: Request, _res: Response) => {
  const data = await userService.getAll();
  _res.send({
    data,
    status: "success",
    message: "Get user success",
  });
};

export const add = async (_req: Request, _res: Response) => {
  const session: ClientSession = await startSession();
  const data = await userService.create({ ..._req.body }, session);
  _res.send({
    data,
    status: "success",
    message: "Create user success",
  });
};

export const update = async (_req: Request, _res: Response) => {
  const session: ClientSession = await startSession();
  const { id } = _req.params;
  const data = await userService.update(id, { ..._req.body }, session);
  _res.send({
    data: [data],
    status: "success",
    message: "Update user success",
  });
};

export const removeOne = async (_req: Request, _res: Response) => {
  const session: ClientSession = await startSession();
  const { id } = _req.params;
  const data = await userService.deleteById(id, session);

  if (data) {
    _res.send({
      data: [],
      status: "failed",
      message: "Delete user fail",
    });
    return;
  }
  _res.send({
    data: [],
    status: "success",
    message: "Delete user success",
  });
};

export default { getAll, add, update, removeOne };
