import Input from "../components/Input";
import Card from "../components/Card";
import { C } from "../utils/constants";
import Button from "../components/Button";

function AuthPage ({ onLogin, onGoRegister, onGoLogin, mode }) {
  const isLogin = mode === "login";
  return (
    <div style={{
      minHeight: "100vh", background: C.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ width: 380 }}>
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.04em", color: C.text }}>
            Logr<span style={{ color: C.hint }}>.</span>io
          </div>
          <div style={{ fontSize: 14, color: C.muted, marginTop: 6 }}>
            {isLogin ? "Sign in to your dashboard" : "Create a new account"}
          </div>
        </div>

        <Card style={{ padding: "32px 28px" }}>
          {!isLogin && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, color: C.muted, display: "block", marginBottom: 6 }}>Full Name</label>
              <Input placeholder="Jane Smith" />
            </div>
          )}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: C.muted, display: "block", marginBottom: 6 }}>Email</label>
            <Input placeholder="you@example.com" type="email" />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, color: C.muted, display: "block", marginBottom: 6 }}>Password</label>
            <Input placeholder="••••••••" type="password" />
          </div>
          <Button onClick={onLogin} style={{ width: "100%" }}>
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
        </Card>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: C.muted }}>
          {isLogin ? (
            <>No account?{" "}
              <span onClick={onGoRegister} style={{ color: C.accent, cursor: "pointer", fontWeight: 500 }}>Register</span>
            </>
          ) : (
            <>Already have one?{" "}
              <span onClick={onGoLogin} style={{ color: C.accent, cursor: "pointer", fontWeight: 500 }}>Sign in</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};