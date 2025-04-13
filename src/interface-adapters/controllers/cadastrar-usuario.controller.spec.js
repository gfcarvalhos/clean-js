const { Either } = require('../../shared/errors');
const httpResponse = require('../../shared/helpers/http.response');
const cadastrarUsuarioController = require('./cadastrar-usuario.controller');

describe('Cadastrar usuario Controller', function () {
  const cadastrarUsuarioUsecase = jest.fn();
  test('Deve retornar um httpResponse 201 e null se o cadastro for realizado com sucesso', async function () {
    cadastrarUsuarioUsecase.mockResolvedValue(Either.Right(null));
    const httpRequest = {
      body: {
        nome_completo: 'nome_valido',
        CPF: 'CPF_valido',
        telefone: 'telefone_valido',
        endereco: 'endereco_valido',
        email: 'email_valido',
      },
    };

    const response = await cadastrarUsuarioController(
      cadastrarUsuarioUsecase,
      httpRequest,
    );

    expect(response).toEqual(httpResponse(201, null));
    expect(cadastrarUsuarioUsecase).toHaveBeenCalledWith(httpRequest.body);
    expect(cadastrarUsuarioUsecase).toHaveBeenCalledTimes(1);
  });
});
