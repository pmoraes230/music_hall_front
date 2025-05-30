# Music Hall Front

## Descrição
O **Music Hall Front** é a interface de um sistema web desenvolvido para gerenciar eventos musicais. Ele inclui funcionalidades como exibição de eventos, cadastro de usuários, setores e eventos, além de uma navegação dinâmica e responsiva. O projeto utiliza **React** como biblioteca principal para construção da interface e estilização com **CSS**.

## Tecnologias Utilizadas
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **React Bootstrap**: Framework para componentes estilizados e responsivos.
- **CSS**: Estilização personalizada para o design do sistema.
- **JavaScript (ES6+)**: Lógica e manipulação de estados.
- **Webpack**: Empacotador de módulos para otimização do projeto.

## Funcionalidades

### Home Page
- Exibição de um título dinâmico com cores alternadas.
- Lista de eventos em destaque.
- Carrossel de imagens para navegação visual.

### Navegação
- Menu fixo no topo da página que muda de cor ao rolar a tela.
- Links para páginas de cadastro de eventos, setores e usuários.

### Cadastro
- Formulários para registro de eventos, setores e usuários.
- Validação de campos como CPF e limite de caracteres em descrições.

### Responsividade
- Layout adaptável para diferentes tamanhos de tela.

## Estrutura do Projeto
```
music-hall-front/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── App.js
├── public/
├── package.json
└── README.md
```

## Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/music-hall-front.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd music-hall-front
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

## Como Executar
1. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
2. Abra o navegador e acesse:
   ```
   http://localhost:3000
   ```

## Scripts Disponíveis
- `npm start`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera a versão de produção do projeto.
- `npm run lint`: Verifica problemas de lint no código.

## Estilização
### Variáveis de cores
- `--laranja`: Cor principal para destaques.
- `--mostarda`: Cor secundária para links.
- `--escuro`: Fundo e elementos escuros.
- `--marrom`: Tons de fundo adicionais.

## Contribuição
1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m "Adiciona minha feature"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

## Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.