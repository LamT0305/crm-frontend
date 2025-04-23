import { useAuth } from "./context/AuthContext";
import AuthRoutes from "./routes/AuthRoute";
import AppRoutes from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Prevent keyboard shortcuts
  useEffect(() => {
    const preventDevTools = (e) => {
      // Prevent F12
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }

      // Prevent Ctrl+Shift+I (Chrome DevTools)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }

      // Prevent Ctrl+Shift+C (Chrome DevTools)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }

      // Prevent Ctrl+Shift+J (Chrome DevTools)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
      }

      // Prevent Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
    };

    // Prevent right click
    const preventRightClick = (e) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners
    document.addEventListener("keydown", preventDevTools);
    document.addEventListener("contextmenu", preventRightClick);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", preventDevTools);
      document.removeEventListener("contextmenu", preventRightClick);
    };
  }, []);

  useEffect(() => {
    // Console warning
    const warningMessage = `
      ⚠️ Warning:
      This is a protected application.
      Any attempt to inspect or modify may result in account suspension.
    `;

    console.log(warningMessage);

    // Override console methods
    const consoleWarn = console.warn;
    console.warn = function () {
      consoleWarn.apply(console, [warningMessage]);
    };
  }, []);
  // Allow access to auth-success and check-workspace even when authenticated
  const isAuthFlow = ["/auth-success", "/check-workspace"].includes(
    location.pathname
  );

  return isAuthenticated && !isAuthFlow ? <AppRoutes /> : <AuthRoutes />;
}

export default App;
