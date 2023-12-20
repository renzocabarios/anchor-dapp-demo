import connectDB from "./app/db";
import ENV from "./app/env/index";
import fs from "fs";
import app from "./config/index";

//initialization
const start = () => {
  fs.mkdirSync("./uploads", { recursive: true });
  connectDB(ENV.MONGO_CON).then(() => {
    console.log(`Database connected to ${ENV.MONGO_CON}`);

    app.listen(ENV.PORT, () => {
      console.log(`Server started on port ${ENV.PORT}`);
    });
  });
};

start();
