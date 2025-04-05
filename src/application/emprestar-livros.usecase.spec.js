const { Either, AppError } = require('../shared/errors');
const emprestarLivroUseCase = require('./emprestar-livros.usecase');
describe('Emprestar livro UseCase', function () {
  const emprestimosRepository = {
    emprestar: jest.fn(),
    existeLivroEmprestadoComMesmoISBN: jest.fn(),
    buscarEmprestimoComLivroComUsuarioPorID: jest.fn(),
  };
  const emailService = {
    enviarEmail: jest.fn(),
  };
  test('Deve poder emprestar o livro', async function () {
    const emprestimoDTO = {
      livro_id: 'livro_id_valido',
      usuario_id: 'usuario_id_valido',
      data_saida: new Date('2025-04-05'),
      data_retorno: new Date('2025-04-05'),
    };

    const emailDTO = {
      data_saida: emprestimoDTO.data_saida,
      data_retorno: emprestimoDTO.data_retorno,
      nome_usuario: 'qualquer_nome_usuario',
      CPF: 'qualquer_cpf',
      email: 'qualquer_email',
      nome_livro: 'qualquer_livro',
    };

    emprestimosRepository.emprestar.mockResolvedValue('qualquer_id');
    emprestimosRepository.buscarEmprestimoComLivroComUsuarioPorID.mockResolvedValue(
      {
        usuario: {
          nome_completo: 'qualquer_nome_usuario',
          CPF: 'qualquer_cpf',
          email: 'qualquer_email',
        },
        livro: {
          nome: 'qualquer_livro',
        },
      },
    );

    const sut = emprestarLivroUseCase({ emprestimosRepository, emailService });
    const output = await sut(emprestimoDTO);

    expect(output.right).toBeNull;
    expect(emprestimosRepository.emprestar).toHaveBeenCalledWith(emprestimoDTO);
    expect(emprestimosRepository.emprestar).toHaveBeenCalledTimes(1);
    expect(emailService.enviarEmail).toHaveBeenCalledWith(emailDTO);
  });

  test('Deve retornar um Either.Left se a data de retorno for menor que a data de saida', async function () {
    const emprestimoDTO = {
      livro_id: 'livro_id_valido',
      usuario_id: 'usuario_id_valido',
      data_saida: new Date('2025-04-05'),
      data_retorno: new Date('2025-04-04'),
    };

    const sut = emprestarLivroUseCase({ emprestimosRepository, emailService });
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

    const sut = emprestarLivroUseCase({ emprestimosRepository, emailService });
    const output = await sut(emprestimoDTO);

    expect(output.left).toBe(Either.livroComISBNJaEmprestadoPendente);
    expect(
      emprestimosRepository.existeLivroEmprestadoComMesmoISBN,
    ).toHaveBeenCalledWith({
      livro_id: emprestimoDTO.livro_id,
      usuario_id: emprestimoDTO.usuario_id,
    });
  });

  test('Deve retornar um throw AppError se o emprestimosRepository não for fornecido', async function () {
    expect(() => emprestarLivroUseCase({})).toThrow(
      new AppError(AppError.dependencias),
    );
  });

  test('Deve retornar um throw AppError se campo obrigatório não for fornecido', async function () {
    const sut = emprestarLivroUseCase({ emprestimosRepository, emailService });
    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.parametrosObrigatoriosAusentes),
    );
  });
});
