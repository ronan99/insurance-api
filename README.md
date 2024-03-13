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

Executar o arquivo **setup.sh** da raiz do projeto. Obs: Deve dar permissão de execução antes.

**Da Raiz do projeto execute**

```bash
chmod +x setup.sh
./setup.sh
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

### 5. Considerações

Não foi usado versão LTS do node por ser muito pesado para desenvolvimento e instalação. Levou mais de 5 vezes mais tempo para instalação de dependências e de build de imagens ao trocar para a LTS.

Arquitetura foi feito sugerindo a que foi informada, utilizando express, aplicando vários conceitos de clean architecture, mas sem nenhum modelo de design pattern. Ainda existem algumas melhorias de Clean architecture a serem aplicadas, mas pelo prazo corrido, algumas foram deixadas de lado, como por exemplo, adapters para validators.

Foi utilizado implementações de InMemory repositories para realização dos testes unitários, além de serem muito úteis e fáceis de serem utilizados, são bem rápidos.

Libs como Prisma e Jest foram utilizadas por maior familiariadade.

Alguns problemas de Coverage foram detectados, logo, algumas funções estáticas foram removidas e alguns formatadores ficaram sem coberturas em linhas que não eram possíveis de serem testadas em testes unitários ou erros internos que poderiam ocorrer e não tinham como ser forçados.

Por utilizar prisma, 2 shadow databases foram criados para as migrations.

Conceitos de SOLID aplicados e mais alguns design patterns como:

Factory, Singleton, Proxy, Chain of responsibility, Iterator.

Para Grasp Principles:
Polymorphism, Low coupling, Controller, High cohesion and Information expert.
