const { typeormServer } = require('../setup');

const typeormUsuarioRepository = typeormServer.getRepository('Usuario');

const usuariosRepository = function () {
  const cadastrar = async function ({
    nome_completo,
    CPF,
    telefone,
    endereco,
    email,
  }) {
    await typeormUsuarioRepository.save({
      nome_completo,
      CPF,
      telefone,
      endereco,
      email,
    });
  };

  const buscarporCpf = async function (CPF) {
    const usuario = await typeormUsuarioRepository.findOne({
      where: {
        CPF,
      },
    });

    return usuario;
  };

  const existePorCpf = async function (CPF) {
    const existeUsuario = await typeormUsuarioRepository.count({
      where: {
        CPF,
      },
    });
    return !!existeUsuario;
  };

  const existePorEmail = async function (email) {
    const existeUsuario = await typeormUsuarioRepository.count({
      where: {
        email,
      },
    });
    return !!existeUsuario;
  };
  return { cadastrar, buscarporCpf, existePorCpf, existePorEmail };
};

module.exports = { usuariosRepository, typeormUsuarioRepository };
