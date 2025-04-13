const {
  emprestimosRepository,
  typeormEmprestimoRepository,
} = require('./emprestimo.repository');
const { typeormLivroRepository } = require('./livro.repository');
const { typeormUsuarioRepository } = require('./usuario.repository');

describe('Emprestimo Repository', function () {
  let sut;
  beforeEach(async function () {
    await typeormEmprestimoRepository.delete({});
    await typeormUsuarioRepository.delete({});
    await typeormLivroRepository.delete({});
  });
  beforeAll(function () {
    sut = emprestimosRepository();
  });
  const usuarioDTO = {
    nome_completo: 'nome_valido',
    CPF: 'CPF_valido',
    telefone: 'telefone_valido',
    endereco: 'endereco_valido',
    email: 'email_valido',
  };
  const livroDTO = {
    nome: 'nome_valido',
    quantidade: 3,
    autor: 'autor_valido',
    genero: 'genero_valido',
    ISBN: 'ISBN_valido',
  };
  test('Deve retornar void ao criar um emprestimo', async function () {
    const usuario = await typeormUsuarioRepository.save(usuarioDTO);
    const livro = await typeormLivroRepository.save(livroDTO);
    const emprestimoCriado = await sut.emprestar({
      usuario_id: usuario.id,
      livro_id: livro.id,
      data_saida: '2025-04-05',
      data_retorno: '2025-04-05',
    });

    expect(emprestimoCriado).toBeUndefined();
  });

  test('Deve retornar a data de retorno salva no banco corretamente', async function () {
    const usuario = await typeormUsuarioRepository.save(usuarioDTO);
    const livro = await typeormLivroRepository.save(livroDTO);
    const emprestimo = await typeormEmprestimoRepository.save({
      usuario_id: usuario.id,
      livro_id: livro.id,
      data_saida: '2025-04-05',
      data_retorno: '2025-04-05',
    });

    const devolver = await sut.devolver({
      emprestimo_id: emprestimo.id,
      data_devolucao: '2025-04-05',
    });

    expect(devolver.data_retorno).toBe(emprestimo.data_retorno);
  });

  test('Deve atualizar a data de devolução no banco corretamente', async function () {
    const usuario = await typeormUsuarioRepository.save(usuarioDTO);
    const livro = await typeormLivroRepository.save(livroDTO);
    const emprestimo = await typeormEmprestimoRepository.save({
      usuario_id: usuario.id,
      livro_id: livro.id,
      data_saida: '2025-04-05',
      data_retorno: '2025-04-05',
    });

    await sut.devolver({
      emprestimo_id: emprestimo.id,
      data_devolucao: '2025-04-05',
    });

    const buscarEmprestimoPorID = await typeormEmprestimoRepository.findOneBy({
      id: emprestimo.id,
    });

    expect(buscarEmprestimoPorID.data_devolucao).toBe('2025-04-05');
  });

  test('Deve retornar os emprestimos pendentes', async function () {
    const usuario = await typeormUsuarioRepository.save(usuarioDTO);
    const livro = await typeormLivroRepository.save(livroDTO);
    await typeormEmprestimoRepository.save([
      {
        usuario_id: usuario.id,
        livro_id: livro.id,
        data_saida: '2025-04-05',
        data_retorno: '2025-04-08',
        data_devolucao: '2025-04-06',
      },
      {
        usuario_id: usuario.id,
        livro_id: livro.id,
        data_saida: '2025-04-05',
        data_retorno: '2025-04-10',
      },
    ]);

    const emprestimoPendentes = await sut.buscarPendentesComLivroComUsuario();

    expect(emprestimoPendentes).toHaveLength(1);
    expect(emprestimoPendentes[0].id).toBeDefined();
    expect(emprestimoPendentes[0].data_saida).toBe('2025-04-05');
    expect(emprestimoPendentes[0].data_retorno).toBe('2025-04-10');
    expect(emprestimoPendentes[0].data_devolucao).toBeUndefined();
    expect(emprestimoPendentes[0].usuario.nome_completo).toBe('nome_valido');
    expect(emprestimoPendentes[0].livro.nome).toBe('nome_valido');
  });

  test('Retorna true para livro ja emprestado ao usuario com o mesmo ISBN', async function () {
    const usuario = await typeormUsuarioRepository.save(usuarioDTO);
    const livro = await typeormLivroRepository.save(livroDTO);
    await typeormEmprestimoRepository.save({
      usuario_id: usuario.id,
      livro_id: livro.id,
      data_saida: '2025-04-05',
      data_retorno: '2025-04-05',
    });

    const livroEmprestado = await sut.existeLivroEmprestadoComMesmoISBN({
      usuario_id: usuario.id,
      livro_id: livro.id,
    });

    expect(livroEmprestado).toBe(true);
  });

  test('Retorna false para existência de livro emprestado ao usuario com o mesmo ISBN', async function () {
    const usuario = await typeormUsuarioRepository.save(usuarioDTO);
    const livro = await typeormLivroRepository.save(livroDTO);

    const livroEmprestado = await sut.existeLivroEmprestadoComMesmoISBN({
      usuario_id: usuario.id,
      livro_id: livro.id,
    });

    expect(livroEmprestado).toBe(false);
  });

  test('Deve retornar o emprestimo buscado pro ID com o usuario e o livro', async function () {
    const usuario = await typeormUsuarioRepository.save(usuarioDTO);
    const livro = await typeormLivroRepository.save(livroDTO);
    const emprestimo = await typeormEmprestimoRepository.save({
      usuario_id: usuario.id,
      livro_id: livro.id,
      data_saida: '2025-04-05',
      data_retorno: '2025-04-05',
    });

    const buscarEmprestimoComLivroComUsuario =
      await sut.buscarEmprestimoComLivroComUsuarioPorID(emprestimo.id);

    expect(buscarEmprestimoComLivroComUsuario).toEqual({
      id: emprestimo.id,
      data_saida: '2025-04-05',
      data_retorno: '2025-04-05',
      usuario: {
        nome_completo: 'nome_valido',
        CPF: 'CPF_valido',
        email: 'email_valido',
      },
      livro: {
        nome: 'nome_valido',
      },
    });
  });
});
