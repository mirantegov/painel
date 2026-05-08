// Proposta Comercial — Sistema Gestor de Fiscalização (Maringá/PR)
const fs = require("fs");
const path = require("path");
const NODE_GLOBAL = require("child_process").execSync("npm root -g").toString().trim();
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageOrientation, PageBreak, Header, Footer, PageNumber,
  VerticalAlign,
} = require(path.join(NODE_GLOBAL, "docx"));

// ---------- Design tokens ----------
const COLOR_PRIMARY = "1F3864";
const COLOR_ACCENT = "2E75B6";
const COLOR_MUTED = "616161";
const COLOR_GREY_LIGHT = "CCCCCC";
const COLOR_ZEBRA = "F2F2F2";
const COLOR_HEADER_ROW = "1F3864";
const COLOR_WHITE = "FFFFFF";
const COLOR_HIGHLIGHT = "FFF3CD";
const COLOR_TOTAL = "D5E8F0";

const border = { style: BorderStyle.SINGLE, size: 1, color: COLOR_GREY_LIGHT };
const cellBorders = { top: border, bottom: border, left: border, right: border };

// ---------- Helpers ----------
function p(text, opts = {}) {
  const runs = Array.isArray(text) ? text : [new TextRun({ text, ...(opts.run || {}) })];
  return new Paragraph({
    children: runs,
    alignment: opts.align,
    spacing: opts.spacing ?? { before: 80, after: 80, line: 300 },
    heading: opts.heading,
    pageBreakBefore: opts.pageBreakBefore,
    numbering: opts.numbering,
    border: opts.border,
    indent: opts.indent,
  });
}

function h1(text, pageBreak = false) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    pageBreakBefore: pageBreak,
    children: [new TextRun({ text, bold: true, color: COLOR_PRIMARY, size: 32 })],
    spacing: { before: 400, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: COLOR_ACCENT, space: 4 } },
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, bold: true, color: COLOR_PRIMARY, size: 26 })],
    spacing: { before: 280, after: 120 },
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: [new TextRun({ text, bold: true, color: COLOR_ACCENT, size: 22 })],
    spacing: { before: 200, after: 80 },
  });
}

function bullet(text, level = 0, runs) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    children: runs || (Array.isArray(text) ? text : [new TextRun({ text })]),
    spacing: { before: 40, after: 40, line: 280 },
  });
}

function numbered(text, ref = "numbers") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    children: Array.isArray(text) ? text : [new TextRun({ text })],
    spacing: { before: 40, after: 40, line: 280 },
  });
}

function spacer(height = 200) {
  return new Paragraph({ children: [new TextRun("")], spacing: { before: 0, after: height } });
}

function cell({ text, widthDxa, bold = false, color, fill, align, size, children, vAlign }) {
  const runs = Array.isArray(text)
    ? text
    : [new TextRun({ text: text ?? "", bold, color, size })];
  return new TableCell({
    borders: cellBorders,
    width: { size: widthDxa, type: WidthType.DXA },
    shading: fill ? { fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 120, bottom: 120, left: 160, right: 160 },
    verticalAlign: vAlign,
    children:
      children ?? [
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
        color: COLOR_WHITE,
        fill: COLOR_HEADER_ROW,
        align: AlignmentType.CENTER,
        vAlign: VerticalAlign.CENTER,
      })
    ),
  });
}

function dataRow(cells, widths, zebra = false, fill) {
  return new TableRow({
    children: cells.map((c, i) =>
      cell({
        text: c.text,
        widthDxa: widths[i],
        bold: c.bold,
        color: c.color,
        fill: fill ?? (zebra ? COLOR_ZEBRA : undefined),
        align: c.align,
        vAlign: VerticalAlign.CENTER,
      })
    ),
  });
}

function buildTable({ widths, header, rows, totalRow }) {
  const total = widths.reduce((a, b) => a + b, 0);
  const tableRows = [headerRow(header, widths)];
  rows.forEach((r, idx) => tableRows.push(dataRow(r, widths, idx % 2 === 1)));
  if (totalRow) {
    tableRows.push(
      new TableRow({
        children: totalRow.map((c, i) =>
          cell({
            text: c.text,
            widthDxa: widths[i],
            bold: true,
            color: c.color ?? COLOR_PRIMARY,
            fill: COLOR_TOTAL,
            align: c.align,
            vAlign: VerticalAlign.CENTER,
            size: c.size,
          })
        ),
      })
    );
  }
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: widths,
    rows: tableRows,
  });
}

function money(v) {
  return "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ---------- Pricing data ----------
const pricing = [
  { n: 1, desc: "Licença de uso, suporte técnico e manutenção", un: "Mensal", qty: 12, unit: 30000 },
  { n: 2, desc: "Implantação de software, instalação e importação/migração de dados", un: "UN", qty: 1, unit: 200000 },
  { n: 3, desc: "Integração com sistemas municipais utilizando API", un: "Mensal", qty: 12, unit: 8000 },
  { n: 4, desc: "Treinamento de capacitação de usuários (até 100 usuários)", un: "UN", qty: 1, unit: 44000 },
  { n: 5, desc: "Hora técnica de customização de software", un: "UN", qty: 2000, unit: 430 },
  { n: 6, desc: "Hospedagem (locação de data center)", un: "Mensal", qty: 12, unit: 20000 },
];
const TOTAL = pricing.reduce((a, b) => a + b.qty * b.unit, 0);

// ---------- Build ----------
const WIDTH_CONTENT = 9360; // US Letter, 1" margin

const children = [
  // ============ CAPA ============
  spacer(1200),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 120 },
    children: [new TextRun({ text: "PROPOSTA COMERCIAL", bold: true, size: 52, color: COLOR_PRIMARY })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 480 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 18, color: COLOR_ACCENT, space: 12 } },
    children: [new TextRun({ text: "Sistema Gestor de Fiscalização", size: 36, color: COLOR_MUTED })],
  }),
  spacer(400),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 180 },
    children: [new TextRun({ text: "Apresentada à", size: 22, color: COLOR_MUTED, italics: true })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 60 },
    children: [new TextRun({ text: "PREFEITURA MUNICIPAL DE MARINGÁ", bold: true, size: 30, color: COLOR_PRIMARY })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 60 },
    children: [new TextRun({ text: "Secretaria Municipal de Fazenda", size: 24 })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 120 },
    children: [new TextRun({ text: "Diretoria de Fiscalização", size: 24 })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 600 },
    children: [new TextRun({ text: "CNPJ 76.282.656/0001-06", size: 20, color: COLOR_MUTED })],
  }),
  spacer(800),
  // Valor em destaque na capa
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text: "VALOR GLOBAL DA PROPOSTA", size: 20, color: COLOR_MUTED })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 80 },
    children: [new TextRun({ text: money(TOTAL), bold: true, size: 48, color: COLOR_PRIMARY })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 600 },
    children: [new TextRun({ text: "(Um milhão e oitocentos mil reais)", size: 20, italics: true, color: COLOR_MUTED })],
  }),
  spacer(600),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 60 },
    children: [new TextRun({ text: "Maringá, 17 de abril de 2026", size: 22 })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 0 },
    children: [new TextRun({ text: "Validade: 60 (sessenta) dias corridos", size: 20, italics: true, color: COLOR_MUTED })],
  }),

  // ============ 1. IDENTIFICAÇÃO DAS PARTES ============
  h1("1. Identificação das partes", true),

  h3("1.1 Proponente (Contratada)"),
  buildTable({
    widths: [2400, 6960],
    header: ["Campo", "Dados"],
    rows: [
      [{ text: "Razão Social", bold: true }, { text: "[RAZÃO SOCIAL DA EMPRESA]" }],
      [{ text: "Nome Fantasia", bold: true }, { text: "[NOME FANTASIA]" }],
      [{ text: "CNPJ", bold: true }, { text: "[00.000.000/0001-00]" }],
      [{ text: "Inscrição Municipal", bold: true }, { text: "[XXXXXXX]" }],
      [{ text: "Endereço", bold: true }, { text: "[Endereço completo]" }],
      [{ text: "Telefone", bold: true }, { text: "[(00) 0000-0000]" }],
      [{ text: "E-mail comercial", bold: true }, { text: "[comercial@empresa.com.br]" }],
      [{ text: "Representante legal", bold: true }, { text: "[Nome do Representante]" }],
      [{ text: "Cargo", bold: true }, { text: "[Sócio-Administrador / Diretor]" }],
    ],
  }),

  h3("1.2 Contratante (Destinatária)"),
  buildTable({
    widths: [2400, 6960],
    header: ["Campo", "Dados"],
    rows: [
      [{ text: "Órgão", bold: true }, { text: "Prefeitura Municipal de Maringá" }],
      [{ text: "Secretaria", bold: true }, { text: "Secretaria Municipal de Fazenda" }],
      [{ text: "Diretoria", bold: true }, { text: "Diretoria de Fiscalização" }],
      [{ text: "CNPJ", bold: true }, { text: "76.282.656/0001-06" }],
      [{ text: "Endereço", bold: true }, { text: "Av. XV de Novembro, nº 701 — Maringá/PR" }],
    ],
  }),

  // ============ 2. OBJETO ============
  h1("2. Objeto da proposta"),
  p("A presente proposta comercial tem como objeto a cessão e direito de uso, implantação, manutenção e suporte técnico do SISTEMA GESTOR DE FISCALIZAÇÃO, sistema de funcionamento online em ambiente web, a ser utilizado pelas diversas secretarias da Prefeitura Municipal de Maringá — que terão seus departamentos específicos — além de sua versão mobile, exclusiva aos agentes fiscalizadores de campo."),
  p("A solução proposta permite a criação e parametrização de ordens de serviço, documentos fiscais e usuários; emissão, distribuição e manutenção de ordens de serviço e documentos fiscais; geração de relatórios com base em indicadores; controle de serviços executados através de pontuação; consulta a informações e execução de ordens de serviço através do módulo mobile; canal de atendimento exclusivo ao cidadão com envio de comunicação eletrônica (e-mail ou mensagem de texto) sobre a emissão de documento e situação do atendimento; e integração com sistemas municipais para rotinas automatizadas."),

  // ============ 3. ESCOPO TÉCNICO ============
  h1("3. Escopo técnico da solução"),
  p("A solução proposta contempla 4 (quatro) módulos lógicos, detalhados a seguir:"),

  h2("3.1 Aplicativo Mobile do Fiscal (Android e iOS)"),
  p("Aplicativo exclusivo aos agentes fiscalizadores de campo, que elimina o uso de papel nas atividades de fiscalização e vistorias. Desenvolvido nativamente para Android e iOS."),
  bullet("Autenticação integrada ao sistema autenticador do município"),
  bullet("Listagem e execução de ordens de serviço com indicação de status"),
  bullet("Mapa interativo com georreferenciamento dos cadastros municipais, processos e documentos"),
  bullet("Roteirização: traça a melhor rota até o endereço da ordem de serviço"),
  bullet("Checklist dinâmico parametrizável, com respostas sob forma de questionamento"),
  bullet("Captura e anexo de imagens, fotos e plantas arquitetônicas"),
  bullet("Emissão de documentos fiscais em campo (notificações e autos de infração)"),
  bullet("Operação offline completa — sincronização quando houver conexão com a internet"),
  bullet("Sincronização bidirecional com resolução de conflitos"),
  bullet("Mensageria interna entre fiscais e administrativos com histórico completo"),
  bullet("Consulta a legislações vigentes do município"),
  bullet("Rastreamento em tempo real da localização dos fiscais para disponibilização ao painel administrativo"),

  h2("3.2 Sistema Administrador Web"),
  p("Ambiente web para gestores, supervisores e equipe administrativa da fiscalização, com gerenciamento e manutenção das ordens de serviço, notificações, atuações, parametrização do sistema e controle de usuários."),
  bullet("Gestão de usuários, grupos, perfis e permissões granulares"),
  bullet("Departamentos com autonomia e privacidade sobre seus dados"),
  bullet("Parametrização completa de modelos de documentos (notificação, auto de infração, termo, termo de apreensão, auto e notificação) com fórmulas de cálculo, penalidades e regras de reincidência"),
  bullet("Parametrização de ordens de serviço, assuntos e checklists"),
  bullet("Motor de workflow com rotinas automatizadas: distribuição automática, atuação automática, verificação de alvará, aviso de IPTU, cálculo de produtividade"),
  bullet("Ciência de documentos fiscais por 4 canais: meio eletrônico (módulo cidadão), entrega pessoal, aviso de recebimento (AR Correios) e publicação em órgão oficial"),
  bullet("Criação de ordens de serviço de forma unitária, em massa ou interdepartamental"),
  bullet("Gestão de solicitações e prorrogação de prazos com aprovação"),
  bullet("Auditoria interna das análises dos fiscais com aprovação por supervisores"),
  bullet("Dashboard e indicadores com análises de ordens de serviço, documentos e produtividade"),
  bullet("Mapas de densidade por incidência de documentos, zona ou rua"),
  bullet("Módulo de produtividade com metas, super-metas, bônus, afastamentos e pontos avulsos"),
  bullet("Cadastros protegidos com integração ao sistema tributário municipal"),

  h2("3.3 Módulo do Cidadão (Portal Web + App Mobile)"),
  p("Canal de acesso direto do contribuinte à prefeitura, promovendo transparência e confiabilidade, permitindo ao cidadão receber notificações e alertas personalizados sobre ações fiscais e realizar diversas ações."),
  bullet("Autenticação do contribuinte via CPF/CNPJ, integrada ao Gov.br e com suporte a certificado digital ICP-Brasil"),
  bullet("Consulta aos cadastros vinculados ao contribuinte"),
  bullet("Histórico e exibição de documentos fiscais"),
  bullet("Consulta a débitos e emissão de guia para pagamento (integração com sistema tributário)"),
  bullet("Emissão de carnê de IPTU via integração"),
  bullet("Ciência eletrônica de documentos fiscais com efeito jurídico"),
  bullet("Atendimento de notificações e comunicação de regularização"),
  bullet("Solicitação de vistoria e de desconto com atuação"),
  bullet("Mensageria com a prefeitura (recebidas, enviadas e histórico)"),
  bullet("Validação de conta digital por meio de upload de documentos — envio de selfie, documento de identidade e comprovante de residência"),
  bullet("Integração com Nota Fiscal Eletrônica e demais sistemas tributários"),

  h2("3.4 Módulo Autenticador"),
  p("Módulo transversal para autenticação unificada dos usuários (fiscais, servidores e cidadãos)."),
  bullet("Integração com sistema autenticador municipal via OAuth 2.0"),
  bullet("Autenticação com certificado digital padrão ICP-Brasil"),
  bullet("Login integrado à plataforma Gov.br"),

  // ============ 4. TABELA DE PREÇOS ============
  h1("4. Tabela de preços", true),
  p("Seguindo rigorosamente o modelo de orçamento constante na página 21 do documento de especificações fornecido pela Diretoria de Fiscalização:"),
  spacer(120),

  buildTable({
    widths: [500, 4260, 1000, 900, 1350, 1350],
    header: ["Nº", "Descrição", "Unidade", "Qtd.", "Valor Unitário", "Valor Total"],
    rows: pricing.map((r) => [
      { text: String(r.n), bold: true, align: AlignmentType.CENTER },
      { text: r.desc },
      { text: r.un, align: AlignmentType.CENTER },
      { text: r.qty.toLocaleString("pt-BR"), align: AlignmentType.CENTER },
      { text: money(r.unit), align: AlignmentType.RIGHT },
      { text: money(r.qty * r.unit), align: AlignmentType.RIGHT, bold: true },
    ]),
    totalRow: [
      { text: "", align: AlignmentType.CENTER },
      { text: "", align: AlignmentType.CENTER },
      { text: "", align: AlignmentType.CENTER },
      { text: "", align: AlignmentType.CENTER },
      { text: "VALOR TOTAL", align: AlignmentType.RIGHT, size: 22 },
      { text: money(TOTAL), align: AlignmentType.RIGHT, size: 24 },
    ],
  }),

  spacer(160),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 120 },
    children: [
      new TextRun({ text: "Valor por extenso: ", bold: true, size: 22 }),
      new TextRun({ text: "Um milhão e oitocentos mil reais.", italics: true, size: 22 }),
    ],
    shading: { fill: COLOR_HIGHLIGHT, type: ShadingType.CLEAR },
    border: {
      top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_ACCENT, space: 6 },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_ACCENT, space: 6 },
    },
  }),

  // ============ 5. DETALHAMENTO POR ITEM ============
  h1("5. Detalhamento dos itens", true),

  h2("Item 1 — Licença de uso, suporte técnico e manutenção"),
  p([
    new TextRun({ text: "Valor unitário mensal: ", bold: true }),
    new TextRun(money(30000)),
    new TextRun({ text: "    Quantidade: ", bold: true }),
    new TextRun("12 meses    "),
    new TextRun({ text: "Valor total: ", bold: true }),
    new TextRun({ text: money(360000), bold: true, color: COLOR_PRIMARY }),
  ]),
  p("Contempla:"),
  bullet("Direito de uso da plataforma completa: Sistema Administrador Web, Aplicativo Mobile do Fiscal (iOS e Android), Módulo do Cidadão (web e mobile) e Módulo Autenticador"),
  bullet("Número ilimitado de usuários internos (fiscais, gestores e servidores da prefeitura)"),
  bullet("Acesso ilimitado de cidadãos ao módulo público"),
  bullet("Suporte técnico em dias úteis das 08h às 18h, com SLA de 4 horas para incidentes críticos e 24 horas para incidentes de baixa prioridade"),
  bullet("Canal de atendimento via portal, e-mail e telefone"),
  bullet("Manutenção corretiva das funcionalidades entregues"),
  bullet("Atualizações de versão do produto base sem custo adicional"),
  bullet("Ajustes e correções de segurança (patches)"),

  h2("Item 2 — Implantação, instalação e migração de dados"),
  p([
    new TextRun({ text: "Valor unitário: ", bold: true }),
    new TextRun(money(200000)),
    new TextRun({ text: "    Quantidade: ", bold: true }),
    new TextRun("1 (único)    "),
    new TextRun({ text: "Valor total: ", bold: true }),
    new TextRun({ text: money(200000), bold: true, color: COLOR_PRIMARY }),
  ]),
  p("Contempla:"),
  bullet("Instalação e configuração do ambiente de produção e homologação"),
  bullet("Parametrização inicial do sistema — modelos de documentos fiscais (notificação, auto de infração, termo, apreensão), fluxos de trabalho, perfis de usuário, departamentos e assuntos de ordens de serviço"),
  bullet("Importação e migração de dados cadastrais da base legada — imóveis, contribuintes, histórico de ordens de serviço e documentos fiscais em andamento"),
  bullet("Levantamento técnico de APIs e documentação dos sistemas municipais"),
  bullet("Testes integrados com as equipes da Diretoria de Fiscalização e da Secretaria Municipal de Fazenda"),
  bullet("Homologação formal pela equipe da prefeitura"),
  bullet("Go-live acompanhado e estabilização em produção (primeiros 30 dias)"),

  h2("Item 3 — Integração com sistemas municipais via API"),
  p([
    new TextRun({ text: "Valor unitário mensal: ", bold: true }),
    new TextRun(money(8000)),
    new TextRun({ text: "    Quantidade: ", bold: true }),
    new TextRun("12 meses    "),
    new TextRun({ text: "Valor total: ", bold: true }),
    new TextRun({ text: money(96000), bold: true, color: COLOR_PRIMARY }),
  ]),
  p("Contempla manutenção, monitoramento e disponibilidade das integrações ativas:"),
  bullet("Sistema tributário municipal (consulta de débitos, emissão de guia, bloqueio por inadimplência)"),
  bullet("Cadastro imobiliário municipal (dados de imóveis, proprietários e geolocalização)"),
  bullet("Sistema de Nota Fiscal Eletrônica (NF-e) municipal"),
  bullet("Diário Oficial do Município (publicação de documentos fiscais)"),
  bullet("Serviço dos Correios para rastreamento de Aviso de Recebimento (AR)"),
  bullet("Plataforma Gov.br (autenticação federada)"),
  bullet("Módulo autenticador municipal (OAuth 2.0 / ICP-Brasil)"),
  p([new TextRun({ text: "Observação: ", bold: true }), new TextRun("integrações com sistemas não previstos no escopo preliminar serão avaliadas tecnicamente e, quando aplicável, consumirão horas do Item 5.")]),

  h2("Item 4 — Treinamento de capacitação de usuários"),
  p([
    new TextRun({ text: "Valor unitário: ", bold: true }),
    new TextRun(money(44000)),
    new TextRun({ text: "    Quantidade: ", bold: true }),
    new TextRun("1 (único)    "),
    new TextRun({ text: "Valor total: ", bold: true }),
    new TextRun({ text: money(44000), bold: true, color: COLOR_PRIMARY }),
  ]),
  p("Contempla treinamento presencial ou remoto para até 100 (cem) usuários, organizado em turmas por perfil:"),
  bullet("Fiscais de campo — uso completo do aplicativo mobile, execução de ordens de serviço, emissão de documentos fiscais, operação offline e sincronização"),
  bullet("Gestores e supervisores — sistema administrador, gestão de ordens de serviço, auditoria interna, indicadores e dashboards"),
  bullet("Equipe de TI da prefeitura — administração do sistema, parametrização, integração e manutenção de regras de negócio"),
  bullet("Atendentes do módulo cidadão — suporte ao contribuinte, validação de conta e mensageria"),
  bullet("Material didático digital personalizado"),
  bullet("Gravação das sessões para consulta posterior"),
  bullet("Certificado de conclusão por participante"),

  h2("Item 5 — Hora técnica de customização de software"),
  p([
    new TextRun({ text: "Valor unitário (hora): ", bold: true }),
    new TextRun(money(430)),
    new TextRun({ text: "    Quantidade: ", bold: true }),
    new TextRun("2.000 horas    "),
    new TextRun({ text: "Valor total: ", bold: true }),
    new TextRun({ text: money(860000), bold: true, color: COLOR_PRIMARY }),
  ]),
  p("Contempla banco de 2.000 (duas mil) horas técnicas para customizações específicas à realidade do município, destinadas a:"),
  bullet("Desenvolvimento de novos modelos de documentos fiscais específicos à legislação de Maringá"),
  bullet("Ajustes em regras de negócio, fórmulas de cálculo de penalidades e multiplicadores conforme o Código Tributário Municipal"),
  bullet("Criação de relatórios e dashboards customizados sob demanda"),
  bullet("Desenvolvimento de checklists e formulários específicos por tipo de fiscalização"),
  bullet("Parametrizações que demandem desenvolvimento (além do que é coberto pelo painel administrativo)"),
  bullet("Integrações com sistemas municipais não previstos no Item 3"),
  p([new TextRun({ text: "Condição de consumo: ", bold: true }), new TextRun("horas consumidas conforme demanda, mediante aprovação prévia de ordem de serviço pela Diretoria de Fiscalização, com medição quinzenal.")]),

  h2("Item 6 — Hospedagem (locação de data center)"),
  p([
    new TextRun({ text: "Valor unitário mensal: ", bold: true }),
    new TextRun(money(20000)),
    new TextRun({ text: "    Quantidade: ", bold: true }),
    new TextRun("12 meses    "),
    new TextRun({ text: "Valor total: ", bold: true }),
    new TextRun({ text: money(240000), bold: true, color: COLOR_PRIMARY }),
  ]),
  p("Contempla infraestrutura em nuvem de alta disponibilidade, com data center em território nacional:"),
  bullet("Servidores de aplicação (API backend, aplicações web e serviços assíncronos)"),
  bullet("Banco de dados PostgreSQL com extensão PostGIS para funcionalidades de georreferenciamento"),
  bullet("Armazenamento de objetos (imagens de vistoria, plantas arquitetônicas, documentos PDF)"),
  bullet("CDN (Content Delivery Network) para o portal do cidadão, garantindo performance em toda a região"),
  bullet("Ambientes segregados: produção, homologação e desenvolvimento"),
  bullet("Backups automatizados diários com retenção de 30 dias e teste periódico de restauração"),
  bullet("Monitoramento proativo 24/7 com alertas automáticos"),
  bullet("Certificado SSL/TLS para todos os domínios"),
  bullet("Proteção contra ataques DDoS e WAF (Web Application Firewall)"),
  bullet("Conformidade com LGPD — dados armazenados em território brasileiro"),

  // ============ 6. MEMÓRIA DE CÁLCULO ============
  h1("6. Memória de cálculo — distribuição do investimento", true),
  p("Distribuição percentual do valor global por item contratado:"),
  spacer(120),

  buildTable({
    widths: [500, 5300, 1780, 1780],
    header: ["Nº", "Item", "Valor total", "% do total"],
    rows: pricing.map((r) => {
      const total = r.qty * r.unit;
      const pct = ((total / TOTAL) * 100).toFixed(1) + "%";
      return [
        { text: String(r.n), bold: true, align: AlignmentType.CENTER },
        { text: r.desc },
        { text: money(total), align: AlignmentType.RIGHT },
        { text: pct, align: AlignmentType.CENTER, bold: true, color: COLOR_ACCENT },
      ];
    }),
    totalRow: [
      { text: "", align: AlignmentType.CENTER },
      { text: "TOTAL", align: AlignmentType.RIGHT },
      { text: money(TOTAL), align: AlignmentType.RIGHT },
      { text: "100,0%", align: AlignmentType.CENTER },
    ],
  }),

  spacer(240),
  p("A composição reflete:"),
  bullet("Maior peso no Item 5 (customização) devido ao volume de funcionalidades específicas ao município e à alta complexidade técnica (georreferenciamento, operação offline, motor de workflow e integrações com sistemas legados)"),
  bullet("Peso equilibrado entre licenciamento (Item 1) e hospedagem (Item 6), refletindo o modelo SaaS proposto com infraestrutura robusta"),
  bullet("Implantação (Item 2) dimensionada para migração de dados e parametrização completa dos módulos"),
  bullet("Integrações (Item 3) precificadas de forma recorrente, considerando manutenção contínua e evolução dos sistemas municipais"),

  // ============ 7. METODOLOGIA E CRONOGRAMA ============
  h1("7. Metodologia de implantação e cronograma"),
  p("A implantação do Sistema Gestor de Fiscalização será conduzida em 5 (cinco) fases, com duração total estimada de 6 (seis) meses até o go-live completo:"),
  spacer(120),

  buildTable({
    widths: [600, 2200, 1400, 5160],
    header: ["Fase", "Nome", "Duração", "Principais entregas"],
    rows: [
      [
        { text: "1", bold: true, align: AlignmentType.CENTER },
        { text: "Discovery e Planejamento", bold: true },
        { text: "4 semanas", align: AlignmentType.CENTER },
        { text: "Levantamento detalhado de requisitos, análise das APIs dos sistemas municipais, plano de migração de dados, plano de projeto e cronograma detalhado" },
      ],
      [
        { text: "2", bold: true, align: AlignmentType.CENTER },
        { text: "Parametrização e Customização", bold: true },
        { text: "10 semanas", align: AlignmentType.CENTER },
        { text: "Parametrização do sistema, customizações específicas ao município, configuração dos modelos de documentos fiscais, fluxos e regras de negócio" },
      ],
      [
        { text: "3", bold: true, align: AlignmentType.CENTER },
        { text: "Integrações", bold: true },
        { text: "6 semanas", align: AlignmentType.CENTER },
        { text: "Desenvolvimento e homologação das integrações com sistemas tributário, cadastro imobiliário, NF-e, Diário Oficial, Correios e Gov.br" },
      ],
      [
        { text: "4", bold: true, align: AlignmentType.CENTER },
        { text: "Migração e Homologação", bold: true },
        { text: "4 semanas", align: AlignmentType.CENTER },
        { text: "Migração de dados legados, testes integrados com as equipes da prefeitura, treinamento dos usuários e homologação formal" },
      ],
      [
        { text: "5", bold: true, align: AlignmentType.CENTER },
        { text: "Go-live e Estabilização", bold: true },
        { text: "4 semanas", align: AlignmentType.CENTER },
        { text: "Entrada em produção com acompanhamento presencial da equipe técnica, ajustes finos, monitoramento intensivo e transição para operação regular" },
      ],
    ],
  }),

  // ============ 8. PREMISSAS E CONDICIONANTES ============
  h1("8. Premissas e condicionantes", true),
  numbered([
    new TextRun({ text: "Vigência contratual: ", bold: true }),
    new TextRun("12 (doze) meses a contar da data de assinatura do contrato, com possibilidade de renovação por iguais períodos."),
  ]),
  numbered([
    new TextRun({ text: "Acesso a sistemas municipais: ", bold: true }),
    new TextRun("a Prefeitura disponibilizará acesso técnico, credenciais e documentação das APIs dos sistemas municipais a integrar, em até 15 (quinze) dias corridos após a assinatura do contrato."),
  ]),
  numbered([
    new TextRun({ text: "Infraestrutura de rede: ", bold: true }),
    new TextRun("conectividade à internet nas instalações onde os fiscais realizam sincronização e atividades administrativas é de responsabilidade da Prefeitura."),
  ]),
  numbered([
    new TextRun({ text: "Migração de dados: ", bold: true }),
    new TextRun("o escopo contempla dados em formato estruturado (CSV, XLS ou banco de dados relacional). Dados em papel ou formatos proprietários sem API serão objeto de análise específica e eventual aditivo."),
  ]),
  numbered([
    new TextRun({ text: "Horas técnicas (Item 5): ", bold: true }),
    new TextRun("as 2.000 horas contratadas têm validade de 12 meses a contar da assinatura. Saldo não utilizado não é reembolsável, mas poderá ser negociado em eventual renovação contratual."),
  ]),
  numbered([
    new TextRun({ text: "Integrações adicionais: ", bold: true }),
    new TextRun("estão previstas as integrações listadas no Item 3. Integrações com sistemas não identificados no escopo preliminar serão avaliadas e, quando aplicável, consumirão horas do Item 5."),
  ]),
  numbered([
    new TextRun({ text: "Impostos: ", bold: true }),
    new TextRun("os valores apresentados não incluem ISS (Imposto Sobre Serviços) e demais tributos municipais, que serão acrescidos conforme legislação vigente no município de Maringá."),
  ]),
  numbered([
    new TextRun({ text: "Propriedade intelectual: ", bold: true }),
    new TextRun("a propriedade intelectual do produto base permanece com a Contratada. As customizações específicas desenvolvidas ao município (Item 5) passam a compor o sistema contratado, com direito de uso perpétuo pela Prefeitura."),
  ]),
  numbered([
    new TextRun({ text: "Proteção de dados (LGPD): ", bold: true }),
    new TextRun("a Contratada figurará como Operador de Dados nos termos da Lei 13.709/2018 (LGPD), cabendo à Prefeitura a figura de Controlador. Será celebrado Acordo de Tratamento de Dados (DPA) específico."),
  ]),
  numbered([
    new TextRun({ text: "Níveis de serviço (SLA): ", bold: true }),
    new TextRun("disponibilidade mensal mínima de 99,5%, com janelas de manutenção previamente agendadas fora do horário comercial."),
  ]),

  // ============ 9. CONDIÇÕES DE PAGAMENTO ============
  h1("9. Condições de pagamento"),
  p("Proposta de condições de pagamento, sujeita a alinhamento contratual:"),
  spacer(120),

  buildTable({
    widths: [1800, 3200, 1800, 2560],
    header: ["Item", "Evento/Marco", "Percentual", "Prazo"],
    rows: [
      [
        { text: "Item 1 — Licença", bold: true },
        { text: "Faturamento mensal" },
        { text: "100% mensal", align: AlignmentType.CENTER },
        { text: "Dia 10 do mês subsequente", align: AlignmentType.CENTER },
      ],
      [
        { text: "Item 2 — Implantação", bold: true },
        { text: "Assinatura do contrato" },
        { text: "10%", align: AlignmentType.CENTER },
        { text: "Ato da assinatura", align: AlignmentType.CENTER },
      ],
      [
        { text: "Item 2 — Implantação", bold: true },
        { text: "Aceite da homologação (go-live)" },
        { text: "90%", align: AlignmentType.CENTER },
        { text: "30 dias após aceite", align: AlignmentType.CENTER },
      ],
      [
        { text: "Item 3 — Integração", bold: true },
        { text: "Faturamento mensal" },
        { text: "100% mensal", align: AlignmentType.CENTER },
        { text: "Dia 10 do mês subsequente", align: AlignmentType.CENTER },
      ],
      [
        { text: "Item 4 — Treinamento", bold: true },
        { text: "Conclusão das turmas" },
        { text: "100%", align: AlignmentType.CENTER },
        { text: "30 dias após conclusão", align: AlignmentType.CENTER },
      ],
      [
        { text: "Item 5 — Horas técnicas", bold: true },
        { text: "Medição quinzenal" },
        { text: "Conforme horas aprovadas", align: AlignmentType.CENTER },
        { text: "30 dias após medição", align: AlignmentType.CENTER },
      ],
      [
        { text: "Item 6 — Hospedagem", bold: true },
        { text: "Faturamento mensal" },
        { text: "100% mensal", align: AlignmentType.CENTER },
        { text: "Dia 10 do mês subsequente", align: AlignmentType.CENTER },
      ],
    ],
  }),

  // ============ 10. VALIDADE E DECLARAÇÕES ============
  h1("10. Validade e declarações"),
  p([new TextRun({ text: "Validade da proposta: ", bold: true }), new TextRun("60 (sessenta) dias corridos a contar da data de emissão.")]),
  p([new TextRun({ text: "Prazo de assinatura: ", bold: true }), new TextRun("mediante validação jurídica, o contrato pode ser assinado em até 10 dias corridos após a adjudicação.")]),
  p([new TextRun({ text: "Início dos serviços: ", bold: true }), new TextRun("em até 15 dias corridos após a assinatura do contrato.")]),
  spacer(120),
  p([new TextRun({ text: "Declaramos, ainda, que:", bold: true })]),
  bullet("Temos pleno conhecimento do objeto da licitação e dos requisitos técnicos constantes das especificações fornecidas."),
  bullet("Dispomos de capacidade técnica, operacional e financeira para a execução integral do objeto."),
  bullet("Os valores apresentados incluem todos os custos diretos e indiretos necessários à perfeita execução do objeto."),
  bullet("Estamos em situação regular perante as Fazendas Federal, Estadual e Municipal, INSS e FGTS."),
  bullet("Comprometemo-nos a cumprir integralmente os termos da proposta e do contrato a ser firmado."),

  // ============ ASSINATURA ============
  spacer(600),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 400, after: 120 },
    children: [new TextRun({ text: "Maringá, 17 de abril de 2026", size: 22 })],
  }),
  spacer(800),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 60 },
    border: { top: { style: BorderStyle.SINGLE, size: 6, color: "000000", space: 4 } },
    children: [new TextRun({ text: "[NOME DO REPRESENTANTE LEGAL]", bold: true, size: 22 })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 60 },
    children: [new TextRun({ text: "[CARGO]", size: 20 })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 60 },
    children: [new TextRun({ text: "[RAZÃO SOCIAL DA EMPRESA]", size: 20 })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 0 },
    children: [new TextRun({ text: "CNPJ [00.000.000/0001-00]", size: 18, color: COLOR_MUTED })],
  }),
];

// ---------- Document ----------
const doc = new Document({
  creator: "Proposta Comercial",
  title: "Proposta Comercial — Sistema Gestor de Fiscalização (Maringá/PR)",
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: COLOR_PRIMARY },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: COLOR_PRIMARY },
        paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: "Arial", color: COLOR_ACCENT },
        paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 2 } },
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
        ] },
      { reference: "numbers",
        levels: [
          { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
        ] },
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
                new TextRun({ text: "PROPOSTA COMERCIAL — Sistema Gestor de Fiscalização / Maringá-PR", size: 16, color: COLOR_MUTED }),
              ],
              border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR_ACCENT, space: 4 } },
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              border: { top: { style: BorderStyle.SINGLE, size: 6, color: COLOR_GREY_LIGHT, space: 4 } },
              children: [
                new TextRun({ text: "[Razão Social] · CNPJ [00.000.000/0001-00] · Página ", size: 16, color: COLOR_MUTED }),
                new TextRun({ children: [PageNumber.CURRENT], size: 16, color: COLOR_MUTED }),
                new TextRun({ text: " de ", size: 16, color: COLOR_MUTED }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: COLOR_MUTED }),
              ],
            }),
          ],
        }),
      },
      children,
    },
  ],
});

const outPath = "/Users/code42/workspace/code/repos/dash/tmp/Proposta_Comercial_SistemaFiscalizacao_Maringa.docx";
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outPath, buffer);
  console.log("WROTE", outPath, buffer.length, "bytes");
});
