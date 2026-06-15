import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Dashboard from "../pages/DashboardAdmin";
import DashboardAprendiz from "../pages/DashboardAprendiz";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/registro" element={<Registro />} />

        <Route path="/dashboard-admin" element={<Dashboard />} />

        <Route path="/dashboard-aprendiz" element={<DashboardAprendiz />} />
      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;