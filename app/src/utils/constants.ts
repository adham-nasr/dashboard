
export const C = {
  bg: "var(--bg)",
  surface: "var(--surface)",
  border: "var(--border)",
  borderMd: "var(--borderMd)",
  text: "var(--text)",
  muted: "var(--muted)",
  hint: "var(--hint)",
  accent: "var(--accent)",
  accentLight: "var(--accentLight)",
  success: "var(--success)",
  successBg: "var(--successBg)",
  warn: "var(--warn)",
  warnBg: "var(--warnBg)",
  danger: "var(--danger)",
  dangerBg: "var(--dangerBg)",
  info: "var(--info)",
  infoBg: "var(--infoBg)",
};


export const STATUS_MAP = {
  Active:   { bg: C.accentLight, color: C.accent },
  Inactive: { bg: "#F1EFE8",     color: "#5F5E5A" },
  Disabled: { bg: C.warnBg,      color: C.warn },
};

export const PIE_COLORS = ["#2D3748", "#A09F9B", "#EF9F27"];

/* ─── STATIC SEED DATA ─── */
export const APPS = [
  { id: 1, name: "Auth Service",     apiKey: "sk-live-xK9mP2qR7vL4nW0", status: "Active",   logs: 1240, errors: 23, warns: 87  },
  { id: 2, name: "Payment Gateway",  apiKey: "sk-live-aB3cD8eF1gH6iJ2", status: "Active",   logs: 3780, errors: 4,  warns: 12  },
  { id: 3, name: "Email Dispatcher", apiKey: "sk-live-kL5mN0oP9qR2sT4", status: "Inactive", logs: 420,  errors: 0,  warns: 5   },
];

export const LOGS = [
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

export const LOGS_PER_PAGE = 5;

/* ─── SHARED COMPONENTS ─── */


/* ─── SIDEBAR ─── */
export const NAV_ITEMS = [
  { key: "apps",    label: "Applications", icon: "⬡" },
  { key: "apikey",  label: "API Key",       icon: "⌗" },
  { key: "account", label: "Account",       icon: "◉" },
];
