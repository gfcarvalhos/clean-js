# Projeto backend de uma Livraria

Projeto para estudo dos príncipios da Clean Architecture

## Diagrama de Classe

```mermaid
erDiagram
    USUARIO ||--o{ EMPRESTIMO : realiza
    LIVRO ||--o{ EMPRESTIMO : participa

    USUARIO {
        int id
        string nome
        string email
        string CPF
        string Telefone
        string Endereco
    }

    LIVRO {
        int id
        string nome
        string autor
        int quantidade
        string genero
        string ISBN
    }

    EMPRESTIMO {
        int id
        date data_retorno
        date data_devolucao
        date data_saida
        date data_devolucao
        int usuario_id
        int livro_id
    }
```
