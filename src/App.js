import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import DataEntryPage from "./Components/DataEntryPage/DataEntryPage";
import CarbonFootprintPage from "./Components/CarbonFootprintPage/CarbonFootprintPage";
import ESGIndicatorsPage from "./Components/ESGIndicatorsPage/ESGIndicatorsPage";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
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
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/data-entry"
            element={
              <ProtectedRoute user={user}>
                <DataEntryPage />{" "}
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
                {" "}
                <ESGIndicatorsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
