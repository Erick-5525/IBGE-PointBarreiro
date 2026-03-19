# 📊 Portal de Dados IBGE

Aplicação web interativa desenvolvida com **React** para consulta de dados geográficos e informações relevantes do Brasil, utilizando as APIs oficiais do IBGE.

---

## 🚀 Tecnologias Utilizadas

- ⚛️ React.js  
- 🧠 Redux Toolkit  
- 🔀 React Router DOM  
- 🎨 CSS3 (Mobile-first e responsivo)  
- 🌐 API do IBGE  

---

## 📌 Funcionalidades

- 📊 **Dashboard Inicial**  
  Exibe o ranking dos nomes mais comuns no Brasil (Censo) e notícias recentes do IBGE.

- 🗺️ **Consulta de Estados**  
  Lista completa das unidades federativas.

- 🌎 **Consulta por Regiões**  
  Visualização das 5 regiões do Brasil com seus respectivos estados.

- ⚡ **Navegação Dinâmica**  
  Seleção de estados via interface para carregamento automático dos municípios.

- 🔄 **Gerenciamento de Estado Global**  
  Utilização do Redux para otimizar requisições e melhorar a performance da aplicação.

- 📱 **Responsividade**  
  Interface adaptada para dispositivos móveis, tablets e desktops.

---

## 🗂️ Estrutura do Projeto

- `Slice.js` → Gerenciamento do estado global e chamadas assíncronas (`createAsyncThunk`)  
- `MenuIBGE.jsx` → Menu principal com seletor rápido por UF  
- `Home.jsx` → Página inicial com dashboard e notícias  
- `ApiReceiver.jsx` → Componente dinâmico responsável pela renderização dos dados conforme a rota  

---

Acesse no navegador: (https://ibgepointbarreiro.netlify.app)

## ▶️ Como Executar o Projeto

```bash
# Clone o repositório
git clone https://github.com/Erick-5525/IBGE-PointBarreiro

# Acesse a pasta do projeto
cd IBGE-PointBarreiro

# Instale as dependências
npm install

# Execute o projeto
npm start
