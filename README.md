# True Random Number Generator — n8n Custom Node (Simple Node)

Este repositório traz um **conector customizado para o n8n** chamado **Random**.  
A ideia é simples: você informa um número mínimo e um máximo, e o node devolve um número realmente aleatório dentro desse intervalo.  
O detalhe é que essa aleatoriedade não vem de um cálculo local, mas da API pública do [Random.org](https://www.random.org), garantindo resultados mais imprevisíveis.  

Esta é a versão **simplificada (`simple-node`)** → todo o código está dentro de um único arquivo no `TrueNumberGenerator`.  
Não há separação em camadas ou múltiplos diretórios.  

---

## 🚀 Parte 1 — Como instalar e rodar

Para rodar este projeto você precisará de **Git**, **Docker** e **Node.js** (este último apenas se quiser recompilar o node).  

### Requisitos
- **Git** → clonar o projeto  
- **Docker Desktop** + Docker Compose V2 → subir o ambiente (n8n + PostgreSQL)  
- **Node.js v22 (LTS)** e **npm** → somente se quiser compilar o node manualmente  

---

### Passo a passo

1. **Clonar o repositório**
   ```bash
   git clone https://github.com/Brunohgc9/WebAut-N8NRandomConector.OnflyTechnicalTest.git
   cd WebAut-N8NRandomConector.OnflyTechnicalTest
   ```

2. **Entrar na pasta raiz do projeto**  
   Abra o terminal e navegue até o local onde a pasta raiz foi clonada.  
   Por exemplo, no Windows:
   ```bash
   cd C:\Users\SeuUsuario\WebAut-N8NRandomConector.OnflyTechnicalTest
   ```

   > É **nessa pasta raiz** que ficam o arquivo `docker-compose.yml` e todos os comandos devem ser executados.

3. **Instalar dependências e compilar o node**  
   Dentro da pasta raiz, rode:
   ```bash
   npm install
   npm run build
   ```
   Isso gera a versão compilada do conector que o n8n carregará.  
   ⚠️ Nesta versão não há múltiplas camadas de arquitetura — o código do node já está concentrado em um único arquivo no `TrueNumberGenerator`.

4. **Atenção com containers existentes**  
   Se você já executou a versão **main**, o Docker pode estar usando as mesmas portas (5678) e nomes de containers (`n8n` e `n8n-postgres`).  
   Para evitar conflitos, você tem duas opções:

   - **Opção 1:** Remover os containers existentes da versão main  
     ```bash
     docker-compose down
     docker rm -f n8n n8n-postgres
     ```

   - **Opção 2:** Alterar as portas e nomes no `docker-compose.yml` desta versão, por exemplo:  
     ```yaml
     postgres:
       image: postgres:15-alpine
       container_name: n8n-postgres-simple
       restart: unless-stopped
       environment:
         POSTGRES_USER: n8n
         POSTGRES_PASSWORD: n8n
         POSTGRES_DB: n8n
       volumes:
         - ./postgres_data:/var/lib/postgresql/data
       networks:
         - n8n-network

     n8n:
       build:
         context: .
         dockerfile: docker/Dockerfile
       container_name: n8n-simple
       restart: unless-stopped
       ports:
         - "5679:5678"   # alterado para não conflitar
       environment:
         ...
     ```

5. **⚙️ Configuração de variáveis de ambiente (.env)**

O projeto já possui um arquivo `.env.example` na raiz.  
Para configurar, basta criar uma cópia dele com o nome `.env`:

```bash
cp .env.example .env
```

### Variáveis principais

- `POSTGRES_USER` → usuário do banco (padrão: `n8n`)
- `POSTGRES_PASSWORD` → senha do banco (padrão: `n8n`)
- `POSTGRES_DB` → nome do banco (padrão: `n8n`)
- `N8N_HOST` → host da aplicação (padrão: `localhost`)
- `N8N_PORT` → porta onde o n8n rodará (padrão: `5678`)

### 🔄 Fallback
Caso alguma variável não esteja definida no `.env`, o sistema utiliza valores padrão já embutidos no `docker-compose.yml`.  
Isso garante que, mesmo esquecendo de configurar algo, o ambiente ainda subirá corretamente.

> Recomendo, no entanto, sempre ajustar o `.env` para refletir seu ambiente local e evitar problemas em produção.

6. **Subir o ambiente com Docker**  
   Primeiro, abra o **Docker Desktop**.  
   Em seguida, no terminal posicionado na pasta raiz, execute:
   ```bash
   docker-compose up --build
   ```
   Ou, para rodar em background:
   ```bash
   docker-compose up -d --build
   ```

7. **Parar e limpar containers (quando necessário)**
   ```bash
   docker-compose down
   ```

8. **Acessar o n8n**
   Abra no navegador:  
   👉 http://localhost:5678  
   (ou http://localhost:5679 caso tenha alterado a porta)

---

## 🔎 Testando o conector

No editor do n8n:
1. Crie um novo workflow.  
2. Arraste o node **Random**.  
3. Preencha os valores de **Min** e **Max**.  
4. Execute o fluxo.  

Você verá o número aleatório retornado diretamente da API do Random.org.

---

## 🧩 Estrutura simplificada

Diferente da versão `main`, aqui não há separação em **Presentation, Application, Domain, Infrastructure**.  
O código está direto no arquivo do `TrueNumberGenerator`, mantendo o foco apenas no funcionamento do node.  

- `CustomNodes/` → código do conector Random em um único arquivo  
- `Docker/` → Dockerfile usado para construir a imagem  
- `docker-compose.yml` → define os serviços (n8n + PostgreSQL)  
- `n8n_data/` → volume para salvar configs e workflows  
- `postgres_data/` → volume para persistir o banco de dados  

---

## ⚙️ Usando a pasta `.n8n/custom` para testar o node

Você pode rodar o n8n localmente sem Docker e testar seus nós personalizados criando a pasta **.n8n/custom** no seu usuário do sistema.  

### Criando a pasta `.n8n/custom`

- **Windows**  
  Abra o terminal (PowerShell ou CMD) e rode:

  ```bash
  mkdir %USERPROFILE%\.n8n\custom
  cd %USERPROFILE%\.n8n\custom
  ```

- **Linux / macOS**  
  ```bash
  mkdir -p ~/.n8n/custom
  cd ~/.n8n/custom
  ```

### Inicializar com `npm init`

Dentro dessa pasta recém-criada, inicialize um projeto npm:

```bash
npm init -y
```

Isso cria um `package.json` básico para gerenciar dependências.

### Preparar o nó customizado com `npm link`

Agora, volte para a pasta do nó compilado e rode:

```bash
cd WebAut-N8NRandomConector.OnflyTechnicalTest/CustomNodes/Random
npm install
npm run build
npm link
```

Depois, dentro da pasta `.n8n/custom`, rode:

```bash
npm link webaut-n8nrandomconector.onflytechnicaltest.simplenode
```

Isso faz com que o n8n reconheça seu nó customizado sempre que iniciar.

---

✍️ **Autor:** Bruno Henrique Gonçalves Correia  
📌 Desenvolvido como parte do processo técnico da Onfly
