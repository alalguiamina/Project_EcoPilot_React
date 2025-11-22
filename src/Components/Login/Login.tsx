import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthToken } from "../../hooks/useAuthToken";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

type LoginProps = {
  onLogin?: (username: string, password: string) => Promise<void>;
};

export default function Login({ onLogin }: LoginProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const auth = useAuthToken();

  const handleSuccessNavigation = () => {
    navigate("/dashboard", { replace: true });
  };

  const handleLocalLogin = async (id: string, pwd: string) => {
    const data = await auth.mutateAsync({ user: id, password: pwd });
    const access = data.access ?? data.token ?? data.access_token;
    const refresh = data.refresh ?? data.refresh_token;

    if (access) localStorage.setItem(ACCESS_TOKEN ?? "authToken", access);
    if (refresh) localStorage.setItem(REFRESH_TOKEN ?? "refreshToken", refresh);

    await qc.invalidateQueries({ queryKey: ["current-user"] });
    await qc.refetchQueries({ queryKey: ["current-user"] });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (onLogin) {
        await onLogin(identifier, password);
      } else {
        await handleLocalLogin(identifier, password);
      }
      handleSuccessNavigation();
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err?.message ?? "Échec de la connexion");
    }
  };

  return (
    <div
      className="login-page"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg, #f7fafc)",
        padding: 24,
      }}
    >
      <div
        className="login-card"
        style={{
          width: 420,
          maxWidth: "90%",
          background: "white",
          borderRadius: 12,
          boxShadow: "0 6px 24px rgba(15,23,42,0.08)",
          padding: 28,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div style={{ textAlign: "center" }}>
          {/* replace src with your logo path if available */}
          <img
            src="/logo.png"
            alt="Domaine Agricole"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
            style={{ height: 56, objectFit: "contain", margin: "0 auto 8px" }}
          />
          <h2 style={{ margin: 0, fontSize: 18, color: "#0f172a" }}>
            Domaine Agricole
          </h2>
        </div>

        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {error && (
            <div className="error" style={{ color: "#b91c1c", fontSize: 13 }}>
              {error}
            </div>
          )}

          <div
            className="form-field"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <label style={{ fontSize: 13, color: "#475569" }}>
              Nom d'utilisateur / Email
            </label>
            <input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Nom d'utilisateur ou email"
              required
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                outline: "none",
                fontSize: 14,
              }}
            />
          </div>

          <div
            className="form-field"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <label style={{ fontSize: 13, color: "#475569" }}>
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                outline: "none",
                fontSize: 14,
              }}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              marginTop: 6,
              padding: "10px 12px",
              borderRadius: 8,
              background: "linear-gradient(90deg,#16a34a,#059669)",
              color: "white",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Se connecter
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#94a3b8",
          }}
        >
          © Domaine Agricole
        </div>
      </div>
    </div>
  );
}
