const { Router } = require('express');
const {
  usuariosRepository,
} = require('../../../infra/db/typeorm/repository/usuario.repository');
const cadastrarUsuarioUsecase = require('../../../application/cadastrar-usuario.usecase');
const cadastrarUsuarioController = require('../../../interface-adapters/controllers/cadastrar-usuario.controller');

const usuariosRoutes = Router();

usuariosRoutes.post('/', async (request, response) => {
  const httpRequest = {
    body: request.body,
  };

  const usuarioRepositorioFn = usuariosRepository();
  const cadastrarUsuariosUsecaseFn = cadastrarUsuarioUsecase({
    usuariosRepository: usuarioRepositorioFn,
  });
  const { statusCode, body } = cadastrarUsuarioController({
    cadastrarUsuarioUseCase: cadastrarUsuariosUsecaseFn,
    httpRequest,
  });

  return response.status(statusCode).json(body);
});
