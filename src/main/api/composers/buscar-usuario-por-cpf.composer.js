const buscarUsuarioPorCpfUsecase = require('../../../application/buscar-usuario-por-cpf.usecase');
const {
  usuariosRepository,
} = require('../../../infra/db/typeorm/repository/usuario.repository');
const buscarUsuarioPorCpfController = require('../../../interface-adapters/controllers/buscar-usuario-por-cpf.controller');

module.exports = async function buscarUsuarioPorCPFComposer(httpRequest) {
  const usuarioRepositoryFn = usuariosRepository();
  const buscarUsuarioPorCPFUseCaseFn = buscarUsuarioPorCpfUsecase({
    usuariosRepository: usuarioRepositoryFn,
  });
  const controller = await buscarUsuarioPorCpfController({
    buscarUsuarioPorCPFUseCase: buscarUsuarioPorCPFUseCaseFn,
    httpRequest,
  });

  return controller;
};
