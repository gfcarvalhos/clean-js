## Reunião

> Somos uma biblioteca pequena e gostariamos de controlar a nossa entrada e saída de livros. Queremos cadastrar o usuário que irá pegar o livro emprestado, cadastrar os livros da nossa biblioteca e poder emprestar os livros para qualquer usuário, além de buscar os registros de empréstimos.

## Dados

- Usuario: [nome_completo, CPF, telefone, endereco, email]
- Livro: [nome, quantidade, autor, genero, ISBN]
- Emprestimo: [usuario_id, livro_id, data_retorno, data_devolucao, data_saida]

## UseCases (Regras de negócio)

[x] Cadastrar um novo usuário
[x] - CPF ou email devem ser únicos

[x] Buscar um cadastro de usuário por CPF
[x] - Retornar um usuário ou vazio

[x] Cadastrar um novo livro
[x] - ISBN deve ser único

[x] Buscar um livro por nome ou ISBN
[x] - Retornar os livros ou vazio

[x] Emprestar um livro ao usuario
[x] - A data de retorno não pode ser menor que a data de saída
[x] - Um usuário não pode estar com mais de um livro com o mesmo ISBN ao mesmo tempo
[x] - Um usuário pode estar com mais de um livro com ISBN diferentes ao mesmo tempo
[x] - Ao cadastrar um empréstimo, será enviado um email automaticamente informando o nome do livro, nome do usuário, CPF, a data de saída e a data de retorno

[x] Devolver o livro emprestado sem multa
[x] - Caso o usuário tenha atrasado, será gerada uma multa fixa de R$ 10,00

[x] Mostrar todos os empréstimos pendentes, com o nome do livro, nome do usuário, CPF, data de saída e data de retorno. Ordenados pela data de retorno mais antiga

## Estruturas

## UsuariosRepository

[x] cadastrar: ({nome_completo, CPF, telefone, endereco, email}) => Promise<void>
[x] buscarporCpf: (CPF) => Promise<Usuario | null>
[x] existePorCpf:(CPF) => Promise<boolean>
[x] existePorEmail:(email) => Promise<boolean>

## LivrosRepository

[x] cadastrar: ({ nome, quantidade, autor, genero, ISBN }) => Promdise<void>
[x] existePorISBN:(ISBN) => Promise<boolean>
[x] buscarPorNomeOuISBN(valor) => Promise<Array<Livros>>

## EmprestimosRepository

[x] emprestar: {usuario_id, livro_id, data_saida, data_retorno} => Promise<void>
[x] existeLivroEmprestadoComMesmoISBN:({ usuario_id, livro_id,}) => Promise<boolean>
[x] buscarEmprestimoComLivroComUsuarioPorID:(id) => Promise<Emprestimo & {Livro: {nome}, Usuario: {nome_completo, CPF, email}}>
[x] devolver: ({emprestimo_id, data_devolucao}) => Promise<{data_retorno}>
[x] buscarPendentesComLivroComUsuario: () =: Promise<Emprestimo: {data_saida, data_retorno & Livro: {nome}, Usuario: {nome_completo, cpf}}>

## Versao 2

- Quantidade não pode ser menor que 0 ao cadastrar um livro
- Poder editar um livro
- Poder editar um usuário
- Não permitir que um empréstimo já devolvido seja devolvido de novo
- Checar se ao devolver, a data de devolução não é menor que a data de retorno
