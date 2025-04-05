const { AppError, Either } = require('../shared/errors');
const cadastrarLivroUseCase = require('./cadastrar-livro.usecase');

describe('Cadastrar Livro UseCase', function () {
  const livrosRepository = {
    cadastrar: jest.fn(),
    existePorISBN: jest.fn(),
  };
  test('Deve cadastrar um livro', async function () {
    const livroDTO = {
      nome: 'nome_valido',
      quantidade: 'quantidade_valida',
      autor: 'autor_valido',
      genero: 'genero_valido',
      ISBN: 'ISBN_valido',
    };

    const sut = cadastrarLivroUseCase({ livrosRepository });
    const output = await sut(livroDTO);

    expect(output.right).toBeNull;
    expect(livrosRepository.cadastrar).toHaveBeenCalledWith(livroDTO);
    expect(livrosRepository.cadastrar).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um throw AppError se o livroRepository não for fornecido', function () {
    expect(() => cadastrarLivroUseCase({})).toThrow(
      new AppError(AppError.dependencias),
    );
  });

  test('Deve retornar um throw AppError se os campos obrigatorios não forem fornecidos', async function () {
    const sut = cadastrarLivroUseCase({ livrosRepository });
    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.parametrosObrigatoriosAusentes),
    );
  });

  test('Deve retornar um Either.left.valorJaCadastrado(ISBN) se já existir um ISBN cadastrado', async function () {
    livrosRepository.existePorISBN.mockResolvedValue(true);
    const livroDTO = {
      nome: 'nome_valido',
      quantidade: 'quantidade_valida',
      autor: 'autor_valido',
      genero: 'genero_valido',
      ISBN: 'ISBN_ja_cadastrado',
    };

    const sut = cadastrarLivroUseCase({ livrosRepository });
    const output = await sut(livroDTO);

    expect(output.left).toEqual(Either.ValorJaCadastrado(livroDTO.ISBN));
    expect(livrosRepository.existePorISBN).toHaveBeenCalledWith(livroDTO.ISBN);
    expect(livrosRepository.existePorISBN).toHaveBeenCalledTimes(1);
  });
});
