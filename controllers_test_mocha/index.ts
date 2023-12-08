import "express-async-errors";
import express, { Express } from "express";
import { addRoutes } from "./app/routes/index";
import { PORT } from "./app/env";
import { addMiddlewares } from "./app/middlewares";

const app: Express = express();
addMiddlewares(app);

addRoutes(app);

app.use(function (err: any, req: any, res: any, next: any) {
  res.status(403);
  res.json({
    data: [],
    status: "fail",
    message: "Something wrong with the server",
  });
});

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
// //initialization
// const start = () => {

// };

// start();

export { app };
