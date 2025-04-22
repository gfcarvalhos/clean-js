const { z } = require('zod');
const httpResponse = require('../../shared/helpers/http.response');
const { AppError } = require('../../shared/errors');

const zodValidator = z.object({
  data_devolucao: z.string({
    required_error: 'Data devolução é obrigatória',
  }),
});
module.exports = async function devolverLivroController({
  devolverLivroUseCase,
  httpRequest,
}) {
  if (!devolverLivroUseCase || !httpRequest || !httpRequest.body)
    throw new AppError(AppError.dependencias);
  const { data_devolucao } = zodValidator.parse(httpRequest.body);
  const { emprestimo_id } = httpRequest.params;

  const output = await devolverLivroUseCase({
    emprestimo_id,
    data_devolucao,
  });

  return output.fold(
    (error) => httpResponse(400, error.message),
    (resultado) => httpResponse(200, resultado),
  );
};
