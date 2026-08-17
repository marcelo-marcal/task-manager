"use client";

// ============================================================
// FX - CONTROLE DE ENTRADA DA SUPERFÍCIE DE TEXTO RICO
//
// Responsável por:
// - digitação nativa;
// - digitação controlada;
// - marcas pendentes no cursor;
// - comando genérico toggleMarkAtCursor.
//
// Não renderiza interface.
// ============================================================

import {
  useCallback,
  useRef,
} from "react";

import type {
  FormEvent,
  RefObject,
} from "react";

import type {
  RichTextContent,
  RichTextMark,
  RichTextSelectionState,
} from "../types/rich-text.types";

import {
  inserirTextoNaPosicao,
} from "../utils/rich-text-content.utils";

import {
  lerRichTextContentDoEditor,
} from "../surface/rich-text-dom.utils";

import {
  criarPendingTypingMarks,
} from "../surface/rich-text-input.utils";

import type {
  PendingTypingMarks,
} from "../surface/rich-text-input.utils";

import {
  cursorEstaNoFimDoElemento,
  encontrarElementoFormatadoNoCursor,
  obterPosicaoAbsoluta,
  restaurarCursor,
} from "../surface/rich-text-selection.utils";

// ============================================================
// EVENTO DE BEFORE INPUT
//
// No ambiente atual, React fornece corretamente:
//
// data: "x"
//
// porém inputType pode chegar como:
//
// undefined
//
// Por isso não dependemos exclusivamente de inputType para
// reconhecer uma digitação normal.
//
// Quando inputType existir:
// - insertText é aceito;
// - outros tipos continuam no fluxo nativo.
// ============================================================

type NativeBeforeInputEvent = Event & {
  inputType?: string;
  data?: string | null;
};

// ============================================================
// PROPRIEDADES
// ============================================================

type UseRichTextSurfaceInputProps = Readonly<{
  editorRef:
    RefObject<HTMLDivElement | null>;

  content:
    RichTextContent;

  ultimoEstadoSelecaoRef:
    RefObject<RichTextSelectionState>;

  definirEstadoSelecao: (
    state: RichTextSelectionState,
  ) => void;

  atualizarSelecaoDoDOM: () => void;

  onChange: (
    content: RichTextContent,
  ) => void;
}>;

// ============================================================
// HOOK
// ============================================================

export function useRichTextSurfaceInput({
  editorRef,
  content,
  ultimoEstadoSelecaoRef,
  definirEstadoSelecao,
  atualizarSelecaoDoDOM,
  onChange,
}: UseRichTextSurfaceInputProps) {
  // ----------------------------------------------------------
  // MARCAS PENDENTES
  //
  // Representam a formatação escolhida para a próxima
  // digitação no ponto atual do cursor.
  // ----------------------------------------------------------

  const pendingTypingMarksRef =
    useRef<PendingTypingMarks | null>(
      null,
    );

  // ----------------------------------------------------------
  // ALTERAÇÃO INTERNA
  //
  // Indica quando o próprio contentEditable já alterou o DOM.
  // ----------------------------------------------------------

  const alteracaoInternaRef =
    useRef(false);

  // ----------------------------------------------------------
  // IGNORAR PRÓXIMA ALTERAÇÃO DE SELEÇÃO
  //
  // Ao restaurarmos programaticamente o cursor depois de uma
  // ação da toolbar, essa movimentação não deve apagar a
  // formatação pendente.
  // ----------------------------------------------------------

  const ignorarProximaAlteracaoSelecaoRef =
    useRef(false);

  // ==========================================================
  // INSERÇÃO CONTROLADA
  // ==========================================================

  const inserirTextoControlado =
    useCallback(
      (
        posicao: number,
        texto: string,
        marcas:
          readonly RichTextMark[],
      ) => {
        const novoConteudo =
          inserirTextoNaPosicao(
            content,
            posicao,
            texto,
            marcas,
          );

        const novaPosicao =
          posicao +
          texto.length;

        const novoEstado:
          RichTextSelectionState = {
            selecao: {
              inicio: novaPosicao,
              fim: novaPosicao,
            },

            cursor: {
              posicao: novaPosicao,
              marcasAtivas: [
                ...marcas,
              ],
            },
          };

        definirEstadoSelecao(
          novoEstado,
        );

        onChange(
          novoConteudo,
        );
      },
      [
        content,
        definirEstadoSelecao,
        onChange,
      ],
    );

  // ==========================================================
  // BEFORE INPUT
  //
  // Intercepta somente os casos em que precisamos controlar
  // explicitamente a formatação da próxima digitação.
  // ==========================================================

  const handleBeforeInput =
    useCallback(
      (
        event:
          FormEvent<HTMLDivElement>,
      ) => {
        const editor =
          editorRef.current;

        if (!editor) {
          return;
        }

        const inputEvent =
          event.nativeEvent as NativeBeforeInputEvent;

        const inputType =
          inputEvent.inputType;

        const data =
          inputEvent.data;

        // ----------------------------------------------------
        // VALIDAR TEXTO DIGITADO
        //
        // No ambiente atual:
        //
        // data      → funciona corretamente;
        // inputType → pode ser undefined.
        //
        // Portanto:
        //
        // - sem data válida: não tratamos;
        // - inputType undefined: aceitamos;
        // - inputType insertText: aceitamos;
        // - outro inputType conhecido: fluxo nativo.
        // ----------------------------------------------------

        if (
          data === null ||
          data === undefined ||
          data.length === 0
        ) {
          return;
        }

        if (
          inputType !== undefined &&
          inputType !== "insertText"
        ) {
          return;
        }

        const selection =
          window.getSelection();

        if (
          !selection ||
          selection.rangeCount === 0 ||
          !selection.isCollapsed
        ) {
          return;
        }

        const range =
          selection.getRangeAt(0);

        if (
          !editor.contains(
            range.startContainer,
          )
        ) {
          return;
        }

        const posicaoAtual =
          obterPosicaoAbsoluta(
            editor,
            range.startContainer,
            range.startOffset,
          );

        const pending =
          pendingTypingMarksRef.current;

        // ----------------------------------------------------
        // FORMATAÇÃO PENDENTE DEFINIDA PELA TOOLBAR
        //
        // Exemplo:
        //
        // ~~tacha|do~~
        //
        // usuário desliga Tachado.
        //
        // pending:
        //
        // {
        //   posicao: cursor,
        //   marcas: []
        // }
        //
        // A próxima letra nasce sem strike.
        // ----------------------------------------------------

        if (
          pending &&
          pending.posicao ===
            posicaoAtual
        ) {
          event.preventDefault();

          inserirTextoControlado(
            posicaoAtual,
            data,
            pending.marcas,
          );

          pendingTypingMarksRef.current =
            null;

          return;
        }

        // ----------------------------------------------------
        // PENDING PERTENCE A OUTRO PONTO
        //
        // Se o cursor mudou antes da próxima digitação, a
        // decisão de formatação anterior deixa de valer.
        // ----------------------------------------------------

        if (
          pending &&
          pending.posicao !==
            posicaoAtual
        ) {
          pendingTypingMarksRef.current =
            null;
        }

        // ----------------------------------------------------
        // BORDA FINAL DE UM TRECHO FORMATADO
        //
        // Exemplo:
        //
        // ~~tachado~~|
        //
        // A próxima digitação não deve herdar automaticamente
        // a formatação do trecho anterior.
        // ----------------------------------------------------

        const elementoFormatado =
          encontrarElementoFormatadoNoCursor(
            editor,
            range.startContainer,
          );

        if (!elementoFormatado) {
          return;
        }

        const estaNoFim =
          cursorEstaNoFimDoElemento(
            elementoFormatado,
            range,
          );

        if (!estaNoFim) {
          return;
        }

        event.preventDefault();

        inserirTextoControlado(
          posicaoAtual,
          data,
          [],
        );
      },
      [
        editorRef,
        inserirTextoControlado,
      ],
    );

  // ==========================================================
  // DIGITAÇÃO NATIVA
  // ==========================================================

  const handleInput =
    useCallback(() => {
      const editor =
        editorRef.current;

      if (!editor) {
        return;
      }

      alteracaoInternaRef.current =
        true;

      onChange(
        lerRichTextContentDoEditor(
          editor,
        ),
      );

      atualizarSelecaoDoDOM();
    }, [
      editorRef,
      onChange,
      atualizarSelecaoDoDOM,
    ]);

  // ==========================================================
  // ALTERNAR MARCA NO CURSOR
  //
  // Não altera o texto já existente.
  //
  // Apenas muda as marcas utilizadas pela próxima digitação
  // naquele ponto.
  // ==========================================================

  const toggleMarkAtCursor =
    useCallback(
      (
        mark: RichTextMark,
      ) => {
        const editor =
          editorRef.current;

        const estadoAtual =
          ultimoEstadoSelecaoRef.current;

        if (
          !editor ||
          !estadoAtual
        ) {
          return;
        }

        const possuiSelecao =
          estadoAtual.selecao.fim >
          estadoAtual.selecao.inicio;

        if (possuiSelecao) {
          return;
        }

        const pending =
          criarPendingTypingMarks(
            estadoAtual.cursor.posicao,
            estadoAtual.cursor.marcasAtivas,
            mark,
          );

        pendingTypingMarksRef.current =
          pending;

        // ----------------------------------------------------
        // ATUALIZAR ESTADO LÓGICO DO CURSOR
        // ----------------------------------------------------

        definirEstadoSelecao({
          selecao: {
            inicio:
              estadoAtual.cursor.posicao,

            fim:
              estadoAtual.cursor.posicao,
          },

          cursor: {
            posicao:
              estadoAtual.cursor.posicao,

            marcasAtivas: [
              ...pending.marcas,
            ],
          },
        });

        // ----------------------------------------------------
        // RESTAURAR CURSOR
        //
        // A alteração seguinte de seleção é programática e não
        // deve cancelar a formatação pendente.
        // ----------------------------------------------------

        ignorarProximaAlteracaoSelecaoRef.current =
          true;

        restaurarCursor(
          editor,
          estadoAtual.cursor.posicao,
        );
      },
      [
        editorRef,
        ultimoEstadoSelecaoRef,
        definirEstadoSelecao,
      ],
    );

  // ==========================================================
  // MUDANÇA DE SELEÇÃO / CURSOR
  //
  // Restauração programática:
  // → preserva a marca pendente.
  //
  // Movimentação real do usuário:
  // → descarta a marca pendente.
  // ==========================================================

  const handleSelectionChange =
    useCallback(() => {
      if (
        ignorarProximaAlteracaoSelecaoRef.current
      ) {
        ignorarProximaAlteracaoSelecaoRef.current =
          false;

        atualizarSelecaoDoDOM();

        return;
      }

      pendingTypingMarksRef.current =
        null;

      atualizarSelecaoDoDOM();
    }, [
      atualizarSelecaoDoDOM,
    ]);

  // ==========================================================
  // RETORNO
  // ==========================================================

  return {
    alteracaoInternaRef,

    handleBeforeInput,
    handleInput,
    handleSelectionChange,

    toggleMarkAtCursor,
  } as const;
}