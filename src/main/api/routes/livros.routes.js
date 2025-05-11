const { Router } = require('express');
const cadastrarLivroComposer = require('../composers/cadastrar-livro.composer');
const buscarLivroPorNomeOuIsbnComposer = require('../composers/busca-livro-por-nome-ou-isbn.composer');

const livroRoutes = Router();

livroRoutes.post('/', async (request, response) => {
  const httpRequest = {
    body: request.body,
  };

  const { statusCode, body } = await cadastrarLivroComposer(httpRequest);
  return response.status(statusCode).json(body);
});

livroRoutes.get('/', async (request, response) => {
  const httpRequest = {
    query: request.query,
  };

  const { statusCode, body } = await buscarLivroPorNomeOuIsbnComposer(
    httpRequest,
  );
  return response.status(statusCode).json(body);
});

module.exports = { livroRoutes };
