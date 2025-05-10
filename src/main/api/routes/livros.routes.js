const { Router } = require('express');
const cadastrarLivroComposer = require('../composers/cadastrar-livro.composer');

const livroRoutes = Router();

livroRoutes.post('/', async (request, response) => {
  const httpRequest = {
    body: request.body,
  };

  const { statusCode, body } = await cadastrarLivroComposer(httpRequest);
  return response.status(statusCode).json(body);
});

module.exports = { livroRoutes };
