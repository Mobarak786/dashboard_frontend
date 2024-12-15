import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/Store";

import UserManagementDashboard from "./components/UserManagementDashboard";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import LoginPage from "./components/LoginPage";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* login route */}
          <Route
            path="/login"
            element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
          />

          {/* protected route */}
          {isAuthenticated ? (
            <Route>
              <Route path="/" element={<UserManagementDashboard />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
            </Route>
          ) : (
            // redirect to login page if not authenticated
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
