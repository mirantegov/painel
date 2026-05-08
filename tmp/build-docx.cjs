// Build DOCX: Análise preliminar — Sistema Gestor de Fiscalização (Maringá/PR)
const fs = require("fs");
const path = require("path");
const NODE_GLOBAL = require("child_process").execSync("npm root -g").toString().trim();
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageOrientation, PageBreak, Header, Footer, PageNumber
} = require(path.join(NODE_GLOBAL, "docx"));

// ---------- Helpers ----------
const GREY = "CCCCCC";
const HEADER_FILL = "1F3864";
const HEADER_TEXT = "FFFFFF";
const ZEBRA = "F2F2F2";
const ACCENT = "2E75B6";

const border = { style: BorderStyle.SINGLE, size: 1, color: GREY };
const cellBorders = { top: border, bottom: border, left: border, right: border };

function p(text, opts = {}) {
  const runs = Array.isArray(text)
    ? text
    : [new TextRun({ text, ...opts.run })];
  return new Paragraph({
    children: runs,
    alignment: opts.align,
    spacing: opts.spacing ?? { before: 60, after: 60 },
    heading: opts.heading,
    pageBreakBefore: opts.pageBreakBefore,
    numbering: opts.numbering,
    border: opts.border,
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, bold: true, color: HEADER_FILL })],
    spacing: { before: 360, after: 180 },
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, bold: true, color: HEADER_FILL })],
    spacing: { before: 280, after: 140 },
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: [new TextRun({ text, bold: true, color: ACCENT })],
    spacing: { before: 200, after: 100 },
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    children: Array.isArray(text)
      ? text
      : [new TextRun({ text })],
    spacing: { before: 40, after: 40 },
  });
}

function numbered(text) {
  return new Paragraph({
    numbering: { reference: "numbers", level: 0 },
    children: [new TextRun({ text })],
    spacing: { before: 40, after: 40 },
  });
}

function cell({ text, widthDxa, bold = false, color, fill, align, children }) {
  const runs = Array.isArray(text)
    ? text
    : [new TextRun({ text: text ?? "", bold, color })];
  return new TableCell({
    borders: cellBorders,
    width: { size: widthDxa, type: WidthType.DXA },
    shading: fill ? { fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 100, bottom: 100, left: 140, right: 140 },
    children:
      children ??
      [
        new Paragraph({
          alignment: align,
          children: runs,
          spacing: { before: 20, after: 20 },
        }),
      ],
  });
}

function headerRow(labels, widths) {
  return new TableRow({
    tableHeader: true,
    children: labels.map((label, i) =>
      cell({
        text: label,
        widthDxa: widths[i],
        bold: true,
        color: HEADER_TEXT,
        fill: HEADER_FILL,
      })
    ),
  });
}

function dataRow(cells, widths, zebra = false) {
  return new TableRow({
    children: cells.map((c, i) =>
      cell({
        text: c.text,
        widthDxa: widths[i],
        bold: c.bold,
        color: c.color,
        fill: zebra ? ZEBRA : undefined,
        align: c.align,
      })
    ),
  });
}

function buildTable({ widths, header, rows }) {
  const total = widths.reduce((a, b) => a + b, 0);
  const tableRows = [headerRow(header, widths)];
  rows.forEach((r, idx) => {
    tableRows.push(dataRow(r, widths, idx % 2 === 1));
  });
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: widths,
    rows: tableRows,
  });
}

// Complexity color coding
function complexityCell(level) {
  const map = {
    "Simples": { color: "2E7D32" },
    "Média": { color: "E65100" },
    "Média-Alta": { color: "C62828" },
    "ALTA": { color: "B71C1C", bold: true },
  };
  const style = map[level] ?? {};
  return { text: level, ...style };
}

function moscowCell(level) {
  const map = {
    "Must": { color: "B71C1C", bold: true },
    "Should": { color: "E65100" },
    "Could": { color: "2E7D32" },
    "Won't": { color: "616161" },
  };
  return { text: level, ...(map[level] ?? {}) };
}

// ---------- Content data ----------

// Tabela de orçamento da página 21
const orcamentoItems = [
  ["1", "Licença de uso, suporte técnico e manutenção", "Mensal", "12"],
  ["2", "Implantação + instalação + migração de dados", "UN", "1"],
  ["3", "Integração com sistemas municipais via API", "Mensal", "12"],
  ["4", "Treinamento (até 100 usuários)", "UN", "1"],
  ["5", "Hora técnica de customização", "UN", "2.000"],
  ["6", "Hospedagem (data center)", "Mensal", "12"],
];

// Módulos
const modulos = [
  ["A", "App de Ordens de Serviço Mobile", "Fiscal em campo", "iOS + Android"],
  ["B", "Sistema Administrador", "Gestores / supervisores da fiscalização", "Web"],
  ["C", "Módulo do Cidadão", "Contribuinte", "Web + Mobile"],
  ["D", "Módulo Autenticador", "Transversal", "Web (OAuth 2.0 / ICP-Brasil / Gov.br)"],
];

// Módulo A
const modA = [
  ["Autenticação integrada (OAuth municipal / Gov.br)", "Média", "Must"],
  ["Modo offline completo + fila de upload com reconciliação", "ALTA", "Must"],
  ["Listagem e execução de Ordens de Serviço", "Simples", "Must"],
  ["Mapa interativo com georreferenciamento de cadastros/imóveis", "ALTA", "Must"],
  ["Roteirização (melhor rota até o endereço)", "ALTA", "Should"],
  ["Checklist dinâmico / formulário parametrizável", "Média", "Must"],
  ["Captura de fotos, plantas arquitetônicas e anexos", "Média", "Must"],
  ["Emissão de documentos fiscais em campo (Notificação, AI)", "Média", "Must"],
  ["Sincronização bidirecional com resolução de conflitos", "ALTA", "Must"],
  ["Mensageria interna (fiscal ↔ administrativo, histórico)", "Média", "Must"],
  ["Listagem de legislações vigentes (consulta offline)", "Simples", "Should"],
  ["Rastreamento de fiscais em tempo real (localização)", "ALTA", "Must"],
  ["Gerenciamento de dados salvos no dispositivo", "Média", "Must"],
];

// Módulo B
const modB = [
  ["Usuários, grupos, perfis e permissões granulares", "Simples", "Must"],
  ["Departamentos com privacidade/isolamento de dados", "Média", "Must"],
  ["Parametrização de modelos de documento (fórmulas, penalidade, reincidência)", "ALTA", "Must"],
  ["Parametrização de Ordens de Serviço (assuntos, checklists)", "Média", "Must"],
  ["Parametrização de formulários (lógica condicional, validações)", "Média", "Must"],
  ["Motor de workflow / rotinas automatizadas", "ALTA", "Must"],
  ["Fluxo completo de Documentos Fiscais (Notif., AI, Termo, Apreensão)", "Média", "Must"],
  ["Ciência de documentos por 4 canais (eletrônico, pessoal, AR, DO)", "ALTA", "Must"],
  ["Publicação em órgão oficial do município", "ALTA", "Must"],
  ["Criação de OS unitária, em massa e interdepartamental", "Média", "Must"],
  ["Solicitações e prorrogação de prazo com aprovação", "Média", "Must"],
  ["Auditoria interna (análises do fiscal → aprovação supervisor)", "Média", "Must"],
  ["Dashboard e indicadores (análises, OS, produtividade, mapas)", "Média-Alta", "Must"],
  ["Mapas de densidade (incidência por zona/rua)", "ALTA", "Should"],
  ["Módulo de Produtividade (meta, super-meta, bônus, afastamentos)", "Média", "Must"],
  ["Mensageria interna com anexos", "Simples", "Must"],
  ["Cadastros protegidos (bloqueio por débitos tributários)", "Média", "Must"],
  ["Reincidência automática com lógica tributária", "ALTA", "Must"],
];

// Módulo C
const modC = [
  ["Autenticação do contribuinte (CPF/CNPJ + Gov.br + ICP-Brasil)", "Média", "Must"],
  ["Consulta de cadastros vinculados", "Simples", "Must"],
  ["Histórico e exibição de documentos", "Simples", "Must"],
  ["Consulta de débitos + emissão de guia (integra tributário)", "ALTA", "Must"],
  ["Emissão de carnê de IPTU (integra tributário)", "ALTA", "Should"],
  ["Ciência eletrônica de documentos (efeito jurídico)", "Média", "Must"],
  ["Atender notificações e informar regularização", "Média", "Must"],
  ["Solicitar vistoria e desconto com atuação", "Média", "Must"],
  ["Mensageria com a prefeitura", "Simples", "Must"],
  ["KYC digital (selfie + documento + comprovante de residência)", "ALTA", "Must"],
  ["Integração com NF-e e sistemas tributários", "ALTA", "Must"],
  ["Telefones de emergência", "Simples", "Could"],
];

// Módulo D
const modD = [
  ["OAuth 2.0 com autenticador municipal", "Média", "Must"],
  ["Certificado digital ICP-Brasil", "ALTA", "Must"],
  ["Login integrado Gov.br", "ALTA", "Must"],
];

// Alta complexidade
const altaComplexidade = [
  "Geoprocessamento (PostGIS + tiles + roteirização) — Módulos A e B",
  "Offline-first com sincronização bidirecional — Módulo A (risco técnico alto, conflitos de estado)",
  "Motor de fórmulas parametrizáveis para cálculo de penalidade (área, gravidade, tabelas, fração/multiplicador)",
  "Workflow engine (rotinas automatizadas com gatilhos de data, evento e integração)",
  "Integrações com sistemas municipais (tributário, cadastro imobiliário, NF-e, Diário Oficial, Correios/AR, Gov.br, ICP-Brasil)",
  "KYC do cidadão (selfie + documento + comprovante — liveness opcional)",
  "Efeito jurídico da ciência eletrônica — trilha de auditoria robusta, assinatura/timestamp, armazenamento imutável",
  "Publicação automatizada no Diário Oficial do município",
  "Rastreamento em tempo real dos fiscais (WebSocket + histórico geográfico)",
];

// Stack
const stack = [
  ["Backend", "NestJS + PostgreSQL + PostGIS + Redis + RabbitMQ/SQS + S3-compat"],
  ["Web", "Next.js 15 + Tailwind + shadcn/ui + TanStack Query"],
  ["Mobile", "React Native (Expo) + WatermelonDB ou SQLite (offline) + MapLibre/Mapbox"],
  ["Observabilidade", "OpenTelemetry + Grafana + Loki + Tempo"],
  ["Auth / IAM", "Keycloak (OAuth/OIDC/SAML) com federação Gov.br e ICP-Brasil"],
  ["Infra", "Terraform/Pulumi; Kubernetes ou ECS; CDN para portal do cidadão"],
];

// Não-funcionais
const nfrs = [
  ["LGPD", "Dados sensíveis do contribuinte (CPF, documentos, endereço, imagem facial)"],
  ["Auditoria completa", "Emissão/alteração de documento fiscal tem efeito legal — trilha imutável obrigatória"],
  ["Alta disponibilidade", "Sistema crítico para arrecadação municipal"],
  ["Acessibilidade", "Módulo do Cidadão exige WCAG 2.1 AA (eMAG)"],
  ["Hospedagem", "Definir: nuvem pública nacional (AWS/Azure/GCP-BR) vs. data center próprio da prefeitura"],
  ["Capacidade", "Treinamento para até 100 usuários, mas o portal do cidadão atende ~440k habitantes"],
];

// Riscos
const riscos = [
  ["Integração com sistema tributário legado (formato desconhecido)", "Alto", "Discovery dedicado antes de fechar valor"],
  ["Integração com Diário Oficial de Maringá", "Médio", "Verificar se há API ou se é publicação por PDF/sistema próprio"],
  ["Homologação específica (TCE-PR ou similar)", "Médio", "Revisar termo completo de referência"],
  ["2.000h de customização insuficientes para o escopo", "Alto", "Negociar aditivo ou usar produto base mais completo"],
  ["Efeito jurídico da ciência eletrônica — responsabilidade civil", "Alto", "Seguro técnico + parecer jurídico"],
  ["Migração de dados legados", "Alto", "Orçar separadamente após auditoria do legado"],
];

// ---------- Build document ----------
const WIDTH_CONTENT = 9360; // US Letter com 1" de margem

const children = [
  // Capa / título
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 120 },
    children: [
      new TextRun({ text: "ANÁLISE PRELIMINAR DE ESCOPO", bold: true, size: 36, color: HEADER_FILL }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 60 },
    children: [
      new TextRun({ text: "Sistema Gestor de Fiscalização", bold: true, size: 28 }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 60 },
    children: [
      new TextRun({ text: "Prefeitura Municipal de Maringá / PR", size: 24 }),
      new TextRun({ text: "   ·   ", size: 24, color: "BBBBBB" }),
      new TextRun({ text: "Secretaria Municipal de Fazenda — Diretoria de Fiscalização", size: 24 }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 480 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: ACCENT, space: 6 } },
    children: [
      new TextRun({ text: "Documento interno — base para estudo de viabilidade e precificação", italics: true, size: 20, color: "616161" }),
    ],
  }),

  // 1. Sumário executivo
  h1("1. Sumário executivo"),
  p("Trata-se de solicitação de orçamento (escopo preliminar, 21 páginas) para um Sistema Gestor de Fiscalização destinado à Diretoria de Fiscalização da Secretaria Municipal de Fazenda de Maringá/PR."),
  p("O objeto é a cessão e direito de uso, implantação, manutenção e suporte técnico de um sistema que funcionará em ambiente web com versão mobile exclusiva para os fiscais em campo, além de um módulo público para o contribuinte."),
  p([
    new TextRun({ text: "Natureza da contratação: ", bold: true }),
    new TextRun("o modelo de orçamento da página 21 indica "),
    new TextRun({ text: "licenciamento de produto existente com customização", bold: true }),
    new TextRun(" (licença mensal + implantação + 2.000 h de customização), e não desenvolvimento sob demanda do zero. Essa distinção é decisiva para a precificação."),
  ]),

  // 2. Modelo de orçamento exigido
  h1("2. Modelo de orçamento exigido (pág. 21)"),
  buildTable({
    widths: [720, 5400, 1440, 1800],
    header: ["#", "Descrição", "Unidade", "Quantidade"],
    rows: orcamentoItems.map((r) => [
      { text: r[0], bold: true, align: AlignmentType.CENTER },
      { text: r[1] },
      { text: r[2], align: AlignmentType.CENTER },
      { text: r[3], align: AlignmentType.CENTER },
    ]),
  }),

  // 3. Módulos identificados
  h1("3. Módulos identificados"),
  p("O escopo descreve quatro módulos lógicos:"),
  buildTable({
    widths: [720, 3500, 2700, 2440],
    header: ["#", "Módulo", "Público", "Plataforma"],
    rows: modulos.map((r) => [
      { text: r[0], bold: true, align: AlignmentType.CENTER },
      { text: r[1], bold: true },
      { text: r[2] },
      { text: r[3] },
    ]),
  }),

  // 4. Matriz de requisitos
  h1("4. Matriz de requisitos — plataforma × complexidade × MoSCoW"),
  p("Legenda de complexidade: Simples (CRUD, consulta direta) · Média (workflow, notificação, geração de documento) · Média-Alta · ALTA (geo, offline, OCR, assinatura digital, integrações legadas, BI)."),
  p("Legenda MoSCoW: Must (obrigatório no MVP) · Should (importante, 2ª onda) · Could (desejável) · Won't (fora do escopo imediato)."),

  h2("4.1 Módulo A — App Mobile do Fiscal (Android + iOS)"),
  buildTable({
    widths: [6000, 1680, 1680],
    header: ["Funcionalidade", "Complexidade", "MoSCoW"],
    rows: modA.map((r) => [
      { text: r[0] },
      complexityCell(r[1]),
      moscowCell(r[2]),
    ]),
  }),

  h2("4.2 Módulo B — Sistema Administrador Web"),
  buildTable({
    widths: [6000, 1680, 1680],
    header: ["Funcionalidade", "Complexidade", "MoSCoW"],
    rows: modB.map((r) => [
      { text: r[0] },
      complexityCell(r[1]),
      moscowCell(r[2]),
    ]),
  }),

  h2("4.3 Módulo C — Módulo do Cidadão (Portal + App mobile)"),
  buildTable({
    widths: [6000, 1680, 1680],
    header: ["Funcionalidade", "Complexidade", "MoSCoW"],
    rows: modC.map((r) => [
      { text: r[0] },
      complexityCell(r[1]),
      moscowCell(r[2]),
    ]),
  }),

  h2("4.4 Módulo D — Autenticador"),
  buildTable({
    widths: [6000, 1680, 1680],
    header: ["Funcionalidade", "Complexidade", "MoSCoW"],
    rows: modD.map((r) => [
      { text: r[0] },
      complexityCell(r[1]),
      moscowCell(r[2]),
    ]),
  }),

  // 5. Itens de alta complexidade
  h1("5. Itens de alta complexidade (ofensores de prazo e custo)"),
  ...altaComplexidade.map((t, i) => numbered(t)),

  // 6. Arquitetura e repositórios
  h1("6. Estratégia de repositórios — recomendação: monorepo"),
  p([
    new TextRun({ text: "Recomendação: monorepo ", bold: true }),
    new TextRun("(Turborepo ou Nx). Justificativa:"),
  ]),
  bullet("Tipos e contratos compartilhados entre 4 apps (admin web, portal cidadão web, app fiscal, app cidadão) e o backend — evita drift de contrato."),
  bullet("Modelo de domínio único (OS, Documento Fiscal, Contribuinte, Imóvel) consumido por todos os clientes."),
  bullet("CI/CD unificado com cache de build (redução de custo de pipeline)."),
  bullet("Equipe de 6–10 pessoas: o overhead de poly-repo não compensa."),

  h2("6.1 Estrutura sugerida"),
  p([new TextRun({ text:
`repo/
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
└─ infra/                 # IaC (Terraform/Pulumi)`,
    font: "Consolas", size: 18,
  })]),

  h2("6.2 Stack sugerida"),
  buildTable({
    widths: [2400, 6960],
    header: ["Camada", "Tecnologias"],
    rows: stack.map((r) => [
      { text: r[0], bold: true },
      { text: r[1] },
    ]),
  }),

  // 7. Não-funcionais
  h1("7. Requisitos não-funcionais (implícitos no edital)"),
  buildTable({
    widths: [2400, 6960],
    header: ["Aspecto", "Observação"],
    rows: nfrs.map((r) => [
      { text: r[0], bold: true },
      { text: r[1] },
    ]),
  }),

  // 8. Riscos
  h1("8. Matriz de riscos principais"),
  buildTable({
    widths: [4800, 1400, 3160],
    header: ["Risco", "Impacto", "Mitigação"],
    rows: riscos.map((r) => [
      { text: r[0] },
      { text: r[1], bold: true, align: AlignmentType.CENTER, color: r[1] === "Alto" ? "B71C1C" : "E65100" },
      { text: r[2] },
    ]),
  }),

  // 9. Decisões pendentes
  h1("9. Decisões pendentes para fechamento do orçamento"),
  p("Antes de consolidar o valor final nos seis itens da tabela da página 21, preciso das seguintes definições:"),
  numbered("Modelo comercial: ofertar produto próprio/white-label (licenciamento + customização) ou projeto custom entregue como produto?"),
  numbered("Time disponível: qual o tamanho e a senioridade da equipe prevista para o projeto? (afeta prazo e custo/hora)"),
  numbered("Hospedagem: cloud pública nacional (AWS/Azure/GCP-BR) ou on-premise da prefeitura?"),
  numbered("Prazo do edital: existe cronograma exigido com marcos e SLAs? O PDF recebido é o escopo de módulos — o termo de referência completo pode trazer prazos, multas e exigências de homologação."),

  h2("9.1 Documentos adicionais que precisamos"),
  bullet("Edital completo / termo de referência (se existir em documento separado)."),
  bullet("Documentação dos sistemas a integrar: tributário, cadastro imobiliário, NF-e municipal, Diário Oficial."),
  bullet("Faixa de valor de referência do município (se houve contratação similar anterior)."),
  bullet("Informações sobre a base legal municipal (Código Tributário, Código de Posturas, legislações de fiscalização)."),

  // 10. Próximos passos
  h1("10. Próximos passos"),
  numbered("Validar as 4 decisões pendentes acima com o time comercial e técnico."),
  numbered("Solicitar à prefeitura (ou obter via portal de transparência) o termo de referência completo e documentação de APIs municipais."),
  numbered("Executar discovery técnico (1–2 semanas) para dimensionar integrações — principal vetor de risco de custo."),
  numbered("Fechar a memória de cálculo em horas por módulo e submeter ao modelo de precificação da página 21."),
  numbered("Revisar com jurídico os aspectos de efeito legal da ciência eletrônica e LGPD."),

  // Rodapé de assinatura
  new Paragraph({
    spacing: { before: 480, after: 0 },
    border: { top: { style: BorderStyle.SINGLE, size: 6, color: GREY, space: 6 } },
    children: [
      new TextRun({ text: "Documento elaborado como base para estudo de viabilidade e precificação. ", size: 18, italics: true, color: "616161" }),
      new TextRun({ text: "Versão preliminar — sujeita a revisão após discovery técnico.", size: 18, italics: true, color: "616161" }),
    ],
  }),
];

const doc = new Document({
  creator: "Análise Técnica",
  title: "Análise Preliminar — Sistema Gestor de Fiscalização (Maringá/PR)",
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Arial", color: HEADER_FILL },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: HEADER_FILL },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: ACCENT },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ],
  },
  numbering: {
    config: [
      { reference: "bullets",
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
          { level: 1, format: LevelFormat.BULLET, text: "◦", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1440, hanging: 360 } } } },
        ],
      },
      { reference: "numbers",
        levels: [
          { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 }, // US Letter
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({ text: "Sistema Gestor de Fiscalização — Maringá/PR", size: 18, color: "616161" }),
              ],
              border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 4 } },
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "Análise preliminar · Página ", size: 18, color: "616161" }),
                new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "616161" }),
                new TextRun({ text: " de ", size: 18, color: "616161" }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: "616161" }),
              ],
            }),
          ],
        }),
      },
      children,
    },
  ],
});

const outPath = "/Users/code42/workspace/code/repos/dash/tmp/Analise_Preliminar_Fiscalizacao_Maringa.docx";
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outPath, buffer);
  console.log("WROTE", outPath, buffer.length, "bytes");
});
