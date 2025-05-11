const devolverLivroUsecase = require('../../../application/devolver-livro.usecase');
const {
  emprestimosRepository,
} = require('../../../infra/db/typeorm/repository/emprestimo.repository');
const devolverLivroController = require('../../../interface-adapters/controllers/devolver-livro.controller');

module.exports = function devolverLivroComposer(httpRequest) {
  const emprestimosRepositoryFn = emprestimosRepository();
  const devolverLivroUseCaseFn = devolverLivroUsecase({
    emprestimosRepository: emprestimosRepositoryFn,
  });

  const controller = devolverLivroController({
    devolverLivroUseCase: devolverLivroUseCaseFn,
    httpRequest,
  });

  return controller;
};
