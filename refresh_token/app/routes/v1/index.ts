import usersRoute from "./users/route";
import { IRoutes, IRoute } from "../../types";

const routes: IRoutes = [
  {
    url: "users",
    route: usersRoute,
  },
];

export default routes.map((e: IRoute) => {
  e.url = `v1/${e.url}`;
  return e;
});
