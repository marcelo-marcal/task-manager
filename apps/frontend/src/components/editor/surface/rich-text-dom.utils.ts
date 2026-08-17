// ============================================================
// FX - OPERAÇÕES DE DOM DO EDITOR DE TEXTO RICO
//
// Responsável exclusivamente pela conversão:
//
// RichTextContent
//        ↕
// DOM do contentEditable
//
// Este arquivo NÃO conhece:
// - React;
// - cartões;
// - comentários;
// - toolbar;
// - seleção;
// - posição do cursor.
//
// Poderá ser reutilizado por qualquer superfície de texto rico
// do sistema.
// ============================================================

import type {
  RichTextContent,
  RichTextMark,
  RichTextSegment,
} from "../types/rich-text.types";

import {
  normalizarSegmentos,
} from "../utils/rich-text-content.utils";

// ============================================================
// MARCAS SUPORTADAS
// ============================================================

const RICH_TEXT_MARKS: readonly RichTextMark[] = [
  "bold",
  "italic",
  "strike",
  "code",
];

// ============================================================
// RENDERIZAR CONTEÚDO NO EDITOR
//
// Converte RichTextContent em elementos DOM.
//
// Cada segmento recebe:
//
// data-rich-text-marks="..."
//
// Esse atributo permite recuperar posteriormente as marcas sem
// depender apenas dos estilos visuais.
// ============================================================

export function renderizarRichTextContent(
  editor: HTMLDivElement,
  content: RichTextContent,
): void {
  const fragment =
    document.createDocumentFragment();

  for (const segmento of content.segmentos) {
    const span =
      document.createElement("span");

    span.textContent =
      segmento.texto;

    span.dataset.richTextMarks =
      segmento.marcas.join(" ");

    aplicarMarcasAoElemento(
      span,
      segmento.marcas,
    );

    fragment.appendChild(
      span,
    );
  }

  editor.replaceChildren(
    fragment,
  );
}

// ============================================================
// APLICAR MARCAS VISUAIS
//
// Centraliza a aparência das formatações inline.
//
// Quando precisarmos aproximar ainda mais algum estilo do
// Trello, teremos um único ponto para ajustar.
// ============================================================

export function aplicarMarcasAoElemento(
  elemento: HTMLElement,
  marcas: readonly RichTextMark[],
): void {
  if (marcas.includes("bold")) {
    elemento.style.fontWeight =
      "700";
  }

  if (marcas.includes("italic")) {
    elemento.style.fontStyle =
      "italic";
  }

  if (marcas.includes("strike")) {
    elemento.style.textDecoration =
      "line-through";
  }

  if (marcas.includes("code")) {
    elemento.style.fontFamily =
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";

    elemento.style.background =
      "var(--surface-hover)";

    elemento.style.borderRadius =
      "3px";

    elemento.style.padding =
      "1px 3px";
  }
}

// ============================================================
// LER CONTEÚDO DO EDITOR
//
// Reconstrói RichTextContent a partir do DOM atual.
//
// Isso é necessário porque o navegador modifica diretamente o
// contentEditable enquanto o usuário digita.
// ============================================================

export function lerRichTextContentDoEditor(
  editor: HTMLDivElement,
): RichTextContent {
  const segmentos: RichTextSegment[] =
    [];

  for (
    const node
    of Array.from(
      editor.childNodes,
    )
  ) {
    lerNode(
      node,
      [],
      segmentos,
    );
  }

  removerQuebraFinalEstrutural(
    segmentos,
  );

  return {
    segmentos:
      normalizarSegmentos(
        segmentos,
      ),
  };
}

// ============================================================
// LER NODE RECURSIVAMENTE
// ============================================================

function lerNode(
  node: Node,
  marcasHerdadas: readonly RichTextMark[],
  segmentos: RichTextSegment[],
): void {
  // ----------------------------------------------------------
  // TEXTO
  // ----------------------------------------------------------

  if (
    node.nodeType ===
    Node.TEXT_NODE
  ) {
    adicionarSegmento(
      segmentos,
      node.nodeValue ?? "",
      marcasHerdadas,
    );

    return;
  }

  // ----------------------------------------------------------
  // OUTROS NODES NÃO SÃO RELEVANTES
  // ----------------------------------------------------------

  if (
    node.nodeType !==
    Node.ELEMENT_NODE
  ) {
    return;
  }

  const elemento =
    node as HTMLElement;

  const tag =
    elemento.tagName;

  // ----------------------------------------------------------
  // QUEBRA DE LINHA
  // ----------------------------------------------------------

  if (tag === "BR") {
    adicionarSegmento(
      segmentos,
      "\n",
      marcasHerdadas,
    );

    return;
  }

  const marcas =
    obterMarcasDoElemento(
      elemento,
      marcasHerdadas,
    );

  // Navegadores podem produzir DIV/P ao pressionar Enter.
  const elementoDeBloco =
    tag === "DIV" ||
    tag === "P";

  for (
    const filho
    of Array.from(
      elemento.childNodes,
    )
  ) {
    lerNode(
      filho,
      marcas,
      segmentos,
    );
  }

  if (elementoDeBloco) {
    adicionarQuebraSeNecessario(
      segmentos,
      marcas,
    );
  }
}

// ============================================================
// OBTER MARCAS DE UM ELEMENTO
//
// Reconhecemos:
//
// 1. nosso atributo data-rich-text-marks;
// 2. elementos semânticos que o navegador eventualmente crie.
//
// A função é exportada porque posteriormente o módulo de
// seleção precisará descobrir as marcas existentes no ponto
// onde o cursor está.
// ============================================================

export function obterMarcasDoElemento(
  elemento: HTMLElement,
  marcasHerdadas: readonly RichTextMark[] = [],
): RichTextMark[] {
  const resultado: RichTextMark[] =
    [...marcasHerdadas];

  // ----------------------------------------------------------
  // DATASET DO NOSSO EDITOR
  // ----------------------------------------------------------

  const marcasDoDataset =
    elemento.dataset.richTextMarks;

  if (
    marcasDoDataset !== undefined
  ) {
    for (
      const valor
      of marcasDoDataset.split(" ")
    ) {
      if (
        ehRichTextMark(valor) &&
        !resultado.includes(valor)
      ) {
        resultado.push(
          valor,
        );
      }
    }
  }

  // ----------------------------------------------------------
  // ELEMENTOS SEMÂNTICOS
  // ----------------------------------------------------------

  const tag =
    elemento.tagName;

  adicionarMarcaPorTag(
    resultado,
    tag,
    ["B", "STRONG"],
    "bold",
  );

  adicionarMarcaPorTag(
    resultado,
    tag,
    ["I", "EM"],
    "italic",
  );

  adicionarMarcaPorTag(
    resultado,
    tag,
    ["S", "STRIKE"],
    "strike",
  );

  adicionarMarcaPorTag(
    resultado,
    tag,
    ["CODE"],
    "code",
  );

  return resultado;
}

// ============================================================
// VERIFICAR SE ELEMENTO POSSUI ALGUMA FORMATAÇÃO
//
// Também será útil ao módulo de controle do cursor.
// ============================================================

export function elementoPossuiRichTextMark(
  elemento: HTMLElement,
): boolean {
  const dataset =
    elemento.dataset.richTextMarks
      ?.trim();

  if (
    dataset &&
    dataset.length > 0
  ) {
    return true;
  }

  return [
    "B",
    "STRONG",
    "I",
    "EM",
    "S",
    "STRIKE",
    "CODE",
  ].includes(
    elemento.tagName,
  );
}

// ============================================================
// VERIFICAR MARCA VÁLIDA
// ============================================================

function ehRichTextMark(
  valor: string,
): valor is RichTextMark {
  return RICH_TEXT_MARKS.includes(
    valor as RichTextMark,
  );
}

// ============================================================
// ADICIONAR MARCA A PARTIR DA TAG
// ============================================================

function adicionarMarcaPorTag(
  marcas: RichTextMark[],
  tagAtual: string,
  tags: readonly string[],
  marca: RichTextMark,
): void {
  if (
    tags.includes(tagAtual) &&
    !marcas.includes(marca)
  ) {
    marcas.push(
      marca,
    );
  }
}

// ============================================================
// ADICIONAR SEGMENTO
// ============================================================

function adicionarSegmento(
  segmentos: RichTextSegment[],
  texto: string,
  marcas: readonly RichTextMark[],
): void {
  if (texto.length === 0) {
    return;
  }

  segmentos.push({
    texto,
    marcas: [...marcas],
  });
}

// ============================================================
// ADICIONAR QUEBRA DE LINHA
// ============================================================

function adicionarQuebraSeNecessario(
  segmentos: RichTextSegment[],
  marcas: readonly RichTextMark[],
): void {
  const ultimo =
    segmentos[
      segmentos.length - 1
    ];

  if (
    ultimo?.texto.endsWith("\n")
  ) {
    return;
  }

  adicionarSegmento(
    segmentos,
    "\n",
    marcas,
  );
}

// ============================================================
// REMOVER QUEBRA FINAL ESTRUTURAL
//
// Um DIV/P criado automaticamente pelo navegador pode gerar
// uma quebra artificial no final.
//
// Removemos somente essa quebra final.
// ============================================================

function removerQuebraFinalEstrutural(
  segmentos: RichTextSegment[],
): void {
  const ultimo =
    segmentos[
      segmentos.length - 1
    ];

  if (!ultimo) {
    return;
  }

  if (
    ultimo.texto === "\n"
  ) {
    segmentos.pop();
    return;
  }

  if (
    ultimo.texto.endsWith("\n")
  ) {
    ultimo.texto =
      ultimo.texto.slice(
        0,
        -1,
      );

    if (
      ultimo.texto.length === 0
    ) {
      segmentos.pop();
    }
  }
}