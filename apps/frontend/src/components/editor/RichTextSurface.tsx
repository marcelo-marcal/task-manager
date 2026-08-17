"use client";

// ============================================================
// FX - SUPERFÍCIE GENÉRICA DE TEXTO RICO
//
// Camada visual do editor.
// A lógica de DOM, seleção e digitação fica nos módulos
// especializados em hooks/ e surface/.
// ============================================================

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import type {
  RichTextContent,
  RichTextMark,
  RichTextSelectionState,
} from "./types/rich-text.types";

import { obterTextoPlano } from "./utils/rich-text-content.utils";

import { renderizarRichTextContent } from "./surface/rich-text-dom.utils";

import { restaurarEstadoSelecao } from "./surface/rich-text-selection.utils";

import { useRichTextSurfaceSelection } from "./hooks/useRichTextSurfaceSelection";

import { useRichTextSurfaceInput } from "./hooks/useRichTextSurfaceInput";

// ============================================================
// API PÚBLICA
// ============================================================

export type RichTextSurfaceHandle = Readonly<{
  focus: () => void;
  toggleMarkAtCursor: (
    mark: RichTextMark,
  ) => void;
}>;

type RichTextSurfaceProps = Readonly<{
  content: RichTextContent;
  placeholder?: string;

  onChange: (
    content: RichTextContent,
  ) => void;

  onSelectionChange: (
    state: RichTextSelectionState,
  ) => void;
}>;

// ============================================================
// COMPONENTE
// ============================================================

export const RichTextSurface =
  forwardRef<
    RichTextSurfaceHandle,
    RichTextSurfaceProps
  >(function RichTextSurface(
    {
      content,
      placeholder = "Escrever...",
      onChange,
      onSelectionChange,
    },
    ref,
  ) {
    const editorRef =
      useRef<HTMLDivElement | null>(null);

    const {
      ultimoEstadoSelecaoRef,
      definirEstadoSelecao,
      atualizarSelecaoDoDOM,
    } = useRichTextSurfaceSelection({
      editorRef,
      onSelectionChange,
    });

    const {
      alteracaoInternaRef,
      handleBeforeInput,
      handleInput,
      handleSelectionChange,
      toggleMarkAtCursor,
    } = useRichTextSurfaceInput({
      editorRef,
      content,
      ultimoEstadoSelecaoRef,
      definirEstadoSelecao,
      atualizarSelecaoDoDOM,
      onChange,
    });

    // --------------------------------------------------------
    // COMANDOS EXPOSTOS À TOOLBAR / CONSUMIDOR
    // --------------------------------------------------------

    useImperativeHandle(
      ref,
      () => ({
        focus: () =>
          editorRef.current?.focus(),

        toggleMarkAtCursor,
      }),
      [toggleMarkAtCursor],
    );

    // --------------------------------------------------------
    // SINCRONIZAÇÃO MODELO → DOM
    // --------------------------------------------------------

    useEffect(() => {
      const editor =
        editorRef.current;

      if (!editor) {
        return;
      }

      // Na digitação nativa o navegador já alterou o DOM.
      if (alteracaoInternaRef.current) {
        alteracaoInternaRef.current =
          false;

        return;
      }

      renderizarRichTextContent(
        editor,
        content,
      );

      restaurarEstadoSelecao(
        editor,
        ultimoEstadoSelecaoRef.current,
      );
    }, [
      content,
      alteracaoInternaRef,
      ultimoEstadoSelecaoRef,
    ]);

    const vazio =
      obterTextoPlano(content).length === 0;

    // ========================================================
    // RENDER
    // ========================================================

    return (
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        spellCheck
        lang="pt-BR"
        role="textbox"
        aria-multiline="true"
        aria-label="Editor de texto"
        data-placeholder={placeholder}
        data-empty={vazio ? "true" : "false"}
        onBeforeInput={handleBeforeInput}
        onInput={handleInput}
        onMouseUp={handleSelectionChange}
        onKeyUp={handleSelectionChange}
        className="
          relative
          min-h-[92px]
          w-full
          whitespace-pre-wrap
          break-words
          rounded-b-md
          bg-transparent
          px-3
          py-3
          text-[13px]
          leading-5
          text-[var(--text-primary)]
          outline-none
          data-[empty=true]:before:pointer-events-none
          data-[empty=true]:before:absolute
          data-[empty=true]:before:text-[var(--text-muted)]
          data-[empty=true]:before:content-[attr(data-placeholder)]
        "
      />
    );
  });