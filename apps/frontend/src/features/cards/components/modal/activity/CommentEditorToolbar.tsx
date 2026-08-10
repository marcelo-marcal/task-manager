"use client";

// ============================================================
// FX - BARRA DO EDITOR DE COMENTÁRIOS
//
// Nesta etapa os controles são apenas visuais.
// As funções reais serão implementadas individualmente depois,
// após compararmos cada comportamento com o Trello.
// ============================================================

export function CommentEditorToolbar() {
  return (
    <div
      className="
        flex
        h-10
        items-center
        gap-1
        border-b
        border-[var(--border)]
        px-2
      "
    >
      <ToolbarButton label="Tt⌄" title="Estilo de texto" />

      <ToolbarButton label="B" title="Negrito" destaque />

      <ToolbarButton label="I" title="Itálico" destaque />

      <ToolbarButton label="•••" title="Mais formatações" />

      <div
        className="
          mx-1
          h-5
          w-px
          bg-[var(--border)]
        "
      />

      <ToolbarButton label="☷⌄" title="Listas" />

      <div
        className="
          mx-1
          h-5
          w-px
          bg-[var(--border)]
        "
      />

      <ToolbarButton label="+⌄" title="Inserir" />

      <div className="flex-1" />

      <ToolbarButton label="⌕" title="Anexar" />

      <ToolbarButton label="?" title="Ajuda" />
    </div>
  );
}

// ============================================================
// BOTÃO DA TOOLBAR
// ============================================================

type ToolbarButtonProps = Readonly<{
  label: string;
  title: string;
  destaque?: boolean;
}>;

function ToolbarButton({
  label,
  title,
  destaque = false,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      className={`
        flex
        h-7
        min-w-7
        items-center
        justify-center
        rounded
        px-1.5
        text-[13px]
        transition
        hover:bg-[var(--surface-hover)]

        ${
          destaque
            ? "font-semibold text-[var(--text-primary)]"
            : "text-[var(--text-secondary)]"
        }
      `}
    >
      {label}
    </button>
  );
}