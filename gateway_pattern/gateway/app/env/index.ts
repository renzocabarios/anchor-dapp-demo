import dotenv from "dotenv";

dotenv.config();

const ENV = {
  PORT: process.env.PORT || 9000,
  AUTH_API: process.env.AUTH_API || "http://localhost:9000/api/v1/",
};

export default ENV;
