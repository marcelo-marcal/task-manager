"use client";

// ============================================================
// FX - CABEÇALHO DO MODAL DO CARTÃO
// ============================================================

// ============================================================
// TIPOS
// ============================================================

type CardModalHeaderProps = Readonly<{
  onClose: () => void;
}>;

// ============================================================
// COMPONENTE
// ============================================================

export function CardModalHeader({
  onClose,
}: CardModalHeaderProps) {
  return (
    <header
      className="
        flex
        h-12
        shrink-0
        items-center
        justify-between
        border-b
        border-[var(--border)]
        px-4
      "
    >
      {/* ======================================================
          STATUS
      ====================================================== */}

      <button
        type="button"
        className="
          rounded-md
          bg-[var(--surface-secondary)]
          px-3
          py-1.5
          text-xs
          text-[var(--text-secondary)]
          transition
          hover:bg-[var(--surface-hover)]
          hover:text-[var(--text-primary)]
        "
      >
        Concluído
      </button>

      {/* ======================================================
          AÇÕES
      ====================================================== */}

      <div className="flex items-center gap-1">
        <button
          type="button"
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-md
            text-[var(--text-secondary)]
            transition
            hover:bg-[var(--surface-hover)]
            hover:text-[var(--text-primary)]
          "
          aria-label="Mais ações"
        >
          •••
        </button>

        <button
          type="button"
          onClick={onClose}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-md
            text-lg
            text-[var(--text-secondary)]
            transition
            hover:bg-[var(--surface-hover)]
            hover:text-[var(--text-primary)]
          "
          aria-label="Fechar"
        >
          ×
        </button>
      </div>
    </header>
  );
}