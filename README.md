# Api Simples

Author: Gustavo dos Santos Quintans.<br>
Especialidade: Backend.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Node.js](https://nodejs.org/en/), [Yarn](https://yarnpkg.com/), Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

### 🎲 Instalação

```bash

# Acesse a pasta do projeto no terminal/cmd
$ cd client

# Instale as dependências caso a pasta node_modules ainda não exista
$ yarn

# Para rodar o servidor e aplicação juntos basta
$ yarn start

# Ou
$ node server.js

# O servidor inciará na porta:5000 - acesse <http://localhost:5000> e a aplicação front-end porta:3000 -  acesse <http://localhost:3000>
```

### Testes 

```bash
  # Acesse a raiz do projeto no terminal/cmd
  $ cd TesteVTX

  # Verifique caso a pasta node_modules ja exista ná raiz, caso não:
  $ yarn 

  # Caso contrario execute diretamente os testes
  $ yarn jest 
  ## Ou
  $ yarn test
```
## Detalhes da aplicação  

### __ __test__ __
Todos os testes unitarios são feitos em Arquivos nesse formato ->  `NomeDoArquivo.test.js` onde ele testa, a rota e o metodo que calcula os acrecimos adicionais ao valor

### __Src__
Todas as pastas src contem arquivos que foram construidos por mim, tanto na raiz do projeto quanto na pasta client
