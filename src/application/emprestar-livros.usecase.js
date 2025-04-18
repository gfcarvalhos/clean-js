const { AppError, Either } = require('../shared/errors');

module.exports = function emprestarLivroUseCase({
  emprestimosRepository,
  emailService,
}) {
  if (!emprestimosRepository || !emailService)
    throw new AppError(AppError.dependencias);
  return async function ({ usuario_id, livro_id, data_saida, data_retorno }) {
    const checaCampos = usuario_id && livro_id && data_saida && data_retorno;
    if (!checaCampos)
      throw new AppError(AppError.parametrosObrigatoriosAusentes);
    if (data_saida.getTime() > data_retorno.getTime())
      return Either.Left(Either.dataRetornoMenorQueDataSaida);
    const existeISBNEmprestadoPendenteComUsuario =
      await emprestimosRepository.existeLivroEmprestadoComMesmoISBN({
        usuario_id,
        livro_id,
      });

    if (existeISBNEmprestadoPendenteComUsuario)
      return Either.Left(Either.livroComISBNJaEmprestadoPendente);

    const id = await emprestimosRepository.emprestar({
      usuario_id,
      livro_id,
      data_saida,
      data_retorno,
    });

    const { usuario, livro } =
      await emprestimosRepository.buscarEmprestimoComLivroComUsuarioPorID(id);

    await emailService.enviarEmail({
      data_saida,
      data_retorno,
      nome_usuario: usuario.nome,
      CPF: usuario.CPF,
      email: usuario.email,
      nome_livro: livro.nome,
    });
    return Either.Right(null);
  };
};
