import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './Login';
import RegisterScreen from './Register';
import HomeScreen from './Home';
import ColaboradoresScreen from './Colaboradores';
import ReunionesScreen from './Reuniones';
import CuentaScreen from './Cuenta';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/main" element={<HomeScreen />} />
          <Route path="/colaboradores" element={<ColaboradoresScreen />} />
          <Route path="/reuniones" element={<ReunionesScreen />} />
          <Route path="/cuenta" element={<CuentaScreen />} />
          {/* aquí se van agregando más */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
