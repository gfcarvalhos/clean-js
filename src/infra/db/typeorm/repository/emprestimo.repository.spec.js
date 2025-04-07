const {
  emprestimosRepository,
  typeormEmprestimoRepository,
} = require('./emprestimo.repository');
const { typeormLivroRepository } = require('./livro.repository');
const { typeormUsuarioRepository } = require('./usuario.repository');

describe('Emprestimo Repository', function () {
  let sut;
  beforeEach(function () {
    typeormEmprestimoRepository.delete({});
    typeormUsuarioRepository.delete({});
    typeormLivroRepository.delete({});
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
      data_saida: new Date('2025-04-05'),
      data_retorno: new Date('2025-04-05'),
    });

    expect(emprestimoCriado).toBeUndefined();
  });
});
