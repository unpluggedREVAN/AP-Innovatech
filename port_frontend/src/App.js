import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginScreen from './Login';
import RegisterScreen from './Register';
import HomeScreen from './Home';
import ColaboradoresScreen from './Colaboradores';
import {AuthProvider} from './contexts/authContext'
import {UserProvider} from './contexts/userContext'
import { ProjectProvider } from './contexts/proyectoContext'; 
import ReunionesScreen from './Reuniones';
import EvaluacionScreen from './Evaluacion';
import CuentaScreen from './Cuenta';
import CrearProyectoScreen from './CrearProyecto';
import CrearReunionScreen from './CrearReunion';
import ProjectDetailsScreen from './ProjectDetails';
import ColaboradorDetailsScreen from './ColaboradorDetails';
import ReunionDetailsScreen from './ReunionDetails';
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <UserProvider>
          <ProjectProvider>
            <BrowserRouter>
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
                {/* Aquí puedes agregar más rutas para nuevas pantallas en el futuro */}
              </Routes>
            </BrowserRouter>
          </ProjectProvider>
        </UserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
