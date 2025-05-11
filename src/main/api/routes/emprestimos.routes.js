const { Router } = require('express');
const emprestarLivroComposer = require('../composers/emprestar-livro.composer');
const devolverLivroComposer = require('../composers/devolver-livro.composer');
const buscarEmprestimosPendentesComposer = require('../composers/buscar-emprestimos-pendentes.composer');

const EmprestimoRoutes = Router();

EmprestimoRoutes.post('/', async (request, response) => {
  httpRequest = {
    body: request.body,
  };

  const { statusCode, body } = await emprestarLivroComposer(httpRequest);
  return response.status(statusCode).json(body);
});

EmprestimoRoutes.put('/devolver/:emprestimo_id', async (request, response) => {
  httpRequest = {
    body: request.body,
    params: request.params,
  };

  const { statusCode, body } = await devolverLivroComposer(httpRequest);
  return response.status(statusCode).json(body);
});

EmprestimoRoutes.get('/', async (request, response) => {
  const { statusCode, body } = await buscarEmprestimosPendentesComposer();
  return response.status(statusCode).json(body);
});

module.exports = { EmprestimoRoutes };
