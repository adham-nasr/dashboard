

import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home.tsx'
import Logs from './pages/Logs.tsx'
import MainLayout from './layouts/MainLayout.tsx'
import ApiKey from './pages/ApiKey.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoutes from "./features/ProtectedRoutes.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import GuestRoutes from "./features/GuestRoutes.tsx";
import { AuthLayout } from "./layouts/AuthLayout.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";

export default function App() {

  const queryClient = new QueryClient()
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
