
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Navbar } from "components";
import { Outlet } from "react-router-dom";
import { ProtectedRouteTemplate } from "template";

export const MainLayout = () => {
    const { userLogin } = useSelector(
        (state: RootState) => state.quanLyNguoiDung
    );

    return (
        <main>
            {userLogin && <Navbar />}
            <ProtectedRouteTemplate>
                <Outlet />
            </ProtectedRouteTemplate>
        </main>
    );
};
