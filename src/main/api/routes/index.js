const { Router } = require('express');
const { usuariosRoutes } = require('./usuarios.routes');
const { livroRoutes } = require('./livros.routes');

const routes = Router();

routes.use('/usuarios', usuariosRoutes);
routes.use('/livros', livroRoutes);

module.exports = { routes };
