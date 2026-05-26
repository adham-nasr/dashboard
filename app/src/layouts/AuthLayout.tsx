import { Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "./AuthLayout.css";

export function AuthLayout() {
  const { user } = useAuth();
  const isLogin = user !== null;

  return (
    <div className="auth-layout">
      <div className="auth-panel">
        <div className="auth-brand">
          <div className="auth-brand-title">
            Logr<span className="auth-brand-hint">.</span>io
          </div>
          <div className="auth-brand-subtitle">
            {isLogin ? "Sign in to your dashboard" : "Create a new account"}
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
