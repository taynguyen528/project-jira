import { Config } from "components";
import { PATH } from "constant";
import { AuthLayout, MainLayout } from "layouts";
import { Board, Login, NotFound, Profile, Project, Register } from "pages";
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
                path: PATH.project,
                element: <Project />,
            },
            {
                path: PATH.myProfile,
                element: <Profile />,
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
