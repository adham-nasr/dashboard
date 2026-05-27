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
import ProtectedRoutes from "./features/ProtectedRoutes.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import GuestRoutes from "./features/GuestRoutes.tsx";
import { AuthLayout } from "./layouts/AuthLayout.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";

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
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route element={<MainLayout />} >
                <Route path="/" element={<Home />} />
                <Route path="/Logs/:name" element = {<Logs /> } />
                <Route path="/apiKey" element = {<ApiKey />} />
              </ Route >
            </Route>
            <Route element={<GuestRoutes />}>
              <Route element={<AuthLayout/>}>
                <Route path="/auth/login" element = {<Login />} />
                <Route path="/auth/register" element = {<Register />}  />
              </Route>
            </ Route>
          </Routes>
        </BrowserRouter>
            
      </QueryClientProvider>
    </AuthContextProvider>
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
