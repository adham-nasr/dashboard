import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { C } from "./utils/constants";
import Button from "./components/Button";
import Input from "./components/Input";
import Tag from "./components/Tag";
import LevelBadge from "./components/LevelBadge";
/* ─── DESIGN TOKENS ─── */

import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home.tsx'
import Logs from './pages/Logs.tsx'
import MainLayout from './layouts/MainLayout.tsx'
import ApiKey from './pages/ApiKey.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./hooks/useAuth.ts";


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


/* ─── API KEY PAGE ─── */


/* ─── ACCOUNT PAGE ─── */
// const AccountPage = () => (
//   <div style={{ maxWidth: 500 }}>
//     <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 6px", color: C.text }}>Account</h2>
//     <p style={{ fontSize: 14, color: C.muted, margin: "0 0 24px" }}>Manage your profile settings.</p>
//     <Card>
//       <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
//         <div style={{
//           width: 52, height: 52, borderRadius: "50%",
//           background: C.accentLight, display: "flex", alignItems: "center",
//           justifyContent: "center", fontSize: 18, fontWeight: 600, color: C.accent,
//         }}>JD</div>
//         <div>
//           <div style={{ fontSize: 15, fontWeight: 500, color: C.text }}>Jane Doe</div>
//           <div style={{ fontSize: 13, color: C.muted }}>jane@example.com</div>
//         </div>
//       </div>
//       <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//         <div>
//           <label style={{ fontSize: 13, color: C.muted, display: "block", marginBottom: 6 }}>Full Name</label>
//           <Input placeholder="Jane Doe" />
//         </div>
//         <div>
//           <label style={{ fontSize: 13, color: C.muted, display: "block", marginBottom: 6 }}>Email</label>
//           <Input placeholder="jane@example.com" type="email" />
//         </div>
//         <div>
//           <label style={{ fontSize: 13, color: C.muted, display: "block", marginBottom: 6 }}>New Password</label>
//           <Input placeholder="Leave blank to keep current" type="password" />
//         </div>
//         <div style={{ paddingTop: 4 }}>
//           <Button>Save Changes</Button>
//         </div>
//       </div>
//     </Card>
//   </div>
// );

/* ─── APPS LIST PAGE ─── */


/* ─── APP DETAIL / DASHBOARD PAGE ─── */
const pieData = (app) => [
  { name: "Info",  value: app.logs - app.errors - app.warns },
  { name: "Warn",  value: app.warns },
  { name: "Error", value: app.errors },
];


/* ─── ROOT ─── */
export default function App() {

  const queryClient = new QueryClient()

  const {user, logout,login ,register} = useAuth();

  const logged = user !== null;
  // if (auth === "login")
  //   return <AuthPage mode="login" onLogin={() => setAuth("app")} onGoRegister={() => setAuth("register")} />;
  // if (auth === "register")
  //   return <AuthPage mode="register" onLogin={() => setAuth("app")} onGoLogin={() => setAuth("login")} />;

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />} >
            <Route path="/" element={<Home />} />
            <Route path="/Logs/:id" element = {<Logs /> } />
            <Route path="/apiKey" element = {<ApiKey />} />
          </ Route >
          {/* <Route path="/auth/login" element = {<Login />} />
          <Route path="/auth/register" element = {<Register />}  /> */}
        </Routes>
      </BrowserRouter>
          
    </QueryClientProvider>
  );
}
    // <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
    //   <Sidebar page={sPage} setPage={(p) => { setSPage(p); setSelectedApp(null); }} onLogout={() => setAuth("login")} />
    //   <main style={{ flex: 1, padding: "40px 40px", overflowY: "auto" }}>
    //     {sPage === "apps" && !selectedApp && (
    //       <AppsPage onSelectApp={(a) => { setSelectedApp(a); }} />
    //     )}
    //     {sPage === "apps" && selectedApp && (
    //       <AppDetail app={selectedApp} onBack={() => setSelectedApp(null)} />
    //     )}
    //     {sPage === "apikey"  && <ApiKeyPage />}
    //     {sPage === "account" && <AccountPage />}
    //   </main>
    // </div>
