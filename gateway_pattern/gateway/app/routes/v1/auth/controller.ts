import ENV from "../../../env/index.js";
import { Request, Response } from "express";

const authenticate = async (_req: Request, _res: Response) => {
  const { email, password } = _req.body;

  const response = await (
    await fetch(`${ENV.AUTH_API}auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  ).json();

  _res.send({
    data: response.data,
    status: "success",
    message: "Authenticate user success",
  });
};

export { authenticate };
