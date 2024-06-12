import { Navbar } from "components";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
    return (
        <main>
            <Navbar />
            <Outlet />
        </main>
    );
};
