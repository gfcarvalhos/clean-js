module.exports = class AppError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }

  static dependencias = 'Alguma depedencia obrigatória não foi fornecida';
};
