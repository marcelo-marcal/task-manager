"use client";

// ============================================================
// FX - CAMPO PARA NOVO COMENTÁRIO
// ============================================================

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
  const podeEnviar =
    comentario.trim().length > 0;

  return (
    <div className="mt-3">
      <textarea
        value={comentario}
        onChange={(event) =>
          onComentarioChange(
            event.target.value,
          )
        }
        placeholder="Escrever um comentário..."
        aria-label="Escrever comentário"
        rows={3}
        className="
          min-h-[72px]
          w-full
          resize-y
          rounded-md
          border
          border-[var(--border)]
          bg-[var(--surface-secondary)]
          px-3
          py-2
          text-[13px]
          leading-5
          text-[var(--text-primary)]
          outline-none
          placeholder:text-[var(--text-muted)]
          focus:border-[var(--primary)]
        "
      />

      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={onSubmit}
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
          Comentar
        </button>
      </div>
    </div>
  );
}