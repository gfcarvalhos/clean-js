module.exports = class AppError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }

  static dependencias = 'Alguma depedencia obrigatória não foi fornecida';
  static parametrosObrigatoriosAusentes =
    'Algum parâmetro obrigatório não foi fornecido';
  static cpfJaCadastrado = 'CPF já cadastrado';
};
