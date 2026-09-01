import { Routes, Route, Navigate } from 'react-router-dom';


import Registro from '../pages/Registro';
import DashboardAdmin from '../pages/DashboardAdmin';
import DashboardAprendiz from '../pages/DashboardAprendiz';
import DashboardTecnico from '../pages/DashboardTecnico';
import CrearReporte from '../pages/CrearReporte';
import MisReportesTecnico from '../pages/MisReportesTecnico';
import Reportes from '../pages/Reportes';
import Login from '../pages/Login';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Ruta raíz redirige al login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Autenticación */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* Dashboards */}
      <Route path="/dashboard-admin" element={<DashboardAdmin />} />
      <Route path="/dashboard-aprendiz" element={<DashboardAprendiz />} />
      <Route path="/dashboard-tecnico" element={<DashboardTecnico />} />

      {/* Reportes */}
      <Route path="/crear-reporte" element={<CrearReporte />} />
      <Route path="/mis-reportes-tecnico" element={<MisReportesTecnico />} />
      <Route path="/reportes" element={<Reportes />} />

      {/* Redirección si la ruta no existe */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}