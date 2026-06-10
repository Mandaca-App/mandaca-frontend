## Descrição
Este PR implementa a integração completa das entidades **Fale Conosco** (`contacts`) e **Tutoriais** (`api/tutoriais`) do backend na Central de Ajuda do aplicativo. Além disso, configura o ecossistema de testes unitários Jest, implementa os testes das novas telas e configura regras rígidas de cobertura de código no CI para novos arquivos.

## Principais Alterações

### 📱 Funcionalidades & Telas (Frontend)
- **Fale Conosco Dinâmico:** Substituição da ação de e-mail estática por um Bottom Sheet (Modal inferior) moderno. Esse modal lê dinamicamente as informações do endpoint `/contacts/` e disponibiliza botões para **Conversar no WhatsApp** (via `wa.me`), **Ligar por Telefone** (via `tel:`) e **Enviar E-mail** (via `mailto:`), todos utilizando as rotas nativas do sistema com fallback seguro.
- **Tela de Tutoriais:** Criação da tela `app/(help)/tutorials.tsx` integrada ao endpoint `/api/tutoriais`. Conta com filtragem por abas (Geral, Cardápio, Reservas, Relatórios), tratamento de estados (loading, lista vazia, erro) e abertura nativa dos tutoriais (links do YouTube/Web).
- **Roteamento:** Registro da rota `(help)/tutorials` no `app/_layout.tsx`.

### 🛠️ Camada de Integração
- **Tipos TypeScript:** Adicionados os tipos correspondentes às entidades em `types/contact.ts` e `types/tutorial.ts`.
- **Serviços de API:** Implementados os arquivos `services/contactService.ts` e `services/tutorialService.ts` utilizando Axios.

### 🧪 Testes Unitários & Linter
- **Mocks Globais:** Configuração dos mocks globais do Expo Router e da biblioteca `Linking` em `jest.setup.js`.
- **Suíte de Testes:** 
  - `help.test.tsx`: validação de abertura do modal com os canais dinâmicos do backend.
  - `tutorials.test.tsx`: validação de carregamento, filtros de categoria e clique assíncrono para abrir tutoriais.
- **TypeScript:** Instalada a dependência `@types/jest` para sanar erros de linter e tipagem na IDE.

### 🚀 CI/CD & Pipeline
- **Changed-Files Coverage:** Configuração do `.github/workflows/ci.yml` para baixar o histórico Git completo (`fetch-depth: 0`) e do `package.json` para definir uma **meta mínima de 60% de cobertura apenas sobre os arquivos alterados/novos do PR** (`--changedSince=origin/develop`).
  - *Benefício:* Garante que este PR passe, mas obriga os próximos desenvolvedores a criarem testes unitários para quaisquer novos arquivos/telas criados futuramente, sob o risco de derrubar o pipeline.

## Checklist
- [x] Criação de tipos TypeScript
- [x] Implementação de serviços Axios (contatos e tutoriais)
- [x] Criação da tela de Tutoriais `/tutorials` com abas e filtros
- [x] Implementação do Modal Dinâmico de contatos na tela `/help`
- [x] Criação e validação das suítes de testes unitários
- [x] Configuração da validação de cobertura (60%) no CI/CD
