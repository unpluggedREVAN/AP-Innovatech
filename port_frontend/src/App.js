import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './Login';
import RegisterScreen from './Register';
import HomeScreen from './Home';
import ColaboradoresScreen from './Colaboradores';
import ReunionesScreen from './Reuniones';
import EvaluacionScreen from './Evaluacion';
import CuentaScreen from './Cuenta';
import CrearProyectoScreen from './CrearProyecto';
import CrearReunionScreen from './CrearReunion';
import ProjectDetailsScreen from './ProjectDetails';
import ColaboradorDetailsScreen from './ColaboradorDetails';
import ReunionDetailsScreen from './ReunionDetails';
import ModificarTareasScreen from './ModificarTareas';
import GestionarColaboradoresScreen from './GestionarColaboradores';
import ForoScreen from './ForoScreen';
import PublicacionDetailsScreen from './PublicacionDetails';
import CrearMensajePublicacionScreen from './CrearMensajePublicacion';
import CrearPublicacionScreen from './CrearPublicacion';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/main" element={<HomeScreen />} />
        <Route path="/colaboradores" element={<ColaboradoresScreen />} />
        <Route path="/reuniones" element={<ReunionesScreen />} />
        <Route path="/evaluacion" element={<EvaluacionScreen />} />
        <Route path="/cuenta" element={<CuentaScreen />} />
        <Route path="/crear-proyecto" element={<CrearProyectoScreen />} />
        <Route path="/crear-reunion" element={<CrearReunionScreen />} />
        <Route path="/proyecto-detalles/:proyectoId" element={<ProjectDetailsScreen />} />
        <Route path="/colaborador-detalles/:colaboradorId" element={<ColaboradorDetailsScreen />} />
        <Route path="/reunion-detalles/:reunionId" element={<ReunionDetailsScreen />} />
        <Route path="/modificar-tareas/:proyectoId" element={<ModificarTareasScreen />} />
        <Route path="/gestionar-colaboradores/:proyectoId" element={<GestionarColaboradoresScreen />} />
        <Route path="/foro" element={<ForoScreen />} />
        <Route path="/publicacion-detalles/:publicacionId" element={<PublicacionDetailsScreen />} />
        <Route path="/crear-mensaje-publicacion" element={<CrearMensajePublicacionScreen />} />
        <Route path="/crear-publicacion" element={<CrearPublicacionScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
