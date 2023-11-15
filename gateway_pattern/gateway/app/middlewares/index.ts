import bodyParser from "body-parser";
import cors from "cors";
import { Express } from "express";

export const middlewares = [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  cors(),
];

export const addMiddlewares = (app: Express) => {
  middlewares.forEach((middleware) => {
    app.use(middleware);
  });
};
