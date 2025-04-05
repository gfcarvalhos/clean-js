const emprestimoEntity = require('./emprestimo.entity');

describe('Emprestimos Entity', function () {
  test('Calcular multa sem atraso', function () {
    const resultado = emprestimoEntity.calcularMulta({
      data_retorno: '2025-04-05',
      data_devolucao: '2025-04-04',
    });

    expect(resultado).toBe('Multa por atraso: R$ 0');
  });

  test('Calcular multa com atraso', function () {
    const resultado = emprestimoEntity.calcularMulta({
      data_retorno: '2025-04-05',
      data_devolucao: '2025-04-06',
    });

    expect(resultado).toBe('Multa por atraso: R$ 10,00');
  });
});
