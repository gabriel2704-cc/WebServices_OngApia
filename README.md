# Plataforma Web da APIA

**Instituição:** IFSUL  
**Curso:** Bacharelado em Ciência da Computação  
**Disciplina:** Práticas em Sociedade III  
**Discentes:** Daniel Cipriano da Silva e Gabriel de Oliveira  
**Docente orientadora:** Prof. Carmem Vera Scorsatto  
**IFSUL - Ciência da Computação**

Plataforma web institucional para a **APIA — Associação de Protetores Independentes dos Animais**, de Lagoa Vermelha, Rio Grande do Sul. O projeto será desenvolvido como atividade de extensão curricular, com acompanhamento do orientador e evolução registrada em commits semanais.

> Este README consolida os requisitos levantados com a ONG e apresenta uma proposta inicial de organização. Tecnologias, prioridades e detalhes de implementação poderão ser definidos em conjunto com o orientador e a diretoria durante o desenvolvimento.

## Mockup da plataforma

![Mockup das páginas da plataforma web da APIA](mockup_ONG_APIA.jpg)

## Objetivos

- Apresentar a ONG, seu trabalho e formas de apoiar a causa animal.
- Divulgar animais disponíveis para adoção e facilitar o primeiro contato pelo WhatsApp.
- Manter o histórico de animais adotados em uma seção de finais felizes.
- Reunir informações sobre voluntariado, pontos de coleta, eventos e contatos oficiais.
- Permitir que a equipe gerencie o conteúdo pelo celular.

## Requisitos levantados

### Adoção de animais

- O botão **Quero Adotar** deve iniciar uma conversa com a ONG pelo WhatsApp, com uma mensagem automática preenchida.
- Antes do contato, o site deve informar os requisitos para adoção:
  - preferência por residência com pátio fechado;
  - assinatura obrigatória do Termo de Responsabilidade;
  - a pessoa adotante deve ser maior de idade.
- O perfil de cada animal deve apresentar, no mínimo, nome, foto, espécie e porte, além de informar expressamente se está castrado e vacinado.
- Animais adotados não devem simplesmente desaparecer do site: devem poder ser registrados na seção **Finais Felizes**, com fotos e informações da adoção.

### Como ajudar e apoio à ONG

- Divulgar as formas de contribuição e os pontos físicos de coleta de ração:
  - **Miagro Agrícola:** Rua Lauro Júlio Garcez, 327, Alto Pedregal.
  - **Mercado de Bone:** Avenida Afonso Pena, 223, Centro.
  - **Agropecuária Amor a Terra:** Avenida Benjamin Constant, 2291, Centro.
- Disponibilizar um formulário próprio para cadastro de pessoas interessadas em ser voluntárias.

### Painel administrativo

- O painel deve ser otimizado para smartphones, pois a administração do site será feita principalmente pelo celular.
- A equipe autorizada deverá conseguir gerenciar os conteúdos necessários, como animais, finais felizes e eventos, por uma interface simples e responsiva.

### Eventos e contatos oficiais

- Criar uma área para divulgar datas e informações de eventos e ações, como bazares solidários e feirinhas de adoção.
- Apresentar no rodapé as redes sociais oficiais:
  - **Instagram:** [@ongapiaoficial](https://www.instagram.com/ongapiaoficial/)
  - **Facebook:** APIA Proteção Animal (confirmar com a ONG o endereço oficial da página antes da publicação).

## Estrutura de páginas

1. **Início** — apresentação da APIA, chamadas para adoção e formas de ajudar, destaques de animais e próximos eventos.
2. **Sobre a APIA** — história, missão, atuação e informações do projeto de extensão.
3. **Quero Adotar** — lista e filtros de animais disponíveis, requisitos de adoção e acesso aos perfis.
4. **Perfil do animal** — fotos, nome, espécie, porte, informações de saúde (castrado e vacinado), descrição e botão de contato pelo WhatsApp.
5. **Finais Felizes** — galeria e registros de animais adotados.
6. **Como Ajudar** — formas de contribuição, pontos de coleta com endereço e formulário de voluntariado.
7. **Eventos e ações** — agenda e informações de bazares, feirinhas e outras atividades.
8. **Contato** — canais de contato e redes sociais oficiais.
9. **Acesso administrativo** — entrada restrita para a equipe responsável pelo gerenciamento do conteúdo.
10. **Painel administrativo** — área privada e adaptada para celular para cadastrar e atualizar animais, adoções, eventos e demais conteúdos definidos pela ONG.

## Organização técnica proposta

A separação abaixo é uma referência para organizar o repositório. A estrutura e as tecnologias podem ser ajustadas depois da validação do escopo.

```text
apia-plataforma/
├── frontend/                 # Interface pública e painel administrativo
│   ├── src/
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── pages/             # Páginas e rotas
│   │   ├── services/          # Comunicação com API e serviços externos
│   │   ├── styles/            # Estilos e identidade visual
│   │   └── assets/            # Imagens, ícones e outros arquivos
│   └── public/                # Arquivos estáticos públicos
├── backend/                   # API, regras de negócio e autenticação
│   ├── src/
│   │   ├── routes/            # Rotas da API
│   │   ├── controllers/       # Tratamento das requisições
│   │   ├── services/          # Regras de negócio
│   │   ├── models/            # Modelos de dados
│   │   └── middleware/        # Autenticação e validações
│   └── tests/                 # Testes do backend
├── database/                  # Modelo, migrações e dados de desenvolvimento
├── docs/                      # Requisitos, decisões e documentação do projeto
└── README.md
```

### Responsabilidades previstas

- **Front-end:** páginas públicas, formulários, navegação, acessibilidade e painel administrativo responsivo.
- **Back-end:** validação e processamento dos formulários, autenticação da equipe e operações de cadastro, consulta, atualização e arquivamento dos conteúdos.
- **Banco de dados:** persistência das informações de animais, adoções, voluntariado, eventos e usuários administrativos.
- **Imagens:** armazenamento de fotos dos animais e dos registros de finais felizes, com acesso controlado quando necessário.

### Entidades iniciais do banco de dados

- **Animal:** nome, espécie, porte, descrição, fotos, situação (disponível ou adotado), castrado, vacinado e datas relevantes.
- **Registro de adoção / final feliz:** animal relacionado, data e conteúdo autorizado para divulgação, incluindo fotos.
- **Voluntário:** dados de contato e informações fornecidas no formulário, armazenados somente pelo tempo e finalidade necessários.
- **Evento:** título, descrição, data, local, imagem e situação de publicação.
- **Usuário administrativo:** credenciais protegidas, identificação e permissões de acesso.

Os pontos de coleta podem começar como conteúdo institucional mantido pela equipe. Caso precisem ser editáveis pelo painel, poderão ser adicionados como uma entidade própria no banco de dados.

## Fluxo de adoção pelo WhatsApp

O botão de contato poderá abrir um endereço `wa.me` com o número oficial da ONG e uma mensagem inicial preenchida, identificando o animal de interesse. O número e o texto definitivo devem ser confirmados com a diretoria antes da publicação. A mensagem é apenas uma abertura da conversa: a equipe da ONG continuará responsável por orientar e avaliar a adoção.

## Publicação gratuita

Uma opção inicial, sem custo obrigatório, é manter o código no GitHub, publicar o front-end no **Cloudflare Pages** e usar o plano gratuito do **Supabase** para banco de dados PostgreSQL, autenticação, armazenamento de imagens e, se adequado, funções de backend. Essa combinação evita manter um servidor próprio ligado continuamente e oferece endereços gratuitos dos provedores com HTTPS.

### Caminho sugerido

1. Criar o repositório do projeto no GitHub e registrar as alterações em commits semanais.
2. Conectar o repositório ao Cloudflare Pages para publicar o front-end automaticamente a cada atualização da branch principal.
3. Criar um projeto no Supabase para banco de dados, autenticação do painel e armazenamento das imagens.
4. Configurar as variáveis de ambiente e as regras de acesso, sem colocar senhas, chaves privadas ou credenciais no repositório.
5. Validar formulários, permissões, links de contato e funcionamento em celular antes de divulgar o endereço público.

**Alternativa:** GitHub Pages pode hospedar gratuitamente um site estático. Como não executa um backend tradicional, formulários, autenticação e dados dinâmicos exigem um serviço externo, por exemplo o Supabase.

Os serviços citados oferecem planos gratuitos, mas podem ter limites de uso, armazenamento, tráfego, recursos ou inatividade, e suas condições podem mudar. Antes da publicação, a equipe deve conferir os limites e termos vigentes. O endereço fornecido pelo serviço é suficiente para começar; domínio próprio pode ter custo.

## Cuidados com dados e segurança

- Coletar nos formulários apenas os dados necessários para responder ao contato ou organizar o voluntariado.
- Informar a finalidade da coleta e restringir o acesso às informações pessoais à equipe autorizada.
- Proteger o painel administrativo com autenticação e permissões; nunca publicar credenciais ou chaves privadas no código.
- Publicar fotos e relatos de adoção somente com autorização das pessoas envolvidas.
- Confirmar com a ONG os contatos, o número de WhatsApp, os endereços e as informações dos animais antes da divulgação.

## Desenvolvimento e acompanhamento

O projeto será desenvolvido de forma incremental. Cada semana deverá registrar uma parte do trabalho por meio de commits claros, permitindo que o orientador acompanhe a evolução. Sugestões de etapas:

1. Validar requisitos, identidade visual e conteúdo com a ONG e o orientador.
2. Criar a estrutura inicial e as páginas institucionais.
3. Implementar listagem, perfis de animais e contato pelo WhatsApp.
4. Implementar finais felizes, pontos de coleta, voluntariado e eventos.
5. Implementar autenticação e painel administrativo adaptado para celular.
6. Testar, revisar acessibilidade e segurança, validar o conteúdo com a ONG e publicar.

## Identidade visual de referência

A proposta visual apresentada para o projeto utiliza tons de verde e branco, fotografias de animais e navegação simples. A interface deve manter boa legibilidade, funcionar em telas pequenas e priorizar o acesso às informações de adoção e apoio.
