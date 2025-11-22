import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import Dashboard from "./Components/Dashboard/Dashboard";
import DataEntryPage from "./Components/DataEntryPage/DataEntryPage";
import CarbonFootprintPage from "./Components/CarbonFootprintPage/CarbonFootprintPage";
import ESGIndicatorsPage from "./Components/ESGIndicatorsPage/ESGIndicatorsPage";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import OrganisationPage from "Components/OrganisationPage/OrganisationPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { useAuthToken } from "./hooks/useAuthToken";
import { useGetCurrentUser } from "./hooks";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import type { User as BackendUser } from "./types/user";
import { CanevasPage } from "Components/DataEntryPage/CanevasPage";
import { ValidationPage } from "Components/DataEntryPage/ValidationPage";
import Login from "Components/Login/Login";
import Sidebar from "./Components/Sidebar/Sidebar";

export type UserRole = "agent" | "user" | "super_user" | "admin";

// Replace the local User shape with an alias to the backend type
export type User = BackendUser;

function App() {
  const [user, setUser] = useState<BackendUser | null>(null);

  const loginMutation = useAuthToken();

  const currentUserQuery = useGetCurrentUser({ enabled: false });

  // when current-user query returns, store it in App state
  useEffect(() => {
    if (currentUserQuery.data) {
      setUser(currentUserQuery.data);
    }
  }, [currentUserQuery.data]);

  // on startup, if token exists try to load user
  useEffect(() => {
    const token =
      localStorage.getItem(ACCESS_TOKEN) ?? localStorage.getItem("authToken");
    if (token) {
      currentUserQuery.refetch().catch(() => setUser(null));
    }
  }, []); // run once

  const handleLogin = async (username: string, password: string) => {
    try {
      const resp = await loginMutation.mutateAsync({ username, password });
      if (resp.access) {
        localStorage.setItem(ACCESS_TOKEN, resp.access);
      }
      if (resp.refresh) {
        localStorage.setItem(REFRESH_TOKEN, resp.refresh);
      }

      const userRes = await currentUserQuery.refetch();
      if (userRes.data) {
        setUser(userRes.data);
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setUser(null);
    // optionally navigate to /login
  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App" style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar user={user} />
        <div style={{ flex: 1 }}>
          <Routes>
            {/* root: redirect to dashboard if logged, otherwise to login */}
            <Route
              path="/"
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Login */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />

            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user}>
                  <Dashboard user={user as BackendUser} />
                </ProtectedRoute>
              }
            />

            {/* Data Entry base -> render DataEntryPage directly */}
            <Route
              path="/data-entry"
              element={
                <ProtectedRoute user={user}>
                  <DataEntryPage user={user as BackendUser} />
                </ProtectedRoute>
              }
            />

            {/* Other pages */}
            <Route
              path="/carbon"
              element={
                <ProtectedRoute user={user}>
                  <CarbonFootprintPage user={user as BackendUser} />
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
                <ProtectedRoute user={user} requiredRole="admin">
                  <OrganisationPage user={user as BackendUser} />
                </ProtectedRoute>
              }
            />
            {/* fallback: send unknown routes to root */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
