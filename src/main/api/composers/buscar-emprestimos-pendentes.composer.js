const buscarEmprestimosPendentesUsecase = require('../../../application/buscar-emprestimos-pendentes.usecase');
const {
  emprestimosRepository,
} = require('../../../infra/db/typeorm/repository/emprestimo.repository');
const buscarEmprestimosPendentesController = require('../../../interface-adapters/controllers/buscar-emprestimos-pendentes.controller');

module.exports = async function buscarEmprestimosPendentesComposer() {
  const emprestimoRepositoryFn = emprestimosRepository();
  const buscarEmprestimosPendentesUseCaseFn = buscarEmprestimosPendentesUsecase(
    {
      emprestimosRepository: emprestimoRepositoryFn,
    },
  );

  const controller = await buscarEmprestimosPendentesController({
    buscarEmprestimosPendentesUseCase: buscarEmprestimosPendentesUseCaseFn,
  });

  return controller;
};
