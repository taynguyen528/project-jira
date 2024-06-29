import { Spinner } from "./components/Spinners/Spinner";
import { CustomDrawer } from "./components/Drawer/CustomDrawer";
import { CustomModal } from "./components/Modals/CustomModal";
import { Router } from "router";

function App() {
    return (
        <>
      <Spinner />
      <CustomDrawer />
      <CustomModal />
            <Router />
        </>
    );
}

export default App;
