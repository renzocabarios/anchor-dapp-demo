import service from "./service";
import bcrypt from "bcrypt";
import ENV from "../../../env/index";
import {
  transaction,
  generateAccess,
  generateRefresh,
} from "../../../utils/index";
import { startSession, ClientSession } from "mongoose";
import { Request, Response } from "express";

const getAll = async (_req: Request, _res: Response) => {
  const data = await service.getAll();
  _res.send({
    data,
    status: "success",
    message: "Get user success",
    meta: {
      access: generateAccess({}),
    },
  });
};

// TODO: Add test
const login = async (_req: Request, _res: Response) => {
  const { email, password } = _req.body;
  const session: ClientSession = await startSession();
  const data = await service.getByEmail(email);

  if (!data) {
    _res.send({
      data: [],
      status: "fail",
      message: "Login failed",
      meta: {
        access: generateAccess({}),
      },
    });

    return;
  }

  if (password != data.password) {
    _res.send({
      data: [],
      status: "fail",
      message: "Login failed",
      meta: {
        access: generateAccess({}),
      },
    });

    return;
  }
  const refresh = generateRefresh();

  _res.send(
    ((
      await transaction(
        session,
        async () => {
          return await service.update(
            { _id: data._id },
            { $push: { refresh: refresh } },
            session
          );
        },
        "Create user"
      )
    ).meta.refresh = refresh)
  );
};

const getById = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  const data = await service.getById(id);
  _res.send({
    data: [data],
    status: "success",
    message: "Get user success",
    meta: {
      access: generateAccess({}),
    },
  });
};

const add = async (_req: Request, _res: Response) => {
  const session: ClientSession = await startSession();
  _res.send(
    await transaction(
      session,
      async () => {
        return await service.add({ ..._req.body }, session);
      },
      "Create user"
    )
  );
};

const update = async (_req: Request, _res: Response) => {
  const session: ClientSession = await startSession();
  const { id } = _req.params;
  _res.send(
    await transaction(
      session,
      async () => {
        return await service.update({ _id: id }, _req.body, session);
      },
      "Update user"
    )
  );
};

const removeOne = async (_req: Request, _res: Response) => {
  const session: ClientSession = await startSession();
  const { id } = _req.params;
  _res.send(
    await transaction(
      session,
      async () => {
        return await service.removeOne({ _id: id }, session);
      },
      "Delete user"
    )
  );
};

export { getAll, getById, add, update, removeOne };
