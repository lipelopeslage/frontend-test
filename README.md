<p align="center">
  <a href="http://www.catho.com.br">
      <img src="http://static.catho.com.br/svg/site/logoCathoB2c.svg" alt="Catho"/>
  </a>
</p>

# Teste para vaga de desenvolvedor Front-end
Primeiramente, faça um fork e clone deste projeto, crie uma branch (pode ser com seu nome mesmo), depois instale as dependências:

- node.js: esse projeto roda sob a plataforma node.js, portanto necessita a instalação de suas dependencias com o npm:
```sh
npm install
```

- Front-end: não definimos nenhuma dependência front-end, nem a maneira como elas serão gerenciadas, isso fica a seu critério.


## Executando
Deixamos duas tasks npm configuradas:

- Uma utiliza diretamente o node.js:
```sh
npm start
```

- Outra utiliza o **[nodemom](https://www.npmjs.com/package/nodemon)** para gerenciar a aplicação:

Para instalar a dependencia nodemon
```sh
npm install -g nodemon
```

Para executar a task
```sh
npm run startNodemon
```

Escolha qual lhe agradar mais, ou execute manualmente a aplicação:
```sh
node app.js
```

Agora você já possui a configuração necessária, podemos começar.

## Estrutura
O repositório possui a seguinte estrutura:  
```md
├── config/ 
│   └── index.js 
├── controllers/ 
│   └── index.js  
├── routes  
│   └── index.js  
├── services  
│   ├── index.js  
│   └── templatePath.js  
├── views/  
├── public/  
│   ├── images/  
│   ├── javascript/  
│   ├── styles/  
│   └── json/  
│       └── talk.json  
├── layout/  
│   ├── test-front.psd  
│   └── test-front-320.psd  
├── .bowerrc  
├── .gitignore  
├── app.js  
├── package.json  
└── README.md  
```

### Rotas
Com a aplicação em execução você pode criar seus templates na pasta **views**, onde cada nível de pasta até o arquivo compõe a rota, por exemplo a seguinte estrutura:
```md
├── views
    ├── home/
        └── chat.html
```

Será acessada por: http://localhost:3000/site/home/chat/

### Arquivos estáticos
Os arquivos estáticos (imagens, css, js, less, sass, etc) devem ser utilizados na pasta **public** e são acessíveis em **/static/path_do_recurso.extensao_recurso**


## O teste!
Foi deixada uma estrutura preparada para sua implementação, favor a utilize-a. Abaixo segue um passo-a-passo do que esperamos ser executado:

1. Desenvolver a caixa de mensagem seguindo o layout proposto no arquivo **test-front.psd** e **test-front-320.psd**;
2. A caixa de mensagem deve ser inicializada ao términdo do load da página;
3. Deverá carregar um histórico de conversa (utilizar o arquivo **talk.json** que se encontra no diretório **public/json/**);
4. O usuário poderá:  *minimizar, restaurar, fechar e enviar mensagem* na caixa de mensagem;
5. Ao enviar uma nova mensagem, seu conteúdo deverá ser adicionado na conversa;
6. Suporte funcional para IE+8;
7. Atender aos breakpoints contidos nos arquivos **PSD**;


### Libs/Frameworks/Pre Processadores
- Fique a vontade para utilizar o recurso que desejar, somente tomando cuidado com os itens listados no tópico restrições.
- Queremos ver como você organiza seu código CSS, então utilize o seu pre processador preferido. O importante é o seu conhecimento prático na codificação de estilos.


### Restrições
- Para desenvolver o responsivo **não deve utilizar nenhum framework** como Bootstrap ou Foundation, queremos ver como você cria seus breakpoints, e a organização de seu código CSS.
- Os arquivos gerados (CSS, Javascript, Less, Sass, etc) **não devem ser minificados**. As libs utilizadas não tem problema.
- Não editar o arquivo **talk.json**. Somente deve alterá-lo tendo uma boa justificativa, e essa deve ser informada em um comentário no código.


### Avaliação
Avaliaremos o resultado seguindo esses pontos:

- Resultado funcional
- Resultado visual
- Manutenabilidade do código
- Clareza e limpeza do código
- Semântica HTML
- Lógica de programação


........


### Considerações do candidato
Comentários sobre o teste:

- Para rodar a aplicação: npm start
- Para compilar os scripts e css: gulp (em outra aba do terminal, no diretório raiz)
- Pensei em usar o react para componentizar o exemplo, mas decidi por utilizar javascript puro para uma melhor avaliação da minha resolução
- Pensei em tornar o chat uma espécie de biblioteca, por isso separei o arquivo css 'chat.css' do escopo geral
- Mantendo o pensamento de biblioteca, o único módulo a ser requisitado para a inserção do chat é o próprio 'chat.js'
- Infelizmente não tive tempo de testar no IE8, pois trabalho com um iMac e um MacbookPro, meu notebook windows não possui node, nem npm instalados (utilizo apenas para recreação)
- Versão do node: 4.3.0
- Versão do npm: 2.14.12
