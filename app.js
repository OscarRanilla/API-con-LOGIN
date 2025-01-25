//? Cargar variables de entorno 

require('dotenv').config();
// -DOTENV- Permite manejar variables de entorno desde un archivo .env
// para mayor seguridad
const express = require('express');
const session = require('express-session');

//Importar las rutas 

const authRoutes = require('./routes/authRoutes');
const characterRoutes = require('./routes/characterRoutes');
const searchRoutes = require('./routes/searchRoutes');

// Inicializar la aplicación 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar datos de formulario y JSON

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de sesiones 

app.use(session({
    secret: process.env.SESSION_SECRET || 'secreto_super_seguro',
    resave: false,
    saveUninitialized: true
}));

// Ruta raíz, Mostramos el enlace a /search en / si el usuario ya está 
// autenticado

app.get('/', (req, res) => {
    if (req.session.user) {
        res.send(`
            <html>
            <head><title>Bienvenido</title></head>
            <body>
                <h1>Bienvenido ${req.session.user.name}</h1>
                <a href="/search">Ir a Buscar Personajes</a>
                <br><br>
                <form action="/logout" method="POST">
                    <button type="submit">Cerrar Sesión</button>
                </form>
            </body>
            </html>
        `);
    } else {
        res.send(`
            <html>
            <head><title>Login</title></head>
            <body>
                <h1>Iniciar Sesión</h1>
                <form action="/login" method="POST">
                    <input type="text" name="username" placeholder="Usuario" required>
                    <input type="password" name="password" placeholder="Contraseña" required>
                    <button type="submit">Entrar</button>
                </form>
            </body>
            </html>
        `);
    }
});

// Rutas 
app.use('/', authRoutes);
app.use('/', characterRoutes);
app.use('/', searchRoutes);

//!escuchamos al servidor con el puerto

app.listen(PORT, () => {
    console.log(`listening server on port http://localhost:${PORT}`);
});