// Ruta para los personajes 
// Maneja las rutas relacionadas con los personajes de la API de Rick and Morty

const express = require('express');
const axios = require('axios');
const { authenticateToken } = require('../middlewares/authMiddleware');


const router = express.Router();
const API_URL = 'https://rickandmortyapi.com/api/character';

// Obtener todos los personajes de manera (protegido)
router.get('/characters', authenticateToken, async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo personajes' });
    }
});

// Obtener personaje por nombre en HTML
router.get('/character', authenticateToken, async (req, res) => {
    const characterName = req.query.name;

    if (!characterName) {
        return res.status(400).send('<h1>Debes proporcionar un nombre de personaje.</h1>');
    }

    try {
        const response = await axios.get(`${API_URL}/?name=${characterName}`);

        if (!response.data.results || response.data.results.length === 0) {
            return res.status(404).send('<h1>Personaje no encontrado</h1>');
        }

        const character = response.data.results[0];

        res.send(`
            <html>
            <head><title>${character.name}</title></head>
            <body>
                <h1>${character.name}</h1>
                <p><strong>Status:</strong> ${character.status}</p>
                <p><strong>Species:</strong> ${character.species}</p>
                <p><strong>Gender:</strong> ${character.gender}</p>
                <img src="${character.image}" alt="${character.name}">
                <br><br>
                <a href="/search">Volver a buscar</a>
                <br>
                <form action="/logout" method="POST">
                    <button type="submit">Cerrar Sesión</button>
                </form>
            </body>
            </html>
        `);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo personaje' });
    }
});
module.exports = router;
