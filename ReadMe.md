# True Random Number Generator — n8n Custom Node

Este repositório traz um **conector customizado para o n8n** chamado **Random**.  
A ideia é simples: você informa um número mínimo e um máximo, e o node devolve um número realmente aleatório dentro desse intervalo.  
O detalhe é que essa aleatoriedade não vem de um cálculo local, mas da API pública do [Random.org](https://www.random.org), garantindo resultados mais imprevisíveis.  

O projeto está disponível em duas versões:  
- A versão principal (branch `main`), organizada em camadas e inspirada em clean architecture.  
- A versão simplificada (branch `simple-node`), onde tudo está em um único arquivo, sem separação de responsabilidades.  

---

## Parte 1 — Como instalar e rodar

Rodar este projeto não exige nada além de Git, Docker e Node.js (caso você queira recompilar o node). O fluxo é direto: clonar, instalar dependências, subir containers e testar no navegador.

### Requisitos básicos
- **Git** para clonar o projeto  
- **Docker Desktop** + Docker Compose V2 para subir o ambiente do n8n e PostgreSQL  
- **Node.js v22 (LTS)** e **npm** apenas se você quiser compilar o node manualmente  

### Passo a passo

Clone o repositório:
```bash
git clone https://github.com/Brunohgc9/WebAut-N8NRandomConector.OnflyTechnicalTest.git
cd WebAut-N8NRandomConector.OnflyTechnicalTest
```

Se quiser trabalhar no código do conector, entre na pasta e rode:
```bash
cd CustomNodes/TrueNumberGeneratorNode
npm install
npm run build
cd ../../
```
Esse comando gera a versão compilada do node que será carregada pelo n8n.

Abra o **Prompt de Comando (cmd)** ou o **terminal** e navegue até a pasta raiz do projeto que você acabou de clonar.  
Por exemplo, se você clonou o projeto em `C:\Users\SeuUsuario\`, rode:

```bash
cd C:\Users\SeuUsuario\WebAut-N8NRandomConector.OnflyTechnicalTest
```

> É **dentro dessa pasta raiz** que ficam os arquivos `docker-compose.yml` e onde você vai rodar os comandos do Docker.

---

Agora é só subir o ambiente: abra o **Docker Desktop e, com o terminal ainda posicionado na **pasta raiz do projeto**, execute:
```bash
docker-compose up --build
```

Se preferir rodar em background:
```bash
docker-compose up -d --build
```

Para parar e limpar os containers:
```bash
docker-compose down
```

Com tudo rodando, abra no navegador:
👉 http://localhost:5678

### Testando

No editor do n8n:  
1. Crie um workflow novo.  
2. Arraste o node **Random**.  
3. Preencha os valores de **Min** e **Max**.  
4. Execute o fluxo.  

Você verá o número aleatório sendo retornado diretamente da API do Random.org.

---

## Parte 2 — Estrutura e arquitetura

A branch principal não traz apenas um conector funcional: ela foi pensada para mostrar uma forma organizada de estruturar um node customizado no n8n.  
Aqui, o código foi separado em **camadas inspiradas no clean architecture**:

- **Presentation** → define como o node aparece no n8n (inputs, descrições, ícone).  
- **Application** → concentra as regras de uso e orquestra a execução.  
- **Domain** → garante a lógica central, como a validação de `min` e `max`.  
- **Infrastructure** → cuida da integração com o Random.org.  

Essa separação facilita manutenção, evolução e até a criação de testes unitários. É um exemplo prático de como aplicar boas práticas mesmo em algo simples como um conector.

### Estrutura de pastas

- `CustomNodes/` → onde está o código do conector Random.  
- `Docker/` → Dockerfile usado para construir a imagem.  
- `docker-compose.yml` → define os serviços (n8n + PostgreSQL).  
- `n8n_data/` → volume para salvar configs e workflows.  
- `postgres_data/` → volume para persistir o banco de dados.  

---

## Versão simplificada

Se você não se interessa pela separação em camadas e só quer ver como o conector funciona de forma direta, sem abstrações, basta trocar para a branch:

```bash
git checkout simple-node
```

Ali você encontrará um único arquivo com toda a lógica embutida. É a forma mais rápida de entender a essência do node, mas sem as preocupações de arquitetura.

---

✍️ **Autor:** Bruno Henrique Gonçalves Correia  
📌 Desenvolvido como parte do processo técnico da Onfly
