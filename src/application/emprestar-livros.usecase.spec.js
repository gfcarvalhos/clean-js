const emprestarLivrosUsecase = require('./emprestar-livros.usecase');
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

    const sut = emprestarLivrosUsecase({ emprestimosRepository });
    const output = await sut(emprestimoDTO);

    expect(output.right).toBeNull;
    expect(emprestimosRepository.emprestar).toHaveBeenCalledWith(emprestimoDTO);
    expect(emprestimosRepository.emprestar).toHaveBeenCalledTimes(1);
  });
});
