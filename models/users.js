// Encriptamos las contraseñas con bcrypt

const bcrypt = require('bcrypt');

const users = [
    { id: 1, username: 'oscar', password: bcrypt.hashSync('25727374*', 10), name: 'Usuario Uno' },
    { id: 2, username: 'jose', password: bcrypt.hashSync('25727375*', 10), name: 'Usuario Dos' },
];

module.exports = users;
