import { useAuth } from "./context/AuthContext";
import AuthRoutes from "./routes/AuthRoute";
import AppRoutes from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";

function App() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Allow access to auth-success and check-workspace even when authenticated
  const isAuthFlow = ["/auth-success", "/check-workspace"].includes(
    location.pathname
  );

  return isAuthenticated && !isAuthFlow ? <AppRoutes /> : <AuthRoutes />;
}

export default App;
