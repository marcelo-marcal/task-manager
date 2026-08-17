// ============================================================
// FX - OPERAÇÕES DE DIGITAÇÃO DO EDITOR DE TEXTO RICO
//
// Responsável exclusivamente por:
//
// - calcular marcas da próxima digitação;
// - alternar uma marca no ponto do cursor;
// - inserir texto com marcas específicas;
// - posicionar o cursor depois da inserção.
//
// Este arquivo NÃO conhece:
// - React;
// - cartões;
// - comentários;
// - toolbar;
// - estado do componente.
//
// Poderá ser reutilizado por qualquer superfície de texto rico
// do sistema.
// ============================================================

import type {
  RichTextMark,
} from "../types/rich-text.types";

import {
  aplicarCodigo,
  alternarMarca,
} from "../utils/rich-text-marks.utils";

import {
  aplicarMarcasAoElemento,
} from "./rich-text-dom.utils";

// ============================================================
// MARCAS PENDENTES PARA A PRÓXIMA DIGITAÇÃO
//
// Representa uma decisão explícita de formatação feita pelo
// usuário no ponto atual do cursor.
//
// Exemplo:
//
// cursor dentro de:
// ["strike"]
//
// usuário desliga Tachado:
//
// {
//   posicao: 10,
//   marcas: []
// }
//
// O texto já existente não é alterado.
// ============================================================

export type PendingTypingMarks = Readonly<{
  posicao: number;
  marcas: RichTextMark[];
}>;

// ============================================================
// ALTERNAR MARCA DA PRÓXIMA DIGITAÇÃO
//
// Utiliza as mesmas regras centrais já existentes no editor.
//
// Exemplos:
//
// ["strike"] + strike
// → []
//
// [] + strike
// → ["strike"]
//
// ["bold", "italic"] + code
// → ["code"]
//
// ["code"] + bold
// → ["code"]
// ============================================================

export function alternarMarcaDeDigitacao(
  marcasAtuais: readonly RichTextMark[],
  marca: RichTextMark,
): RichTextMark[] {
  if (marca === "code") {
    return aplicarCodigo(
      marcasAtuais,
    );
  }

  return alternarMarca(
    marcasAtuais,
    marca,
  );
}

// ============================================================
// CRIAR ESTADO DE DIGITAÇÃO PENDENTE
//
// Centraliza a criação do estado que será armazenado pela
// superfície.
//
// A superfície continua responsável por decidir QUANDO esse
// estado deverá ser utilizado ou descartado.
// ============================================================

export function criarPendingTypingMarks(
  posicao: number,
  marcasAtuais: readonly RichTextMark[],
  marca: RichTextMark,
): PendingTypingMarks {
  return {
    posicao,
    marcas:
      alternarMarcaDeDigitacao(
        marcasAtuais,
        marca,
      ),
  };
}

// ============================================================
// INSERIR TEXTO COM MARCAS
//
// Insere o texto exatamente no Range recebido utilizando as
// marcas determinadas.
//
// Exemplo:
//
// antes:
//
// ~~tacha|do~~
//
// marcas da nova digitação:
//
// []
//
// texto:
//
// "XXX"
//
// resultado estrutural:
//
// "tacha" [strike]
// "XXX"   []
// "do"    [strike]
//
// Esta função altera somente o DOM.
//
// O consumidor continua responsável por:
// - reconstruir RichTextContent;
// - atualizar o estado React;
// - atualizar seleção/cursor.
// ============================================================

export function inserirTextoComMarcas(
  editor: HTMLDivElement,
  rangeAtual: Range,
  texto: string,
  marcas: readonly RichTextMark[],
): boolean {
  const selection =
    window.getSelection();

  if (!selection) {
    return false;
  }

  const span =
    document.createElement(
      "span",
    );

  span.textContent =
    texto;

  span.dataset.richTextMarks =
    marcas.join(" ");

  aplicarMarcasAoElemento(
    span,
    marcas,
  );

  // ----------------------------------------------------------
  // INSERÇÃO
  //
  // Atualmente o fluxo utiliza Range colapsado.
  //
  // Mantemos deleteContents() para a função continuar segura
  // caso seja reutilizada futuramente sobre uma seleção.
  // ----------------------------------------------------------

  rangeAtual.deleteContents();

  rangeAtual.insertNode(
    span,
  );

  // ----------------------------------------------------------
  // LOCALIZAR TEXTO INSERIDO
  // ----------------------------------------------------------

  const textoNode =
    span.firstChild;

  if (
    !(textoNode instanceof Text)
  ) {
    return false;
  }

  // ----------------------------------------------------------
  // POSICIONAR CURSOR DEPOIS DO TEXTO INSERIDO
  // ----------------------------------------------------------

  const novoRange =
    document.createRange();

  novoRange.setStart(
    textoNode,
    textoNode.length,
  );

  novoRange.collapse(
    true,
  );

  selection.removeAllRanges();

  selection.addRange(
    novoRange,
  );

  editor.focus();

  return true;
}