import { userRoute } from "./v1/routes";
import { IRoutes, IRoute } from "../interfaces";
import { Express } from "express";

const V1: IRoutes = [
  {
    url: "users",
    route: userRoute,
  },
].map((e: IRoute) => {
  e.url = `v1/${e.url}`;
  return e;
});

export const addRoutes = (app: Express) => {
  V1.forEach((route) => {
    app.use(`/api/${route.url}`, route.route);
  });
};
