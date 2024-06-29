import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./assets/styles/style.css";
import "./assets/styles/modal.style.css";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";

import { ReactToastifyProvider, ThemeProvider } from "contexts";
import { Provider } from "react-redux";
import { store } from "store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <ReactToastifyProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ReactToastifyProvider>
  </ThemeProvider>
);
