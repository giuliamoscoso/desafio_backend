# Desafio Desenvolvedor Backend

**Objetivo**: Criar uma aplicação CRUD básica com banco de dados e API em Python, ou outra linguagem de sua preferência.

**Resultados Esperados**: Ao final do desafio, deve existir uma aplicação backend capaz de criar, atualizar, remover e selecionar dados de um banco de dados.

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

-   Node.js v18.20
-   TypeScript
-   Express
-   MySQL 8.0

**Observação**: Chamadas de teste realizadas utilizando o Postman estão disponíveis no arquivo `desafio.postman_collection.json`, na pasta raiz do projeto.

## Desafio A

**Objetivo**: Criar estruturas de tabelas e procedures no banco de dados.

1. **Criar script para criação da tabela _Pessoas_**

```sql
CREATE TABLE Pessoas (
  idPessoa INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  dataNascimento DATE NOT NULL,
  salario DECIMAL(10, 2),
  observacoes TEXT
);

```

2. **Criar script para alteração da tabela _Pessoas_:**

```sql
ALTER TABLE Pessoas
ADD COLUMN nomeMae VARCHAR(255),
ADD COLUMN nomePai VARCHAR(255),
ADD COLUMN cpf VARCHAR(11);
```

3. **Criar um script para adicionar índices de pesquisa a tabela _Pessoas_:**

```sql
CREATE INDEX idx_nome ON Pessoas (nome);
CREATE INDEX idx_dataNascimento ON Pessoas (dataNascimento);
```

4. **Criar um script para adicionar índice/chave única a tabela _Pessoas_:**

```sql
ALTER TABLE Pessoas
ADD CONSTRAINT uq_cpf UNIQUE (cpf);
```

5. **Criar um script para criar uma procedure de _inserção_ de registros:**

```sql
DELIMITER //

CREATE PROCEDURE inserirPessoa(
  IN p_nome VARCHAR(255),
  IN p_dataNascimento DATE,
  IN p_salario DECIMAL(10, 2),
  IN p_observacoes TEXT,
  IN p_nomeMae VARCHAR(255),
  IN p_nomePai VARCHAR(255),
  IN p_cpf VARCHAR(11)
)
BEGIN
  INSERT INTO Pessoas (nome, dataNascimento, salario, observacoes, nomeMae, nomePai, cpf)
  VALUES (p_nome, p_dataNascimento, p_salario, p_observacoes, p_nomeMae, p_nomePai, p_cpf);

  SELECT LAST_INSERT_ID() AS idPessoa;
END //

DELIMITER ;
```

6. **Criar um script para criar uma procedure de _atualização_ de registros:**

-   Foi utilizado o COALESCE para verificar se o valor passado é nulo, caso seja, ele mantém o valor atual do campo.

```sql
DELIMITER //

CREATE PROCEDURE atualizarPessoa(
  IN p_idPessoa INT,
  IN p_nome VARCHAR(255),
  IN p_dataNascimento DATE,
  IN p_salario DECIMAL(10, 2),
  IN p_observacoes TEXT,
  IN p_nomeMae VARCHAR(255),
  IN p_nomePai VARCHAR(255),
  IN p_cpf VARCHAR(11)
)
BEGIN
  UPDATE Pessoas
  SET
      nome = COALESCE(p_nome, nome),
      dataNascimento = COALESCE(p_dataNascimento, dataNascimento),
      salario = COALESCE(p_salario, salario),
      observacoes = COALESCE(p_observacoes, observacoes),
      nomeMae = COALESCE(p_nomeMae, nomeMae),
      nomePai = COALESCE(p_nomePai, nomePai),
      cpf = COALESCE(p_cpf, cpf)
  WHERE idPessoa = p_idPessoa;

  SELECT 'OK' AS Resultado;
END //

DELIMITER ;

```

7. **Criar um script para criar uma procedure de _remoção_ de registros:**

```sql
DELIMITER //

CREATE PROCEDURE removerPessoa(
    IN p_idPessoa INT
)
BEGIN
    DELETE FROM Pessoas WHERE idPessoa = p_idPessoa;

    SELECT 'OK' AS Resultado;
END //

DELIMITER ;
```

8. **Criar um script para criar uma procedure de _seleção_ de registros:**

```sql
DELIMITER //

CREATE PROCEDURE selecionarTodasPessoas()
BEGIN
    SELECT * FROM Pessoas;
END //

DELIMITER ;
```

9. **Criar um script para criar uma procedure de _obter um registro_:**

```sql
DELIMITER //

CREATE PROCEDURE obterPessoa(
    IN p_idPessoa INT
)
BEGIN
    SELECT * FROM Pessoas WHERE idPessoa = p_idPessoa;
END //

DELIMITER ;
```

10. **Criar um script para inserir dados na tabela de _Pessoas_ através da procedures de _inserção_:**

```sql
CALL inserirPessoa(
    'Maria José',
    '1987-01-01',
    4500.00,
    'Folga todas as quartas-feiras.',
    'Ana da Silva',
    'João da Silva',
    '98765432100'
);
```

11. **Criar um script para atualizar dados na tabela de _Pessoas_ através da procedures de _atualização_:**

```sql
CALL atualizarPessoa(
    1,
    'Maria da Silva Pontes',
    '1990-02-01',
    4800.00,
    'Funcionária promovida!',
    'Ana da Silva Pontes',
    'João da Silva',
    '98765432110'
);
```

12. **Criar um script para remover dados na tabela de _Pessoas_ através da procedures de _remoção_:**

```sql
CALL removerPessoa(1);
```

13. **Criar um script para selecionar dados na tabela de _Pessoas_ através da procedures de _seleção_ todos os registros:**

```sql
CALL selecionarTodasPessoas();
```

14. **Criar um script para selecionar um registro na tabela de _Pessoas_ através da procedures de _seleção_ de um registro:**

```sql
CALL obterPessoa(1);
```
