import { Config } from "components";
import { PATH } from "constant";
import { AuthLayout, MainLayout } from "layouts";
import { Board, Login, NotFound, Profile, Register } from "pages";
import { ProjMgmtCreate } from "pages/ProjMgmt";
import { ProjMgmt } from "pages/ProjMgmt/ProjMgmt";
import { UserMgmt } from "pages/UserMgmt/UserMgmt";
import { RouteObject, useRoutes } from "react-router-dom";

const router: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Config />,
      },
      {
        path: PATH.myProfile,
        element: <Profile />,
      },
      {
        path: PATH.project,
        element: <ProjMgmt />,
      },
      {
        path: PATH.projectCreate,
        element: <ProjMgmtCreate />,
      },
      {
        path: PATH.user,
        element: <UserMgmt />,
      },
      {
        path: PATH.board,
        element: <Board />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: PATH.login,
        element: <Login />,
      },
      {
        path: PATH.register,
        element: <Register />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export const Router = () => useRoutes(router);
