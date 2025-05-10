const buscarLivroPorNomeOuIsbnUsecase = require('../../../application/buscar-livro-por-nome-ou-isbn.usecase');
const {
  livrosRepository,
} = require('../../../infra/db/typeorm/repository/livro.repository');
const buscarLivroPorNomeOuIsbnController = require('../../../interface-adapters/controllers/buscar-livro-por-nome-ou-isbn.controller');

module.exports = async function buscaLivroPorNomeOuISBNComposer(httpRequest) {
  const livroRepositoryFn = livrosRepository();
  const buscarLivroPorNomeOuISBNUseCaseFn = buscarLivroPorNomeOuIsbnUsecase({
    livrosRepository: livroRepositoryFn,
  });

  const controller = buscarLivroPorNomeOuIsbnController({
    buscarLivroPorNomeOuISBNUseCase: buscarLivroPorNomeOuISBNUseCaseFn,
    httpRequest,
  });

  return controller;
};
