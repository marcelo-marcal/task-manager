"use client";

// ============================================================
// FX - CONTROLE INTERNO DE SELEÇÃO DA SUPERFÍCIE
//
// Responsável por:
//
// - guardar o último estado válido da seleção;
// - ler a seleção real existente no DOM;
// - calcular posição absoluta do cursor;
// - descobrir marcas existentes no cursor;
// - invalidar estados dependentes quando o cursor muda.
//
// Este hook pertence à infraestrutura da superfície.
//
// Ele NÃO conhece:
// - cartões;
// - comentários;
// - toolbar;
// - regras específicas de Tachado;
// - regras específicas de Código.
// ============================================================

import {
  useCallback,
  useRef,
} from "react";

import type {
  RichTextSelection,
  RichTextSelectionState,
} from "../types/rich-text.types";

import {
  obterMarcasAtivasNoCursor,
  obterPosicaoAbsoluta,
} from "../surface/rich-text-selection.utils";

// ============================================================
// ESTADO VAZIO
// ============================================================

const EMPTY_SELECTION_STATE: RichTextSelectionState = {
  selecao: {
    inicio: 0,
    fim: 0,
  },

  cursor: {
    posicao: 0,
    marcasAtivas: [],
  },
};

// ============================================================
// PROPRIEDADES
// ============================================================

type UseRichTextSurfaceSelectionProps =
  Readonly<{
    editorRef:
      React.RefObject<HTMLDivElement | null>;

    onSelectionChange: (
      state: RichTextSelectionState,
    ) => void;

    onCursorPositionChange?: (
      position: number,
    ) => void;
  }>;

// ============================================================
// HOOK
// ============================================================

export function useRichTextSurfaceSelection({
  editorRef,
  onSelectionChange,
  onCursorPositionChange,
}: UseRichTextSurfaceSelectionProps) {
  // ----------------------------------------------------------
  // ÚLTIMO ESTADO VÁLIDO
  //
  // Continua disponível mesmo depois que o foco é transferido
  // para um botão da toolbar.
  // ----------------------------------------------------------

  const ultimoEstadoSelecaoRef =
    useRef<RichTextSelectionState>(
      EMPTY_SELECTION_STATE,
    );

  // ----------------------------------------------------------
  // DEFINIR ESTADO PROGRAMATICAMENTE
  //
  // Útil quando uma ação da toolbar modifica o estado lógico
  // da próxima digitação sem alterar imediatamente o texto.
  // ----------------------------------------------------------

  const definirEstadoSelecao =
    useCallback(
      (
        estado:
          RichTextSelectionState,
      ) => {
        ultimoEstadoSelecaoRef.current =
          estado;

        onSelectionChange(
          estado,
        );
      },
      [
        onSelectionChange,
      ],
    );

  // ----------------------------------------------------------
  // LER SELEÇÃO DIRETAMENTE DO DOM
  // ----------------------------------------------------------

  const atualizarSelecaoDoDOM =
    useCallback(() => {
      const editor =
        editorRef.current;

      const selection =
        window.getSelection();

      if (
        !editor ||
        !selection ||
        selection.rangeCount === 0
      ) {
        return;
      }

      const range =
        selection.getRangeAt(0);

      if (
        !editor.contains(
          range.startContainer,
        ) ||
        !editor.contains(
          range.endContainer,
        )
      ) {
        return;
      }

      // ------------------------------------------------------
      // INTERVALO SELECIONADO
      // ------------------------------------------------------

      const inicio =
        obterPosicaoAbsoluta(
          editor,
          range.startContainer,
          range.startOffset,
        );

      const fim =
        obterPosicaoAbsoluta(
          editor,
          range.endContainer,
          range.endOffset,
        );

      const novaSelecao:
        RichTextSelection = {
          inicio:
            Math.min(
              inicio,
              fim,
            ),

          fim:
            Math.max(
              inicio,
              fim,
            ),
        };

      // ------------------------------------------------------
      // PONTO ATIVO DO CURSOR
      //
      // focusNode/focusOffset representam a extremidade ativa
      // inclusive em seleções feitas da direita para esquerda.
      // ------------------------------------------------------

      const focusNode =
        selection.focusNode;

      if (
        !focusNode ||
        !editor.contains(
          focusNode,
        )
      ) {
        return;
      }

      const posicaoCursor =
        obterPosicaoAbsoluta(
          editor,
          focusNode,
          selection.focusOffset,
        );

      const marcasAtivas =
        obterMarcasAtivasNoCursor(
          editor,
          focusNode,
        );

      const novoEstado:
        RichTextSelectionState = {
          selecao:
            novaSelecao,

          cursor: {
            posicao:
              posicaoCursor,

            marcasAtivas,
          },
        };

      ultimoEstadoSelecaoRef.current =
        novoEstado;

      onCursorPositionChange?.(
        posicaoCursor,
      );

      onSelectionChange(
        novoEstado,
      );
    }, [
      editorRef,
      onCursorPositionChange,
      onSelectionChange,
    ]);

  // ==========================================================
  // RETORNO
  // ==========================================================

  return {
    ultimoEstadoSelecaoRef,
    definirEstadoSelecao,
    atualizarSelecaoDoDOM,
  } as const;
}