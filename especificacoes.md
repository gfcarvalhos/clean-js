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
[] - Um usuário pode estar com mais de um livro com ISBN diferentes ao mesmo tempo
[] - Ao cadastrar um empréstimo, será enviado um email automaticamente informando o nome do livro, nome do usuário, CPF, a data de saída e a data de retorno

[] Devolver o livro emprestado sem multa
[] - Caso o usuário tenha atrasado, será gerada uma multa fixa de R$ 10,00

[] Mostrar todos os empréstimos pendentes, com o nome do livro, nome do usuário, CPF, data de saída e data de retorno. Ordenados pela data de retorno mais antiga

## Estruturas

## UsuariosRepository

[X] cadastrar: ({nome_completo, CPF, telefone, endereco, email}) => Promise<void>
[x] existePorCpf(CPF) => Promise<boolean>
[x] existePorEmail(email) => Promise<boolean>

## LivrosRepository

[x] cadastrar: { nome, quantidade, autor, genero, ISBN } => Promise<void>
[x] existePorISBN(ISBN) => Promise<boolean>
[x] buscarPorNomeOuISBN(valor) => Promise<Array<Livros>>

## EmprestimosRepository

[x] emprestar: {usuario_id, livro_id, data_saida, data_retorno} => Promise<void>
[x] existeLivroEmprestadoComMesmoISBN({ usuario_id, livro_id,}) => Promise<boolean>
