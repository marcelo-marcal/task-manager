"use client";

// ============================================================
// FX - HOOK GENÉRICO DE SELEÇÃO DE TEXTO RICO
//
// Responsável por representar e manter:
//
// - seleção atual;
// - posição atual do cursor;
// - marcas de formatação ativas no ponto do cursor.
//
// Não conhece:
// - cartões;
// - comentários;
// - toolbar;
// - menus;
// - chat.
//
// Poderá ser reutilizado por qualquer editor de texto rico
// existente futuramente no sistema.
// ============================================================

import {
  useCallback,
  useState,
} from "react";

import type {
  RichTextCursorState,
  RichTextMark,
  RichTextSelection,
  RichTextSelectionState,
} from "../types/rich-text.types";

// ============================================================
// ESTADO VAZIO
// ============================================================

const EMPTY_SELECTION: RichTextSelection = {
  inicio: 0,
  fim: 0,
};

const EMPTY_CURSOR: RichTextCursorState = {
  posicao: 0,
  marcasAtivas: [],
};

const EMPTY_STATE: RichTextSelectionState = {
  selecao: EMPTY_SELECTION,
  cursor: EMPTY_CURSOR,
};

// ============================================================
// HOOK
// ============================================================

export function useRichTextSelection() {
  const [estado, setEstado] =
    useState<RichTextSelectionState>(
      EMPTY_STATE,
    );

  // ----------------------------------------------------------
  // DADOS DERIVADOS
  // ----------------------------------------------------------

  const selecao =
    estado.selecao;

  const cursor =
    estado.cursor;

  const marcasAtivas =
    cursor.marcasAtivas;

  // ----------------------------------------------------------
  // ATUALIZAR SOMENTE A SELEÇÃO
  //
  // Mantido para compatibilidade com os componentes que ainda
  // informam somente início e fim.
  //
  // A seleção é normalizada automaticamente.
  //
  // Exemplo:
  //
  // início = 10
  // fim    = 4
  //
  // torna-se:
  //
  // início = 4
  // fim    = 10
  //
  // Enquanto o cursor detalhado ainda não for informado,
  // consideramos a posição final normalizada como referência.
  // ----------------------------------------------------------

  const atualizarSelecao =
    useCallback(
      (
        inicio: number,
        fim: number,
      ) => {
        const inicioNormalizado =
          Math.min(
            inicio,
            fim,
          );

        const fimNormalizado =
          Math.max(
            inicio,
            fim,
          );

        setEstado(
          (estadoAtual) => ({
            selecao: {
              inicio:
                inicioNormalizado,
              fim:
                fimNormalizado,
            },
            cursor: {
              posicao:
                fimNormalizado,
              marcasAtivas: [
                ...estadoAtual
                  .cursor
                  .marcasAtivas,
              ],
            },
          }),
        );
      },
      [],
    );

  // ----------------------------------------------------------
  // ATUALIZAR ESTADO COMPLETO
  //
  // Será utilizado pela superfície do editor quando ela souber:
  //
  // - intervalo selecionado;
  // - posição real do cursor;
  // - marcas ativas naquele ponto.
  //
  // Esta é a forma preferencial para o editor rico completo.
  // ----------------------------------------------------------

  const atualizarEstadoSelecao =
    useCallback(
      (
        novaSelecao: RichTextSelection,
        novoCursor: RichTextCursorState,
      ) => {
        const inicioNormalizado =
          Math.min(
            novaSelecao.inicio,
            novaSelecao.fim,
          );

        const fimNormalizado =
          Math.max(
            novaSelecao.inicio,
            novaSelecao.fim,
          );

        setEstado({
          selecao: {
            inicio:
              inicioNormalizado,
            fim:
              fimNormalizado,
          },
          cursor: {
            posicao:
              novoCursor.posicao,
            marcasAtivas: [
              ...novoCursor
                .marcasAtivas,
            ],
          },
        });
      },
      [],
    );

  // ----------------------------------------------------------
  // ATUALIZAR SOMENTE O CURSOR
  //
  // Útil quando não há seleção de texto, mas precisamos saber
  // o contexto de formatação do ponto de inserção.
  //
  // Exemplo:
  //
  // ~~tacha|do~~
  //
  // cursor:
  // {
  //   posicao: ...,
  //   marcasAtivas: ["strike"]
  // }
  // ----------------------------------------------------------

  const atualizarCursor =
    useCallback(
      (
        posicao: number,
        novasMarcasAtivas:
          readonly RichTextMark[],
      ) => {
        setEstado({
          selecao: {
            inicio: posicao,
            fim: posicao,
          },
          cursor: {
            posicao,
            marcasAtivas: [
              ...novasMarcasAtivas,
            ],
          },
        });
      },
      [],
    );

  // ----------------------------------------------------------
  // LIMPAR SELEÇÃO E CURSOR
  // ----------------------------------------------------------

  const limparSelecao =
    useCallback(() => {
      setEstado(
        EMPTY_STATE,
      );
    }, []);

  // ----------------------------------------------------------
  // EXISTE TEXTO SELECIONADO?
  // ----------------------------------------------------------

  const possuiSelecao =
    selecao.fim >
    selecao.inicio;

  // ----------------------------------------------------------
  // TAMANHO DA SELEÇÃO
  // ----------------------------------------------------------

  const tamanhoSelecao =
    Math.max(
      0,
      selecao.fim -
        selecao.inicio,
    );

  // ----------------------------------------------------------
  // VERIFICAR MARCA ATIVA NO CURSOR
  //
  // Exemplo:
  //
  // possuiMarcaAtiva("strike")
  //
  // permitirá à toolbar saber se o cursor está dentro de um
  // trecho tachado mesmo quando não existe texto selecionado.
  // ----------------------------------------------------------

  const possuiMarcaAtiva =
    useCallback(
      (
        marca: RichTextMark,
      ) =>
        marcasAtivas.includes(
          marca,
        ),
      [marcasAtivas],
    );

  // ==========================================================
  // RETORNO
  // ==========================================================

  return {
    estado,

    selecao,
    cursor,
    marcasAtivas,

    possuiSelecao,
    tamanhoSelecao,

    atualizarSelecao,
    atualizarEstadoSelecao,
    atualizarCursor,
    limparSelecao,

    possuiMarcaAtiva,
  } as const;
}