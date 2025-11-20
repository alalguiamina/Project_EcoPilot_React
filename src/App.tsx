import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { Login } from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import DataEntryPage from "./Components/DataEntryPage/DataEntryPage";
import CarbonFootprintPage from "./Components/CarbonFootprintPage/CarbonFootprintPage";
import ESGIndicatorsPage from "./Components/ESGIndicatorsPage/ESGIndicatorsPage";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import OrganisationPage from "Components/OrganisationPage/OrganisationPage";
import { CanevasPage } from "Components/DataEntryPage/CanevasPage";
import { ValidationPage } from "Components/DataEntryPage/ValidationPage";
export type UserRole = "Agent" | "User" | "SuperUser" | "Admin";

export type User = {
  role: UserRole;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  username: string;
  site: string;
};

const App = () => {
  const [user] = useState<User>({
    role: "Admin",
    first_name: "Amina",
    last_name: "Alalgui",
    username: "Amina Alalgui",
    email: "amina@example.com",
    password: "1234",
    site: "Settat - Ferme Doukkala",
  });

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Routes>
          {/* Page de Login (page d'accueil) */}

          <Route path="/" element={<Login />} />
          {/* Page Dashboard */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/data-entry/canevas"
            element={
              <ProtectedRoute user={user}>
                <CanevasPage user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/data-entry/validation"
            element={
              <ProtectedRoute user={user}>
                <ValidationPage user={user} />
              </ProtectedRoute>
            }
          />

          {/* Redirect /data-entry → /data-entry/canevas */}
          <Route
            path="/data-entry"
            element={<Navigate to="/data-entry/canevas" replace />}
          />
          <Route
            path="/carbon"
            element={
              <ProtectedRoute user={user}>
                <CarbonFootprintPage user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/esg"
            element={
              <ProtectedRoute user={user}>
                <ESGIndicatorsPage user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organisation"
            element={
              <ProtectedRoute user={user} requiredRole="Admin">
                <OrganisationPage user={user} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
