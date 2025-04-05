const emprestimosEntity = function () {
  function calcularDiasAtrasados({ data_retorno, data_devolucao }) {
    return (
      new Date(data_retorno).getTime() < new Date(data_devolucao).getTime()
    );
  }

  const calcularMulta = function ({ data_retorno, data_devolucao }) {
    const diasAtraso = calcularDiasAtrasados({ data_retorno, data_devolucao });
    return `Multa por atraso: R$ ${diasAtraso > 0 ? '10,00' : '0'}`;
  };

  return { calcularMulta };
};

module.exports = emprestimosEntity();
