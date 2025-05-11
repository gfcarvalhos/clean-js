const { Router } = require('express');
const { usuariosRoutes } = require('./usuarios.routes');
const { livroRoutes } = require('./livros.routes');
const { EmprestimoRoutes } = require('./emprestimos.routes');

const routes = Router();

routes.use('/usuarios', usuariosRoutes);
routes.use('/livros', livroRoutes);
routes.use('/emprestimos', EmprestimoRoutes);

module.exports = { routes };
