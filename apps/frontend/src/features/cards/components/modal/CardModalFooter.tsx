"use client";

// ============================================================
// FX - RODAPÉ DO MODAL DO CARTÃO
// ============================================================

// ============================================================
// TIPOS
// ============================================================

type FooterActionProps = Readonly<{
  label: string;
  ativo?: boolean;
}>;

// ============================================================
// COMPONENTE
// ============================================================

export function CardModalFooter() {
  return (
    <footer
      className="
        flex
        h-11
        shrink-0
        items-center
        justify-center
        gap-2
        border-t
        border-[var(--border)]
        bg-[var(--surface)]
      "
    >
      <FooterAction label="Integrações" />

      <FooterAction label="Automações" />

      <FooterAction
        label="Comentários"
        ativo
      />
    </footer>
  );
}

// ============================================================
// AÇÃO DO RODAPÉ
// ============================================================

function FooterAction({
  label,
  ativo = false,
}: FooterActionProps) {
  return (
    <button
      type="button"
      className={`
        rounded-md
        px-3
        py-1.5
        text-[12px]
        transition

        ${
          ativo
            ? "bg-blue-500/15 text-blue-400"
            : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
        }
      `}
    >
      {label}
    </button>
  );
}