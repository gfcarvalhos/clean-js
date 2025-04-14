const { z } = require('zod');
const { AppError } = require('../../shared/errors');
const httpResponse = require('../../shared/helpers/http.response');

const zodValidator = z.object({
  nome: z.string({
    required_error: 'Nome é obrigatório',
  }),
  quantidade: z.string({
    required_error: 'Quantidade é obrigatório',
  }),
  autor: z.string({
    required_error: 'Autor é obrigatório',
  }),
  genero: z.string({
    required_error: 'Gênero é obrigatório',
  }),
  ISBN: z.string({
    required_error: 'ISBN é obrigatório',
  }),
});
module.exports = async function cadastrarLivroController({
  cadastrarLivroUseCase,
  httpRequest,
}) {
  if (!cadastrarLivroUseCase || !httpRequest || !httpRequest.body)
    throw new AppError(AppError.dependencias);
  const { nome, quantidade, autor, genero, ISBN } = zodValidator.parse(
    httpRequest.body,
  );

  const output = await cadastrarLivroUseCase({
    nome,
    quantidade,
    autor,
    genero,
    ISBN,
  });

  return output.fold(
    (error) => httpResponse(400, error.message),
    () => httpResponse(201, null),
  );
};
