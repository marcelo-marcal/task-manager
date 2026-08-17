"use client";

// ============================================================
// FX - CAMPO PARA NOVO COMENTÁRIO
//
// Coordena:
// - conteúdo;
// - seleção;
// - estado do cursor;
// - ações vindas da toolbar.
//
// A implementação especializada do editor permanece em:
//
// src/components/editor
// ============================================================

import {
  useRef,
  useState,
} from "react";

import {
  RichTextSurface,
} from "@/components/editor/RichTextSurface";

import type {
  RichTextSurfaceHandle,
} from "@/components/editor/RichTextSurface";

import {
  useRichTextSelection,
} from "@/components/editor/hooks/useRichTextSelection";

import type {
  RichTextContent,
  RichTextSelectionState,
} from "@/components/editor/types/rich-text.types";

import {
  aplicarMarcaNaSelecao,
  criarRichTextContent,
  obterTextoPlano,
} from "@/components/editor/utils/rich-text-content.utils";

import { CommentEditorToolbar } from "./CommentEditorToolbar";

// ============================================================
// TIPOS
// ============================================================

type CommentComposerProps = Readonly<{
  comentario: string;

  onComentarioChange: (
    comentario: string,
  ) => void;

  onSubmit: () => void;
}>;

// ============================================================
// COMPONENTE
// ============================================================

export function CommentComposer({
  comentario,
  onComentarioChange,
  onSubmit,
}: CommentComposerProps) {
  const [editorAberto, setEditorAberto] =
    useState(false);

  const [seguir, setSeguir] =
    useState(true);

  // ----------------------------------------------------------
  // CONTEÚDO RICO
  // ----------------------------------------------------------

  const [conteudo, setConteudo] =
    useState<RichTextContent>(() =>
      criarRichTextContent(
        comentario,
      ),
    );

  // ----------------------------------------------------------
  // REFERÊNCIA PÚBLICA DA SUPERFÍCIE
  // ----------------------------------------------------------

  const editorRef =
    useRef<RichTextSurfaceHandle | null>(
      null,
    );

  // ----------------------------------------------------------
  // SELEÇÃO E CURSOR
  // ----------------------------------------------------------

  const {
    selecao,
    possuiSelecao,
    atualizarEstadoSelecao,
    limparSelecao,
    possuiMarcaAtiva,
  } = useRichTextSelection();

  // ----------------------------------------------------------
  // TACHADO NO PONTO ATUAL DO CURSOR
  // ----------------------------------------------------------

  const strikeAtivoNoCursor =
    possuiMarcaAtiva(
      "strike",
    );

  // ----------------------------------------------------------
  // DISPONIBILIDADE DO TACHADO
  //
  // Habilitado quando:
  //
  // - existe seleção; ou
  // - o cursor está dentro de texto já tachado.
  // ----------------------------------------------------------

  const podeUsarTachado =
    possuiSelecao ||
    strikeAtivoNoCursor;

  // ----------------------------------------------------------
  // TEXTO PLANO
  // ----------------------------------------------------------

  const textoPlano =
    obterTextoPlano(
      conteudo,
    );

  const podeEnviar =
    textoPlano.trim().length > 0;

  // ----------------------------------------------------------
  // ABRIR EDITOR
  // ----------------------------------------------------------

  function abrirEditor() {
    setConteudo(
      criarRichTextContent(
        comentario,
      ),
    );

    limparSelecao();

    setEditorAberto(
      true,
    );

    window.setTimeout(() => {
      editorRef.current?.focus();
    }, 0);
  }

  // ----------------------------------------------------------
  // ALTERAR CONTEÚDO
  // ----------------------------------------------------------

  function alterarConteudo(
    novoConteudo: RichTextContent,
  ) {
    setConteudo(
      novoConteudo,
    );

    onComentarioChange(
      obterTextoPlano(
        novoConteudo,
      ),
    );
  }

  // ----------------------------------------------------------
  // ATUALIZAR SELEÇÃO / CURSOR
  // ----------------------------------------------------------

  function alterarEstadoSelecao(
    state: RichTextSelectionState,
  ) {
    atualizarEstadoSelecao(
      state.selecao,
      state.cursor,
    );
  }

  // ----------------------------------------------------------
  // APLICAR / ALTERNAR TACHADO
  //
  // CASO 1 - COM SELEÇÃO
  //
  // Modifica somente o trecho selecionado.
  //
  // CASO 2 - SEM SELEÇÃO, CURSOR DENTRO DE TACHADO
  //
  // Não modifica o texto já existente.
  // Apenas desliga "strike" para a próxima digitação naquele
  // ponto do cursor.
  // ----------------------------------------------------------

  function aplicarTachado() {
    if (!possuiSelecao) {
      if (!strikeAtivoNoCursor) {
        return;
      }

      editorRef.current?.toggleMarkAtCursor(
        "strike",
      );

      return;
    }

    const novoConteudo =
      aplicarMarcaNaSelecao(
        conteudo,
        selecao,
        "strike",
      );

    alterarConteudo(
      novoConteudo,
    );
  }

  // ----------------------------------------------------------
  // SALVAR COMENTÁRIO
  // ----------------------------------------------------------

  function salvarComentario() {
    if (!podeEnviar) {
      return;
    }

    onSubmit();

    setConteudo(
      criarRichTextContent(""),
    );

    limparSelecao();

    setEditorAberto(
      false,
    );
  }

  // ----------------------------------------------------------
  // CANCELAR COMENTÁRIO
  // ----------------------------------------------------------

  function cancelarComentario() {
    onComentarioChange("");

    setConteudo(
      criarRichTextContent(""),
    );

    limparSelecao();

    setEditorAberto(
      false,
    );
  }

  // ==========================================================
  // ESTADO FECHADO
  // ==========================================================

  if (!editorAberto) {
    return (
      <button
        type="button"
        onClick={abrirEditor}
        className="
          mt-3
          flex
          h-9
          w-full
          items-center
          rounded-md
          border
          border-[var(--border)]
          bg-[var(--surface-secondary)]
          px-3
          text-left
          text-[12px]
          text-[var(--text-muted)]
          transition
          hover:bg-[var(--surface-hover)]
        "
      >
        Escrever um comentário...
      </button>
    );
  }

  // ==========================================================
  // ESTADO ABERTO
  // ==========================================================

  return (
    <div className="mt-3">
      <div
        className="
          relative
          overflow-visible
          rounded-md
          border
          border-[var(--primary)]
          bg-[var(--surface-secondary)]
        "
      >
        <CommentEditorToolbar
          onStrike={aplicarTachado}
          strikeDisabled={
            !podeUsarTachado
          }
        />

        <RichTextSurface
          ref={editorRef}
          content={conteudo}
          placeholder="Escrever um comentário..."
          onChange={alterarConteudo}
          onSelectionChange={
            alterarEstadoSelecao
          }
        />
      </div>

      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={salvarComentario}
          disabled={!podeEnviar}
          className="
            rounded-md
            bg-[var(--primary)]
            px-3
            py-1.5
            text-[12px]
            font-medium
            text-white
            transition
            hover:bg-[var(--primary-hover)]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Salvar
        </button>

        <label
          className="
            flex
            cursor-pointer
            items-center
            gap-1.5
            text-[12px]
            text-[var(--text-secondary)]
          "
        >
          <input
            type="checkbox"
            checked={seguir}
            onChange={(event) =>
              setSeguir(
                event.target.checked,
              )
            }
            className="
              h-4
              w-4
              cursor-pointer
              accent-[var(--primary)]
            "
          />

          Seguir
        </label>

        <button
          type="button"
          onClick={cancelarComentario}
          className="
            rounded-md
            px-1
            py-1.5
            text-[12px]
            text-[var(--text-muted)]
            transition
            hover:text-[var(--text-primary)]
            hover:underline
          "
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}