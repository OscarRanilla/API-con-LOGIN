// Agregamos la ruta search con el formulario,
// donde los usuarios pueden buscar personajes
// Con esta ruta devolvemos un HTML con un input y un botón que envía
// el nombre del personaje a /character/:nombre
// También está protegida con authenticateToken para que solo los usuarios
// logueados puedan acceder y luego tiene un botón de cerrar sesión.

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/search', authenticateToken, (req, res) => {
    res.send(`
        <html>
        <head>
            <title>Buscar Personaje</title>
        </head>
        <body>
            <h1>Buscar Personaje de Rick and Morty</h1>
            <form action="/character" method="GET">
                <input type="text" name="name" placeholder="Nombre del personaje" required>
                <button type="submit">Buscar</button>
            </form>
            <br>
            <form action="/logout" method="POST">
                <button type="submit">Cerrar Sesión</button>
            </form>
        </body>
        </html>
    `);
});

module.exports = router;
