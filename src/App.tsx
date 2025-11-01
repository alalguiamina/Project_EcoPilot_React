import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import DataEntryPage from "./Components/DataEntryPage/DataEntryPage";
import CarbonFootprintPage from "./Components/CarbonFootprintPage/CarbonFootprintPage";
import ESGIndicatorsPage from "./Components/ESGIndicatorsPage/ESGIndicatorsPage";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

export type User = { role: "AgentSaisie" | "User" | "SuperUser" | "Admin" };

const App = () => {
  const [user] = useState<User>({ role: "AgentSaisie" });

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
            path="/data-entry"
            element={
              <ProtectedRoute user={user}>
                <DataEntryPage user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/carbon"
            element={
              <ProtectedRoute user={user}>
                <CarbonFootprintPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/esg"
            element={
              <ProtectedRoute user={user}>
                <ESGIndicatorsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
