//Middleware de autenticación
// verificamos si un usuario está logueado antes de acceder a rutas protegidas

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.session.token;
    if (!token) return res.status(401).json({ message: 'Acceso denegado' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token inválido' });
        // Error 403, El usuario no tiene los permisos necesarios
        // para acceder al recurso solicitado
    }
};

module.exports = { authenticateToken };
