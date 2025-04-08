import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Provider } from "react-redux";
import configStore from "./redux/configStore.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Provider store={configStore}>
    <BrowserRouter>
      <AuthProvider>
          <ToastContainer />
          <App />
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);
