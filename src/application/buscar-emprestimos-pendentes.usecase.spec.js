const buscarPendentes = require('../../tests/fixtures/buscar-pendentes');
const { AppError } = require('../shared/errors');
const buscarEmprestimosPendentesUsecase = require('./buscar-emprestimos-pendentes.usecase');

describe('Buscar emprestimos pendentes UseCase', function () {
  const emprestimosRepository = {
    buscarPendentesComLivroComUsuario: jest.fn(),
  };
  test('Deve ser possível buscar os empréstimos pendentes', async function () {
    emprestimosRepository.buscarPendentesComLivroComUsuario.mockResolvedValue(
      buscarPendentes,
    );
    const sut = buscarEmprestimosPendentesUsecase({ emprestimosRepository });
    const output = await sut();

    expect(output.right).toHaveLength(2);
    expect(output.right[0].usuario.nome).toBe('qualquer_nome_usuario');
    expect(output.right[0].usuario.CPF).toBe('qualquer_CPF');
    expect(output.right[0].livro.nome).toBe('qualquer_nome_livro');
    expect(output.right[0].data_saida).toBe('2025-01-25');
    expect(output.right[0].data_retorno).toBe('2025-01-28');
  });

  test('Deve retornar um throw AppError se emprestimosRepository não for fornecido', function () {
    expect(() => buscarEmprestimosPendentesUsecase({})).toThrow(
      AppError.dependencias,
    );
  });
});
