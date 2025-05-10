const cadastrarLivroUsecase = require('../../../application/cadastrar-livro.usecase');
const {
  livrosRepository,
} = require('../../../infra/db/typeorm/repository/livro.repository');
const cadastrarLivroController = require('../../../interface-adapters/controllers/cadastrar-livro.controller');

module.exports = async function cadastrarLivro(httpRequest) {
  const livroRepositoryFn = livrosRepository();
  const cadastarLivroUseCaseFn = cadastrarLivroUsecase({
    livrosRepository: livroRepositoryFn,
  });

  const controller = await cadastrarLivroController({
    cadastrarLivroUseCase: cadastarLivroUseCaseFn,
    httpRequest,
  });

  return controller;
};
