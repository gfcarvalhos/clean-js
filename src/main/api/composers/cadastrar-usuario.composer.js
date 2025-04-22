const cadastrarUsuarioUsecase = require('../../../application/cadastrar-usuario.usecase');
const {
  usuariosRepository,
} = require('../../../infra/db/typeorm/repository/usuario.repository');
const cadastrarUsuarioController = require('../../../interface-adapters/controllers/cadastrar-usuario.controller');

module.exports = async function cadastrarUsuarioCompose(httpRequest) {
  const usuarioRepositorioFn = usuariosRepository();
  const cadastrarUsuariosUsecaseFn = cadastrarUsuarioUsecase({
    usuariosRepository: usuarioRepositorioFn,
  });
  const controller = cadastrarUsuarioController({
    cadastrarUsuarioUseCase: cadastrarUsuariosUsecaseFn,
    httpRequest,
  });

  return controller;
};
