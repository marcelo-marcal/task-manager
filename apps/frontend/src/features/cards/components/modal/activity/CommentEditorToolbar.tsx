"use client";

// ============================================================
// FX - BARRA DO EDITOR DE COMENTÁRIOS
//
// Nesta etapa os controles são apenas visuais.
// As funções reais serão implementadas individualmente depois,
// após compararmos cada comportamento com o Trello.
// ============================================================

import { HelpCircleIcon } from "@/components/icons/HelpCircleIcon";
import { PaperclipIcon } from "@/components/icons/PaperclipIcon";

// ============================================================
// COMPONENTE
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

      <ToolbarIconButton
        title="Anexar"
        icon={<PaperclipIcon />}
      />

      <ToolbarIconButton
        title="Ajuda"
        icon={<HelpCircleIcon />}
      />
    </div>
  );
}

// ============================================================
// BOTÃO DE TEXTO DA TOOLBAR
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

// ============================================================
// BOTÃO COM ÍCONE DA TOOLBAR
//
// Separado do botão de texto porque outros controles poderão
// usar SVGs reutilizáveis posteriormente.
// ============================================================

type ToolbarIconButtonProps = Readonly<{
  title: string;
  icon: React.ReactNode;
}>;

function ToolbarIconButton({
  title,
  icon,
}: ToolbarIconButtonProps) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      className="
        flex
        h-7
        min-w-7
        items-center
        justify-center
        rounded
        px-1.5
        text-[var(--text-secondary)]
        transition
        hover:bg-[var(--surface-hover)]
        hover:text-[var(--text-primary)]
      "
    >
      {icon}
    </button>
  );
}