const { typeormServer } = require('../setup');

const typeormUsuarioRepository = typeormServer.getRepository('Usuario');

const usuarioRepository = function () {
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
  return { cadastrar, buscarporCpf, existePorCpf };
};

module.exports = { usuarioRepository, typeormUsuarioRepository };
