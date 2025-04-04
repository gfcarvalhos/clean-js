/**
 * @description: ATENÇÃO, não instanciar essa função diretamente, use os métodos Left e Right
 */
module.exports = class Either {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  static Left(left) {
    return new Either(left, null);
  }

  static Right(right) {
    return new Either(null, right);
  }

  static ValorJaCadastrado(valor) {
    return { message: `${valor} já cadastrado.` };
  }
};
