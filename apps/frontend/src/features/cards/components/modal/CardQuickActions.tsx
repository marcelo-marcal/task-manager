"use client";

// ============================================================
// FX - AÇÕES RÁPIDAS DO CARTÃO
// ============================================================

// ============================================================
// TIPOS
// ============================================================

type CardQuickActionsProps = Readonly<{
  onAddChecklist: () => void;
}>;

type QuickActionProps = Readonly<{
  label: string;
  onClick?: () => void;
}>;

// ============================================================
// COMPONENTE
// ============================================================

export function CardQuickActions({
  onAddChecklist,
}: CardQuickActionsProps) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      <QuickAction label="+ Adicionar" />

      <QuickAction label="Etiquetas" />

      <QuickAction label="Datas" />

      <QuickAction
        label="Checklist"
        onClick={onAddChecklist}
      />
    </div>
  );
}

// ============================================================
// BOTÃO DE AÇÃO RÁPIDA
//
// Por enquanto fica local porque só é utilizado neste grupo.
// Se o mesmo padrão aparecer em outras telas, poderá ser
// promovido para components/ui.
// ============================================================

function QuickAction({
  label,
  onClick,
}: QuickActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        rounded-md
        border
        border-[var(--border)]
        bg-[var(--surface-secondary)]
        px-3
        py-1.5
        text-[12px]
        text-[var(--text-secondary)]
        transition
        hover:bg-[var(--surface-hover)]
        hover:text-[var(--text-primary)]
      "
    >
      {label}
    </button>
  );
}