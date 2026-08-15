"use client";

// ============================================================
// FX - CAMPO PARA NOVO COMENTÁRIO
// ============================================================

import {
  useRef,
  useState,
} from "react";

import { CommentEditorToolbar } from "./CommentEditorToolbar";

// ============================================================
// TIPOS
// ============================================================

type CommentComposerProps = Readonly<{
  comentario: string;
  onComentarioChange: (comentario: string) => void;
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

  const textareaRef =
    useRef<HTMLTextAreaElement | null>(null);

  const podeEnviar =
    comentario.trim().length > 0;

  // ----------------------------------------------------------
  // ABRIR EDITOR
  // ----------------------------------------------------------

  function abrirEditor() {
    setEditorAberto(true);

    window.setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  }

  // ----------------------------------------------------------
  // SALVAR COMENTÁRIO
  // ----------------------------------------------------------

  function salvarComentario() {
    if (!podeEnviar) {
      return;
    }

    onSubmit();
    setEditorAberto(false);
  }

  // ----------------------------------------------------------
  // CANCELAR COMENTÁRIO
  //
  // Descarta qualquer texto digitado e fecha o editor.
  // ----------------------------------------------------------

  function cancelarComentario() {
    onComentarioChange("");
    setEditorAberto(false);
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
      {/* ======================================================
          EDITOR
      ====================================================== */}

      <div
        className="
          overflow-hidden
          rounded-md
          border
          border-[var(--primary)]
          bg-[var(--surface-secondary)]
        "
      >
        <CommentEditorToolbar />

        <textarea
          ref={textareaRef}
          value={comentario}
          onChange={(event) =>
            onComentarioChange(
              event.target.value,
            )
          }
          placeholder="Escrever um comentário..."
          aria-label="Escrever comentário"
          rows={4}
          className="
            min-h-[92px]
            w-full
            resize-y
            bg-transparent
            px-3
            py-3
            text-[13px]
            leading-5
            text-[var(--text-primary)]
            outline-none
            placeholder:text-[var(--text-muted)]
          "
        />
      </div>

      {/* ======================================================
          AÇÕES
      ====================================================== */}

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