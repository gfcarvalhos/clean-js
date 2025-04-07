const {
  emprestimoRepository,
  typeormEmprestimoRepository,
} = require('./emprestimo.repository');

describe('Emprestimo Repository', function () {
  let sut;
  beforeEach(function () {
    typeormEmprestimoRepository.delete({});
  });
  beforeAll(function () {
    sut = emprestimoRepository();
  });
  const emprestimoDTO = {
    usuario_id: 'usuario_id_valido',
    livro_id: 'livro_id_valido',
    data_saida: new Date('2025-04-05'),
    data_retorno: new Date('2025-04-05'),
  };
  test('Deve retornar void ao criar um emprestimo', async function () {
    const emprestimoCriado = await sut.emprestar(emprestimoDTO);

    expect(emprestimoCriado).toBeUndefined();
  });
});
