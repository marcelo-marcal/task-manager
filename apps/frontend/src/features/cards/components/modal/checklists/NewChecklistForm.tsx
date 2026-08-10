"use client";

// ============================================================
// FX - FORMULÁRIO DE NOVO CHECKLIST
// ============================================================

import type {
  KeyboardEvent,
  RefObject,
} from "react";

// ============================================================
// TIPOS
// ============================================================

type NewChecklistFormProps = Readonly<{
  titulo: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onTituloChange: (titulo: string) => void;
  onAdd: () => void;
  onCancel: () => void;
}>;

// ============================================================
// COMPONENTE
// ============================================================

export function NewChecklistForm({
  titulo,
  inputRef,
  onTituloChange,
  onAdd,
  onCancel,
}: NewChecklistFormProps) {
  // ----------------------------------------------------------
  // TECLADO
  // ----------------------------------------------------------

  function handleKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Escape") {
      event.preventDefault();
      onCancel();

      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      onAdd();
    }
  }

  return (
    <div
      className="
        mt-3
        rounded-md
        border
        border-[var(--border)]
        bg-[var(--surface-secondary)]
        p-3
      "
    >
      <p
        className="
          mb-2
          text-[12px]
          font-semibold
          text-[var(--text-primary)]
        "
      >
        Adicionar checklist
      </p>

      <input
        ref={inputRef}
        type="text"
        value={titulo}
        onChange={(event) =>
          onTituloChange(event.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder="Título do checklist"
        aria-label="Título do novo checklist"
        className="
          h-9
          w-full
          rounded-md
          border
          border-[var(--border)]
          bg-[var(--background)]
          px-3
          text-[12px]
          text-[var(--text-primary)]
          outline-none
          placeholder:text-[var(--text-muted)]
          focus:border-[var(--primary)]
        "
      />

      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={onAdd}
          disabled={titulo.trim().length === 0}
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
          Adicionar
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="
            rounded-md
            px-3
            py-1.5
            text-[12px]
            text-[var(--text-secondary)]
            transition
            hover:bg-[var(--surface-hover)]
          "
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}