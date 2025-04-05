const { Either } = require('../shared/errors');
const emprestarLivrosUseCase = require('./emprestar-livros.usecase');
describe('Emprestar livro UseCase', function () {
  const emprestimosRepository = {
    emprestar: jest.fn(),
    existeLivroEmprestadoComMesmoISBN: jest.fn(),
  };
  test('Deve poder emprestar o livro', async function () {
    const emprestimoDTO = {
      livro_id: 'livro_id_valido',
      usuario_id: 'usuario_id_valido',
      data_saida: new Date('2025-04-05'),
      data_retorno: new Date('2025-04-05'),
    };

    const sut = emprestarLivrosUseCase({ emprestimosRepository });
    const output = await sut(emprestimoDTO);

    expect(output.right).toBeNull;
    expect(emprestimosRepository.emprestar).toHaveBeenCalledWith(emprestimoDTO);
    expect(emprestimosRepository.emprestar).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um Either.Left se a data de retorno for menor que a data de saida', async function () {
    const emprestimoDTO = {
      livro_id: 'livro_id_valido',
      usuario_id: 'usuario_id_valido',
      data_saida: new Date('2025-04-05'),
      data_retorno: new Date('2025-04-04'),
    };

    const sut = emprestarLivrosUseCase({ emprestimosRepository });
    const output = await sut(emprestimoDTO);

    expect(output.left).toBe(Either.dataRetornoMenorQueDataSaida);
  });

  test('Não deve permitir o empréstimo de um livro com o mesmo ISBN já emprestado ao usuario', async function () {
    const emprestimoDTO = {
      livro_id: 'livro_id_valido',
      usuario_id: 'usuario_id_valido',
      data_saida: new Date('2025-04-05'),
      data_retorno: new Date('2025-04-05'),
    };
    emprestimosRepository.existeLivroEmprestadoComMesmoISBN.mockResolvedValue(
      true,
    );

    const sut = emprestarLivrosUseCase({ emprestimosRepository });
    const output = await sut(emprestimoDTO);

    expect(output.left).toBe(Either.livroComISBNJaEmprestadoPendente);
    expect(
      emprestimosRepository.existeLivroEmprestadoComMesmoISBN,
    ).toHaveBeenCalledWith({
      livro_id: emprestimoDTO.livro_id,
      usuario_id: emprestimoDTO.usuario_id,
    });
  });
});
