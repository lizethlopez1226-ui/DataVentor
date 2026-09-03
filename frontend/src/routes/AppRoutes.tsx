import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Registro from "../pages/Registro";
import DashboardAdmin from "../pages/DashboardAdmin";
import DashboardAprendiz from "../pages/DashboardAprendiz";
import DashboardTecnico from "../pages/DashboardTecnico";
import DashboardInstructor from "../pages/DashboardInstructor";
import CrearReporte from "../pages/CrearReporte";
import MisReportes from "../pages/MisReportes";
import MisReportesTecnico from "../pages/MisReportesTecnico";
import DetalleReporte from "../pages/DetalleReporte";
 import ReportesAdmin from "../pages/ReportesAdmin";


export default function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/registro"
        element={<Registro />}
      />

      <Route
        path="/dashboard-admin"
        element={<DashboardAdmin />}
      />

      <Route
        path="/dashboard-aprendiz"
        element={<DashboardAprendiz />}
      />

      <Route
        path="/dashboard-tecnico"
        element={<DashboardTecnico />}
      />

      <Route
        path="/dashboard-instructor"
        element={<DashboardInstructor />}
      />

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
       
      <Route path="/crear-reporte" 
      element={<CrearReporte />} 
      />

      <Route path="/mis-reportes"
      element={<MisReportes />}
      />

      <Route path="/mis-reportes-tecnico"
      element={<MisReportesTecnico />}
      />

      <Route path="/detalle-reporte/:id"
      element={<DetalleReporte />}
      />

      <Route path="/registrar-usuario"
      element={<Registro/>}
      />
 
      <Route path="/reportes-admin"
      element={<ReportesAdmin />}
      />

    </Routes>
  );
}