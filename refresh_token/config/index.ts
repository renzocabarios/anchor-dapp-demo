import express, { Express } from "express";
import { addMiddlewares } from "../app/middlewares";
import { addRoutes } from "../app/routes";

const app: Express = express();
addMiddlewares(app);
addRoutes(app);

export default app;
