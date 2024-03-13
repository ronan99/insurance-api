# Insurance api
Duas apis, identity e Insurance. Apis para cadastro e autenticação e api para precificação de coberturas de seguros.

### Como Rodar:

Este README fornece instruções para configurar e executar o projeto  em NodeJs usando Docker.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Git
- Docker
- Docker Compose
- Node.js (npm)
- [dotenv-cli](https://github.com/entropitor/dotenv-cli)

## Tecnologias
- Node
- Typescript
- Express.js
- Jest
- Docker
- MySql


## Instruções para Execução

### 1. Clone o Repositório

```bash
git clone <url-do-repo>
cd nome-do-repo
```

### 2. Setup

Executar o arquivo **setup.sh** da raiz do projeto

**Da Raiz do projeto execute**

```bash
./setup.sh
```
Caso não tenha permissão de execução para o arquivo, executar antes:

```bash
chmod +x setup.sh
```

### 3. Configuração do Docker
Na raiz do projeto, execute:

```bash
docker-compose build
docker-compose up -d
```

### 4. Testes e coverage

Os testes rodam separados em cada API. Para rodar os testes é necessário ter o banco de dados rodando por conta dos testes de integração. Para levantar somente o banco, rodar:
```bash
docker-compose up mysql -d
```
Para rodar os testes, executar na pasta da API que deseja verificar. Podendo ser **identity-api** ou **pricing-api**
```bash
npm test
```
Para gerar a cobertura dos testes, deve-se executar:
```bash
npm test -- --coverage
```
Os testes serão rodados e uma pasta coverage será gerada na pasta do projeto.