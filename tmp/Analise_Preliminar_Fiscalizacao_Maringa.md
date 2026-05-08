# Análise Preliminar de Escopo — Sistema Gestor de Fiscalização

**Prefeitura Municipal de Maringá / PR**
Secretaria Municipal de Fazenda — Diretoria de Fiscalização

> Documento interno — base para estudo de viabilidade e precificação.
> Versão preliminar — sujeita a revisão após discovery técnico.

---

## 1. Sumário executivo

Trata-se de solicitação de orçamento (escopo preliminar, 21 páginas) para um **Sistema Gestor de Fiscalização** destinado à Diretoria de Fiscalização da Secretaria Municipal de Fazenda de Maringá/PR.

O objeto é a **cessão e direito de uso, implantação, manutenção e suporte técnico** de um sistema que funcionará em ambiente web com versão mobile exclusiva para os fiscais em campo, além de um módulo público para o contribuinte.

**Natureza da contratação:** o modelo de orçamento da página 21 indica **licenciamento de produto existente com customização** (licença mensal + implantação + 2.000 h de customização), e **não desenvolvimento sob demanda do zero**. Essa distinção é decisiva para a precificação.

---

## 2. Modelo de orçamento exigido (pág. 21)

| # | Descrição | Unidade | Quantidade |
|---|---|---|---|
| 1 | Licença de uso, suporte técnico e manutenção | Mensal | 12 |
| 2 | Implantação + instalação + migração de dados | UN | 1 |
| 3 | Integração com sistemas municipais via API | Mensal | 12 |
| 4 | Treinamento (até 100 usuários) | UN | 1 |
| 5 | Hora técnica de customização | UN | 2.000 |
| 6 | Hospedagem (data center) | Mensal | 12 |

---

## 3. Módulos identificados

O escopo descreve quatro módulos lógicos:

| # | Módulo | Público | Plataforma |
|---|---|---|---|
| A | **App de Ordens de Serviço Mobile** | Fiscal em campo | iOS + Android |
| B | **Sistema Administrador** | Gestores / supervisores da fiscalização | Web |
| C | **Módulo do Cidadão** | Contribuinte | Web + Mobile |
| D | **Módulo Autenticador** | Transversal | Web (OAuth 2.0 / ICP-Brasil / Gov.br) |

---

## 4. Matriz de requisitos — plataforma × complexidade × MoSCoW

**Legenda de complexidade:**
- 🟢 **Simples** — CRUD, consulta direta
- 🟡 **Média** — workflow, notificação, geração de documento
- 🟠 **Média-Alta**
- 🔴 **ALTA** — geo, offline, OCR, assinatura digital, integrações legadas, BI

**Legenda MoSCoW:**
- **Must** — obrigatório no MVP
- **Should** — importante, 2ª onda
- **Could** — desejável
- **Won't** — fora do escopo imediato

### 4.1 Módulo A — App Mobile do Fiscal (Android + iOS)

| Funcionalidade | Complexidade | MoSCoW |
|---|---|---|
| Autenticação integrada (OAuth municipal / Gov.br) | 🟡 Média | Must |
| Modo offline completo + fila de upload com reconciliação | 🔴 **ALTA** | Must |
| Listagem e execução de Ordens de Serviço | 🟢 Simples | Must |
| Mapa interativo com georreferenciamento de cadastros/imóveis | 🔴 **ALTA** | Must |
| Roteirização (melhor rota até o endereço) | 🔴 **ALTA** | Should |
| Checklist dinâmico / formulário parametrizável | 🟡 Média | Must |
| Captura de fotos, plantas arquitetônicas e anexos | 🟡 Média | Must |
| Emissão de documentos fiscais em campo (Notificação, AI) | 🟡 Média | Must |
| Sincronização bidirecional com resolução de conflitos | 🔴 **ALTA** | Must |
| Mensageria interna (fiscal ↔ administrativo, histórico) | 🟡 Média | Must |
| Listagem de legislações vigentes (consulta offline) | 🟢 Simples | Should |
| Rastreamento de fiscais em tempo real (localização) | 🔴 **ALTA** | Must |
| Gerenciamento de dados salvos no dispositivo | 🟡 Média | Must |

### 4.2 Módulo B — Sistema Administrador Web

| Funcionalidade | Complexidade | MoSCoW |
|---|---|---|
| Usuários, grupos, perfis e permissões granulares | 🟢 Simples | Must |
| Departamentos com privacidade/isolamento de dados | 🟡 Média | Must |
| Parametrização de modelos de documento (fórmulas, penalidade, reincidência) | 🔴 **ALTA** | Must |
| Parametrização de Ordens de Serviço (assuntos, checklists) | 🟡 Média | Must |
| Parametrização de formulários (lógica condicional, validações) | 🟡 Média | Must |
| Motor de workflow / rotinas automatizadas | 🔴 **ALTA** | Must |
| Fluxo completo de Documentos Fiscais (Notif., AI, Termo, Apreensão) | 🟡 Média | Must |
| Ciência de documentos por 4 canais (eletrônico, pessoal, AR, DO) | 🔴 **ALTA** | Must |
| Publicação em órgão oficial do município | 🔴 **ALTA** | Must |
| Criação de OS unitária, em massa e interdepartamental | 🟡 Média | Must |
| Solicitações e prorrogação de prazo com aprovação | 🟡 Média | Must |
| Auditoria interna (análises do fiscal → aprovação supervisor) | 🟡 Média | Must |
| Dashboard e indicadores (análises, OS, produtividade, mapas) | 🟠 Média-Alta | Must |
| Mapas de densidade (incidência por zona/rua) | 🔴 **ALTA** | Should |
| Módulo de Produtividade (meta, super-meta, bônus, afastamentos) | 🟡 Média | Must |
| Mensageria interna com anexos | 🟢 Simples | Must |
| Cadastros protegidos (bloqueio por débitos tributários) | 🟡 Média | Must |
| Reincidência automática com lógica tributária | 🔴 **ALTA** | Must |

### 4.3 Módulo C — Módulo do Cidadão (Portal + App mobile)

| Funcionalidade | Complexidade | MoSCoW |
|---|---|---|
| Autenticação do contribuinte (CPF/CNPJ + Gov.br + ICP-Brasil) | 🟡 Média | Must |
| Consulta de cadastros vinculados | 🟢 Simples | Must |
| Histórico e exibição de documentos | 🟢 Simples | Must |
| Consulta de débitos + emissão de guia (integra tributário) | 🔴 **ALTA** | Must |
| Emissão de carnê de IPTU (integra tributário) | 🔴 **ALTA** | Should |
| Ciência eletrônica de documentos (efeito jurídico) | 🟡 Média | Must |
| Atender notificações e informar regularização | 🟡 Média | Must |
| Solicitar vistoria e desconto com atuação | 🟡 Média | Must |
| Mensageria com a prefeitura | 🟢 Simples | Must |
| KYC digital (selfie + documento + comprovante de residência) | 🔴 **ALTA** | Must |
| Integração com NF-e e sistemas tributários | 🔴 **ALTA** | Must |
| Telefones de emergência | 🟢 Simples | Could |

### 4.4 Módulo D — Autenticador

| Funcionalidade | Complexidade | MoSCoW |
|---|---|---|
| OAuth 2.0 com autenticador municipal | 🟡 Média | Must |
| Certificado digital ICP-Brasil | 🔴 **ALTA** | Must |
| Login integrado Gov.br | 🔴 **ALTA** | Must |

---

## 5. Itens de alta complexidade (ofensores de prazo e custo)

1. **Geoprocessamento** (PostGIS + tiles + roteirização) — Módulos A e B
2. **Offline-first com sincronização bidirecional** — Módulo A (risco técnico alto, conflitos de estado)
3. **Motor de fórmulas parametrizáveis** para cálculo de penalidade (área, gravidade, tabelas, fração/multiplicador)
4. **Workflow engine** (rotinas automatizadas com gatilhos de data, evento e integração)
5. **Integrações com sistemas municipais** (tributário, cadastro imobiliário, NF-e, Diário Oficial, Correios/AR, Gov.br, ICP-Brasil)
6. **KYC do cidadão** (selfie + documento + comprovante — liveness opcional)
7. **Efeito jurídico da ciência eletrônica** — trilha de auditoria robusta, assinatura/timestamp, armazenamento imutável
8. **Publicação automatizada no Diário Oficial** do município
9. **Rastreamento em tempo real** dos fiscais (WebSocket + histórico geográfico)

---

## 6. Estratégia de repositórios — recomendação: monorepo

**Recomendação: monorepo** (Turborepo ou Nx). Justificativa:

- **Tipos e contratos compartilhados** entre 4 apps (admin web, portal cidadão web, app fiscal, app cidadão) e o backend — evita drift de contrato.
- **Modelo de domínio único** (OS, Documento Fiscal, Contribuinte, Imóvel) consumido por todos os clientes.
- **CI/CD unificado** com cache de build (redução de custo de pipeline).
- **Equipe de 6–10 pessoas:** o overhead de poly-repo não compensa.

### 6.1 Estrutura sugerida

```
repo/
├─ apps/
│  ├─ admin-web/          # Next.js (Módulo B)
│  ├─ citizen-web/        # Next.js (Módulo C web)
│  ├─ fiscal-mobile/      # React Native / Expo (Módulo A)
│  ├─ citizen-mobile/     # React Native / Expo (Módulo C mobile)
│  └─ api/                # NestJS (backend único)
├─ packages/
│  ├─ shared-types/       # DTOs, enums, contratos
│  ├─ ui-web/             # Design system web
│  ├─ ui-mobile/          # Design system mobile
│  ├─ sdk-api/            # Cliente HTTP tipado
│  ├─ domain/             # Regras de negócio (fórmulas, workflows)
│  └─ geo/                # Helpers de georreferenciamento
└─ infra/                 # IaC (Terraform/Pulumi)
```

### 6.2 Stack sugerida

| Camada | Tecnologias |
|---|---|
| **Backend** | NestJS + PostgreSQL + PostGIS + Redis + RabbitMQ/SQS + S3-compat |
| **Web** | Next.js 15 + Tailwind + shadcn/ui + TanStack Query |
| **Mobile** | React Native (Expo) + WatermelonDB ou SQLite (offline) + MapLibre/Mapbox |
| **Observabilidade** | OpenTelemetry + Grafana + Loki + Tempo |
| **Auth / IAM** | Keycloak (OAuth/OIDC/SAML) com federação Gov.br e ICP-Brasil |
| **Infra** | Terraform/Pulumi; Kubernetes ou ECS; CDN para portal do cidadão |

---

## 7. Requisitos não-funcionais (implícitos no edital)

| Aspecto | Observação |
|---|---|
| **LGPD** | Dados sensíveis do contribuinte (CPF, documentos, endereço, imagem facial) |
| **Auditoria completa** | Emissão/alteração de documento fiscal tem efeito legal — trilha imutável obrigatória |
| **Alta disponibilidade** | Sistema crítico para arrecadação municipal |
| **Acessibilidade** | Módulo do Cidadão exige WCAG 2.1 AA (eMAG) |
| **Hospedagem** | Definir: nuvem pública nacional (AWS/Azure/GCP-BR) vs. data center próprio da prefeitura |
| **Capacidade** | Treinamento para até 100 usuários, mas o portal do cidadão atende ~440k habitantes |

---

## 8. Matriz de riscos principais

| Risco | Impacto | Mitigação |
|---|---|---|
| Integração com sistema tributário legado (formato desconhecido) | **Alto** | Discovery dedicado antes de fechar valor |
| Integração com Diário Oficial de Maringá | Médio | Verificar se há API ou se é publicação por PDF/sistema próprio |
| Homologação específica (TCE-PR ou similar) | Médio | Revisar termo completo de referência |
| 2.000 h de customização insuficientes para o escopo | **Alto** | Negociar aditivo ou usar produto base mais completo |
| Efeito jurídico da ciência eletrônica — responsabilidade civil | **Alto** | Seguro técnico + parecer jurídico |
| Migração de dados legados | **Alto** | Orçar separadamente após auditoria do legado |

---

## 9. Decisões pendentes para fechamento do orçamento

Antes de consolidar o valor final nos seis itens da tabela da página 21, preciso das seguintes definições:

1. **Modelo comercial:** ofertar **produto próprio/white-label** (licenciamento + customização) ou **projeto custom** entregue como produto?
2. **Time disponível:** qual o tamanho e a senioridade da equipe prevista para o projeto? (afeta prazo e custo/hora)
3. **Hospedagem:** cloud pública nacional (AWS/Azure/GCP-BR) ou on-premise da prefeitura?
4. **Prazo do edital:** existe cronograma exigido com marcos e SLAs? O PDF recebido é o escopo de módulos — o termo de referência completo pode trazer prazos, multas e exigências de homologação.

### 9.1 Documentos adicionais que precisamos

- Edital completo / termo de referência (se existir em documento separado).
- Documentação dos sistemas a integrar: tributário, cadastro imobiliário, NF-e municipal, Diário Oficial.
- Faixa de valor de referência do município (se houve contratação similar anterior).
- Informações sobre a base legal municipal (Código Tributário, Código de Posturas, legislações de fiscalização).

---

## 10. Próximos passos

1. Validar as 4 decisões pendentes acima com o time comercial e técnico.
2. Solicitar à prefeitura (ou obter via portal de transparência) o termo de referência completo e documentação de APIs municipais.
3. Executar **discovery técnico** (1–2 semanas) para dimensionar integrações — principal vetor de risco de custo.
4. Fechar a memória de cálculo em horas por módulo e submeter ao modelo de precificação da página 21.
5. Revisar com jurídico os aspectos de efeito legal da ciência eletrônica e LGPD.

---

*Documento elaborado como base para estudo de viabilidade e precificação.*
