import { Config } from "components";
import { PATH } from "constant";
import { AuthLayout, MainLayout } from "layouts";
import { Login, Project, Register } from "pages";
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
                path: "/project",
                element: <Project />,
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
        ],
    },
];

export const Router = () => useRoutes(router);
