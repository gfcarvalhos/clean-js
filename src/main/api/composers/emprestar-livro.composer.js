const emprestarLivrosUsecase = require('../../../application/emprestar-livros.usecase');
const {
  emprestimosRepository,
} = require('../../../infra/db/typeorm/repository/emprestimo.repository');
const emprestarLivroController = require('../../../interface-adapters/controllers/emprestar-livro.controller');

module.exports = async function emprestarLivroComposer(httpRequest) {
  const emprestimosRepositoryFn = emprestimosRepository();
  const emprestarLivroUseCaseFn = emprestarLivrosUsecase({
    emprestimosRepository: emprestimosRepositoryFn,
  });

  const controller = await emprestarLivroController({
    emprestarLivroUseCase: emprestarLivroUseCaseFn,
    httpRequest,
  });

  return controller;
};
