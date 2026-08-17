// ============================================================
// FX - OPERAÇÕES DE SELEÇÃO DO EDITOR DE TEXTO RICO
//
// Responsável exclusivamente por:
//
// - converter posições DOM em posições absolutas;
// - descobrir marcas ativas no cursor;
// - localizar elementos formatados;
// - verificar bordas de formatação;
// - restaurar cursor;
// - restaurar seleção.
//
// Este arquivo NÃO conhece:
// - React;
// - cartões;
// - comentários;
// - toolbar;
// - conteúdo de negócio do comentário.
//
// Poderá ser reutilizado por qualquer superfície de texto rico
// do sistema.
// ============================================================

import type {
  RichTextMark,
  RichTextSelection,
  RichTextSelectionState,
} from "../types/rich-text.types";

import {
  elementoPossuiRichTextMark,
  obterMarcasDoElemento,
} from "./rich-text-dom.utils";

// ============================================================
// OBTER POSIÇÃO ABSOLUTA
//
// Converte:
//
// node + offset
//
// em uma posição numérica dentro do texto completo.
//
// Exemplo:
//
// "Teste de tacha|do"
//
// retorna a posição absoluta do cursor independentemente de
// quantos spans existam no DOM.
// ============================================================

export function obterPosicaoAbsoluta(
  editor: HTMLDivElement,
  node: Node,
  offset: number,
): number {
  const range =
    document.createRange();

  range.selectNodeContents(
    editor,
  );

  try {
    range.setEnd(
      node,
      offset,
    );
  } catch {
    return 0;
  }

  return range.toString().length;
}

// ============================================================
// OBTER MARCAS ATIVAS NO CURSOR
//
// Percorre os ancestrais do ponto atual até chegar ao editor.
//
// Exemplo:
//
// <span data-rich-text-marks="strike">
//   tacha|do
// </span>
//
// retorna:
//
// ["strike"]
//
// Cursor em texto normal:
//
// []
// ============================================================

export function obterMarcasAtivasNoCursor(
  editor: HTMLDivElement,
  node: Node,
): RichTextMark[] {
  const ancestrais: HTMLElement[] =
    [];

  let atual: Node | null =
    node.nodeType === Node.ELEMENT_NODE
      ? node
      : node.parentNode;

  while (
    atual &&
    atual !== editor
  ) {
    if (
      atual instanceof HTMLElement
    ) {
      ancestrais.unshift(
        atual,
      );
    }

    atual =
      atual.parentNode;
  }

  let marcas: RichTextMark[] =
    [];

  for (const elemento of ancestrais) {
    marcas =
      obterMarcasDoElemento(
        elemento,
        marcas,
      );
  }

  return Array.from(
    new Set(marcas),
  );
}

// ============================================================
// ENCONTRAR ELEMENTO FORMATADO NO CURSOR
//
// Procura um ancestral formatado do ponto onde o cursor está.
//
// Exemplo:
//
// <span data-rich-text-marks="strike">
//   tacha|do
// </span>
//
// retorna o span responsável pela formatação.
// ============================================================

export function encontrarElementoFormatadoNoCursor(
  editor: HTMLDivElement,
  node: Node,
): HTMLElement | null {
  let atual: Node | null =
    node.nodeType === Node.ELEMENT_NODE
      ? node
      : node.parentNode;

  let encontrado: HTMLElement | null =
    null;

  while (
    atual &&
    atual !== editor
  ) {
    if (
      atual instanceof HTMLElement &&
      elementoPossuiRichTextMark(
        atual,
      )
    ) {
      encontrado =
        atual;
    }

    atual =
      atual.parentNode;
  }

  return encontrado;
}

// ============================================================
// CURSOR ESTÁ NO FIM DO ELEMENTO?
//
// Verifica se não existe mais texto entre o cursor e o final
// do elemento formatado.
//
// Exemplo:
//
// ~~tachado~~|
//
// → true
//
// ~~tacha|do~~
//
// → false
// ============================================================

export function cursorEstaNoFimDoElemento(
  elemento: HTMLElement,
  rangeAtual: Range,
): boolean {
  const rangeAteFim =
    document.createRange();

  rangeAteFim.selectNodeContents(
    elemento,
  );

  try {
    rangeAteFim.setStart(
      rangeAtual.startContainer,
      rangeAtual.startOffset,
    );
  } catch {
    return false;
  }

  return (
    rangeAteFim.toString().length === 0
  );
}

// ============================================================
// RESTAURAR ESTADO COMPLETO DA SELEÇÃO
//
// Se existe intervalo selecionado:
// → restaura a seleção.
//
// Se existe somente cursor:
// → restaura a posição do cursor.
// ============================================================

export function restaurarEstadoSelecao(
  editor: HTMLDivElement,
  estado: RichTextSelectionState,
): void {
  const possuiSelecao =
    estado.selecao.fim >
    estado.selecao.inicio;

  if (possuiSelecao) {
    restaurarSelecao(
      editor,
      estado.selecao,
    );

    return;
  }

  restaurarCursor(
    editor,
    estado.cursor.posicao,
  );
}

// ============================================================
// RESTAURAR SELEÇÃO
// ============================================================

export function restaurarSelecao(
  editor: HTMLDivElement,
  selecao: RichTextSelection,
): void {
  const inicio =
    encontrarPosicaoDOM(
      editor,
      selecao.inicio,
    );

  const fim =
    encontrarPosicaoDOM(
      editor,
      selecao.fim,
    );

  if (
    !inicio ||
    !fim
  ) {
    return;
  }

  const range =
    document.createRange();

  range.setStart(
    inicio.node,
    inicio.offset,
  );

  range.setEnd(
    fim.node,
    fim.offset,
  );

  aplicarRangeAoEditor(
    editor,
    range,
  );
}

// ============================================================
// RESTAURAR CURSOR
// ============================================================

export function restaurarCursor(
  editor: HTMLDivElement,
  posicao: number,
): void {
  const destino =
    encontrarPosicaoDOM(
      editor,
      posicao,
    );

  if (!destino) {
    editor.focus();
    return;
  }

  const range =
    document.createRange();

  range.setStart(
    destino.node,
    destino.offset,
  );

  range.collapse(
    true,
  );

  aplicarRangeAoEditor(
    editor,
    range,
  );
}

// ============================================================
// APLICAR RANGE AO EDITOR
// ============================================================

function aplicarRangeAoEditor(
  editor: HTMLDivElement,
  range: Range,
): void {
  const selection =
    window.getSelection();

  if (!selection) {
    return;
  }

  editor.focus();

  selection.removeAllRanges();
  selection.addRange(
    range,
  );
}

// ============================================================
// POSIÇÃO DE TEXTO NO DOM
// ============================================================

type DOMTextPosition = Readonly<{
  node: Text;
  offset: number;
}>;

// ============================================================
// ENCONTRAR POSIÇÃO ABSOLUTA NO DOM
//
// Recebe uma posição numérica do nosso modelo e encontra:
//
// - Text node correspondente;
// - offset correspondente.
//
// Permite reconstruir a seleção depois que o DOM é renderizado
// novamente.
// ============================================================

function encontrarPosicaoDOM(
  editor: HTMLDivElement,
  posicao: number,
): DOMTextPosition | null {
  const walker =
    document.createTreeWalker(
      editor,
      NodeFilter.SHOW_TEXT,
    );

  let acumulado = 0;

  let ultimoNode: Text | null =
    null;

  while (
    walker.nextNode()
  ) {
    const node =
      walker.currentNode as Text;

    ultimoNode =
      node;

    const tamanho =
      node.nodeValue?.length ?? 0;

    if (
      posicao <=
      acumulado + tamanho
    ) {
      return {
        node,
        offset:
          Math.max(
            0,
            Math.min(
              tamanho,
              posicao - acumulado,
            ),
          ),
      };
    }

    acumulado +=
      tamanho;
  }

  // ----------------------------------------------------------
  // POSIÇÃO APÓS O ÚLTIMO CARACTERE
  // ----------------------------------------------------------

  if (ultimoNode) {
    return {
      node:
        ultimoNode,
      offset:
        ultimoNode.nodeValue
          ?.length ?? 0,
    };
  }

  return null;
}