import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/users/register', {
        username,
        password,
      });
      setMensaje(`✅ Usuario ${response.data.user.username} registrado con éxito`);
      setUsername('');
      setPassword('');
    } catch (error) {
      if (error.response?.status === 409) {
        setMensaje('⚠️ El nombre de usuario ya existe.');
      } else {
        setMensaje('❌ Error al registrar usuario.');
      }
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Registrarse</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default RegisterForm;
