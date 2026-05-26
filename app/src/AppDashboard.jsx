import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

/* ─── DESIGN TOKENS ─── */
const C = {
  bg: "#F7F6F3",
  surface: "#FFFFFF",
  border: "rgba(0,0,0,0.08)",
  borderMd: "rgba(0,0,0,0.13)",
  text: "#1A1A18",
  muted: "#6B6A66",
  hint: "#A09F9B",
  accent: "#2D3748",
  accentLight: "#EEF0F4",
  success: "#1D9E75",
  successBg: "#E1F5EE",
  warn: "#BA7517",
  warnBg: "#FAEEDA",
  danger: "#A32D2D",
  dangerBg: "#FCEBEB",
  info: "#185FA5",
  infoBg: "#E6F1FB",
};

const STATUS_MAP = {
  Active:   { bg: C.accentLight, color: C.accent },
  Inactive: { bg: "#F1EFE8",     color: "#5F5E5A" },
  Disabled: { bg: C.warnBg,      color: C.warn },
};

const PIE_COLORS = ["#2D3748", "#A09F9B", "#EF9F27"];

/* ─── STATIC SEED DATA ─── */
const APPS = [
  { id: 1, name: "Auth Service",     apiKey: "sk-live-xK9mP2qR7vL4nW0", status: "Active",   logs: 1240, errors: 23, warns: 87  },
  { id: 2, name: "Payment Gateway",  apiKey: "sk-live-aB3cD8eF1gH6iJ2", status: "Active",   logs: 3780, errors: 4,  warns: 12  },
  { id: 3, name: "Email Dispatcher", apiKey: "sk-live-kL5mN0oP9qR2sT4", status: "Inactive", logs: 420,  errors: 0,  warns: 5   },
];

const LOGS = [
  { id: 1, message: "User login successful",          level: "INFO",  count: 412, first: "2025-05-01 08:14", last: "2025-05-24 09:02" },
  { id: 2, message: "JWT token expired",              level: "WARN",  count: 87,  first: "2025-05-03 11:30", last: "2025-05-23 22:15" },
  { id: 3, message: "Rate limit exceeded for IP",     level: "ERROR", count: 23,  first: "2025-05-10 14:05", last: "2025-05-24 06:44" },
  { id: 4, message: "Password reset email sent",      level: "INFO",  count: 198, first: "2025-05-02 09:00", last: "2025-05-24 08:50" },
  { id: 5, message: "Database connection pool full",  level: "ERROR", count: 7,   first: "2025-05-15 03:22", last: "2025-05-20 03:41" },
  { id: 6, message: "Session cookie refreshed",       level: "INFO",  count: 2310,first: "2025-05-01 08:00", last: "2025-05-24 09:05" },
  { id: 7, message: "OAuth callback mismatch",        level: "WARN",  count: 14,  first: "2025-05-12 16:44", last: "2025-05-22 11:09" },
  { id: 8, message: "2FA code verified",              level: "INFO",  count: 320, first: "2025-05-04 10:11", last: "2025-05-24 08:58" },
  { id: 9, message: "Account locked after retries",   level: "ERROR", count: 3,   first: "2025-05-18 20:33", last: "2025-05-19 22:01" },
  { id: 10,message: "CORS headers injected",          level: "INFO",  count: 890, first: "2025-05-01 08:01", last: "2025-05-24 09:04" },
  { id: 11,message: "Unexpected null payload",        level: "WARN",  count: 6,   first: "2025-05-17 13:55", last: "2025-05-21 15:30" },
  { id: 12,message: "Cache miss — fallback to DB",    level: "WARN",  count: 132, first: "2025-05-05 07:10", last: "2025-05-24 08:47" },
];

const LOGS_PER_PAGE = 5;

/* ─── SHARED COMPONENTS ─── */
const Tag = ({ label, style }) => (
  <span style={{
    display: "inline-block",
    fontSize: 12, fontWeight: 500, letterSpacing: "0.02em",
    padding: "3px 10px", borderRadius: 99,
    border: `0.5px solid rgba(0,0,0,0.12)`,
    ...style,
  }}>{label}</span>
);

const LevelBadge = ({ level }) => {
  const map = {
    INFO:  { bg: C.infoBg,    color: C.info },
    WARN:  { bg: C.warnBg,    color: C.warn },
    ERROR: { bg: C.dangerBg,  color: C.danger },
  };
  const s = map[level] || map.INFO;
  return <Tag label={level} style={{ background: s.bg, color: s.color, border: "none" }} />;
};

const Card = ({ children, style }) => (
  <div style={{
    background: C.surface, borderRadius: 12,
    border: `0.5px solid ${C.border}`,
    padding: "20px 24px", ...style,
  }}>{children}</div>
);

const Input = ({ placeholder, type = "text", value, onChange, style }) => (
  <input
    type={type} placeholder={placeholder} value={value} onChange={onChange}
    style={{
      width: "100%", boxSizing: "border-box",
      height: 40, padding: "0 14px",
      fontSize: 14, color: C.text,
      background: C.bg, border: `0.5px solid ${C.borderMd}`,
      borderRadius: 8, outline: "none",
      fontFamily: "inherit", ...style,
    }}
  />
);

const Btn = ({ children, onClick, variant = "primary", style }) => {
  const isPrimary = variant === "primary";
  return (
    <button onClick={onClick} style={{
      height: 38, padding: "0 20px",
      fontSize: 14, fontWeight: 500,
      borderRadius: 8, cursor: "pointer",
      fontFamily: "inherit",
      background: isPrimary ? C.accent : "transparent",
      color: isPrimary ? "#FFF" : C.text,
      border: isPrimary ? "none" : `0.5px solid ${C.borderMd}`,
      transition: "opacity 0.15s",
      ...style,
    }}>{children}</button>
  );
};

/* ─── SIDEBAR ─── */
const NAV_ITEMS = [
  { key: "apps",    label: "Applications", icon: "⬡" },
  { key: "apikey",  label: "API Key",       icon: "⌗" },
  { key: "account", label: "Account",       icon: "◉" },
];

const Sidebar = ({ page, setPage, onLogout }) => (
  <div style={{
    width: 220, flexShrink: 0,
    background: C.surface,
    borderRight: `0.5px solid ${C.border}`,
    display: "flex", flexDirection: "column",
    padding: "28px 0",
  }}>
    {/* Logo */}
    <div style={{ padding: "0 24px 32px", borderBottom: `0.5px solid ${C.border}` }}>
      <div style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-0.02em", color: C.text }}>
        Logr<span style={{ color: C.hint }}>.</span>io
      </div>
      <div style={{ fontSize: 12, color: C.hint, marginTop: 2 }}>Dashboard</div>
    </div>

    {/* Nav */}
    <nav style={{ flex: 1, padding: "20px 12px" }}>
      {NAV_ITEMS.map(({ key, label, icon }) => {
        const active = page === key;
        return (
          <div key={key} onClick={() => setPage(key)} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "9px 12px", borderRadius: 8, marginBottom: 2,
            cursor: "pointer", fontSize: 14,
            background: active ? C.accentLight : "transparent",
            color: active ? C.accent : C.muted,
            fontWeight: active ? 500 : 400,
            transition: "background 0.12s",
          }}>
            <span style={{ fontSize: 16, opacity: 0.7 }}>{icon}</span>
            {label}
          </div>
        );
      })}
    </nav>

    {/* Logout */}
    <div style={{ padding: "0 12px" }}>
      <div onClick={onLogout} style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "9px 12px", borderRadius: 8,
        cursor: "pointer", fontSize: 14, color: C.hint,
      }}>
        <span style={{ fontSize: 16 }}>↩</span> Logout
      </div>
    </div>
  </div>
);

/* ─── AUTH PAGES ─── */
const AuthPage = ({ onLogin, onGoRegister, onGoLogin, mode }) => {
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
          <Btn onClick={onLogin} style={{ width: "100%" }}>
            {isLogin ? "Sign In" : "Create Account"}
          </Btn>
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

/* ─── API KEY PAGE ─── */
const ApiKeyPage = () => {
  const [revealed, setRevealed] = useState(false);
  const key = "sk-live-xK9mP2qR7vL4nW0aZ5bC8dE3fG6hI1jK4lM7";
  return (
    <div style={{ maxWidth: 600 }}>
      <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 6px", color: C.text }}>API Key</h2>
      <p style={{ fontSize: 14, color: C.muted, margin: "0 0 24px" }}>
        Use this key to authenticate requests from your application.
      </p>
      <Card style={{ padding: "20px 20px" }}>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>Your secret key</div>
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          background: C.bg, borderRadius: 8,
          padding: "10px 14px",
          border: `0.5px solid ${C.borderMd}`,
        }}>
          <code style={{
            flex: 1, fontSize: 13, fontFamily: "monospace",
            color: C.text, letterSpacing: "0.04em", wordBreak: "break-all",
          }}>
            {revealed ? key : key.slice(0, 10) + "••••••••••••••••••••••"}
          </code>
          <Btn variant="ghost" onClick={() => setRevealed(v => !v)} style={{ padding: "0 12px", height: 32, fontSize: 12 }}>
            {revealed ? "Hide" : "Reveal"}
          </Btn>
        </div>
        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <Btn variant="ghost" style={{ fontSize: 13 }}>Copy</Btn>
          <Btn variant="ghost" style={{ fontSize: 13, color: C.danger, borderColor: "rgba(163,45,45,0.25)" }}>Regenerate</Btn>
        </div>
      </Card>

      <Card style={{ marginTop: 16, padding: "16px 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 6 }}>Usage example</div>
        <pre style={{
          fontSize: 12, lineHeight: 1.6, color: C.muted,
          background: C.bg, borderRadius: 8, padding: 14,
          margin: 0, overflowX: "auto", border: `0.5px solid ${C.border}`,
        }}>{`fetch("https://api.logr.io/v1/events", {\n  headers: {\n    "Authorization": "Bearer YOUR_API_KEY"\n  }\n})`}</pre>
      </Card>
    </div>
  );
};

/* ─── ACCOUNT PAGE ─── */
const AccountPage = () => (
  <div style={{ maxWidth: 500 }}>
    <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 6px", color: C.text }}>Account</h2>
    <p style={{ fontSize: 14, color: C.muted, margin: "0 0 24px" }}>Manage your profile settings.</p>
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div style={{
          width: 52, height: 52, borderRadius: "50%",
          background: C.accentLight, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 18, fontWeight: 600, color: C.accent,
        }}>JD</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 500, color: C.text }}>Jane Doe</div>
          <div style={{ fontSize: 13, color: C.muted }}>jane@example.com</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={{ fontSize: 13, color: C.muted, display: "block", marginBottom: 6 }}>Full Name</label>
          <Input placeholder="Jane Doe" />
        </div>
        <div>
          <label style={{ fontSize: 13, color: C.muted, display: "block", marginBottom: 6 }}>Email</label>
          <Input placeholder="jane@example.com" type="email" />
        </div>
        <div>
          <label style={{ fontSize: 13, color: C.muted, display: "block", marginBottom: 6 }}>New Password</label>
          <Input placeholder="Leave blank to keep current" type="password" />
        </div>
        <div style={{ paddingTop: 4 }}>
          <Btn>Save Changes</Btn>
        </div>
      </div>
    </Card>
  </div>
);

/* ─── APPS LIST PAGE ─── */
const AppsPage = ({ onSelectApp }) => {
  const [showCreate, setShowCreate] = useState(false);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 4px", color: C.text }}>Applications</h2>
          <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>{APPS.length} apps connected</p>
        </div>
        <Btn onClick={() => setShowCreate(true)}>+ New Application</Btn>
      </div>

      {/* Create modal */}
      {showCreate && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.18)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
        }}>
          <Card style={{ width: 400, padding: "28px 28px" }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 20 }}>New Application</div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, color: C.muted, display: "block", marginBottom: 6 }}>App Name</label>
              <Input placeholder="e.g. Billing Service" />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, color: C.muted, display: "block", marginBottom: 6 }}>Environment</label>
              <select style={{
                width: "100%", height: 40, padding: "0 14px",
                fontSize: 14, background: C.bg,
                border: `0.5px solid ${C.borderMd}`, borderRadius: 8,
                fontFamily: "inherit", color: C.text, outline: "none",
              }}>
                <option>Production</option>
                <option>Staging</option>
                <option>Development</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <Btn variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Btn>
              <Btn onClick={() => setShowCreate(false)}>Create</Btn>
            </div>
          </Card>
        </div>
      )}

      {/* Table */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: `0.5px solid ${C.border}` }}>
              {["#", "Name", "Status", "Total Logs", "Errors", ""].map((h, i) => (
                <th key={i} style={{
                  textAlign: i === 5 ? "right" : "left",
                  padding: "14px 20px",
                  fontSize: 12, fontWeight: 500, color: C.muted,
                  letterSpacing: "0.04em", textTransform: "uppercase",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {APPS.map((app, idx) => {
              const st = STATUS_MAP[app.status] || STATUS_MAP.Active;
              return (
                <tr key={app.id}
                  onClick={() => onSelectApp(app)}
                  style={{ borderBottom: `0.5px solid ${C.border}`, cursor: "pointer" }}>
                  <td style={{ padding: "16px 20px", color: C.hint }}>{idx + 1}</td>
                  <td style={{ padding: "16px 20px", fontWeight: 500, color: C.text }}>{app.name}</td>
                  <td style={{ padding: "16px 20px" }}>
                    <Tag label={app.status} style={{ background: st.bg, color: st.color, border: "none" }} />
                  </td>
                  <td style={{ padding: "16px 20px", color: C.text }}>{app.logs.toLocaleString()}</td>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{ color: app.errors > 0 ? C.danger : C.success, fontWeight: 500 }}>
                      {app.errors}
                    </span>
                  </td>
                  <td style={{ padding: "16px 20px", textAlign: "right" }}>
                    <span onClick={(e) => { e.stopPropagation(); }} style={{
                      fontSize: 12, color: C.danger, cursor: "pointer", padding: "4px 10px",
                      border: `0.5px solid rgba(163,45,45,0.2)`, borderRadius: 6,
                    }}>Delete</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

/* ─── APP DETAIL / DASHBOARD PAGE ─── */
const pieData = (app) => [
  { name: "Info",  value: app.logs - app.errors - app.warns },
  { name: "Warn",  value: app.warns },
  { name: "Error", value: app.errors },
];

const AppDetail = ({ app, onBack }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(LOGS.length / LOGS_PER_PAGE);
  const sliced = LOGS.slice((page - 1) * LOGS_PER_PAGE, page * LOGS_PER_PAGE);

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <span onClick={onBack} style={{ cursor: "pointer", color: C.muted, fontSize: 14 }}>← Back</span>
        <span style={{ color: C.border }}>|</span>
        <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0, color: C.text }}>{app.name}</h2>
        <Tag label={app.status}
          style={{ ...(STATUS_MAP[app.status] || STATUS_MAP.Active), border: "none" }} />
      </div>

      {/* Stat cards + pie */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 200px", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Logs",  value: app.logs.toLocaleString() },
          { label: "Errors",      value: app.errors, danger: app.errors > 0 },
          { label: "Warnings",    value: app.warns },
        ].map(({ label, value, danger }) => (
          <Card key={label} style={{ padding: "16px 20px", background: C.bg, border: "none" }}>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 6, letterSpacing: "0.03em" }}>{label}</div>
            <div style={{ fontSize: 26, fontWeight: 600, color: danger ? C.danger : C.text }}>{value}</div>
          </Card>
        ))}

        {/* Pie chart */}
        <Card style={{ padding: "10px 10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 4, alignSelf: "flex-start", paddingLeft: 4 }}>Log Breakdown</div>
          <ResponsiveContainer width="100%" height={110}>
            <PieChart>
              <Pie data={pieData(app)} dataKey="value" innerRadius={28} outerRadius={48} paddingAngle={2}>
                {pieData(app).map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ fontSize: 12, border: `0.5px solid ${C.border}`, borderRadius: 8, background: C.surface }}
                formatter={(v, n) => [v.toLocaleString(), n]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {["Info", "Warn", "Error"].map((l, i) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.muted }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: PIE_COLORS[i] }} />
                {l}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Logs table */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px 12px", borderBottom: `0.5px solid ${C.border}` }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>Event Logs</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
            Showing {(page - 1) * LOGS_PER_PAGE + 1}–{Math.min(page * LOGS_PER_PAGE, LOGS.length)} of {LOGS.length} entries
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `0.5px solid ${C.border}` }}>
              {["Message", "Level", "Count", "First Occurrence", "Last Occurrence"].map((h) => (
                <th key={h} style={{
                  textAlign: "left", padding: "11px 20px",
                  fontSize: 11, fontWeight: 500, color: C.muted,
                  letterSpacing: "0.05em", textTransform: "uppercase",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sliced.map((log, i) => (
              <tr key={log.id} style={{
                borderBottom: i < sliced.length - 1 ? `0.5px solid ${C.border}` : "none",
              }}>
                <td style={{ padding: "13px 20px", color: C.text, maxWidth: 260 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 12 }}>{log.message}</span>
                </td>
                <td style={{ padding: "13px 20px" }}><LevelBadge level={log.level} /></td>
                <td style={{ padding: "13px 20px", color: C.text, fontWeight: 500 }}>{log.count.toLocaleString()}</td>
                <td style={{ padding: "13px 20px", color: C.muted, whiteSpace: "nowrap" }}>{log.first}</td>
                <td style={{ padding: "13px 20px", color: C.muted, whiteSpace: "nowrap" }}>{log.last}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 20px", borderTop: `0.5px solid ${C.border}`,
        }}>
          <div style={{ fontSize: 12, color: C.muted }}>Page {page} of {totalPages}</div>
          <div style={{ display: "flex", gap: 6 }}>
            <Btn variant="ghost" onClick={() => setPage(p => Math.max(1, p - 1))}
              style={{ height: 32, padding: "0 14px", fontSize: 13, opacity: page === 1 ? 0.4 : 1 }}>
              ← Prev
            </Btn>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)} style={{
                width: 32, height: 32, borderRadius: 8, fontSize: 13,
                fontFamily: "inherit", cursor: "pointer",
                background: n === page ? C.accent : "transparent",
                color: n === page ? "#FFF" : C.muted,
                border: n === page ? "none" : `0.5px solid ${C.borderMd}`,
              }}>{n}</button>
            ))}
            <Btn variant="ghost" onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              style={{ height: 32, padding: "0 14px", fontSize: 13, opacity: page === totalPages ? 0.4 : 1 }}>
              Next →
            </Btn>
          </div>
        </div>
      </Card>
    </div>
  );
};

/* ─── ROOT ─── */
export default function App() {
  const [auth, setAuth] = useState("login"); // "login" | "register" | "app"
  const [sPage, setSPage] = useState("apps");
  const [selectedApp, setSelectedApp] = useState(null);

  if (auth === "login")
    return <AuthPage mode="login" onLogin={() => setAuth("app")} onGoRegister={() => setAuth("register")} />;
  if (auth === "register")
    return <AuthPage mode="register" onLogin={() => setAuth("app")} onGoLogin={() => setAuth("login")} />;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Sidebar page={sPage} setPage={(p) => { setSPage(p); setSelectedApp(null); }} onLogout={() => setAuth("login")} />

      <main style={{ flex: 1, padding: "40px 40px", overflowY: "auto" }}>
        {sPage === "apps" && !selectedApp && (
          <AppsPage onSelectApp={(a) => { setSelectedApp(a); }} />
        )}
        {sPage === "apps" && selectedApp && (
          <AppDetail app={selectedApp} onBack={() => setSelectedApp(null)} />
        )}
        {sPage === "apikey"  && <ApiKeyPage />}
        {sPage === "account" && <AccountPage />}
      </main>
    </div>
  );
}
