const emprestarLivrosUsecase = require('../../../application/emprestar-livros.usecase');
const {
  emprestimosRepository,
} = require('../../../infra/db/typeorm/repository/emprestimo.repository');
const nodemailer = require('../../../infra/email/nodemailer');
const emprestarLivroController = require('../../../interface-adapters/controllers/emprestar-livro.controller');

module.exports = async function emprestarLivroComposer(httpRequest) {
  const emprestimosRepositoryFn = emprestimosRepository();
  const emailServiceFn = nodemailer();
  const emprestarLivroUseCaseFn = emprestarLivrosUsecase({
    emprestimosRepository: emprestimosRepositoryFn,
    emailService: emailServiceFn,
  });

  const controller = await emprestarLivroController({
    emprestarLivroUseCase: emprestarLivroUseCaseFn,
    httpRequest,
  });

  return controller;
};
