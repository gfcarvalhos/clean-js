const { Router } = require('express');
const cadastrarUsuarioComposer = require('../composers/cadastrar-usuario.composer');

const usuariosRoutes = Router();

usuariosRoutes.post('/', async (request, response) => {
  const httpRequest = {
    body: request.body,
  };
  const { statusCode, body } = await cadastrarUsuarioComposer(httpRequest);

  return response.status(statusCode).json(body);
});
