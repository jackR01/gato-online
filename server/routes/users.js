const express = require('express');
const router = express.Router();
const { createUser, getUserByUsername } = require('../models/user');

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Nombre y contraseña requeridos' });

  createUser(username, password, (err, user) => {
    if (err) {
      console.error("Error al crear usuario:", err); // 👈 esto es clave
      return res.status(500).json({ message: 'Error al crear usuario' });
    }
    res.status(201).json({ message: 'Usuario creado', user });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  getUserByUsername(username, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error del servidor' });
    }

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    res.status(200).json({ message: 'Login exitoso', user });
  });
});

module.exports = router;
