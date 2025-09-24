# True Random Number Generator — n8n Custom Node

Este repositório traz um **conector customizado para o n8n** chamado **Random**.  
A ideia é simples: você informa um número mínimo e um máximo, e o node devolve um número realmente aleatório dentro desse intervalo.  
O detalhe é que essa aleatoriedade não vem de um cálculo local, mas da API pública do [Random.org](https://www.random.org), garantindo resultados mais imprevisíveis.  

O projeto está disponível em duas versões:  
- **Versão principal (`main`)** → organizada em camadas e inspirada em *clean architecture*.  
- **Versão simplificada (`simple-node`)** → todo o código em um único arquivo, sem separação de responsabilidades.  

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

4. **Subir o ambiente com Docker**  
   Primeiro, abra o **Docker Desktop**.  
   Em seguida, no terminal posicionado na pasta raiz, execute:
   ```bash
   docker-compose up --build
   ```
   Ou, para rodar em background:
   ```bash
   docker-compose up -d --build
   ```

5. **Parar e limpar containers (quando necessário)**
   ```bash
   docker-compose down
   ```

6. **Acessar o n8n**
   Abra no navegador:  
   👉 http://localhost:5678

---

### 🔎 Testando o conector

No editor do n8n:
1. Crie um novo workflow.  
2. Arraste o node **Random**.  
3. Preencha os valores de **Min** e **Max**.  
4. Execute o fluxo.  

Você verá o número aleatório retornado diretamente da API do Random.org.

---

## 🧩 Parte 2 — Estrutura e arquitetura

A branch principal não traz apenas um conector funcional: ela foi pensada para mostrar uma forma organizada de estruturar um node customizado no n8n.  
O código foi separado em **camadas inspiradas no clean architecture**:

- **Presentation** → define como o node aparece no n8n (inputs, descrições, ícone).  
- **Application** → concentra as regras de uso e orquestra a execução.  
- **Domain** → garante a lógica central, como a validação de `min` e `max`.  
- **Infrastructure** → cuida da integração com o Random.org.  

Essa separação facilita manutenção, evolução e até a criação de testes unitários.  
É um exemplo prático de como aplicar boas práticas mesmo em algo simples como um conector.

### Estrutura de pastas

- `CustomNodes/` → código do conector Random  
- `Docker/` → Dockerfile usado para construir a imagem  
- `docker-compose.yml` → define os serviços (n8n + PostgreSQL)  
- `n8n_data/` → volume para salvar configs e workflows  
- `postgres_data/` → volume para persistir o banco de dados  

---

## ⚡ Versão simplificada

Se você não se interessa pela separação em camadas e só quer ver o conector funcionando de forma direta, sem abstrações, troque para a branch:

```bash
git checkout simple-node
```

Nela você encontrará um único arquivo com toda a lógica embutida.  
É a forma mais rápida de entender a essência do node, mas sem preocupações arquiteturais.

---

✍️ **Autor:** Bruno Henrique Gonçalves Correia  
📌 Desenvolvido como parte do processo técnico da Onfly
