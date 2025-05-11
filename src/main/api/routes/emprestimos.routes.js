const { Router } = require('express');
const emprestarLivroComposer = require('../composers/emprestar-livro.composer');

const EmprestimoRoutes = Router();

EmprestimoRoutes.post('/', async (request, response) => {
  httpRequest = {
    body: request.body,
  };

  const { statusCode, body } = await emprestarLivroComposer(httpRequest);
  return response.status(statusCode).json(body);
});

module.exports = { EmprestimoRoutes };
