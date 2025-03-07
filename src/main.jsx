import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Provider } from "react-redux";
import configStore from "./redux/configStore.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={configStore}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
);
