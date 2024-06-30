import { Spinner } from "spinners";
import { CustomDrawer } from "drawer";
import { CustomModal } from "modals";
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
