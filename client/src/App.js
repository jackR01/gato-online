import React, { useState } from 'react';
import './App.css';
import Board from './components/board';
import LoginForm from './components/loginform';
import RegisterForm from './components/registerform';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const toggleLogin = () => setShowLogin(prev => !prev);
  const toggleRegister = () => setShowRegister(prev => !prev);

  return (
    <div className="App">
      {!user ? (
        <div>
          <h1>Bienvenido al Gato Online 🐱</h1>
          <button onClick={toggleLogin}>
            {showLogin ? 'Ocultar Inicio de Sesión' : 'Mostrar Inicio de Sesión'}
          </button>
          <button onClick={toggleRegister} style={{ marginLeft: '10px' }}>
            {showRegister ? 'Ocultar Registro' : 'Mostrar Registro'}
          </button>

          <div style={{ marginTop: '20px' }}>
            {showLogin && <LoginForm onLogin={setUser} />}
            {showRegister && <RegisterForm />}
          </div>
        </div>
      ) : (
        <div>
          <h2>Hola, {user.username}</h2>
          <Board />
        </div>
      )}
    </div>
  );
}

export default App;

