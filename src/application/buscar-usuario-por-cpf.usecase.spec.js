const buscarUsuarioPorCpfUsecase = require('./buscar-usuario-por-cpf.usecase');

describe('Busca usuario por CPF UseCase', function () {
  const usuariosRepository = {
    buscarporCpf: jest.fn(),
  };
  test('Deve retornar um usuáeio caso o CPF esteja cadastrado', async function () {
    const cpfDTO = {
      CPF: 'CPF_cadastrado',
    };
    const outputDTO = {
      id: 'qualquer_id',
      nome: 'qualquer_nome',
      CPF: 'CPF_cadastrado',
      telefone: 'qualquer_telefone',
      email: 'qualquer_email',
    };
    usuariosRepository.buscarporCpf.mockResolvedValue(outputDTO);

    const sut = buscarUsuarioPorCpfUsecase({ usuariosRepository });
    const output = await sut(cpfDTO);

    expect(output.right).toEqual(outputDTO);
    expect(usuariosRepository.buscarporCpf).toHaveBeenCalledTimes(1);
    expect(usuariosRepository.buscarporCpf).toHaveBeenCalledWith(cpfDTO.CPF);
  });

  test('Deve retornar null se não existir usuário com o CPF informado', async function () {
    usuariosRepository.buscarporCpf.mockResolvedValue(null);
    const cpfDTO = {
      CPF: 'CPF_nao_cadastrado',
    };

    const sut = buscarUsuarioPorCpfUsecase({ usuariosRepository });
    const output = await sut(cpfDTO);

    expect(output.right).toBeNull();
    expect(usuariosRepository.buscarporCpf).toHaveBeenCalledWith(cpfDTO.CPF);
    expect(usuariosRepository.buscarporCpf).toHaveBeenCalledTimes(1);
  });
});
