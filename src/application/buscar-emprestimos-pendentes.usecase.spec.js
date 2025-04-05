const { AppError } = require('../shared/errors');
const buscarEmprestimosPendentesUsecase = require('./buscar-emprestimos-pendentes.usecase');

describe('Buscar emprestimos pendentes UseCase', function () {
  const emprestimosRepository = {
    buscarPendentesComLivroComUsuario: jest.fn(),
  };
  test('Deve ser possível buscar os empréstimos pendentes', async function () {
    emprestimosRepository.buscarPendentesComLivroComUsuario.mockResolvedValue([
      {
        usuario: {
          nome: 'qualquer_nome_usuario',
          CPF: 'qualquer_CPF',
        },
        livro: {
          nome: 'qualquer_nome_livro',
        },
        data_saida: '2025-01-25',
        data_retorno: '2025-01-28',
      },
      {
        usuario: {
          nome: 'qualquer_nome_usuario_valido',
          CPF: 'qualquer_CPF_valido',
        },
        livro: {
          nome: 'qualquer_nome_livro_valido',
        },
        data_saida: '2025-02-15',
        data_retorno: '2025-02-20',
      },
    ]);
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
